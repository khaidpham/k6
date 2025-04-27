import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 }, // Ramp-up
    { duration: '40s', target: 10 }, // Hold
    { duration: '20s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'], // 95% under 400ms
  },
};

export default function () {
  const baseUrl = 'https://httpbin.test.k6.io';
  const headers = { 'Content-Type': 'application/json' };
  const payload = JSON.stringify({ name: 'k6-test', email: 'test@example.com' });

  // 1. GET Request
  const getRes = http.get(`${baseUrl}/get`);
  check(getRes, {
    'GET status 200': (r) => r.status === 200,
    'GET response contains URL': (r) => r.body.includes('/get'),
  });
  sleep(1);

  // 2. POST Request
  const postRes = http.post(`${baseUrl}/post`, payload, { headers });
  check(postRes, {
    'POST status 200': (r) => r.status === 200,
    'POST response has JSON': (r) => JSON.parse(r.body).json.name === 'k6-test',
  });
  sleep(1);

  // 3. PUT Request
  const putRes = http.put(`${baseUrl}/put`, payload, { headers });
  check(putRes, {
    'PUT status 200': (r) => r.status === 200,
    'PUT response has email': (r) => JSON.parse(r.body).json.email === 'test@example.com',
  });
  sleep(1);

  // 4. PATCH Request
  const patchPayload = JSON.stringify({ name: 'k6-updated' });
  const patchRes = http.patch(`${baseUrl}/patch`, patchPayload, { headers });
  check(patchRes, {
    'PATCH status 200': (r) => r.status === 200,
    'PATCH response has updated name': (r) => JSON.parse(r.body).json.name === 'k6-updated',
  });
  sleep(1);

  // 5. DELETE Request
  const deleteRes = http.del(`${baseUrl}/delete`);
  check(deleteRes, {
    'DELETE status 200': (r) => r.status === 200,
    'DELETE response contains URL': (r) => r.body.includes('/delete'),
  });

  sleep(1); // Final sleep to simulate user
}
