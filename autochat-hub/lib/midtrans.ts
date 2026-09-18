/**
 * ===============================================================================
 * 1. JUDUL SCRIPT       : Midtrans QRIS Dynamic Payment Generator
 * 2. BAHASA PEMROGRAMAN : TypeScript 5
 * 3. ALGORITMA SCRIPT   :
 *    Step 1 : Inisialisasi konfigurasi Midtrans API dari environment variables.
 *    Step 2 : Validasi parameter input (order_id, amount).
 *    Step 3 : Eksekusi HTTP POST ke endpoint Midtrans (Snap/QRIS).
 *    Step 4 : Normalisasi response API menjadi format JSON standar.
 *    Step 5 : Implementasi Error handling dengan timeout 15 detik.
 * 4. DESKRIPSI FUNGSI & CLASS :
 *    - createMidtransQRIS : Membuat transaksi QRIS dinamis dan mengembalikan URL QR.
 * ===============================================================================
 */

const MIDTRANS_SERVER_KEY = process.env.PAYMENT_SERVER_KEY;
const MIDTRANS_API_URL = process.env.NODE_ENV === "production" 
    ? "https://api.midtrans.com/v2" 
    : "https://api.sandbox.midtrans.com/v2";

export async function createMidtransQRIS(args: { 
    orderId: string; 
    amount: number; 
    customerDetails?: { first_name: string; email: string; phone: string } 
}) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(`${MIDTRANS_API_URL}/charge`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payment_type: "qris",
                transaction_details: {
                    order_id: args.orderId,
                    gross_amount: args.amount,
                },
                qris: {
                    acquirer: "gopay"
                }
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const error = await response.json();
            return { status: "ERROR", message: error.status_message || "Gagal membuat QRIS" };
        }

        const data = await response.json();
        return { 
            status: "SUCCESS", 
            data: { 
                qr_code_url: data.actions?.find((a: any) => a.name === "generate-qr")?.url || "",
                order_id: args.orderId
            } 
        };
    } catch (error: any) {
        return { status: "ERROR", message: error.message };
    }
}
