import http from "k6/http";

import { sleep } from "k6";

export let options = {
  vus: 80,
  vusMax: 150,
  duration: "5m"
};

export default function() {
  let res = http.get("http://a481fe029773e4ecb900975273d5cbd1-1467533163.us-east-1.elb.amazonaws.com");
  sleep(Math.random() * 2);
};
