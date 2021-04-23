import http from "k6/http";

import { sleep } from "k6";

export let options = {
  vus: 150,
  vusMax: 300,
  duration: "10m"
};

export default function() {
  let res = http.get("http://a055472b7c80942c29b7a2a9b74dc1ac-66ab7bd4a80a13bc.elb.us-east-1.amazonaws.com");
  sleep(Math.random() * 2);
};

//k6 run --linger script.js

