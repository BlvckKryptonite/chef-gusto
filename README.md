# 🍳 Chef Gusto — AI-Powered Recipe Generator

A modern **TypeScript** adaptation of the original “Chef Claude” project — rebuilt with a cleaner architecture, **AI image generation**, and smarter prompt control.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## **🎯 What It Does**
Chef Gusto is a playful, intelligent recipe assistant that takes a list of ingredients and returns:
✅ **AI-generated recipes**
🎨 **AI-generated dish images**
🧠 **Structured JSON response** for clean rendering
⚡ **TypeScript** for reliability and scalability
🚀 **Fully deployable to Netlify**

This version re-imagines the earlier **Chef Claude** app (JSX version) by using **TypeScript** for type-safety, improved error-handling, and a more maintainable codebase.

---

## **📸 Live Demo**
(Update this after deployment)
👉 [https://your-netlify-site.netlify.app](https://your-netlify-site.netlify.app)

---

## **🧠 How It Works**
Chef Gusto uses a **single AI completion endpoint** to generate:
1. **Structured Recipe Instructions**
   ```json
   {
     "title": "Crispy Lemon Garlic Pasta",
     "ingredients": ["pasta", "garlic", "lemon", "olive oil"],
     "steps": ["Boil pasta...", "..."],
     "cookTime": "20 minutes"
   }

