## 🍳 Chef Gusto — AI-Powered Recipe Generator

A modern **TypeScript** adaptation of the original “Chef Claude” project — rebuilt with a cleaner architecture, **AI image generation**, and smarter prompt control.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## **🎯 What It Does**
Chef Gusto is a playful, intelligent recipe assistant that takes a list of ingredients and returns:

- ✅ **AI-generated recipes**
- 🎨 **AI-generated dish images**
- 🧠 **Structured JSON response** for clean rendering
- ⚡ **TypeScript** for reliability and scalability
- 🚀 **Fully deployable to Netlify**

This version re-imagines the earlier **Chef Claude** app (JSX version) by using **TypeScript** for type-safety, improved error-handling, and a more maintainable codebase.

**Live Demo**: [Get Your Recipe From Chef Gusto Here.](https://chef-gusto.netlify.app/)

<br>

## **🧠 How It Works**
Chef Gusto uses a **single AI completion endpoint** to generate:
1. **Sample Structured Recipe Instructions**
   ```json
   {
     "title": "Crispy Lemon Garlic Pasta",
     "ingredients": ["pasta", "garlic", "lemon", "olive oil"],
     "steps": ["Boil pasta...", "..."],
     "cookTime": "20 minutes"
   }

<br>

## 🧩 Tech Stack

| **Category** | **Tech** |
|-------------|----------|
| **Frontend** | ⚛️ React + TypeScript<br>🎨 TailwindCSS<br>🔄 React hooks for state/async calls |
| **AI** | 🔥 Single API endpoint for text/image generation + structured JSON output |
| **Tooling** | 🛠 Vite<br>📦 npm<br>☁️ Netlify for deployment |

---

<br>

## Project Structure

    ```
    chef-gusto/
    │  README.md
    │  index.html
    │  .env
    │  .gitignore
    │
    ├─ src/
    │   ├─ main.tsx
    │   ├─ App.tsx
    │   ├─ api/
    │   │   └─ generateRecipe.ts
    │   ├─ components/
    │   │   └─ RecipeCard.tsx
    │   └─ styles/
    │       └─ globals.css
    │
    └─ public/
    └─ assets/

<br>

## 🔐 Environment Variables
Create a .env file in the project root:

    VITE_AI_API_KEY=your_api_key_here


**Note:** Do not forget to add your .env to a .gitignore file.

<br>

## 🏁 Run Locally
    ```bash
    git clone https://github.com/BlvckKryptonite/chef-gusto
    cd chef-gusto
    npm install
    npm run dev

<br>

## 🚀 Deployment (Netlify)

### **Option 1: Direct Git Deploy**
1. Commit all files to GitHub.  
2. Log into **Netlify**.  
3. Select **“New Site from GitHub.”**  
4. Set build command:  
npm run build
5. Set publish directory:  
dist
6. Add required environment variable:  
VITE_AI_API_KEY

---

### **Option 2: Drag & Drop**
1. Run the production build:
npm run build
2. Drag the **dist/** folder into Netlify’s deploy panel.  
3. Add the environment variable manually afterward.  


<br>

## 🤖 Why TypeScript?
This rewrite uses TypeScript to improve:

- 🔍 Predictable API response types  
- 🐞 Easier debugging  
- 📝 Self-documenting code  
- 🧯 Fewer runtime errors  
- 🧩 Cleaner component interfaces  

---

## ⭐ Tips on choosing an ideal AI model ⭐:
Because this app relies on both text and image generation, it's best to use a single AI provider that offers all essential capabilities under one roof:

- 🧠 Unified text + image generation  
- ✍️ Tight control over prompt formatting  
- 🧱 JSON-structured output  
- ⚡ Fast completions ideal for frontend apps 
- 🔁 Simple, predictable pricing 


This app uses **Lovable’s unified AI API** (for text + image generation) along with **Supabase** (for lightweight data persistence).  
If you ever want to swap providers, here are reliable alternatives that offer similar capabilities:

### 🔥 Recommended AI Models

#### **1. OpenAI GPT-4o / GPT-4.1**
- 🧩 Text + image generation  
- ⚡ Very fast, frontend-friendly  
- 📘 Strong JSON mode  
- ✍️ Excellent prompt control  

#### **2. Anthropic Claude 3.7 Sonnet**
- 🧠 Incredible reasoning + structured output  
- 📦 Great for long, multi-step generations  
- ✍️ Reliable formatting consistency  
- (Image generation requires a second provider)

#### **3. Google Gemini 2.0 Flash / Pro**
- 🖼️ Native image generation  
- ⚡ High-speed responses  
- 📘 Good with JSON schemas  
- 🧩 Solid all-in-one option  

#### **4. Groq LLaMA 3.1 Models (via Groq API)**
- ⚡ Insanely fast text generation  
- 🧠 Good reasoning for recipes/instructions  
- ❗ No native image generation — requires pairing with another API  

---

## 🙌 Credits
**Chef Gusto** is an adaptation of the original [Chef Claude](https://github.com/BlvckKryptonite/chef-claude) project, rebuilt from scratch using:

- TypeScript  
- A unified AI generation system  
- Stronger prompting  
- Modern UI/UX improvements  