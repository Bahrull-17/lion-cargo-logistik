"use client";

import { Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePrice } from "@/features/admin/actions/tarif";
import { MAX_PRICE_PER_KG } from "@/features/admin/constants";

export interface AdminTarif {
  id: string;
  name: string;
  code: string | null;
  price: number;
  status: string;
  updatedAt: string | null;
}

const rupiah = new Intl.NumberFormat("id-ID");
const dateTime = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

function formatUpdatedAt(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : dateTime.format(date);
}

export function TarifManager({ initialItems }: { initialItems: AdminTarif[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (keyword === "") return items;
    return items.filter((item) => item.name.toLowerCase().includes(keyword) || (item.code?.toLowerCase().includes(keyword) ?? false));
  }, [items, query]);

  const handleSaved = (id: string, price: number, updatedAt: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, price, updatedAt } : item)));
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-10">
      <div className="sticky top-0 z-10 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kota atau kode bandara" aria-label="Cari kota" className="h-11 pl-9" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {filtered.length} dari {items.length} kota · Tarif Reguler per Kg
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">Kota tidak ditemukan.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <TarifRow item={item} onSaved={handleSaved} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TarifRow({ item, onSaved }: { item: AdminTarif; onSaved: (id: string, price: number, updatedAt: string) => void }) {
  const [value, setValue] = useState(String(item.price));
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const next = value === "" ? Number.NaN : Number(value);
  const valid = Number.isInteger(next) && next >= 1 && next <= MAX_PRICE_PER_KG;
  const changed = valid && next !== item.price;
  const diffPct = changed && item.price > 0 ? Math.round(((next - item.price) / item.price) * 100) : 0;
  const bigChange = Math.abs(diffPct) >= 30;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!changed || pending) return;

    startTransition(async () => {
      const result = await updatePrice({ id: item.id, price: next });
      if (result.ok) {
        onSaved(item.id, result.price, result.updatedAt);
        setMessage({ ok: true, text: "Tersimpan. Harga di website sudah diperbarui." });
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <form onSubmit={submit} className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.code ?? "Tanpa kode bandara"}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-muted-foreground">Harga sekarang</p>
          <p className="font-semibold tabular-nums">Rp {rupiah.format(item.price)}</p>
        </div>
      </div>

      {item.status !== "active" ? <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Nonaktif (tidak tampil di website)</p> : null}

      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
          <Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value.replace(/\D/g, ""));
              setMessage(null);
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            aria-label={`Harga per Kg ${item.name}`}
            className="h-11 pl-9 text-base tabular-nums"
          />
        </div>
        <Button type="submit" disabled={!changed || pending} className="h-11 min-w-24">
          {pending ? "Menyimpan…" : "Simpan"}
        </Button>
      </div>

      {changed && bigChange ? (
        <p className="mt-2 text-xs font-medium text-amber-700">
          Perubahan besar ({diffPct > 0 ? "+" : ""}
          {diffPct}%). Pastikan angkanya benar sebelum menyimpan.
        </p>
      ) : null}
      {value !== "" && !valid ? <p className="mt-2 text-xs text-red-600">Isi angka 1 - {rupiah.format(MAX_PRICE_PER_KG)}.</p> : null}
      {message ? (
        <p role="status" className={`mt-2 text-xs font-medium ${message.ok ? "text-green-700" : "text-red-600"}`}>
          {message.text}
        </p>
      ) : null}

      <p className="mt-2 text-[11px] text-muted-foreground">Terakhir diubah: {formatUpdatedAt(item.updatedAt)}</p>
    </form>
  );
}
