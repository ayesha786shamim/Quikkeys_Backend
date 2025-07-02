# Quikkeys Backend

Welcome to the **Quikkeys Backend** repository! This project is the backend service for **Quikkeys**, providing robust functionality with a clean and efficient architecture.

---

## 📝 About

**Quikkeys Backend** is designed to power the backend services of the **Quikkeys** application, which is a typing speed test platform that helps users improve their typing skills. This backend provides an API that interacts with the **Gemini API** to generate dynamic content based on different difficulty levels. It allows the frontend to fetch AI-generated paragraphs for users to type, calculate their typing speed (WPM), accuracy, and track errors.


---

## 🚀 Features

- **Dynamic Content Generation**: Uses the Gemini API to generate content based on user-defined difficulty levels (easy, medium, hard).
- **Express API**: A fast and minimalist web framework for building the backend API.
- **Environment Configuration**: Configuration via environment variables for easy management of API keys and other settings.
- **Content Management**: The backend ensures that the content is delivered in a structured format for the frontend to consume and display.
- **API Error Handling**: Robust error handling to manage issues with external API calls and server-side errors gracefully.

---

## ⚙️ Technologies

- **Node.js**: A JavaScript runtime for building fast, scalable server-side applications.
- **Express**: A minimalist web framework for building APIs.
- **Axios**: A promise-based HTTP client for making API requests to external services.
- **Dotenv**: For loading environment variables from a `.env` file to configure the application.
- **Gemini API**: Used for generating AI-based content for the typing test.

---

