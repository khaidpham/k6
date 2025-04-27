import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 }, // ramp up to 10 users
    { duration: '30s', target: 10 }, // stay at 10 users
    { duration: '10s', target: 0 },  // ramp down
  ],
};

export default function () {
  const res = http.get('https://postman-echo.com/get?test=performance');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains args': (r) => r.body.includes('args'),
  });

  sleep(1); // simulate user "think time"
}
