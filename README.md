# 📈 k6 Load Testing — Postman Echo API

This repository contains a simple **k6** load testing script targeting the [`https://postman-echo.com`](https://postman-echo.com) API, a public HTTP testing service.

## 🧪 Test Scenario

The script (`postman-echo-load-test.js`) performs the following:
- Sends HTTP GET requests to `https://postman-echo.com/get?test=performance`
- Validates that:
  - The HTTP status code is `200`
  - The response body contains the keyword `"args"`
- Simulates "think time" with a 1-second pause between requests
- Uses a staged load pattern:
  - Ramp up to **10 users over 20 seconds**
  - Stay at **10 users for 30 seconds**
  - Ramp down to **0 users over 10 seconds**

## 📂 Project Structure

```plaintext
.
├── postman-echo-load-test.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Install [k6](https://k6.io/docs/getting-started/installation/)

```bash
brew install k6        # macOS
choco install k6       # Windows
sudo apt install k6    # Linux (Debian/Ubuntu)
```

### Running the Test

```bash
k6 run postman-echo-load-test.js
```

👌 You will see a real-time summary of request rate, response times, and success rates in the terminal.

## 📜 Script Overview

Here is the core structure of the test:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://postman-echo.com/get?test=performance');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains args': (r) => r.body.includes('args'),
  });

  sleep(1);
}
```

## 📊 Example CLI Output

```
running (1m0.0s), 0/10 VUs, 583 complete and 0 interrupted iterations
http_reqs..................: 583   9.717/s
http_req_duration...........: avg=102ms  min=78ms  med=95ms  max=220ms
checks......................: 100.00% ✓ 583 ✗ 0
```

## 📌 Useful Resources

- [k6 Documentation](https://k6.io/docs/)
- [Postman Echo Documentation](https://www.postman.com/postman/workspace/published-postman-templates/documentation/631643-8ba4c6b5-abe3-4c84-8e80-29282fc5de4c)

---

# ✨ Future Improvements
- Parameterize `test` query string
- Add load thresholds (e.g., `95% of requests < 200ms`)
- Integrate with k6 Cloud for visualization
- Dockerize the test for CI/CD pipelines

