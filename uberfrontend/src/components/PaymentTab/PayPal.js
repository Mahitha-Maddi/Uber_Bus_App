import React, { useState, useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const [totalPrice, setTotalPrice] = useState('')
  const [numOfSeats, setNumOfSeats] = useState([])
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);


  const saveBookedSeats = () => {
    console.log(localStorage.getItem('selectedBusId'))
    
    const paramdict = {
      'busid' :  localStorage.getItem('selectedBusId'),
      'seat1A': localStorage.getItem('1A'),
      'seat1B': localStorage.getItem('1B'),
      'seat1C': localStorage.getItem('1C'),
      'seat2A': localStorage.getItem('2A'),
      'seat2B': localStorage.getItem('2B'),
      'seat2C': localStorage.getItem('2C'),
      'seat3A': localStorage.getItem('3A'),
      'seat3B': localStorage.getItem('3B'),
      'seat3C': localStorage.getItem('3C')
    }
    console.log("2c: ",localStorage.getItem("2C") )
    alert("2c: "+ localStorage.getItem("2C"))
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("http://localhost:5000/saveBookedSeats", config)
      .then(res => res.json())
      .then(data => {
         alert("Reserved seats!")
      })
  }

  const saveBooking = () => {
    console.log("username: ",localStorage.getItem('username'));

    const paramdict = {
      'busnumber' : localStorage.getItem('BusNum'),
      'user': localStorage.getItem('username'),
      'source': localStorage.getItem('source'),
      'destination': localStorage.getItem('destination'),
      'startTime': localStorage.getItem('startTime'),
      'endTime': localStorage.getItem('endTime'),
      'date': localStorage.getItem('busDate'),
      'numOfSeats': localStorage.getItem('numOfSeats'),
      'totalPrice': localStorage.getItem('totalPrice')
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("http://localhost:5000/saveBooking", config)
      .then(res => res.json())
      .then(data => {
         alert("Booking saved!! "+data);
         localStorage.setItem('bookingID',data)
      })
  }

  const savePassengerDetails = (fullname,gender) => {
    alert("hello passenger");
    const paramdict = {
      'bookingID' : localStorage.getItem('bookingID'),
      'fullname'  : fullname,
      'gender'    : gender
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("http://localhost:5000/savePassengerDetails", config)
      .then(res => res.json())
      .then(data => {
         alert("Saved passenger! " + data);
      })
  }



  useEffect(() => {
    const price = localStorage.getItem('busPrice');
    console.log("price: ", price)
    console.log("local2: ", localStorage.getItem('passengers'));
    //setNumOfSeats(localStorage.getItem('passengers'));
    // console.log("numOfSeats: ",numOfSeats)
    //setTotalPrice(price*numOfSeats); 
    const len = localStorage.getItem('numOfSeats');
    console.log("length: ", len)
    const t = price * len;
    alert(t)
    localStorage.setItem('totalPrice',t);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: t,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          saveBookedSeats();
          saveBooking();
          const passengers=localStorage.getItem('passengers');
          alert(passengers);
          console.log(passengers);
          passengers.map((passenger) => {
          alert(passenger);
          savePassengerDetails(passenger.passengerName,passenger.passengerGender);
          });
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  if (paidFor) {


    return (
      <div>

        <br /><br /><br /><br /><br /><br />
        <h1>Congrats, your booking is successful!</h1>
        {/* <img alt={product.description} src={gif} /> */}
      </div>
    );
  }

  return (
    <div>

      <br /><br /><br /><br /><br /><br />
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      {/* <h1>
        {product.description} for ${product.price}
      </h1> */}
      <div ref={paypal} />
    </div>
  );

  // return (
  //   <div>
  //     <br/><br/><br/><br/>
  //     <div ref={paypal}></div>
  //   </div>
  // );
}
