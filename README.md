# 🐾 Petlove — Pet Adoption & Care Platform

**Petlove** is a responsive web application designed for pet lovers to browse adoption/lost/found pet notices, read pet care news, connect with partner shelters and veterinary clinics, and manage their own pet profiles.

🔗 **Live Demo:** [https://petlove-app-six.vercel.app](https://petlove-app-six.vercel.app)

---

## ✨ Features

- **Home Page (`/home`):** Hero landing view with responsive typography and imagery.
- **News (`/news`):** Paginated pet care articles with keyword search functionality.
- **Find Pet / Notices (`/notices`):**
  - Advanced filtering by keyword, category (`sell`, `free`, `lost`, `found`), gender, species, and location.
  - Sorting by popularity and price.
  - Detailed notice modal (`ModalNotice`) and favorite management (with authentication prompt modal `ModalAttention` for guests).
- **Our Friends (`/friends`):** Directory of partner shelters and services with working hours, addresses, and contact details.
- **Authentication (`/register`, `/login`):** Form validation powered by `React Hook Form` and `Yup`, persistent sessions, and protected routes.
- **User Profile (`/profile`) & Add Pet (`/add-pet`):**
  - View and edit personal details (`ModalEditUser`).
  - Add personal pets with custom details and remove existing entries.
  - Manage favorited and recently viewed notices.
- **Responsive Design:** Adaptive layout across mobile (`320px`–`375px`), tablet (`768px`), and desktop (`1280px+`) viewports.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router DOM
- **State & Data Fetching:** Redux Toolkit / Axios
- **Forms & Validation:** React Hook Form, Yup
- **Styling:** CSS Modules (Responsive Mobile-First Architecture)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/meryemozkan1/petlove.git](https://github.com/meryemozkan1/petlove.git)
   cd petlove