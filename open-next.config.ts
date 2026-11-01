import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Konfigurasi dasar. Tanpa incremental cache, hasil "use cache" tidak disimpan antar request
// (data tetap selalu segar, tetapi Supabase dipanggil lebih sering). Untuk cache persisten,
// tambahkan R2/KV sesuai https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
