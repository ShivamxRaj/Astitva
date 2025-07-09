# 🕊 Avyakta – आवाज़ उन बेजुबानों की

> “A voice for the unspoken. A tribute to the unknown. A mission with dignity.”

---

📌 **Project Snapshot**

Avyakta is a socially driven platform that allows citizens to report unclaimed dead bodies in their vicinity — either anonymously or through OTP-verified submissions. It also provides a secure admin panel for officials to view and act upon reports.

The platform emphasizes empathy, security, and speed to bring peace, identity, and dignity to those who can no longer speak for themselves.

---

🗓 **HackOrbit 2025 – Project Timeline**

### ✅ Day 1: Initialization & Core Setup (8th July 2025)

| ⏰ Time    | 📁 File(s)                | 📌 Description                                                        |
|-----------|--------------------------|----------------------------------------------------------------------|
| 10:00 AM  | home.js                  | 🏠 Designed homepage with intro message, CTA buttons, and responsive layout. |
| 12:00 PM  | footer.js, LoadingScreen.js | ⬇ Created footer section + loading animation component.                |
| 02:00 PM  | languageSwitcher.js, PasswordRecovery.js | 🌐 Implemented language toggle and password reset flow.         |
| 04:00 PM  | SplashLoader.js, StarryBackground.js | ✨ Designed visual splash screen and animated background.         |
| 06:00 PM  | Contact.js, Testimonials.js | 📬 Built contact form and testimonials section.                        |
| 08:00 PM  | EmergencyHelp.js         | 🆘 Floating button for emergency quick calls.                          |

---

### ✅ Day 2: Secure Backend & Feature Integration (9th July 2025)

| 🕒 Time   | 📍 Checkpoint   | 📁 Modules & Features Implemented                                      |
|----------|----------------|------------------------------------------------------------------------|
| 10:00 AM | Reporting Start| Project setup verification and team sync.                               |
| 02:00 PM | Checkpoint 1   | adminauth.js – Secure Admin Auth with JWT, bcrypt<br>unclaimedbodyreport.js – Anonymous + OTP Reporting |
| 04:00 PM | Checkpoint 2   | FloatingActionButton.js, Navbar.js – Emergency UI Button + Navigation Header |
| 06:00 PM | Checkpoint 3   | otp.js – Backend OTP APIs (/send-otp, /verify-otp)                      |
| 09:00 PM | Checkpoint 4   | otpService.js, chat.js – Service Layer for OTP, Initial Chat Route Setup |
| 09:30 PM | Critical Review| UI/UX fixes, security validations, final testing                         |
| 11:30 PM | Hackathon Ends | Final push to GitHub, documentation complete                             |

---

✅ **Module Descriptions**

#### 🔐 adminauth.js – Admin Authentication
- JWT login system for trusted admins.
- bcrypt encryption for passwords.
- .env protected credentials.
- Prevents unauthorized access to sensitive data.

#### 📝 unclaimedbodyreport.js – Public + Anonymous Reporting
- Dual mode: OTP-verified or anonymous.
- OTP using Twilio API, secured backend logic.
- Auto-location capture (Geo API).
- Emotionally impactful UI text for trust.

#### 🆘 FloatingActionButton.js – Emergency Access
- Circular floating button for 1-tap emergency call:
  - Police 🚓
  - Ambulance 🚑
  - Fire Dept 🔥
  - Women & Child Helpline 👧

#### 🌐 Navbar.js – Navigation Header
- Routes: Home, Report Case, About, FAQ, Contact.
- Language toggle: English ↔ Hindi.
- Responsive layout for mobile/desktop.

#### 🔒 otp.js – OTP API Layer
- /send-otp → Generates secure OTP via Twilio.
- /verify-otp → Confirms OTP within expiry.
- Prevents spam entries and adds authenticity.

#### 🧠 otpService.js – OTP Service Layer
- Reusable service logic.
- API-agnostic — pluggable with future providers.
- Abstracted from route for code hygiene.

#### 💬 chat.js – Messaging Route (WIP)
- Initial backend structure for live support chat.
- Will enable admin–reporter conversations.
- Future integration: WebSockets or Firebase.

---

🔐 **Security & Trust Measures**
- OTP verification (public reports only).
- bcrypt hashing + JWT-based login.
- MongoDB Atlas used with secure connections.
- Anonymous route stores no personal data.
- IP protected, but audit-logged (anti-misuse).
- All reports reviewed manually before action.

---

💡 **Thought Behind Avyakta**

> "हर लाश एक कहानी कहती है, बस उसे सुनने वाला चाहिए..."

We built Avyakta with the belief that even the unknown deserve a voice. From emergency access to anonymous reporting, every detail was made with dignity in mind. Each checkpoint was aligned with our mission to merge technology with compassion.

---

🫂 **Contributors**

| Name         | Role                                 | Contact                  |
|--------------|--------------------------------------|--------------------------|
| Shivam Raj   | Backend Lead (JWT/Auth + OTP + Reports) | raj073032@gmail.com      |
| Anup Kumar   | UI/UX & Frontend Integration         | itsheaven62032@gmail.com |
| Amit Kumar   | MongoDB & API Integrations           | amitk306416@gmail.com    |

---

📄 **License**

This is an open-source humanitarian project.
Use it strictly for ethical, non-commercial, and social good purposes.
Any misuse may result in legal consequences.

---

✅ README successfully updated with Day 1 and Day 2 checkpoints, detailed modules, timeline, and security features.