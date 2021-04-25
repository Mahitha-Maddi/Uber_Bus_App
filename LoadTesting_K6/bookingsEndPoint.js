import http from 'k6/http';

export default function () {
  var url = 'http://a9289cae0d432483f8c38e0e1b766a6e-457666538.us-east-1.elb.amazonaws.com:5000/bookings-results';
  var payload = JSON.stringify({
    user: 'mahitha'
  });

  const paramdict = {
    'user': 'mahitha'
  }
  var params = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paramdict)
  };

  http.post(url, payload, params);
}
//k6 run --vus 1000 --iterations 10000 bookingsEndPoint.js
//It is a simple HTTP request, which runs once. By tweaking the command line arguments, 
//you can adjust how many concurrent requests you want to make. This command would create 1000 concurrent sessions 
//(virtual users), and would run this single requests 10 times for each virtual user, hence 10,000 iterations.


