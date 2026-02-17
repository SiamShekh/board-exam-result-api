# 📘 Board Exam Result API

A simple REST API to retrieve Bangladesh board exam results using either **GET** or **POST** methods.

---

## 🚀 Base URL

```
http://localhost:3000/v1
```

---

## 📦 Features

* Supports both `GET` and `POST` requests
* Enum-based validation for:

  * Exam
  * Year
  * Board
* Structured JSON response
* Input validation using Yup
* Clean and extendable architecture

---

## 📥 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SiamShekh/board-exam-result-api.git
cd board-exam-result-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the server

```bash
npm start
```

Server will run at:

```
http://localhost:3000
```

---

## 📡 API Usage

---

## ✅ POST Request

### Endpoint

```
POST /v1
```

### Request Body (JSON)

```json
{
  "registration": "2412735375",
  "roll": "447117",
  "board": "rajshahi",
  "year": "2024",
  "exam": "ssc"
}
```

### Example using curl

```bash
curl -X POST http://localhost:3000/v1 \
  -H "Content-Type: application/json" \
  -d '{
    "registration": "2412735375",
    "roll": "447117",
    "board": "rajshahi",
    "year": "2024",
    "exam": "ssc"
  }'
```

---

## ✅ GET Request

### Endpoint Example

```
http://localhost:3000/v1?registration=2412735375&roll=447117&board=rajshahi&year=2024&exam=ssc
```

### Query Parameters

| Parameter    | Type   | Required | Description                 |
| ------------ | ------ | -------- | --------------------------- |
| registration | string | ✅        | Student registration number |
| roll         | string | ✅        | Student roll number         |
| board        | string | ✅        | Education board             |
| year         | string | ✅        | Passing year                |
| exam         | string | ✅        | Exam type                   |

---

# 🧾 Enum Values

---

## 📘 Exam Enum

Allowed values:

```
ssc
jsc
ssc_voc
hsc
hsc_voc
hsc_hbm
hsc_dic
```

---

## 📅 Year Enum

Allowed range:

```
2010 - 2025
```

---

## 🏫 Board Enum

Allowed values:

```
barisal
chittagong
comilla
dhaka
dinajpur
jessore
mymensingh
rajshahi
sylhet
madrasah
tec
dibs
```

---

# ❌ Validation Errors

If invalid enum values are provided, the API returns structured validation errors:

```json
{
  "error": "Board must be one of: barisal, chittagong, comilla..."
}
```

Examples:

* Invalid `exam`
* Invalid `year`
* Invalid `board`
* Missing `roll`
* Missing `registration`

---

# 🧠 Validation Rules

* `exam` must match one of the allowed exam enums
* `year` must be between 2010–2025
* `board` must match one of the allowed board enums
* `roll` is required
* `registration` is required

---

# 📁 Project Structure

```
├── src/v1
│   ├── routes
│   ├── helper
│   ├── controllers
│   └── index.js
├── package.json
└── README.md
```

---

# 🛠 Tech Stack

* Node.js
* Express.js
* Yup (Validation)
* REST API

---

# 🧪 Testing

You can test using:

* Postman
* curl
* Thunder Client (VS Code)
* Browser (for GET requests)

---

# 👨‍💻 Creator

Developed by: **Md. Siam Sheakh**
GitHub: `https://github.com/SiamShekh/`

---

# 📄 License

This project is licensed under the MIT License.

