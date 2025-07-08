# 🕊 Avyakta – आवाज़ उन बेजुबानों की

> “A voice for the unspoken. A tribute to the unknown. A mission with dignity.”

---

## 📌 Project Snapshot

*Avyakta* is a socially driven platform that allows citizens to report *unclaimed dead bodies* in their vicinity — either anonymously or through OTP-verified submissions. It also provides a secure admin panel for officials to view and act upon reports.

---

## 📂 Module-Based Progress (Time-Linked)

| 🕐 Time        | 📁 File(s)                            | 📌 Description                                                                 |
|---------------|----------------------------------------|--------------------------------------------------------------------------------|
| 01:00 PM      | adminauth.js                         | 🔐 Built secure admin authentication system.<br>• JWT-based login<br>• bcrypt for password hashing |
| 02:00 PM      | unclaimedbodyreport.js               | 📝 Created public and anonymous report system.<br>• OTP with Twilio API<br>• Anonymous route support<br>• Location captured via Geo API |
| 04:00 PM      | FloatingActionButton.js, Navbar.js | 🆘 Added floating emergency contact button.<br>• One-tap call access: Police, Ambulance, Fire, Women & Child Safety<br>📍 Added Navigation Bar with key page routes & language toggle |
| 06:00 PM      | otp.js                               | 🔒 Developed OTP route handler.<br>• /send-otp & /verify-otp endpoints<br>• Connects to service layer securely |
| 08:00 PM      | otpService.js, chat.js             | ✉ Created reusable OTP service layer.<br>• Twilio-integrated logic<br>💬 Initialized chat route for future real-time user–admin communication |

---

## ✅ Module Descriptions

### 🔐 adminauth.js – Admin Authentication (1:00 PM)

- JWT-based login system for admin.
- bcrypt hashing for password security.
- Environment-secured keys with dotenv.
- Acts as *gatekeeper* to ensure only verified authorities access sensitive data.

### 📝 unclaimedbodyreport.js – Public Reporting System (2:00 PM)

- Twilio OTP verification system for trusted reports.
- Alternate *anonymous* submission route for privacy.
- Geo-location auto-captured using integrated APIs.
- Designed to ensure dignity and trust.

### 🆘 FloatingActionButton.js – Emergency Access (4:00 PM)

- Floating circular button for *quick emergency calls*.
- Contacts included:
  - 🚨 Police
  - 🚑 Ambulance
  - 🔥 Fire Brigade
  - 👧 Child Safety
  - 👩 Women Helpline (state-specific)

> “Every second matters — users can now act instantly in emergencies.”

### 🌐 Navbar.js – Page Navigation (4:00 PM)

- Clean navigation bar with links to:
  - Home
  - Report Case
  - Team
  - About Us
  - FAQ
  - Contact Us
  - Login / Register
  - Hindi / English switch toggle

> “Because accessibility is part of empathy.”

### 🔒 otp.js – OTP API Routes (6:00 PM)

- /send-otp & /verify-otp routes handled via Express.
- Modular structure with validation support.
- Connects securely to backend logic layer.

### ✉ otpService.js – OTP Logic Layer (8:00 PM)

- Twilio-based logic centralized here.
- OTP send/verify flow extracted from route to service.
- Keeps codebase clean and testable.

### 💬 chat.js – Real-Time Communication Route (8:00 PM)

- Route skeleton created for future *user-admin messaging*.
- Intended for live case follow-ups and queries.
- To be powered by WebSockets or Firebase in later stages.

---

## 🔐 Security Highlights

- Passwords secured with bcrypt.
- JWT-protected routes and tokens.
- OTP system built with validation + expiry.
- MongoDB Atlas secured for data handling.

---

## 💡 Why This Approach?

We structured our code into *checkpoint-wise functional blocks*, combining technical logic with emotional responsibility.

- *1:00 PM* – Admin system to *safeguard backend*  
- *2:00 PM* – Public report flow to *empower citizens*  
- *4:00 PM* – Instant help button & UI navigation for *emergency action*  
- *6:00 PM* – OTP APIs to *ensure verified communication*  
- *8:00 PM* – Chat & service layers for *future interactivity*

> “हर लाश एक कहानी कहती है, बस उसे सुनने वाला चाहिए।”

---

## 👨‍💻 Contributors

| Name           | Role                                  | Contact                   |
|----------------|----------------------------------------|---------------------------|
| *Shivam Raj* | Backend Lead (JWT/Auth + OTP + Reports) | raj073032@gmail.com       |
| *Anup Kumar* | UI/UX & Frontend Integration           | itsheaven62032@gmail.com  |
| *Amit Kumar* | MongoDB & API Integrations             | amitk306416@gmail.com     |

---

## 🫡 Our Message

> “Avyakta is not just a project. It's a silent shout for those who couldn't speak for themselves.”  
> We built this not for competition — but for *contribution*.  
> Every file, every icon, every API — it all tells a story.

---

## 📄 License

This is an *open-source humanitarian project*.  
Use it strictly for *ethical, **non-commercial, and **social-good* purposes.  
Any misuse may result in legal consequences.