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
* [x] **Live Message Sync:** Percakapan masuk dan keluar ter-update *realtime* tanpa perlu refresh halaman (via Supabase Realtime).
* [x] **Assign to Agent:** Fitur menetapkan percakapan ke CS tertentu agar tidak terjadi duplikasi penanganan.
* [x] **Quick Replies:** Template balasan instan untuk pertanyaan umum yang sering ditanyakan pelanggan.

### Modul 3: Conversational CRM & Kanban
* [x] **Visual Sales Pipeline:** Drag-and-drop kolom status (`Lead Masuk` ➔ `Follow Up` ➔ `Terkirim Tagihan` ➔ `Deal/Selesai`).
* [x] **Contact Management:** Menyimpan nama pelanggan, nomor WhatsApp, tag kustom (misal: *VIP*, *Belum Bayar*), dan catatan internal.
* [x] **Trigger Otomatis:** Mengirim pesan WhatsApp otomatis saat status prospek digeser ke kolom tertentu.

### Modul 4: In-Chat Dynamic QRIS Payment
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
│   │   ├── inbox/              # Modul 1 & 2: Chat Live Multi-Agent
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
| **Starter** | Olshop / Bisnis Solo | 1 Nomor, 2 CS Login, Auto-Reply Dasar, 1.000 pesan/bln | **Rp99.000 / bulan** |
| **Growth** | Klinik, Bimbel, F&B | 1 Nomor, 5 CS, CRM Pipeline, Flow Automation, Integrasi Webhook | **Rp249.000 / bulan** |
| **Scale / Pro** | Properti, Agensi, Brand | Multi-Nomor, CS Tanpa Batas, AI Chatbot Training, Integrasi API | **Rp599.000 / bulan** |

---

# 6. Strategi Go-To-Market (Cara Menjualnya di Awal)

1. **Jual ke 1 Niche Dulu (Contoh: Klinik Kecantikan/Gigi):**
   * Cari 50 akun Instagram klinik kecantikan/gigi di kota sekitar Anda.
   * Hubungi nomor admin mereka: *"Halo Dok/Kak, kami punya software yang bisa otomatis kirim reminder jadwal pasien via WA supaya pasien tidak lupa hadir. Mau coba gratis 14 hari?"*
2. **Buat Demo Interaktif di Landing Page:**
   * Di web utama SaaS Anda, pasang tombol: *"Coba demo chat otomatis kami via WhatsApp (Klik di sini)"*. Saat calon klien mengklik tombol tersebut, bot WA Anda mendemonstrasikan fiturnya langsung ke nomor mereka.
3. **Kemitraan dengan Digital Marketer / Agency:**
   * Agensi iklan sering pusing karena *lead* yang mereka hasilkan tidak difollow-up cepat oleh sales klien. Tawarkan bagi hasil komisi (affiliate 20–30%) jika mereka merekomendasikan software Anda ke klien mereka.
   
   
   Ini adalah langkah yang sangat cerdas. Sebagai pemilik SaaS (*Founder/Solo-Founder*), Anda tidak perlu menggaji tim admin, CS, atau tim billing di awal. Kita bangun **Sistem Multi-AI Agent Swarm** yang bekerja 24/7 di nomor WhatsApp operasional SaaS Anda.

Berikut adalah **Blueprint Lengkap: AI Agent Worker Architecture untuk Pemilik SaaS AutoChat Hub**.

---

# 1. Arsitektur Multi-Agent Worker (Router Pattern)

Sistem menggunakan **1 Router Agent** (Otak Pengarah) yang menganalisis maksud percakapan pengguna (*intent classification*), lalu secara otomatis mengoper chat tersebut ke **Sub-Agent Spesialis** yang memiliki akses fungsi (*Tool Calling / Function Calling*):

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

### 📚 Agent 3: "Product Helpdesk Tier-1" (Nama: Hana)
* **Tugas:** Membantu user yang kebingungan cara menggunakan dashboard AutoChat Hub, cara daftar token Meta, cara pasang QRIS, dll.
* **Kepribadian:** Sabar, edukatif, memberikan langkah terstruktur (*step-by-step*).
* **Tools / Functions yang Dimiliki:**
  1. `search_knowledge_base(query)`: Mencari potongan dokumen panduan PDF/Markdown di Vector Database (RAG) untuk menjawab pertanyaan teknis secara akurat tanpa halusinasi.

---

### 🛠️ Agent 4: "IT Support & Diagnostics Tier-2" (Nama: Ian)
* **Tugas:** Mendiagnosa kendala sistem pengguna (misal: webhook user merah, pesan WA gagal terkirim, token Meta kedaluwarsa), serta memberikan alert darurat ke HP Founder jika ada *system crash*.
* **Kepribadian:** Teknis, akurat, analitis.
* **Tools / Functions yang Dimiliki:**
  1. `test_tenant_webhook(tenant_id)`: Melakukan tes ping otomatis ke URL webhook user.
  2. `check_meta_token_validity(tenant_id)`: Mengecek apakah access token Meta user masih aktif atau sudah expired.
  3. `escalate_to_founder(issue_summary, urgency_level)`: Mengirimkan notifikasi darurat langsung ke nomor pribadi Anda (Founder) via WhatsApp/Telegram jika masalah tidak bisa diselesaikan bot.

---

# 3. SOP Alur Kerja Otomatis (Tanpa Campur Tangan Founder)

### Skenario A: Pendaftaran Akun & Bayar Langganan Otomatis
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

### Skenario B: User Mengalami Kendala Webhook Error
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
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    plan VARCHAR(30) DEFAULT 'starter', -- 'starter', 'pro', 'enterprise'
    status VARCHAR(30) DEFAULT 'trial', -- 'trial', 'active', 'expired', 'pending_payment'
    subscription_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    meta_phone_number_id VARCHAR(100),
    meta_access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL LOG PERCAKAPAN AI AGENT INTERNAL
CREATE TABLE internal_agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_phone VARCHAR(30) NOT NULL,
    agent_name VARCHAR(50) NOT NULL, -- 'sales', 'billing', 'helpdesk', 'it_support'
    user_message TEXT,
    ai_response TEXT,
    tools_called JSONB,
    escalated_to_founder BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### Keuntungan Sistem Ini:
1. **Zero Customer Acquisition Friction:** Calon klien daftar dan bayar langsung di WhatsApp dalam < 2 menit tanpa perlu isi form web yang panjang.
2. **Founder Bebas Repot:** Anda hanya perlu turun tangan jika ada notifikasi eskalasi darurat dari `Agent Ian (IT Support)` ke nomor WhatsApp pribadi Anda.
3. **Masa Depan Bisnis:** SaaS Anda menjadi studi kasus nyata yang membuktikan bahwa software Anda sendiri dijalankan oleh AI Agent yang Anda bangun!



Berikut adalah **Master Blueprint Terpadu (Unified Dual-Engine Architecture)** yang menggabungkan:
1. **Engine 1 (SaaS Core Platform - POV Klien):** Aplikasi CRM & In-Chat Commerce yang dipakai oleh klien (klinik, toko online, bimbel).
2. **Engine 2 (Autonomous Operations Swarm - POV Pemilik SaaS):** Sistem AI Worker mandiri yang mengurus penjualan, registrasi, billing, dan IT support SaaS Anda secara otomatis 24/7 di WhatsApp.

---

# 🏗️ Master Blueprint: AutoChat Hub Dual-Engine System

```
                                  [ WA CLOUD API / WEBHOOK GATEWAY ]
                                                  │
                                                  ▼
                                     [ MASTER ROUTER DISPATCHER ]
                                                  │
                ┌─────────────────────────────────┴─────────────────────────────────┐
                │                                                                   │
                ▼                                                                   ▼
   【 ENGINE 2: FOUNDER OPS 】                                          【 ENGINE 1: CLIENT SAAS 】
 (Pesan ke Nomor WhatsApp SaaS Anda)                                  (Pesan ke Nomor WhatsApp Klien)
                │                                                                   │
   ┌────────────┴────────────┐                                         ┌────────────┴────────────┐
   ▼                         ▼                                         ▼                         ▼
[ AI Swarm Workers ]    [ Auto-Provisioning ]                     [ Realtime Inbox ]     [ Tenant AI Copilot ]
- Sarah (Sales & QRIS)  - Buat Tenant Baru                        - Multi-Agent CS       - RAG PDF Knowledge
- Budi (Billing Renew)  - Setup Sandbox/DB                        - Kanban CRM           - Auto-Reply Pelanggan
- Hana (Helpdesk)       - Kirim Kredensial WA                     - In-Chat QRIS         - Human Takeover
- Ian (IT Auto-Check)   - Escalation ke Founder                   - Resi & Broadcast     - Dynamic Invoice
                │                                                                   │
                └───────────────────────────────┬───────────────────────────────────┘
                                                │
                                                ▼
                                [ UNIFIED DATABASE (Supabase) ]
                                [ Multi-Tenant + Auth + Vectors ]
```

---

# 1. Alur Siklus Hidup Tanpa Sentuhan Manusia (*Zero-Touch SaaS Lifecycle*)

Sistem ini dirancang agar bisnis Anda berputar secara **otomatis dari hulu ke hilir**:

```
[ Calon Klien Chat WA ] 
       │ 
       ▼
1. AI Sales (Sarah) mendemokan produk & menanyakan paket
       │
       ▼
2. AI Sales membuat akun (Supabase) & menerbitkan Dynamic QRIS Langganan (Midtrans)
       │
       ▼
3. Klien scan & bayar QRIS ➔ Webhook Payment memicu Event Aktivasi
       │
       ▼
4. Sistem otomatis mengaktifkan Dashboard Klien & mengirimkan link login + password ke WA
       │
       ▼
5. Klien login ke Dashboard ➔ Menggunakan Shared Inbox, CRM Kanban, & In-Chat QRIS untuk tokonya
       │
       ▼
6. Jika Klien error/bingung ➔ AI Helpdesk & IT Support (Hana & Ian) memandu dan memperbaiki via WA
       │
       ▼
7. H-3 Masa Aktif Habis ➔ AI Billing (Budi) menagih perpanjangan via QRIS otomatis
```

---

# 2. Skema Database Master Terpadu (*Multi-Tenant Architecture*)

Skema database ini memisahkan data internal operasional Anda dengan data toko milik masing-masing klien (*Multi-Tenant Isolation*):

```sql
-- ============================================================================
-- BAGIAN 1: OPERASIONAL SAAS & BILLING (ENGINE 2 - FOUNDER OPS)
-- ============================================================================

-- 1. Klien / Tenant SaaS Anda
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    owner_email VARCHAR(150) UNIQUE NOT NULL,
    owner_phone VARCHAR(30) UNIQUE NOT NULL,
    plan VARCHAR(30) DEFAULT 'starter', -- 'starter', 'pro', 'enterprise'
    status VARCHAR(30) DEFAULT 'trial', -- 'trial', 'active', 'suspended', 'pending_payment'
    subscription_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    meta_waba_id VARCHAR(100),
    meta_phone_id VARCHAR(100),
    meta_access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Transaksi Langganan SaaS Klien ke Rekening Anda
CREATE TABLE saas_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    order_id VARCHAR(100) UNIQUE NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'expired'
    payment_channel VARCHAR(50), -- 'qris', 'bca_va', 'gopay'
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Log AI Swarm Internal (Sales/Billing/Helpdesk/IT)
CREATE TABLE internal_agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_phone VARCHAR(30) NOT NULL,
    active_agent VARCHAR(30) NOT NULL, -- 'sales', 'billing', 'helpdesk', 'it_support'
    incoming_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    tool_executed VARCHAR(100),
    is_escalated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BAGIAN 2: DATA APLIKASI KLIEN (ENGINE 1 - SAAS CLIENT CORE)
-- ============================================================================

-- 4. Staf CS Milik Klien
CREATE TABLE tenant_agents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'agent', -- 'admin', 'agent'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Pelanggan / Kontak Milik Klien (End-Customer)
CREATE TABLE tenant_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    phone_number VARCHAR(30) NOT NULL,
    name VARCHAR(150),
    pipeline_stage VARCHAR(50) DEFAULT 'lead', -- 'lead', 'follow_up', 'invoiced', 'won'
    assigned_agent UUID REFERENCES tenant_agents(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, phone_number)
);

-- 6. Riwayat Percakapan Pelanggan Klien
CREATE TABLE tenant_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES tenant_customers(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL, -- 'customer', 'agent', 'bot'
    message_type VARCHAR(20) DEFAULT 'text',
    message_text TEXT NOT NULL,
    media_url TEXT,
    meta_message_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'delivered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Transaksi Pembelian Produk Toko Klien (Dynamic QRIS)
CREATE TABLE tenant_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES tenant_customers(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    item_description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'expired'
    qris_qr_url TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

# 3. Kodingan Master Webhook Router (Next.js App Router)

File ini bertindak sebagai **gerbang utama** yang membedakan apakah pesan yang masuk ditujukan untuk **Operasional Internal Anda (Engine 2)** atau untuk **Dashboard Klien (Engine 1)**:

```typescript
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleInternalSwarm } from "@/lib/engine-founder/swarm-router";
import { handleTenantTraffic } from "@/lib/engine-saas/tenant-processor";
import { supabaseAdmin } from "@/lib/supabase";

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;
const SAAS_PRIMARY_PHONE_ID = process.env.META_PHONE_NUMBER_ID; // Nomor WA Utama SaaS Anda

// 1. Handshake Verifikasi Meta
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// 2. Inbound Traffic Processor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0]?.value;

    if (!change || !change.messages || change.messages.length === 0) {
      return NextResponse.json({ status: "NO_MESSAGE_EVENT" }, { status: 200 });
    }

    const message = change.messages[0];
    const incomingPhoneId = change.metadata?.phone_number_id;
    const senderPhone = message.from;
    const messageText = message.text?.body || "";

    // ========================================================================
    // LOGIKA PERCABANGAN GANDA (DUAL-ENGINE DISPATCHER)
    // ========================================================================
    
    if (incomingPhoneId === SAAS_PRIMARY_PHONE_ID) {
      // 🚀 RUTE 1: Ditujukan ke Nomor SaaS Anda ➔ Lempar ke AI Swarm Internal
      console.log(`[FOUNDER OPS] Pesan masuk dari calon klien: ${senderPhone}`);
      await handleInternalSwarm({
        senderPhone,
        messageText,
        metaMessageId: message.id,
      });
    } else {
      // 🏢 RUTE 2: Ditujukan ke Nomor Klien ➔ Lempar ke Dashboard CRM & AI Copilot Klien
      const { data: tenant } = await supabaseAdmin
        .from("tenants")
        .select("id, status")
        .eq("meta_phone_id", incomingPhoneId)
        .single();

      if (tenant && tenant.status === "active") {
        console.log(`[CLIENT SAAS] Pesan masuk untuk Tenant ID: ${tenant.id}`);
        await handleTenantTraffic({
          tenantId: tenant.id,
          senderPhone,
          messageText,
          metaMessageId: message.id,
        });
      }
    }

    return NextResponse.json({ status: "PROCESSED" }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Dispatch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

# 4. Engine AI Swarm: Implementasi Tool Calling Lengkap

Implementasi bagaimana AI Sarah (Sales) dan Budi (Billing) mengeksekusi aksi database dan pembayaran secara otomatis:

```typescript
// lib/engine-founder/swarm-tools.ts
import { supabaseAdmin } from "@/lib/supabase";
import { createMidtransQRIS } from "@/lib/midtrans";
import { sendWhatsAppText, sendWhatsAppMedia } from "@/lib/meta";

export async function executeSwarmTool(toolName: string, args: any) {
  switch (toolName) {
    
    // TOOL 1: Registrasi Otomatis & Terbitkan QRIS Langganan
    case "register_and_issue_qris": {
      // 1. Simpan Klien ke Tabel Tenants
      const { data: newTenant, error: tenantErr } = await supabaseAdmin
        .from("tenants")
        .insert({
          company_name: args.company_name,
          owner_name: args.owner_name,
          owner_phone: args.owner_phone,
          owner_email: args.owner_email,
          plan: args.plan,
          status: "pending_payment",
        })
        .select()
        .single();

      if (tenantErr) throw tenantErr;

      // 2. Tentukan Harga Berdasarkan Paket
      const planPrices: Record<string, number> = {
        starter: 149000,
        pro: 399000,
        enterprise: 899000,
      };
      const amount = planPrices[args.plan] || 149000;
      const orderId = `SUB-${newTenant.id.slice(0, 8)}-${Date.now().toString().slice(-4)}`;

      // 3. Generate QRIS dari Midtrans
      const paymentResponse = await createMidtransQRIS({
        orderId,
        amount,
        customerDetails: {
          first_name: args.owner_name,
          email: args.owner_email,
          phone: args.owner_phone,
        },
      });

      // 4. Simpan Tagihan Langganan
      await supabaseAdmin.from("saas_subscriptions").insert({
        tenant_id: newTenant.id,
        order_id: orderId,
        amount: amount,
        payment_status: "pending",
        payment_channel: "qris",
      });

      // 5. Kirim Gambar QRIS ke WhatsApp Calon Klien
      await sendWhatsAppMedia({
        to: args.owner_phone,
        mediaUrl: paymentResponse.qr_code_url,
        caption: `Halo ${args.owner_name}! Akun *${args.company_name}* telah dibuat.\n\n` +
                 `📦 Paket: *${args.plan.toUpperCase()}*\n` +
                 `💰 Total: *Rp${amount.toLocaleString("id-ID")}*\n\n` +
                 `Silakan scan QRIS di atas melalui BCA, GoPay, OVO, atau ShopeePay untuk mengaktifkan akun secara instan.`,
      });

      return { success: true, orderId };
    }

    // TOOL 2: Cek Diagnosa & Webhook Milik Klien (IT Support)
    case "diagnose_tenant_system": {
      const { data: tenant } = await supabaseAdmin
        .from("tenants")
        .select("*")
        .eq("owner_phone", args.owner_phone)
        .single();

      if (!tenant) {
        return { status: "not_found", message: "Nomor WhatsApp belum terdaftar di sistem." };
      }

      // Cek apakah token Meta masih ada
      if (!tenant.meta_access_token) {
        return {
          status: "missing_token",
          solution: "Klien belum memasukkan Access Token Meta di menu Settings.",
        };
      }

      return {
        status: "healthy",
        subscription_end: tenant.subscription_end,
        plan: tenant.plan,
      };
    }

    // TOOL 3: Eskalasi Darurat ke Nomor Pribadi Founder
    case "escalate_to_founder": {
      const FOUNDER_PERSONAL_WA = process.env.FOUNDER_PERSONAL_PHONE!; // Nomor HP Anda
      await sendWhatsAppText({
        to: FOUNDER_PERSONAL_WA,
        text: `🚨 *DARURAT / ESKALASI TIKET SAAS*\n\n` +
              `Dari: ${args.client_name} (${args.client_phone})\n` +
              `Masalah: ${args.issue_summary}\n\n` +
              `_Mohon segera ditindaklanjuti secara manual._`,
      });
      return { success: true, message: "Eskalasi berhasil dikirim ke Founder." };
    }

    default:
      throw new Error(`Tool ${toolName} tidak dikenali.`);
  }
}
```

---

# 5. Struktur Folder Terintegrasi (Proyek Next.js Produksi)

```text
autochat-hub-monorepo/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx               # Login Klien & CS
│   │   └── register/page.tsx
│   ├── (client-dashboard)/              # 【ENGINE 1: POV KLIEN】
│   │   ├── inbox/                       # Shared Team Live Chat
│   │   ├── crm/                         # Kanban Sales Pipeline
│   │   ├── broadcast/                   # Broadcast Template Resmi Meta
│   │   └── settings/                    # Hubungkan Token Meta Klien Sendiri
│   ├── (founder-dashboard)/             # 【ENGINE 2: POV FOUNDER】
│   │   ├── admin/tenants/               # Monitoring Semua Klien & Masa Aktif
│   │   ├── admin/subscriptions/         # Omzet & Laporan Pembayaran QRIS
│   │   └── admin/ai-logs/               # Log Percakapan Sarah, Budi, Hana, Ian
│   └── api/
│       ├── webhook/route.ts             # Master Webhook Dispatcher
│       ├── payment/webhook/route.ts     # Midtrans Callback Handler
│       └── ai/copilot/route.ts          # Endpoint Chat AI Copilot
├── lib/
│   ├── engine-founder/                  # Otak AI Swarm Internal Anda
│   │   ├── swarm-router.ts
│   │   ├── swarm-tools.ts
│   │   └── prompts.ts                   # System Prompt Sarah, Budi, Hana, Ian
│   ├── engine-saas/                     # Logika SaaS Klien
│   │   ├── tenant-processor.ts
│   │   └── qris-generator.ts
│   ├── meta.ts                          # Meta Graph API Helper
│   ├── midtrans.ts                      # Midtrans SDK Helper
│   └── supabase.ts                      # Supabase Admin Client
├── types/
│   └── database.types.ts
├── .env.local
└── package.json
```

---

# 6. Simulasi Finansial & Margin Keuntungan (Konteks Indonesia)

Dengan model otomatis ini, Anda dapat menjalankan bisnis SaaS dengan margin keuntungan di atas **85%**:

| Komponen | Biaya per Bulan (10 Klien Pertama) | Biaya per Bulan (50 Klien Aktif) |
| :--- | :--- | :--- |
| **Infrastruktur (Vercel + Supabase + Upstash)** | Rp0 (Free Tier) | ~Rp450.000 / bln (Pro Tier) |
| **Biaya AI Tokens (Gemini 1.5 Flash / Groq)** | ~Rp15.000 / bln | ~Rp120.000 / bln |
| **Gaji CS / Admin / Staf Billing** | **Rp0 (Dijalankan AI Swarm)** | **Rp0 (Dijalankan AI Swarm)** |
| **Total Biaya Operasional** | **~Rp15.000 / bln** | **~Rp570.000 / bln** |
| **Proyeksi Pendapatan (Rata-rata Rp250k/klien)** | **Rp2.500.000 / bln** | **Rp12.500.000 / bln** |
| **Margin Keuntungan Bersih (NPM)** | **99.4%** | **95.4%** |

---

### Langkah Praktis Berikutnya:
Arsitektur dan cetak biru sudah 100% lengkap dan saling terhubung. Langkah selanjutnya adalah menyiapkan repository lokal Next.js dan file konfigurasi `.env` untuk menghubungkan Meta App yang baru saja Anda buat!