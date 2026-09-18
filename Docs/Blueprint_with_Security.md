Berikut adalah **Blueprint Lengkap (End-to-End)** untuk membangun **OmniChannel Social Automation & CRM SaaS** yang siap dipasarkan ke industri dengan daya beli tinggi di Indonesia.

---

# 1. Target Industri Paling Membutuhkan di Indonesia

Jangan jual ke "semua orang". Fokus pada industri yang memiliki **biaya per akuisisi pelanggan (Customer Acquisition Cost) tinggi** dan **butuh interaksi personal**:

| Industri | Masalah Utama (Pain Point) | Nilai Jual SaaS Anda |
| :--- | :--- | :--- |
| **Klinik Kecantikan & Gigi** | Pasien sering lupa jadwal (*no-show* tinggi) | Reminder booking otomatis H-1 + Follow-up perawatan berkala (LTV tinggi). |
| **Bimbel, Kursus & EdTech** | Follow-up calon siswa baru lambat & penagihan SPP bulanan manual | Auto-reply info biaya, *drip campaign* info webinar, reminder tagihan via QRIS. |
| **Agen Properti / Sales Mobil** | *Lead* dari iklan Meta/TikTok lambat direspons sales | Form iklan langsung mentrigger chat WA dalam 10 detik + kualifikasi *budget* otomatis. |
| **Brand Fashion / F&B Lokal** | CS kewalahan saat promo; banyak *abandoned cart* | Auto-followup keranjang belanja web, update resi, *broadcast* katalog baru. |

---

# 2. Arsitektur Teknis & Tech Stack (Low Cost / Skalabel)

Anda bisa membangun SaaS ini secara bertahap mulai dari infrastruktur gratis/murah:

```
[ Frontend (Next.js) ] ── (Vercel)
         │
         ▼
[ Backend API & Auth ] ── (Supabase / Node.js)
         │
         ├─── [ Message Queue (Redis / Upstash) ] ── (Mencegah banned & rate limit)
         │                   │
         │                   ▼
         ├─── [ WhatsApp Gateway Engine ] (Meta Cloud API / Baileys Worker)
         │
         └─── [ Payment Gateway ] (Midtrans / Xendit / Mayar untuk QRIS)
```

### Rekomendasi Tech Stack:
* **Frontend Web App:** Next.js (App Router), Tailwind CSS, Shadcn UI (UI modern, ringan, responsif di HP & Desktop).
* **Database & Auth:** **Supabase** (PostgreSQL + Realtime websocket untuk chat live).
* **State & Message Queue:** **Redis via Upstash** (Sangat krusial untuk antrean pesan broadcast agar pengiriman tidak bersamaan/di-ban).
* **Payment Gateway:** **Midtrans** atau **Mayar.id** (Aktivasi instan QRIS dan Virtual Account).
* **2 Koneksi WhatsApp Engine:**
  * *Opsi A (Resmi & Stabil - B2B Mid/Enterprise):* **WhatsApp Business Cloud API (Meta)**. Bebas banned, tetapi pesan template keluar berbayar ke Meta.untuk range paket scale / pro 
  * *Opsi B (Unofficial - Target UMKM/Budget):* Library open-source berbasis QR-scan seperti **Baileys** atau **WPPConnect** yang di-host di VPS murah (seperti Hetzner / DigitalOcean seharga $4–$5/bulan) untuk paket starter dan growth.

---

# Berikut adalah dokumen spesifikasi **Core MVP (Minimum Viable Product)** yang sudah diperbarui, terstruktur, dan siap Anda simpan sebagai file `MVP_SPEC.md` atau `README.md` di proyek Anda:
---

# 📄 AutoChat Hub — Core MVP Specification & Architecture

> **Deskripsi Singkat:**  
> Platform *Social CRM & Conversational Commerce* berbasis WhatsApp Cloud API, Instagram DM, dan Facebook Messenger yang dirancang khusus untuk pasar bisnis di Indonesia (dilengkapi *Multi-Agent Inbox*, *Dynamic QRIS Generator*, dan *AI Auto-Responder*).

---

## 1. Tech Stack (Zero-to-Low Cost)

| Layer | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Framework Fullstack** | **Next.js (App Router) + TypeScript** | Satu repo untuk frontend dashboard & backend API serverless. |
| **UI Library** | **Tailwind CSS + Shadcn UI + Lucide Icons** | Desain modern, cepat, dan 100% responsif mobile-desktop. |
| **Database & Auth** | **Supabase (PostgreSQL)** | Auth instan, storage file media chat, dan *Realtime WebSockets*. |
| **Queue & Rate Limiter** | **Upstash Redis (QStash / Redis)** | Menampung lonjakan webhook Meta & mencegah pemblokiran API. |
| **WhatsApp Engine** | **Meta WhatsApp Cloud API (v21.0+)** | Resmi dari Meta, legal, anti-banned, dan stabil. |
| **Payment Gateway** | **Midtrans / Mayar API** | Pembuatan Dynamic QRIS instan langsung di room chat. |
| **AI LLM Engine** | **Google Gemini 1.5 Flash API / Groq** | Latensi super cepat (< 1 detik) dengan biaya sangat murah / gratis tier awal. |
| **Hosting & Deploy** | **Vercel** | CI/CD otomatis, SSL gratis, dan latency edge server cepat. |

---

## 2. Cakupan Fitur Core MVP (Scope of Work)

```
                     ┌────────────────────────────────────────┐
                     │          AUTOCHAT HUB CORE MVP         │
                     └───────────────────┬────────────────────┘
                                         │
     ┌──────────────────┬────────────────┴─────────────────┬──────────────────┐
     ▼                  ▼                                  ▼                  ▼
[ 1. Webhook Engine ] [ 2. Shared Team Inbox ] [ 3. Conversational CRM ] [ 4. In-Chat QRIS ]
  - Handshake GET       - Realtime Chat List     - Kanban Pipeline Board   - Generate QRIS
  - Message Ingestion   - Multi-Agent Filter     - Contact Tags & Notes    - Auto-Confirm Webhook
  - Status Updates      - AI Quick Reply / FAQ   - Lead Qualification      - Resi & Invoice PDF
```

### Modul 1: Webhook & Messaging Engine
* [x] **Meta Verification Handshake:** Endpoint `GET /api/webhook` untuk verifikasi token Meta.
* [x] **Inbound Message Receiver:** Endpoint `POST /api/webhook` untuk menangkap teks, gambar, dan tombol pesan masuk.
* [x] **Outbound Dispatcher:** Service untuk mengirim pesan balasan teks, template interaktif, dan media via Meta Graph API.
* [x] **Message Status Tracking:** Memperbarui status centang satu (*sent*), centang dua abu-abu (*delivered*), dan centang dua biru (*read*).

### Modul 2: Shared Team Inbox (Realtime)
* [x] **Universal Chat Window:** 1 nomor WhatsApp bisnis dapat diakses banyak staf CS secara bersamaan.
* [x] **Live Message Sync:** Percakapan masuk dan keluar ter‑update *realtime* tanpa perlu refresh halaman (via Supabase Realtime).
* [x] **Assign to Agent:** Fitur menetapkan percakapan ke CS tertentu agar tidak terjadi duplikasi penanganan.
* [x] **Quick Replies:** Template balasan instan untuk pertanyaan umum yang sering ditanyakan pelanggan.

### Modul 3: Conversational CRM & Kanban
* [x] **Visual Sales Pipeline:** Drag‑and‑drop kolom status (`Lead Masuk` ➔ `Follow Up` ➔ `Terkirim Tagihan` ➔ `Deal/Selesai`).
* [x] **Contact Management:** Menyimpan nama pelanggan, nomor WhatsApp, tag kustom (misal: *VIP*, *Belum Bayar*), dan catatan internal.
* [x] **Trigger Otomatis:** Mengirim pesan WhatsApp otomatis saat status prospek digeser ke kolom tertentu.

### Modul 4: In‑Chat Dynamic QRIS Payment
* [x] **Generate QRIS Instan:** CS memasukkan nominal tagihan dan deskripsi barang di samping room chat.
* [x] **Kirim Gambar QRIS Otomatis:** Bot mengirim gambar QRIS dinamis langsung ke nomor WhatsApp pelanggan.
* [x] **Payment Webhook Notification:** Begitu pembeli scan & bayar via BCA/GoPay/OVO/ShopeePay, sistem otomatis mengirim pesan terima kasih + status pesanan langsung berubah ke *Deal/Paid*.

---

## 3. Skema Database Inti (Supabase SQL Schema)

```sql
-- 1. PROFILES (CS & ADMIN)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'agent', -- 'admin' / 'agent'
    is_online BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CONTACTS (LEADS / CUSTOMERS)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wa_id VARCHAR(30) UNIQUE NOT NULL, -- Format: 628123456789
    name VARCHAR(150),
    pipeline_stage VARCHAR(50) DEFAULT 'lead_masuk', -- 'lead_masuk', 'follow_up', 'invoiced', 'won', 'lost'
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    custom_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MESSAGES (CHAT LOGS)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL, -- 'customer', 'agent', 'bot'
    agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'interactive', 'template'
    content TEXT NOT NULL,
    media_url TEXT,
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'failed'
    meta_message_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. INVOICES / ORDERS (QRIS TRANSACTIONS)
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'expired', 'failed'
    qris_url TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. Struktur Folder Proyek (Next.js App Router)

```text
autochat-hub/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── inbox/              # Modul 1 & 2: Chat Live Multi‑Agent
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ChatList.tsx
│   │   │       ├── ChatWindow.tsx
│   │   │       └── QRISModal.tsx
│   │   ├── crm/                # Modul 3: Kanban Pipeline & Kontak
│   │   │   └── page.tsx
│   │   └── settings/           # Pengaturan Token Meta & Payment
│   │       └── page.tsx
│   └── api/
│       ├── webhook/
│       │   └── route.ts        # Endpoint Webhook Meta (GET & POST)
│       ├── payment/
│       │   ├── create-qris/route.ts
│       │   └── webhook/route.ts # Webhook Callback Midtrans/Mayar
│       └── ai/
│           └── copilot/route.ts
├── lib/
│   ├── meta.ts                 # Wrapper Helper Meta Graph API
│   ├── supabase/               # Client & Server Supabase Client
│   └── midtrans.ts             # SDK / API Helper Payment Gateway
├── types/
│   └── index.ts                # TypeScript Interfaces & Types
├── .env.example
├── package.json
└── README.md
```

---

## 5. Environment Variables Configuration (`.env.local`)

```env
# META WHATSAPP CLOUD API
META_APP_ID=1839490223681083
META_APP_SECRET=your_meta_app_secret
META_PHONE_NUMBER_ID=1268965379642170
META_WABA_ID=1425498989462843
META_ACCESS_TOKEN=your_meta_system_user_token
META_WEBHOOK_VERIFY_TOKEN=rahasia_autochat_hub_123

# SUPABASE DATABASE
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# PAYMENT GATEWAY (MIDTRANS / MAYAR)
PAYMENT_SERVER_KEY=your_payment_server_key
PAYMENT_CLIENT_KEY=your_payment_client_key

# AI ENGINE (GEMINI / GROQ)
GEMINI_API_KEY=your_gemini_api_key
```

---

## 6. Target Rilis MVP (Checklist Eksekusi)

- [ ] **Fase 1:** Setup repo Next.js, pasang Tailwind + Shadcn UI, hubungkan ke database Supabase.
- [ ] **Fase 2:** Deploy endpoint `app/api/webhook/route.ts` ke Vercel untuk memverifikasi Webhook di Meta Developer Dashboard.
- [ ] **Fase 3:** Bangun UI Inbox sederhana + uji coba kirim & terima chat WhatsApp secara *realtime*.
- [ ] **Fase 4:** Pasang tombol *Create QRIS* di dalam chat untuk memvalidasi alur pembayaran langsung via WA.
- [ ] **Fase 5:** Pasang filter status Kanban CRM dan uji coba *Lead Assignment*.

---

# 4. Skema Database Sederhana (PostgreSQL / Supabase)

Berikut struktur data penting yang perlu dirancang:

```sql
-- 1. Tabel Kontak / Pelanggan
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id),
    name VARCHAR(255),
    phone_number VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'lead', -- lead, prospect, customer
    custom_fields JSONB, -- menyimpan data seperti: budget, tanggal booking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Pesan Chat (Realtime)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id),
    contact_id UUID REFERENCES contacts(id),
    sender_type VARCHAR(10), -- 'agent', 'bot', 'customer'
    message_text TEXT,
    media_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Automations / Flow
CREATE TABLE automations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id),
    trigger_keyword VARCHAR(100),
    action_payload JSONB, -- alur respon teks, jeda delay, assignment
    is_active BOOLEAN DEFAULT true
);
```

---

# 5. Model Monetisasi & Struktur Harga (Pasar Indonesia)

Pasar Indonesia sangat menyukai penetapan harga bertingkat (*tiered pricing*) bulanan berbasis kemampuan bisnis:

| Paket | Target | Fitur | Rekomendasi Harga |
| :--- | :--- | :--- | :--- |
| **Starter** | Olshop / Bisnis Solo | 1 Nomor, 2 CS Login, Auto‑Reply Dasar, 1.000 pesan/bln | **Rp99.000 / bulan** |
| **Growth** | Klinik, Bimbel, F&B | 1 Nomor, 5 CS, CRM Pipeline, Flow Automation, Integrasi Webhook | **Rp249.000 / bulan** |
| **Scale / Pro** | Properti, Agensi, Brand | Multi‑Nomor, CS Tanpa Batas, AI Chatbot Training, Integrasi API | **Rp599.000 / bulan** |

---

# 6. Strategi Go‑To‑Market (Cara Menjualnya di Awal)

1. **Jual ke 1 Niche Dulu (Contoh: Klinik Kecantikan/Gigi):**
   * Cari 50 akun Instagram klinik kecantikan/gigi di kota sekitar Anda.
   * Hubungi nomor admin mereka: "Halo Dok/Kak, kami punya software yang bisa otomatis kirim reminder jadwal pasien via WA supaya pasien tidak lupa hadir. Mau coba gratis 14 hari?"
2. **Buat Demo Interaktif di Landing Page:**
   * Di web utama SaaS Anda, pasang tombol: "Coba demo chat otomatis kami via WhatsApp (Klik di sini)". Saat calon klien mengklik tombol tersebut, bot WA Anda mendemonstrasikan fiturnya langsung ke nomor mereka.
3. **Kemitraan dengan Digital Marketer / Agency:**
   * Agensi iklan sering pusing karena *lead* yang mereka hasilkan tidak difollow‑up cepat oleh sales klien. Tawarkan bagi hasil komisi (affiliate 20–30%) jika mereka merekomendasikan software Anda ke klien mereka.

   
   Ini adalah langkah yang sangat cerdas. Sebagai pemilik SaaS (Founder/Solo‑Founder), Anda tidak perlu menggaji tim admin, CS, atau tim billing di awal. Kita bangun **Sistem Multi‑AI Agent Swarm** yang bekerja 24/7 di nomor WhatsApp operasional SaaS Anda.

Berikut adalah **Blueprint Lengkap: AI Agent Worker Architecture untuk Pemilik SaaS AutoChat Hub**.
---

# 1. Arsitektur Multi‑Agent Worker (Router Pattern)

Sistem menggunakan **1 Router Agent** (Otak Pengarah) yang menganalisis maksud percakapan pengguna (*intent classification*), lalu secara otomatis mengoper chat tersebut ke **Sub‑Agent Spesialis** yang memiliki akses fungsi (*Tool Calling / Function Calling*):
```
                     [ Calon Klien / Pengguna SaaS Chat di WhatsApp ]
                                            │
                                            ▼
                           [ AI Router & Triage Agent ]
                           (Menganalisis Maksud Pesan)
                                            │
         ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
         ▼                  ▼                               ▼                  ▼
  [ 1. Agent Sales ]  [ 2. Agent Billing ]         [ 3. Agent Helpdesk ] [ 4. Agent IT Support ]
  - Tanya Paket       - Cek Sisa Masa Aktif        - Tutorial Setup Meta - Cek Webhook Error
  - Registrasi Akun   - Perpanjang Langganan (QRIS) - Panduan Dashboard   - Diagnosa API Meta
  - Generate QRIS     - Kirim Invoice PDF          - FAQ Produk          - Eskalasi Darurat
```
---

# 2. Detail Spesifikasi 4 AI Worker Agents & Tools (Function Calling)

### 🤖 Agent 1: "Sales & Onboarding Agent" (Nama: Sarah)
* **Tugas:** Menjawab pertanyaan calon pembeli, menjelaskan paket, mendaftarkan akun baru secara otomatis, dan memberikan link QRIS aktivasi.
* **Kepribadian:** Ramah, persuasif, solutif, to the point.
* **Tools / Functions yang Dimiliki:**
  1. `get_pricing_plans()`: Mengambil daftar harga dan fitur paket (Starter Rp149k, Pro Rp399k).
  2. `register_new_tenant(name, email, phone, plan)`: Membuat akun user baru di Supabase.
  3. `generate_subscription_qris(tenant_id, plan_id)`: Membuat tagihan QRIS otomatis via Midtrans/Mayar.

---

### 💳 Agent 2: "Billing & Subscription Agent" (Nama: Budi)
* **Tugas:** Mengurus perpanjangan langganan, konfirmasi mutasi pembayaran, dan kirim kuitansi resmi via WA.
* **Kepribadian:** Formal, teliti, cepat.
* **Tools / Functions yang Dimiliki:**
  1. `check_subscription_status(phone_number)`: Cek masa aktif akun (misal: "Aktif s/d 25 Oktober").
  2. `create_renewal_invoice(tenant_id)`: Mengirimkan tagihan perpanjangan paket dengan QRIS.
  3. `upgrade_plan(tenant_id, new_plan)`: Menghitung selisih biaya (*prorated*) jika user mau upgrade ke paket lebih tinggi.

---

### 📚 Agent 3: "Product Helpdesk Tier‑1" (Nama: Hana)
* **Tugas:** Membantu user yang kebingungan cara menggunakan dashboard AutoChat Hub, cara daftar token Meta, cara pasang QRIS, dll.
* **Kepribadian:** Sabar, edukatif, memberikan langkah terstruktur (*step‑by‑step*).
* **Tools / Functions yang Dimiliki:**
  1. `search_knowledge_base(query)`: Mencari potongan dokumen panduan PDF/Markdown di Vector Database (RAG) untuk menjawab pertanyaan teknis secara akurat tanpa halusinasi.

---

### 🛠️ Agent 4: "IT Support & Diagnostics Tier‑2" (Nama: Ian)
* **Tugas:** Mendiagnosa kendala sistem pengguna (misal: webhook user merah, pesan WA gagal terkirim, token Meta kedaluwarsa), serta memberikan alert darurat ke HP Founder jika ada *system crash*.
* **Kepribadian:** Teknis, akurat, analitis.
* **Tools / Functions yang Dimiliki:**
  1. `test_tenant_webhook(tenant_id)`: Melakukan tes ping otomatis ke URL webhook user.
  2. `check_meta_token_validity(tenant_id)`: Mengecek apakah access token Meta user masih aktif atau sudah expired.
  3. `escalate_to_founder(issue_summary, urgency_level)`: Mengirimkan notifikasi darurat langsung ke nomor pribadi Anda (Founder) via WhatsApp/Telegram jika masalah tidak bisa diselesaikan bot.

---

# 3. SOP Alur Kerja Otomatis (Tanpa Campur Tangan Founder)

### Contoh Skenario A: Pendaftaran Akun & Bayar Langganan Otomatis
```
User: "Halo, saya mau langganan paket Starter untuk klinik gigi saya."
  ↓
Agent Sales: "Halo Dok! Paket Starter (Rp149.000/bln) sangat cocok untuk klinik gigi. 
Boleh dibantu nama lengkap dan alamat email aktif untuk pembuatan akunnya?"
  ↓
User: "dr. Andika, email: andika@klinik.com"
  ↓
Agent Sales: (Menjalankan Tool `register_new_tenant` & `generate_subscription_qris`)
"Akun dokter sudah berhasil dibuat! Silakan scan QRIS di bawah ini untuk aktivasi instan:"
[ Gambar Dynamic QRIS Rp149.000 terkirim ke chat ]
  ↓
(User Scan & Bayar via BCA/GoPay)
  ↓
Webhook Payment: Mengirim sinyal pembayaran SUKSES ke server
  ↓
Agent Billing: "Pembayaran terverifikasi! 🎉 
Dashboard Anda sudah aktif. 
Link Login: https://autochat.com/login
Email: andika@klinik.com
Password Sementara: andika123
Silakan tonton video panduan 2 menit ini untuk mulai menghubungkan WhatsApp Anda."
```

---

### Contoh Skenario B: User Mengalami Kendala Webhook Error
```
User: "Halo, kenapa bot saya tidak membalas chat pasien ya?"
  ↓
Agent Router: Mengarahkan ke Agent IT Support.
  ↓
Agent IT Support: (Menjalankan Tool `check_meta_token_validity` & `test_tenant_webhook`)
"Halo! Saya sudah melakukan diagnosa pada akun Anda. 
Ditemukan bahwa 'Temporary Access Token' Meta Anda sudah kedaluwarsa (expired).
Solusi: Silakan buka dashboard Meta Developer Anda ➔ Generate Token Baru ➔ Tempel di menu Settings AutoChat Hub.
Apakah butuh panduan bergambar untuk melakukannya?"
```
---

# 4. Implementasi Teknis (Tool Calling dengan Google Gemini / OpenAI)

Berikut implementasi kode backend untuk Agent Router & Tool Executor di Next.js:
```typescript
// app/lib/ai-agents/tools.ts
import { supabaseAdmin } from "@/lib/supabase";
import { createMidtransQRIS } from "@/lib/midtrans";

export const agentTools = [
  {
    name: "registerAndCreateQRIS",
    description: "Mendaftarkan user SaaS baru dan membuat QRIS pembayaran langganan",
    parameters: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING", description: "Nama lengkap user" },
        email: { type: "STRING", description: "Email user" },
        phone: { type: "STRING", description: "Nomor WA user (format 628...)" },
        planName: { type: "STRING", enum: ["starter", "pro", "enterprise"] },
      },
      required: ["name", "email", "phone", "planName"],
    },
  },
  {
    name: "diagnoseUserSystem",
    description: "Mengecek status kesehatan webhook dan token Meta milik user",
    parameters: {
      type: "OBJECT",
      properties: {
        phone: { type: "STRING", description: "Nomor WA user yang komplain" },
      },
      required: ["phone"],
    },
  },
];

// Function Handler yang dieksekusi otomatis oleh AI
export async function executeTool(toolName: string, args: any) {
  if (toolName === "registerAndCreateQRIS") {
    // 1. Simpan ke database Supabase
    const { data: tenant, error } = await supabaseAdmin
      .from("tenants")
      .insert({
        name: args.name,
        email: args.email,
        phone: args.phone,
        plan: args.planName,
        status: "pending_payment",
      })
      .select()
      .single();

    // 2. Generate QRIS via Midtrans
    const amount = args.planName === "starter" ? 149000 : 399000;
    const qrisData = await createMidtransQRIS({
      orderId: `SUB-${tenant.id.slice(0, 8)}`,
      amount: amount,
    });

    return {
      success: true,
      message: "Akun berhasil dibuat. Berikan gambar QRIS dan nominal ke user.",
      qrisImageUrl: qrisData.qr_url,
      amount: amount,
    };
  }

  if (toolName === "diagnoseUserSystem") {
    // Logika diagnosa otomatis
    return {
      status: "token_expired",
      message: "Token Meta kedaluwarsa sejak 2 jam lalu. Minta user generate ulang.",
    };
  }
}
```
---

# 5. Skema Database Tambahan (Untuk Sisi Pemilik SaaS)

Jalankan skema SQL ini di Supabase untuk mengelola data langganan klien Anda:
```sql
-- TABEL TENANTS (Klien/Pelanggan SaaS Anda)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    owner_email VARCHAR(150) UNIQUE NOT NULL,
    owner_phone VARCHAR(30) UNIQUE NOT NULL,
    plan VARCHAR(30) DEFAULT 'starter', -- 'starter', 'pro', 'enterprise'
    status VARCHAR(30) DEFAULT 'trial', -- 'trial', 'active', 'suspended', 'pending_payment'
    subscription_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    meta_phone_number_id VARCHAR(100),
    meta_access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
---

## 7️⃣ Security Architecture & Controls

Berikut **arsitektur keamanan** yang melindungi **chat‑user (WhatsApp)** dan **aplikasi web** secara menyeluruh.

```mermaid
graph TD
    subgraph Frontend[Web Front‑end (Next.js)]
        UI[UI / React] -->|HTTPS| LB[Load‑Balancer (TLS termination)]
    end

    subgraph Backend[Backend (Node.js / Supabase)]
        API[API Routes] -->|JWT / API‑Key| Auth[Auth Service (Supabase Auth)]
        Auth -->|Session JWT| DB[Supabase PostgreSQL]
        API -->|Signed webhook| WA[WhatsApp Cloud Engine]
        API -->|Signed request| PAY[Midtrans / Mayar]
    end

    subgraph Security[Security Layers]
        WAF[Web Application Firewall]
        IDS[Intrusion Detection / Rate‑Limiter]
        Secrets[Secret Manager (env / vault)]
        Audits[Audit Log & SIEM]
        CSP[Content‑Security‑Policy]
    end

    LB -->|TLS 1.3| WAF --> API
    API --> IDS
    IDS -->|Block/Throttle| WA
    IDS --> PAY
    Secrets --> API
    Secrets --> WA
    Secrets --> PAY
    Audits --> API
    Audits --> WA
    Audits --> PAY
    UI -->|CSP| CSP
```

**Poin‑poin kunci keamanan** (detail ada di checklist pada file `Architecture_Clean.md`):
- Token & secret disimpan di Secret Manager, tidak pernah hard‑code.
- Verifikasi HMAC (`X‑Hub‑Signature`, `X‑Midtrans‑Signature`).
- Rate‑limiting via Redis token‑bucket.
- Enkripsi end‑to‑end pada pesan chat (AES‑256).
- Audit log + alert pada signature mismatch.
- CSP & security‑header pada semua respons.
- IP whitelisting untuk endpoint Meta & Midtrans.
---
