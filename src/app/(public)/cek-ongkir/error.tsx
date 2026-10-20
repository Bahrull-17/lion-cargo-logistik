"use client";

import { Button } from "@/components/ui/button";

export default function CekOngkirError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-charcoal">Tarif belum bisa dimuat</h1>
      <p className="text-muted-foreground">Terjadi gangguan saat mengambil data tarif. Silakan coba lagi sebentar lagi.</p>
      <Button onClick={reset}>Coba lagi</Button>
    </div>
  );
}
