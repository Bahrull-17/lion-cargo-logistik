/** Placeholder saat data tarif dimuat. Tinggi mengikuti kalkulator agar tidak terjadi layout shift. */
export function CekOngkirSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 pt-6" aria-busy="true" aria-label="Memuat kalkulator tarif">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 h-24 max-w-3xl animate-pulse rounded-2xl bg-slate-200/70" />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="h-112 animate-pulse rounded-2xl bg-slate-200/70 lg:col-span-5" />
          <div className="space-y-3.5 lg:col-span-7">
            <div className="h-36 animate-pulse rounded-2xl bg-slate-200/70" />
            <div className="h-36 animate-pulse rounded-2xl bg-slate-200/70" />
            <div className="h-36 animate-pulse rounded-2xl bg-slate-200/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
