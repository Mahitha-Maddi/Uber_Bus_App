from flask import Flask, flash, request, jsonify, render_template, redirect, url_for, g, session, send_from_directory, abort
from flask_cors import CORS
from flask_api import status
from datetime import date, datetime, timedelta
from calendar import monthrange
from dateutil.parser import parse
import pytz
import os
import sys
import time
import uuid
import json
import random
import string
import pathlib
import io
from uuid import UUID
from bson.objectid import ObjectId

# straight mongo access
from pymongo import MongoClient

# security
# pip install flask-bcrypt
# https://pypi.org/project/Bcrypt-Flask/
# https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
#from flask.ext.bcrypt import Bcrypt
from flask_bcrypt import Bcrypt
from flask import g
import jwt
g = dict()

# mongo
#mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_client = MongoClient("mongodb+srv://Mahitha-Maddi:Mahitha%4042@cluster0.1z0g8.mongodb.net/test?ssl=true&ssl_cert_reqs=CERT_NONE")

app = Flask(__name__)
#CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# Here are my datasets
bookings = dict()  

################
# Security
################
def set_env_var():
    global g
    if 'database_url' not in g:
        g['database_url'] = os.environ.get("DATABASE_URL", 'mongodb://localhost:27017/')
    if 'secret_key' not in g:
        g['secret_key'] = os.environ.get("SECRET_KEY", "my_precious_1869")
    if 'bcrypt_log_rounds' not in g:
        g['bcrypt_log_rounds'] = os.environ.get("BCRYPT_LOG_ROUNDS", 13)
    if 'access_token_expiration' not in g:
        g['access_token_expiration'] = os.environ.get("ACCESS_TOKEN_EXPIRATION", 900)
    if 'refresh_token_expiration' not in g:
        g['refresh_token_expiration'] = os.environ.get("REFRESH_TOKEN_EXPIRATION", 2592000)
    if 'users' not in g:
        # users = os.environ.get("USERS", 'Elon Musk,Bill Gates,Jeff Bezos')
        # print('users=', users)
        # print('g.users=', list(users.split(',')))
        g['users'] = find_users() #list(users.split(','))
        print('g.users=', g['users'])
    if 'passwords' not in g:
        #passwords = os.environ.get("PASSWORDS", 'Tesla,Clippy,Blue Horizon')
        g['passwords'] = find_passwords() #list(passwords.split(','))
        print("g['passwords']=", g['passwords'])
        # Once hashed, the value is irreversible. However in the case of 
        # validating logins a simple hashing of candidate password and 
        # subsequent comparison can be done in constant time. This helps 
        # prevent timing attacks.
        #g['password_hashes'] = list(map(lambda p: bcrypt.generate_password_hash(str(p), g['bcrypt_log_rounds']).decode('utf-8'), g['passwords']))
        g['password_hashes'] = []
        for p in g['passwords']:
            g['password_hashes'].append(bcrypt.generate_password_hash(p, 13).decode('utf-8'))
        print("g['password_hashes]=", g['password_hashes'])
        g['userids'] = list(range(0, len(g['users'])))
        print("g['userids]=", g['userids'])

def get_env_var(varname):
    #return g.pop(varname, None)
    global g
    return g[varname]

def encode_token(user_id, token_type):
    if token_type == "access":
        seconds = get_env_var("access_token_expiration")
    else:
        seconds = get_env_var("refresh_token_expiration")

    payload = {
        "exp": datetime.utcnow() + timedelta(seconds=seconds),
        "iat": datetime.utcnow(),
        "sub": user_id,
    }
    return jwt.encode(
        payload, get_env_var("secret_key"), algorithm="HS256"
    )

def decode_token(token):
    payload = jwt.decode(token, get_env_var("secret_key"),algorithms=["HS256"])
    print("decode_token:", payload)
    return payload["sub"]


####################
# Security Endpoints
####################
@app.route("/doc")
def home(): 
    return """Welcome to online mongo/twitter testing ground!<br />
        <br />
        Run the following endpoints:<br />
        From collection:<br/>
        http://localhost:5000/tweets<br />
        http://localhost:5000/tweets-week<br />
        http://localhost:5000/tweets-week-results<br />
        Create new data:<br />
        http://localhost:5000/mock-tweets<br />
        Optionally, to purge database: http://localhost:5000/purge-db"""

# Returns an encoded userid as jwt access and a refresh tokens. Requires username 
# and password. Refresh token not used. Only meant to be used with token issuer,
# but here the token issuer and the be are one and the same.
@app.route("/login", methods=["POST"])
def login():
    try:
        user = request.json['name']
        password = request.json['password']
        print('user:', user)
        print('password:', password)
        print('users:', get_env_var('users'))
        if not user or not password:
            print('not user or not password!')
            return jsonify(("Authentication is required and has failed!", status.HTTP_401_UNAUTHORIZED))
        elif not user in get_env_var('users'):
            print('unknown user!')
            return jsonify(("Unknown user!", status.HTTP_401_UNAUTHORIZED))
        else:
            # presumably we only store password hashes and compare passed pwd
            # with our stored hash. For simplicity, we store the full password
            # and the hash, which we retrieve here
            print('password_hashes:', get_env_var('password_hashes'))
            print("get_env_var('users').index(user):", get_env_var('users').index(user))
            password_hash = get_env_var('password_hashes')[get_env_var('users').index(user)]
            print('password_hash:', password_hash)
            a = datetime.now()
            if not bcrypt.check_password_hash(password_hash, password):
                print('bcrypt.check_password_hash(password_hash, password) returned False!')
                return jsonify(("Authentication is required and has failed!", status.HTTP_401_UNAUTHORIZED))
            b = datetime.now()
            print('check_password took:', b - a)
            # debugging
            #print('password:', password)
            #print('type(password):', type(password))
            #for i in range(3):
            #    password_hash2 = bcrypt.generate_password_hash(password, 13).decode('utf-8')
            #    print('password_hash2:', password_hash2)
            #    if not bcrypt.check_password_hash(password_hash2, password):
            #        print('bcrypt.check_password_hash(password_hash, password) returned False!')
            #        return jsonify(("Authentication is required and has failed!", status.HTTP_401_UNAUTHORIZED))

            # create access and refresh token for the user to save.
            # User needs to pass access token for all secured APIs.
            userid = get_env_var('userids')[get_env_var('users').index(user)]
            access_token = encode_token(userid, "access")
            refresh_token = encode_token(userid, "refresh")
            print("type of accesstoken is: ",type(access_token))
            response_object = {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "userid": userid,
                "username": user

            }
            #return response_object, 200
            #return response_object
            return jsonify((response_object, status.HTTP_200_OK))
    except Exception as e:
        print('exception:', e)
        return jsonify(("Authentication is required and has failed!", status.HTTP_401_UNAUTHORIZED))


# Returns an encoded userid. Requires both tokens. If access token expired 
# returns status.HTTP_401_UNAUTHORIZED, and user needs to fast login. If refresh 
# token expired returns status.HTTP_401_UNAUTHORIZED, and user needs to login
# with username and password. Tokens are usually passed in authorization headers 
# (auth_header = request.headers.get("Authorization")). For simplicity, I just 
# pass access token as an extra parameter in secured API calls.
@app.route("/fastlogin", methods=["POST"])
def fastlogin():
    try:
        access_token = request.json['access']
        refresh_token = request.json['refresh']

        if not access_token or not refresh_token:
            return jsonify(("Missing token(s)!", status.HTTP_401_UNAUTHORIZED))
        else:
            try:
                # first, with access token:
                userid = decode_token(access_token)
                print("my test userid: ",userid)

                #if not userid or not userid in get_env_var('userids'):
                if not userid in get_env_var('userids'):
                    print("User ID test: ",get_env_var('userids'))
                    return jsonify(("User unknown, please login with username and password.", status.HTTP_401_UNAUTHORIZED))

                try:
                    # second, with refresh token
                    userid2 = decode_token(refresh_token)
                    print("user id 2 test: ",userid2)
                    if userid2 != userid:
                        return jsonify(("User unknown, please login with username and password.", status.HTTP_401_UNAUTHORIZED))

                    # issue a new access token, keep the same refresh token
                    access_token = encode_token(userid, "access")
                    response_object = {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "userid": userid,
                        "username": get_env_var('users')[userid]
                    }
                    return jsonify((response_object, status.HTTP_200_OK))

                # refresh token failure: Need username/pwd login
                except jwt.ExpiredSignatureError:
                    return jsonify(("Lease expired. Please log in with username and password.", status.HTTP_401_UNAUTHORIZED))
                
                except jwt.InvalidTokenError:
                    return jsonify(("Invalid token. Please log in with username and password.", status.HTTP_401_UNAUTHORIZED))

            # access token failure: Need at least fast login
            except jwt.ExpiredSignatureError:
                return jsonify(("Signature expired. Please fast log in.", status.HTTP_401_UNAUTHORIZED))
            
            except jwt.InvalidTokenError:
                return jsonify(("Invalid token. Please fast log in.", status.HTTP_401_UNAUTHORIZED))

    except:
        return jsonify(("Missing token or other error. Please log in with username and password.", status.HTTP_401_UNAUTHORIZED))


def verify_token(token):
    try:
        userid = decode_token(token)
        print("verify_token():", token, userid)
        print("verify_token():", get_env_var('userids'))
        print("verify_token():", userid in get_env_var('userids'))

        if userid is None or not userid in get_env_var('userids'):
            print("verify_token() returning False")
            return False, jsonify(("User unknown!", status.HTTP_401_UNAUTHORIZED))
        else:
            print("verify_token() returning True")
            return True, userid

    except jwt.ExpiredSignatureError:
        return False, jsonify(("Signature expired. Please log in.", status.HTTP_401_UNAUTHORIZED))

    except jwt.InvalidTokenError:
        return False, jsonify(("Invalid token. Please log in.", status.HTTP_401_UNAUTHORIZED))



################
# Apply to mongo
################

def atlas_connect():
    # Node
    # const MongoClient = require('mongodb').MongoClient;
    # const uri = "mongodb+srv://admin:<password>@tweets.8ugzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    # const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    # client.connect(err => {
    # const collection = client.db("test").collection("devices");
    # // perform actions on the collection object
    # client.close();
    # });

    # Python
    client = pymongo.MongoClient("mongodb+srv://Mahitha-Maddi:Mahitha%4042@cluster0.1z0g8.mongodb.net/test?ssl=true&ssl_cert_reqs=CERT_NONE")
    db = client.test


# database access layer
def insert_one(r):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...insert_one() to mongo: ", r)
        try:
            mongo_collection = db['bookings']
            result = mongo_collection.insert_one(r)
            print("inserted _ids: ", result.inserted_id)
        except Exception as e:
            print(e)

    microseconds_doing_mongo_work = (datetime.now() - start_time).microseconds
    print("*** It took " + str(microseconds_doing_mongo_work) + " microseconds to insert_one.")
    return result.inserted_id

# method to insert one passenger record
def insert_one_passenger(r):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...insert_one() to mongo: ", r)
        try:
            mongo_collection = db['passengers']
            result = mongo_collection.insert_one(r)
            print("inserted _ids: ", result.inserted_id)
        except Exception as e:
            print(e)

    microseconds_doing_mongo_work = (datetime.now() - start_time).microseconds
    print("*** It took " + str(microseconds_doing_mongo_work) + " microseconds to insert_one.")

# method to insert user record
def insert_one_user(r):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...insert_one() to mongo: ", r)
        try:
            mongo_collection = db['users']
            result = mongo_collection.insert_one(r)
            print("inserted _ids: ", result.inserted_id)
        except Exception as e:
            print(e)

    microseconds_doing_mongo_work = (datetime.now() - start_time).microseconds
    print("*** It took " + str(microseconds_doing_mongo_work) + " microseconds to insert_one.")

# method to find users --returns usernames
def find_users():
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")
        mongo_collection = db['users']
        myquery = {}
        cursor = dict()
        result = []
        #cursor = mongo_collection.find(myquery,{"_id":0, "username": 1})
        for x in mongo_collection.find(myquery,{"_id":0, "username": 1}):
            print(x["username"])
            result.append(x["username"])

        howmany = len(result)
        print("results: ",result)
        print('found ' + str(howmany) + ' users with entered email ID!')
        #sorted_records = sorted(records,key=lambda t: t['source'])
        #print(type(sorted_records))
    return result

# method to find passwords --returns passwords
def find_passwords():
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")
        mongo_collection = db['users']
        myquery = {}
        cursor = dict()
        result = []
        #cursor = mongo_collection.find(myquery,{"_id":0, "username": 1})
        for x in mongo_collection.find(myquery,{"_id":0, "password": 1}):
            print(x["password"])
            result.append(x["password"])

        howmany = len(result)
        print("results: ",result)
        print('found ' + str(howmany) + ' users with entered email ID!')
        #sorted_records = sorted(records,key=lambda t: t['source'])
        #print(type(sorted_records))
    return result

# method to find user by emailID
def find_user(email):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...searching in mongo: ", email)
        mongo_collection = db['users']
        myquery = {"email": { "$regex": str(email) }}
        cursor = dict()
        cursor = mongo_collection.find(myquery,{"_id": 0})
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' users with entered email ID!')
        #sorted_records = sorted(records,key=lambda t: t['source'])
        #print(type(sorted_records))
    return howmany

# method to find user by user name
def find_user1(username):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...searching in mongo: ", username)
        mongo_collection = db['users']
        myquery = {"username": { "$regex": str(username) }}
        cursor = dict()
        cursor = mongo_collection.find(myquery,{"_id": 0})
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' users with entered user name!')
        #sorted_records = sorted(records,key=lambda t: t['source'])
        #print(type(sorted_records))
    return howmany

def validation2(user,source,destination,date):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['Uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        mongo_collection = db['bookings']
        myquery1 = {"source": { "$regex": str(source) },"destination": { "$regex": str(destination) },"date": {"$regex": str(date)},"user": {"$regex": str(user)}}
        cursor1 = dict()
        cursor1 = mongo_collection.find(myquery1)
        records1 = list(cursor1)
        howmany1 = len(records1)
    return howmany1


def tryexcept(requesto, key, default):
    lhs = None
    try:
        lhs = requesto.json[key]
        # except Exception as e:
    except:
        lhs = default
    return lhs

## seconds since midnight
def ssm():
    now = datetime.now()
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
    return str((now - midnight).seconds)

# endpoint to check overlap between bookings of a user
@app.route("/overlapCheck", methods=["POST"])
def check_overlap():
    #date = request.json['date']
    user = request.json['user']
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['bookings']
        myquery = {"user": { "$regex": str(user) }}
        cursor = dict()
        cursor = mongo_collection.find(myquery)
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' bookings!')
        sorted_records = sorted(records,key=lambda t: t['source'])
        print(type(sorted_records))
    return jsonify(sorted_records)

# endpoint to check availability
@app.route("/checkAvailability", methods=["POST"])
def check_availability():
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    user = request.json['user']
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['available']
        print(source)
        print(destination)
        print(date)
        count=validation2(user,source,destination,date)
        if(count>0):
          return jsonify((status.HTTP_401_UNAUTHORIZED))
        
        myquery = {"source": { "$regex": str(source) },"destination": { "$regex": str(destination) },"date": {"$regex": str(date)}}
        cursor = dict()
        cursor = mongo_collection.find(myquery)
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' bookings!')
        sorted_records = sorted(records,key=lambda t: t['source'])
        print(type(sorted_records))
    return jsonify(sorted_records)

# endpoint to update reserved seats in available
@app.route("/saveBookedSeats", methods=["POST"])
def reserve_seats():
    busid = request.json['busid']
    FA = int(request.json['seat1A'])
    FB = int(request.json['seat1B'])
    FC = int(request.json['seat1C'])
    SA = int(request.json['seat2A'])
    SB = int(request.json['seat2B'])
    SC = int(request.json['seat2C'])
    TA = int(request.json['seat3A'])
    TB = int(request.json['seat3B'])
    TC = int(request.json['seat3C'])
    with mongo_client:
        db = mongo_client['Uber']
        try:
            print(SC)
            mongo_collection = db['available']
            mongo_collection.update_one({"_id" : busid},
                {"$set":{"FA": FA, "FB": FB,"FC": FC,"SA": SA, "SB": SB,"SC": SC,"TA": TA, "TB": TB,"TC": TC}},
                upsert=True)
            print("...update_one() bus for reserved seats to mongo acknowledged:")#, result.modified_count)
            return jsonify("successfully updated!")
        except Exception as e:
            print(e)
    return jsonify("successfully updated!")

# endpoint to create new booking
@app.route("/saveBooking", methods=["POST"])
def book_bus():
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    startTime = request.json['startTime']
    endTime = request.json['endTime']
    user = request.json['user']
    busnumber = request.json['busnumber']
    numOfSeats = request.json['numOfSeats']
    totalPrice = request.json['totalPrice']
    
    booking = dict( source=source, destination=destination,busnumber=busnumber,user=user,numOfSeats=numOfSeats,totalPrice=totalPrice,date=date, startTime=startTime,endTime=endTime,bookeddate=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),_id=str(ObjectId()))
    result1=insert_one(booking)
    return jsonify(result1)

# endpoint to create new passenger
@app.route("/savePassengerDetails", methods=["POST"])
def add_passenger():
    bookingID = request.json['bookingID']
    fullname = request.json['fullname']
    gender = request.json['gender']
    passenger = dict(bookingID=bookingID, fullname=fullname, gender=gender,_id=str(ObjectId()))
    insert_one_passenger(passenger)
    return jsonify("saved passenger!!")

# endpoint to create new user
@app.route("/signup", methods=["POST"])
def user_signup():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    dob = request.json['dob']
    contact = request.json['contact']

    howmany = find_user(email)
    howmany2 = find_user1(username)
    if not howmany and not howmany2: 
        user = dict(username=username, password=password, email=email,dob=dob,contact=contact,_id=str(ObjectId()))
        insert_one_user(user)
        return jsonify(user)

    else:
        print('User Name or Email is already registered!!')
        return jsonify(("User with given email ID is already present!!", status.HTTP_401_UNAUTHORIZED))
   
# endpoint to view all the bookings
@app.route("/bookings-results", methods=["POST"])
def get_bookings_results():
    user = request.json['user']
    print("user in bookings:", user)
    global bookings
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['bookings']
        myquery = {"user":"sayali"} #{ "$regex": str(user) }}
        cursor = mongo_collection.find({})
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' bookings!')
        sorted_records = sorted(records,key=lambda t: t['date'])
    return jsonify(sorted_records)

# endpoint to delete the booking
@app.route("/cancelBooking", methods=["POST"])
def cancel_booking():
    bookingid = request.json['bookingid']
    global bookings
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['bookings']
        myquery = {"_id": { "$regex": str(bookingid) }}
        mongo_collection.remove(myquery)
    return jsonify("Booking canceled!")

# endpoint to view all the available seats
@app.route("/availableseats", methods=["POST"])
def get_seats_results():
    busid = request.json['busid']
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['available']
        myquery = {"_id": { "$regex": str(busid) }}
        cursor = mongo_collection.find(myquery)
        records = list(cursor)
        howmany = len(records)
        print('found ' + str(howmany) + ' buses!')
        sorted_records = sorted(records,key=lambda t: t['source'])
    return jsonify(sorted_records)

##################
# Apply from mongo
##################
def applyRecordLevelUpdates():
    return None

def applyCollectionLevelUpdates():
    global bookings
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['available']

        cursor = mongo_collection.find({})
        records = list(cursor)
        #bookings[0] = records[0]
        
        howmany = len(records)
        print('found ' + str(howmany) + ' bookings!')
        sorted_records = sorted(records,key=lambda t: t['source'])
        #return json.dumps({"results": sorted_records })

        for booking in sorted_records:
            bookings[booking['_id']] = booking


################################################
# Mock
################################################
@app.route("/")
def home1(): 
    return """Welcome to online mongo/Uber testing ground!<br />
        <br />
        Run the following endpoints:<br />
        From collection:<br/>
        http://localhost:5000/bookings-results<br />"""

##################
# ADMINISTRATION #
##################

# This runs once before the first single request
# Used to bootstrap our collections
@app.before_first_request
def before_first_request_func():
    applyCollectionLevelUpdates()

# This runs once before any request
@app.before_request
def before_request_func():
    set_env_var()
    applyRecordLevelUpdates()


############################
# INFO on containerization #
############################

# To containerize a flask app:
# https://pythonise.com/series/learning-flask/building-a-flask-app-with-docker-compose

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')