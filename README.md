# AutoChat Hub — SaaS Omnichannel Social CRM (v1.0.1)

> **AutoChat Hub** adalah platform *Social CRM & Conversational Commerce* berbasis WhatsApp Cloud API, Instagram DM, dan Facebook Messenger yang dirancang khusus untuk pasar bisnis di Indonesia (dilengkapi *Multi-Agent Inbox*, *Dynamic QRIS Generator*, dan *AI Auto-Responder*).

---

## 🚀 Fitur Utama (v1.0.1)

1. **Shared Team Inbox (Realtime)**: 1 nomor WhatsApp bisnis dapat diakses banyak staf CS secara bersamaan dengan sinkronisasi WebSocket via Supabase.
2. **Conversational CRM & Kanban**: Visual Sales Pipeline (Lead Masuk ➔ Follow Up ➔ Invoiced ➔ Deal/Selesai).
3. **In-Chat Dynamic QRIS Payment**: Pembuatan QRIS instan otomatis di room chat via Midtrans/Mayar.
4. **AI Agent Swarm**: Sistem Multi-AI Agent (Sarah - Sales, Budi - Billing, Hana - Helpdesk, Ian - IT Support) yang berjalan otomatis 24/7.
5. **RAG Knowledge Engine**: Integrasi pgvector untuk pencarian dokumen panduan berbasis AI secara akurat.

---

## 🛠️ Tech Stack

- **Frontend / Backend**: Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI.
- **Database & Auth**: Supabase (PostgreSQL + Realtime).
- **Queue**: Redis via Upstash.
- **Messaging Engine**: Meta WhatsApp Cloud API (v21.0+).
- **Payment Gateway**: Midtrans API.
- **AI Engine**: Google Gemini 1.5 Flash / Groq.

---

## 📦 Quick Start & Deployment

1. Clone repository ini:
   ```bash
   git clone https://github.com/mezzonuts/SaaS-Omnichannel-Social-CRM.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Konfigurasi environment variables berdasarkan `.env.example`.
4. Jalankan development server:
   ```bash
   npm run dev
   ```

---

## 📄 License
MIT License. Dibuat untuk ekosistem bisnis Indonesia yang lebih efisien.
