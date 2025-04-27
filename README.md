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

### HTTPBin Test (`httpbin-load-test.js`)
- Sends HTTP GET requests to `https://httpbin.test.k6.io/get`
- Sends a custom header: `X-Custom-Header: load-test`
- Validates that:
  - The HTTP status code is `200`
  - The response body contains the correct URL
- Enforces a performance threshold: