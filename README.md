# Real-Time Chat App with Photo Upload

A simple real-time chat application with photo upload functionality using Cloudinary. This project was built for learning **Socket.io** and includes both frontend and backend implementations.

## 🚀 Technologies Used

### Frontend:

- **React.js**
- **Tailwind CSS**
- **DaisyUI**

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB**
- **Socket.io**
- **Cloudinary** (for image upload)
- **JSON Web Token (JWT)** (for authentication and authorization)

## 📂 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Configure Environment Variables

#### Backend:

Rename the environment files:

```sh
mv .env.sample .env.development.local
mv .env.sample .env.production.local
```

Then, update the `.env.development.local` and `.env.production.local` files with your **MongoDB**, **Cloudinary**, and other necessary configurations.

#### Frontend:

Rename the environment file:

```sh
mv .env.sample .env.local
```

Update `.env.local` with the required credentials.

### 3️⃣ Install Dependencies

#### Backend:

```sh
cd backend
npm install
```

#### Frontend:

```sh
cd frontend
cd fr
npm install
```

### 4️⃣ Start the Application

#### Backend:

```sh
npm run dev
```

> **Note:** If your backend entry file is inside the `src` folder, ensure your `package.json` scripts are correctly set up:
>
> ```json
> "scripts": {
>   "start": "node src/server.js",
>   "dev": "nodemon src/server.js"
> }
> ```
>
> If `npm run dev` doesn't work, try running the backend manually:
>
> ```sh
> node src/server.js
> ```

#### Frontend:

```sh
npm run dev
```

## 📌 Features

- Real-time chat using **Socket.io**
- Send and receive images via **Cloudinary**
- User authentication & authorization using **JWT**
- Responsive UI with **Tailwind CSS** & **DaisyUI**

## 🎯 Future Improvements

- Message reactions
- Typing indicators
- Read receipts

## 📝 License

This project is for learning purposes. Feel free to modify and expand upon it!

---

Happy coding! 🚀

