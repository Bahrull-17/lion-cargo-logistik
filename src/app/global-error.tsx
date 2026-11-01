"use client";

/** Pengaman terakhir bila layout utama sendiri gagal dirender. Sengaja tanpa dependensi (i18n/UI) agar tidak ikut gagal. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", minHeight: "100vh", placeItems: "center", margin: 0, padding: 24, textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: 24 }}>Terjadi kendala / Something went wrong</h1>
          <button onClick={reset} style={{ marginTop: 16, padding: "10px 20px", borderRadius: 12, border: 0, background: "#C8102E", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            Coba lagi / Try again
          </button>
        </div>
      </body>
    </html>
  );
}
