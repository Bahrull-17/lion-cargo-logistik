"use client";

import { useEffect, useState } from "react";

/** Pemberitahuan singkat setelah artikel tersimpan. Parameter ?saved=1 dibersihkan dari alamat agar tidak muncul lagi saat dimuat ulang. */
export function SavedNotice({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.history.replaceState(null, "", "/admin/artikel");
  }, []);

  if (!visible) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4">
      <div role="status" className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
        <span>{message}</span>
        <button type="button" onClick={() => setVisible(false)} aria-label="Tutup pemberitahuan" className="text-green-800/70 hover:text-green-900">
          ✕
        </button>
      </div>
    </div>
  );
}
