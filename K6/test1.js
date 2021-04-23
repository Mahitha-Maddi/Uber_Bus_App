import http from 'k6/http';
import {sleep} from 'k6';

export default function(){
    http.get('http://a30d3605af5834d5598e27dfc2bfc683-986a3c6f0d5b1885.elb.us-east-1.amazonaws.com');
    sleep(1);
}