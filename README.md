# Secure User Management: SQL Injection & XSS

**The same user management app built twice: once with real vulnerabilities, once with them fixed.**

A cybersecurity course project that shows how SQL injection and cross-site scripting (XSS) work in practice, and how to prevent them. The backend exposes vulnerable and secure versions of the same endpoints, and there are two React frontends: one that renders user input unsafely and one that renders it safely.

> ⚠️ For learning purposes only. The vulnerable code is intentional. Run it locally and never deploy the vulnerable version.

---

## What it demonstrates

### SQL injection

|            | Vulnerable endpoint                  | Secure endpoint                  |
| ---------- | ------------------------------------ | -------------------------------- |
| Login      | `POST /aii/sqli/vulnerable-login`    | `POST /aii/sqli/secure-login`    |
| Register   | `POST /aii/sqli/vulnerable-register` | `POST /aii/sqli/secure-register` |
| List users | `GET /aii/sqli/vulnerable-get-all`   | `GET /aii/sqli/secure-get-all`   |

- **Vulnerable:** the SQL query is built by concatenating user input into a string, so input such as `' OR '1'='1` changes the query and bypasses the password check.
- **Secure:** the same query uses parameters (`?` placeholders), so input is always treated as data, never as SQL.

### Cross-site scripting (XSS)

| Frontend                            | Behavior                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `frontend_withVulnerableSqliAndXSS` | Renders user data as raw HTML (`dangerouslySetInnerHTML`), so a name like `<img src=x onerror=alert(1)>` runs as code |
| `frontend_withSecureSqliAndXSS`     | Renders the same data as text through React, which escapes it automatically                                           |

## Security features in the secure version

- **Password hashing** with BCrypt (cost factor 12)
- **Password policy:** minimum 10 characters with uppercase, lowercase, a digit and a special character. Configurable in `PasswordPolicyConfig`.
- **Password history:** the last 3 passwords cannot be reused
- **Account lockout:** after 3 failed logins, the account is locked for 2 minutes
- **Password reset by email:** a reset code is sent with Spring Mail, stored hashed, and expires after 15 minutes
- **Input validation** with Hibernate Validator and Apache Commons Validator
- **Central error handling** with a global exception handler
- **Role-based screens** for admins and end users

## Tech stack

| Area     | Technologies                                                                               |
| -------- | ------------------------------------------------------------------------------------------ |
| Backend  | Java 21, Spring Boot 3, Spring Security, Spring Data JPA, Hibernate Validator, Spring Mail |
| Database | H2 (default, in-memory) or PostgreSQL                                                      |
| Frontend | React 19 (two versions: vulnerable and secure)                                             |
| API docs | Swagger UI (springdoc-openapi)                                                             |
| Build    | Gradle, Docker                                                                             |

## Project structure

```
Cyber_project/
├── Cyber_final_project/                  # Spring Boot backend
│   └── src/main/java/aii/
│       ├── Controller/                   # UserController, AdminController, SQLI_UserController
│       ├── logic/                        # Business logic (hashing, lockout, reset)
│       ├── config/                       # Security, CORS, password policy
│       ├── Utility/                      # Password validator, converters
│       ├── Exceptions/                   # Custom exceptions + global handler
│       └── data/, dal/, Boundary/        # Entities, repositories, DTOs
├── frontend_withSecureSqliAndXSS/        # React app, safe rendering
└── frontend_withVulnerableSqliAndXSS/    # React app, unsafe rendering
```

## Getting started

### Backend

Set the email account used to send reset codes as environment variables (use an app password, not your real password):

```bash
export MAIL_USERNAME=your_email@gmail.com
export MAIL_PASSWORD=your_app_password
```

```bash
cd Cyber_final_project
./gradlew bootRun
```

- API: http://localhost:8081
- Swagger UI: http://localhost:8081/swagger-ui/index.html
- H2 console: http://localhost:8081/h2-console

### Frontend

Run one of the two frontends:

```bash
cd frontend_withSecureSqliAndXSS        # or frontend_withVulnerableSqliAndXSS
npm install
npm start
```

Open http://localhost:3000.

### Try the SQL injection

```bash
# Vulnerable: logs in without the right password
curl -X POST http://localhost:8081/aii/sqli/vulnerable-login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"'"' OR '1'='1"'"}'

# Secure: the same input is rejected
curl -X POST http://localhost:8081/aii/sqli/secure-login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"'"' OR '1'='1"'"}'
```
