# ✅ TaskFlow - Simple Task Manager

TaskFlow is a minimal, intuitive task manager to help you stay organized and productive. Built with Next.js 15, Prisma, PostgreSQL, and Clerk for authentication.

---

## 🚀 Features

- User Authentication with Clerk
- Add, complete, delete tasks
- Task filtering by "Today", "All", and Search
- Optimistic UI updates
- Fully responsive and mobile-friendly design
- Dark theme out of the box
- PostgreSQL database with Prisma ORM

---

## 🛠️ Tech Stack

- **Next.js 15 (App Router, Server Actions, RSC)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Railway or Supabase)**
- **Clerk Authentication**
- **Tailwind CSS**
- **Vercel Deployment**

---

## 📦 Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd taskflow 
```

### 2. Install dependencies

```bash
npm install
```

### Setup ENV

- Create a .env file in the root:
```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
Note: For development, you can use SQLite temporarily by changing schema.prisma.

### Setup Database

```bash
npx prisma generate
npx prisma db push
```

### Run the Project

```bash
npm run dev
```
---

### 🌐 Deployment

 Deployed on Vercel, with PostgreSQL hosted on Railway or Supabase.

### Steps:
- Connect the GitHub repo to Vercel
- Set environment variables in Vercel dashboard
- Connect your PostgreSQL DB
- Done!

---

### License
This Project is licensed under MIT License.

---

### 💡 Future Improvements

- Task due dates & reminders
- Categories or labels
- Drag & drop reordering
- Better mobile UI polish
- Email notifications (optional)

---

### 🧑‍💻 Built with ❤️ by Pratyoosh