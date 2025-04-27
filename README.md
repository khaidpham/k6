# 📈 k6 Load Testing — Postman Echo API and HTTPBin API

This repository contains simple **k6** load testing scripts targeting:
- [`https://postman-echo.com`](https://postman-echo.com) (Postman Echo API)
- [`https://httpbin.test.k6.io`](https://httpbin.test.k6.io) (HTTPBin API for testing)

## 🧪 Test Scenarios

### Postman Echo Test (`postman-echo-load-test.js`)
- Sends HTTP GET requests to `https://postman-echo.com/get?test=performance`
- Validates that:
  - The HTTP status code is `200`
  - The response body contains the keyword `"args"`
- Simulates "think time" with a 1-second pause between requests
- Uses a staged load pattern:
  - Ramp up to **10 users over 20 seconds**
  - Stay at **10 users for 30 seconds**
  - Ramp down to **0 users over 10 seconds**

### HTTPBin Basic Test (`httpbin-load-test.js`)
- Sends HTTP GET requests to `https://httpbin.test.k6.io/get`
- Sends a custom header: `X-Custom-Header: load-test`
- Validates that:
  - The HTTP status code is `200`
  - The response body contains the correct URL
- Enforces a performance threshold:
  - 95% of requests must complete under 300ms
- Simulates "think time" with a 1-second pause
- Uses a staged load pattern:
  - Ramp up to **5 users over 15 seconds**
  - Stay at **5 users for 30 seconds**
  - Ramp down to **0 users over 15 seconds**

### HTTPBin Full API Test (`httpbin-full-api-load-test.js`)
- Exercises all major HTTP methods: **GET**, **POST**, **PUT**, **PATCH**, **DELETE**
- Endpoints used:
  - `GET` -> `/get`
  - `POST` -> `/post`
  - `PUT` -> `/put`
  - `PATCH` -> `/patch`
  - `DELETE` -> `/delete`
- Sends JSON payloads for POST, PUT, PATCH
- Validates appropriate response fields and statuses
- Simulates user think time between each request
- Applies thresholds to ensure good performance (95% of requests < 400ms)

## 📂 Project Structure

```plaintext
.
├── postman-echo-load-test.js
├── httpbin-load-test.js
├── httpbin-full-api-load-test.js
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

### Running the Tests

Run the Postman Echo Test:

```bash
k6 run postman-echo-load-test.js
```

Run the HTTPBin Basic Test:

```bash
k6 run httpbin-load-test.js
```

Run the HTTPBin Full API Test:

```bash
k6 run httpbin-full-api-load-test.js
```

👌 You will see a real-time summary of request rate, response times, and success rates in the terminal.

## 📜 Scripts Overview

### postman-echo-load-test.js

- Simple GET request test to Postman Echo
- Verifies status and body content
- Simulates staged user load

### httpbin-load-test.js

- GET request with custom headers
- Validates server response
- Includes threshold for max request duration

### httpbin-full-api-load-test.js

- Complete workflow covering GET, POST, PUT, PATCH, DELETE
- Sends and verifies JSON payloads
- Tests idempotent and non-idempotent operations
- Applies think time to simulate real-world usage

## 📊 Example CLI Output

```
running (1m20.0s), 0/10 VUs, 840 complete and 0 interrupted iterations
http_reqs..................: 4200 52.5/s
http_req_duration...........: avg=180ms  min=70ms  med=150ms  max=320ms
checks......................: 100.00% ✓ 4200 ✗ 0
```

## 📌 Useful Resources

- [k6 Documentation](https://k6.io/docs/)
- [Postman Echo Documentation](https://www.postman.com/postman/workspace/published-postman-templates/documentation/631643-8ba4c6b5-abe3-4c84-8e80-29282fc5de4c)
- [HTTPBin Test Server](https://httpbin.test.k6.io)

---

# ✨ Future Improvements
- Parameterize API query strings and payloads
- Add dynamic data generation for POST and PUT tests
- Group API calls into realistic user scenarios
- Integrate with k6 Cloud for visualization
- Dockerize the tests for CI/CD pipelines
- Add batched requests to simulate concurrent API hits