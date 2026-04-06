# 🌸 FemiVerse — AI-Powered Women’s Health Platform

## Status

This project is currently under active development.  
Core features and workflows are implemented, while additional enhancements and optimizations are continuously being added.

---

**FemiVerse** is a privacy-focused, AI-driven web application tailored specifically for women's health. Built with modern web technologies and explainable AI, it offers personalized symptom analysis, conversational health support, and professional report generation—all while putting data privacy and user control at the forefront.

> *“The Future of Women's Health Begins at the Core”*  
> — A vision for accessible, transparent, and inclusive digital healthcare

---

##  Overview

FemiVerse addresses the lack of women-specific digital health tools by delivering:

-  **Conversational Symptom Analysis** via FemiBot (powered by Google Gemini API)  
-  **Medical-Style PDF Reports** with timestamps and disclaimers  
-  **Privacy-First Architecture** (no server-side storage by default)  
-  **Explainable AI** with human-readable reasoning  
-  **Optimized UI** with feminine design and accessibility-first practices  

---

## Tech Stack

### **Frontend**

- **Next.js 15** (App Router)
- **React 18** (Client & Server Components)
- **TypeScript** (Strict typing)
- **Tailwind CSS** + **shadcn/ui** + **Radix UI**
- **Lucide Icons**
- **Custom Typography** (Times New Roman)

### **AI & Backend**

- **Google Gemini API** (Conversational health assistant)
- **AI SDK (@ai-sdk)** (Standardized AI integration)
- **Custom Rule-Based Logic** (For symptom evaluation)
- **Next.js API Routes**
- **jsPDF** (PDF generation)
- **Local Storage** (Zero-backend data flow)

### **Deployment**

- **Hosted on Vercel**

---

##  Core Features

###  FemiBot - AI Chat Interface

- Women's health–focused conversational AI
- Symptom checking with context retention
- Instant and empathetic responses
- Actionable, explainable health guidance

###  PDF Report Generator

- Chat history with medical-style formatting
- Time-stamped records + watermarked branding
- Shareable & downloadable reports
- Built with `jsPDF`

###  Privacy-Centric Architecture

- No server-side data storage
- Local/session-only storage
- API key handled on client-side only
- Users maintain full control of data

###  Health Conditions Covered

Includes support for:

- PCOS
- Endometriosis
- UTIs
- Menstrual Disorders
- Hormonal Imbalance
- Thyroid Issues
- PMDD
- Perimenopause
- Anemia
- Reproductive Health

---

##  App Structure

```plaintext
/ (Landing Page)
├── Hero + Features
├── Mission & Vision
├── Conditions Covered
└── CTA & Footer

/femibot (Main Chat)
├── API Key Setup
├── Chat Interface
└── PDF Generation + Controls
```
---

## 📁 Project Structure
```plaintext
femiverse/
├── app/
│   ├── page.tsx               # Homepage
│   ├── femibot/page.tsx       # Chat Interface
│   ├── privacy/page.tsx       # Privacy Policy
│   ├── api/chat/route.ts      # AI API Endpoint
│   ├── layout.tsx             # App Layout
│   └── globals.css            # Global Styles
├── components/ui/             # Reusable UI components
├── tailwind.config.ts         # Styling config
└── package.json               # Dependencies
```
---

##  Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/fatimahasan-82/FemiVerse.git
cd FemiVerse
```

### 2. Create `.env.local` (Optional for static use)

If needed, configure environment variables or simply input API key in-browser.

### 3. Run the Dev Server

```bash
npm run dev
```

---

##  License

All rights reserved © 2025 [Fatima Hasan](https://github.com/fatimahasan-82).

---

## ✨ Final Note

FemiVerse is a step to revolutionize women’s healthcare through AI, ethics, and empowerment.

---
