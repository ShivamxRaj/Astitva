# 🕊 Avyakta – आवाज़ उन बेजुबानों की

> “A voice for the unspoken. A tribute to the unknown. A mission with dignity.”

---

## 📌 Project Snapshot

*Avyakta* is a socially driven platform that allows citizens to report *unclaimed dead bodies* in their vicinity — either anonymously or through OTP-verified submissions. It also provides a secure admin panel for officials to view and act upon reports.

---

## 📂 Module-Based Progress (Time-Linked)

| 🕐 Time        | 📁 File                  | 📌 Description                                                                 |
|---------------|--------------------------|--------------------------------------------------------------------------------|
| 01:00 PM      | adminauth.js           | 🔐 Built secure admin authentication system.<br>• JWT-based login<br>• bcrypt for password hashing |
| 02:00 PM      | unclaimedbodyreport.js | 📝 Created public and anonymous report system.<br>• OTP with Twilio API<br>• Anonymous route support<br>• Location captured via Geo API |

---

## ✅ Module Descriptions

### 🔐 adminauth.js – Admin Authentication (1:00 PM)

- JWT-based login system for admin.
- bcrypt hashing for password security.
- Environment-secured keys with dotenv.
- Acts as *gatekeeper* to ensure only verified authorities access sensitive data.

### 📝 unclaimedbodyreport.js – Public Reporting (2:00 PM)

- Twilio OTP system for verified public reports.
- Anonymous report route for users hesitant to reveal identity.
- Captures location data via integrated Geo APIs.
- Prioritizes both *trust* and *empathy* — users can *choose to stay private*.

---

## 🔐 Security Highlights

- Encrypted passwords using bcrypt.
- Authenticated routes protected with JWT.
- No personal data stored unless user chooses to provide.
- All reports stored securely in MongoDB Atlas.

---

## 💡 Why This Approach?

We divided our core features into meaningful, time-boxed modules to ensure quality and focus.

- *1:00 PM* – Admin system to *secure the backend*.
- *2:00 PM* – Public report system to *give voice to the unheard*.

Each line of code was written with the emotion that "हर लाश एक कहानी कहती है, बस उसे सुनने वाला चाहिए।"

---

## 👨‍💻 Contributors

| Name        | Role                            | Contact                   |
|-------------|----------------------------------|---------------------------|
| *Shivam Raj*  | Backend Lead (JWT/Auth + Reports) | raj073032@gmail.com       |
| *Anup Kumar*  | UI/UX & Frontend Integration     | itsheaven62032@gmail.com  |
| *Amit Kumar*  | MongoDB & API Integrations        | amitk306416@gmail.com     |

---

## 🫡 Our Message

> "Avyakta is more than just a codebase —  
> it's our way of giving dignity to those who couldn't ask for it."  

We built this with *urgency, **emotion, and **intention* — every file, every route, every detail matters.

---

## 📄 License

Open-source project.  
Use for *ethical, **non-commercial, and **social good* purposes only.  
Unethical use may lead to legal action.