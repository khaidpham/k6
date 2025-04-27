import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 5 },  // Ramp-up to 5 users
    { duration: '30s', target: 5 },  // Hold at 5 users
    { duration: '15s', target: 0 },  // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests should be < 300ms
  },
};

export default function () {
  const url = 'https://httpbin.test.k6.io/get';
  const headers = { 'X-Custom-Header': 'load-test' };

  const res = http.get(url, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body has URL': (r) => r.body.includes('http://httpbin.test.k6.io/get'),
  });

  sleep(1); // Simulate user think time
}
