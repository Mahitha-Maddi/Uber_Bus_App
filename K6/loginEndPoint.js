import http from 'k6/http';

export default function () {
  var url = 'http://api.yourplatform.com/login';
  var payload = JSON.stringify({
    email: 'johndoe@example.com',
    password: 'PASSWORD',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}


//k6 run --vus 1000 --iterations 10000 script.js

//It is a simple HTTP request, which runs once. 
//By tweaking the command line arguments, you can adjust how many concurrent requests you want to make. 
//This command would create 1000 concurrent sessions (virtual users), 
//and would run this single requests 10 times for each virtual user, hence 10,000 iterations.