const BLOCK = "animate-pulse rounded-2xl bg-slate-200/70 sm:rounded-3xl";

/** Placeholder saat data tarif dimuat. Susunan & lebar mengikuti halaman asli agar tidak terjadi layout shift. */
export function CekOngkirSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 sm:pb-28" aria-busy="true" aria-label="Memuat kalkulator tarif">
      {/* Hero: rasio sama dengan gambar banner (1400x650) */}
      <div className="border-b border-slate-200/80 bg-white px-3 pb-4 pt-2 sm:px-6 sm:pb-8 lg:px-8">
        <div className={`mx-auto aspect-1400/650 max-w-6xl ${BLOCK}`} />
      </div>

      {/* Header judul */}
      <div className="mx-auto max-w-4xl px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
        <div className={`h-64 sm:h-72 ${BLOCK}`} />
      </div>

      {/* Kartu kalkulator */}
      <div className="mx-auto mb-16 max-w-4xl px-4 sm:mb-20 sm:px-6">
        <div className={`h-112 ${BLOCK}`} />
      </div>

      {/* Tabel tarif */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`h-160 ${BLOCK}`} />
      </div>
    </div>
  );
}
