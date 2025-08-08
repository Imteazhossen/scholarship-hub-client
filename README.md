# 🎓 Scholarship Management System - Assignment12_category_016

![License](https://img.shields.io/badge/license-MIT-green)  
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)  
![Firebase](https://img.shields.io/badge/Firebase-9.6.1-yellow?logo=firebase)  
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)  
![Node.js](https://img.shields.io/badge/Node.js-18.17.1-green?logo=node.js)

## 🔗 Live Site

👉 [Scholarship Hub Live Site](https://scholarship-hub-a7834.web.app/)

---

## 📘 Project Overview

**Scholarship Management System** is a comprehensive platform built for students to explore and apply for scholarships offered by various universities. The system supports three user roles—**User**, **Moderator**, and **Admin**—with role-specific dashboards and features. The platform includes secure login functionality, scholarship search/filtering, real-time applications, user reviews, moderation tools, and administration panels.

---

## 🚀 Features

### 🔐 Authentication
- Email & Password login (with validation)
- Social login (Google)
- Firebase-based auth system
- Role-based protected routes
- JWT token storage in `localStorage`

### 🏠 Home Page
- Responsive banner with Swiper.js slider (3+ slides)
- Top scholarships section with smart sorting (recent + low application fee)
- Two additional custom sections relevant to the theme

### 🎓 Scholarship Functionality
- View all scholarships
- Search by name, university, and degree
- Scholarship details page (private route)
- Reviews carousel
- Review submission (modal form)

### 💳 Application & Payment
- Payment gateway (Stripe or SSLCommerz)
- Form before payment (with validation)
- After successful payment, data posted to DB
- Sweet alert feedback

### 🧑‍💼 User Dashboard
- My Profile
- My Applications (with edit, cancel, review)
- My Reviews (edit/delete)

### 🧑‍⚖️ Moderator Dashboard
- Profile
- Manage Scholarships (CRUD + modal-based edit)
- Manage Applications (status change, feedback, cancel)
- All Reviews (delete)
- Add Scholarship (image hosted on imgbb)

### 👑 Admin Dashboard
- All Moderator functionalities
- Manage Users (role update, delete, sort/filter)
- Analytics chart (basic data visualization)
- Global Scholarship & Application Management

### 📈 Bonus/Challenge Tasks
- JWT Integration with access protection
- Axios interceptor
- Pagination in All Scholarships
- Sorting/Filtering (based on date, deadline, etc.)
- Analytics chart in Admin Dashboard
- Swiper.js, React Hook Form integration

---

## 📂 Tech Stack

### 🌐 Frontend
- React 18
- React Router DOM
- TanStack Query
- Axios
- Tailwind CSS / DaisyUI
- Swiper.js
- SweetAlert2
- React Hook Form
- Firebase Auth
- Context API
- JWT

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- CORS, Dotenv
- JWT for protected API routes

---

## 🛠️ Installation & Run Locally

1. **Clone the Repositories**

```bash
git clone https://github.com/your-username/client-repo.git
git clone https://github.com/your-username/server-repo.git
