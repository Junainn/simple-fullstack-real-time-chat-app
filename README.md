# Real-Time Chat App with Photo Upload

A simple real-time chat application with photo upload functionality using Cloudinary. This project was built for learning **Socket.io** and includes both frontend and backend implementations.

---

## 📌 Features

- Real-time chat using **Socket.io**
- Send and receive images via **Cloudinary**
- User authentication & authorization using **JWT**
- Responsive UI with **Tailwind CSS** & **DaisyUI**
- **State management** with **Zustand**
- **HTTP requests** with **Axios**

---

## ✨ Technologies Used

### Frontend:

- **React.js**
- **Tailwind CSS**
- **DaisyUI**
- **Zustand** (state management)
- **Axios** (HTTP requests)

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB**
- **Socket.io**
- **Cloudinary** (for image upload)
- **JSON Web Token (JWT)** (for authentication and authorization)

---

## 📦 Run with Docker

You can run the entire application using Docker (frontend + backend + MongoDB).

### 🐳 Docker Requirements

- Docker
- Docker Compose

### ⚙️ Steps

1. Clone the repository and go to the project root:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Rename the sample environment files and configure them:

   ```bash
   mv backend/.env.development.local.sample backend/.env.development.local
   mv backend/.env.production.local.sample backend/.env.production.local
   mv frontend/fr/.env.sample frontend/.env
   ```

3. Update the `backend/.env.development.local` file:

   - Replace the `DB_URI` with the MongoDB Docker URI provided in the sample:
     ```env
     DB_URI=mongodb://mongo:27017/chatapp
     ```

4. Run everything:

   ```bash
   docker-compose up --build -d
   ```

5. Visit the frontend:

   ```
   http://localhost:5173
   ```

6. Stop the containers:

   ```bash
   docker-compose down
   ```

---

## 🔧 Manual Setup

For development or if you prefer to run without Docker:

### 1⃣ Clone the Repository

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2⃣ Configure Environment Variables

#### Backend:

```sh
mv backend/.env.development.local.sample backend/.env.development.local
mv backend/.env.production.local.sample backend/.env.production.local
```

#### Frontend:

```sh
mv frontend/.env.sample frontend/.env
```

Update `backend/.env.development.local`, `backend/.env.production.local`, and `frontend/.env` with your **MongoDB**, **Cloudinary**, and other necessary credentials.

### 3⃣ Install Dependencies

#### Backend:

```sh
cd backend
npm install
```

#### Frontend:

```sh
cd frontend
npm install
npm install zustand axios
```

### 4⃣ Start the Application

#### Backend:

```sh
npm run dev
```

#### Frontend:

```sh
npm run dev
```

Visit the frontend:

```
http://localhost:5173
```

---


## 🎯 Future Improvements

- Message reactions
- Typing indicators
- Read receipts

---

## 📝 License

This project is for learning purposes. Feel free to modify and expand upon it!

---

Happy coding! 🚀

