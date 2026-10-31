"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTarif, deleteTarif, setTarifStatus, updatePrice } from "@/features/admin/actions/tarif";
import { DESTINATION_REGION_LABELS, MAX_PRICE_PER_KG } from "@/features/admin/constants";
import { DESTINATION_REGIONS, type DestinationRegion } from "@/types/tarif";

export interface AdminTarif {
  id: string;
  name: string;
  code: string | null;
  /** Hanya terisi untuk kota yang ditambah lewat panel; kota lama null (wilayah dideteksi otomatis). */
  region: DestinationRegion | null;
  price: number;
  status: string;
  updatedAt: string | null;
}

const rupiah = new Intl.NumberFormat("id-ID");
const dateTime = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

const SELECT_CLASS = "h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

function formatUpdatedAt(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : dateTime.format(date);
}

export function TarifManager({ initialItems }: { initialItems: AdminTarif[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (keyword === "") return items;
    return items.filter((item) => item.name.toLowerCase().includes(keyword) || (item.code?.toLowerCase().includes(keyword) ?? false));
  }, [items, query]);

  const handleSaved = (id: string, price: number, updatedAt: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, price, updatedAt } : item)));
  };

  const handleStatusChanged = (id: string, status: string, updatedAt: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status, updatedAt } : item)));
  };

  const handleDeleted = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreated = (item: AdminTarif) => {
    setItems((prev) => [...prev, item].sort((a, b) => a.name.localeCompare(b.name, "id")));
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-10">
      <div className="sticky top-0 z-10 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kota atau kode bandara" aria-label="Cari kota" className="h-11 pl-9" />
          </div>
          <Button type="button" onClick={() => setAdding((open) => !open)} aria-expanded={adding} className="h-11 shrink-0">
            <Plus className="size-4" aria-hidden="true" />
            Tambah Kota
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {filtered.length} dari {items.length} kota · Tarif Reguler per Kg
        </p>
      </div>

      {adding ? <AddTarifForm onCreated={handleCreated} onClose={() => setAdding(false)} /> : null}

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">Kota tidak ditemukan.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <TarifRow item={item} onSaved={handleSaved} onStatusChanged={handleStatusChanged} onDeleted={handleDeleted} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddTarifForm({ onCreated, onClose }: { onCreated: (item: AdminTarif) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [region, setRegion] = useState<DestinationRegion | "">("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const priceNumber = price === "" ? Number.NaN : Number(price);
  const priceValid = Number.isInteger(priceNumber) && priceNumber >= 1 && priceNumber <= MAX_PRICE_PER_KG;
  const codeValid = code === "" || /^[A-Za-z]{3}$/.test(code);
  const valid = name.trim().length >= 2 && region !== "" && priceValid && codeValid;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid || pending) return;

    startTransition(async () => {
      const result = await createTarif({ destination: name, code, region, price: priceNumber });
      if (result.ok) {
        onCreated({ ...result.item });
        setMessage({ ok: true, text: `${result.item.name} ditambahkan dan sudah tampil di website.` });
        setName("");
        setCode("");
        setRegion("");
        setPrice("");
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <form onSubmit={submit} className="mt-4 rounded-xl border bg-background p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tambah kota tujuan baru</h2>
        <button type="button" onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">
          Tutup
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="tarif-baru-nama">Nama kota tujuan</Label>
          <Input
            id="tarif-baru-nama"
            value={name}
            maxLength={80}
            onChange={(event) => {
              setName(event.target.value);
              setMessage(null);
            }}
            placeholder="Contoh: Tanjung Pinang"
            autoComplete="off"
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tarif-baru-kode">Kode bandara (opsional)</Label>
          <Input
            id="tarif-baru-kode"
            value={code}
            maxLength={3}
            onChange={(event) => {
              setCode(event.target.value.replace(/[^A-Za-z]/g, "").toUpperCase());
              setMessage(null);
            }}
            placeholder="Contoh: TNJ"
            autoComplete="off"
            className="h-11 uppercase"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tarif-baru-wilayah">Wilayah</Label>
          <select
            id="tarif-baru-wilayah"
            value={region}
            onChange={(event) => {
              setRegion(event.target.value as DestinationRegion | "");
              setMessage(null);
            }}
            className={SELECT_CLASS}
          >
            <option value="">Pilih wilayah…</option>
            {DESTINATION_REGIONS.map((key) => (
              <option key={key} value={key}>
                {DESTINATION_REGION_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="tarif-baru-harga">Harga per Kg</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
            <Input
              id="tarif-baru-harga"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value.replace(/\D/g, ""));
                setMessage(null);
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              placeholder="Contoh: 66600"
              className="h-11 pl-9 text-base tabular-nums"
            />
          </div>
          {price !== "" && !priceValid ? <p className="text-xs text-red-600">Isi angka 1 - {rupiah.format(MAX_PRICE_PER_KG)}.</p> : null}
        </div>
      </div>

      {code !== "" && !codeValid ? <p className="mt-2 text-xs text-red-600">Kode bandara harus 3 huruf.</p> : null}
      {message ? (
        <p role={message.ok ? "status" : "alert"} className={`mt-3 text-xs font-medium ${message.ok ? "text-green-700" : "text-red-600"}`}>
          {message.text}
        </p>
      ) : null}

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose} className="h-11">
          Selesai
        </Button>
        <Button type="submit" disabled={!valid || pending} className="h-11 min-w-28">
          {pending ? "Menyimpan…" : "Tambah"}
        </Button>
      </div>
    </form>
  );
}

interface TarifRowProps {
  item: AdminTarif;
  onSaved: (id: string, price: number, updatedAt: string) => void;
  onStatusChanged: (id: string, status: string, updatedAt: string) => void;
  onDeleted: (id: string) => void;
}

function TarifRow({ item, onSaved, onStatusChanged, onDeleted }: TarifRowProps) {
  const [value, setValue] = useState(String(item.price));
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const next = value === "" ? Number.NaN : Number(value);
  const valid = Number.isInteger(next) && next >= 1 && next <= MAX_PRICE_PER_KG;
  const changed = valid && next !== item.price;
  const diffPct = changed && item.price > 0 ? Math.round(((next - item.price) / item.price) * 100) : 0;
  const bigChange = Math.abs(diffPct) >= 30;
  const isActive = item.status === "active";

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

  const toggleStatus = () => {
    if (pending) return;

    startTransition(async () => {
      const result = await setTarifStatus({ id: item.id, status: isActive ? "inactive" : "active" });
      if (result.ok) {
        onStatusChanged(item.id, result.status, result.updatedAt);
        setMessage({ ok: true, text: result.status === "active" ? "Diaktifkan. Kota tampil lagi di website." : "Dinonaktifkan. Kota tidak tampil di website." });
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  const remove = () => {
    if (pending) return;

    startTransition(async () => {
      const result = await deleteTarif({ id: item.id });
      if (result.ok) {
        onDeleted(item.id);
      } else {
        setMessage({ ok: false, text: result.error });
        setConfirmDelete(false);
      }
    });
  };

  return (
    <form onSubmit={submit} className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.code ?? "Tanpa kode bandara"}
            {item.region ? ` · ${DESTINATION_REGION_LABELS[item.region]}` : ""}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-muted-foreground">Harga sekarang</p>
          <p className="font-semibold tabular-nums">Rp {rupiah.format(item.price)}</p>
        </div>
      </div>

      {!isActive ? <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Nonaktif (tidak tampil di website)</p> : null}

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

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
        {confirmDelete ? (
          <>
            <span className="text-xs font-medium text-red-600">Hapus {item.name} permanen? Kota ini hilang dari kalkulator dan daftar kota tujuan, dan tidak bisa dibatalkan. Untuk menyembunyikan sementara, gunakan Nonaktifkan.</span>
            <Button type="button" size="sm" variant="destructive" disabled={pending} onClick={remove}>
              {pending ? "Menghapus…" : "Ya, hapus"}
            </Button>
            <Button type="button" size="sm" variant="outline" disabled={pending} onClick={() => setConfirmDelete(false)}>
              Batal
            </Button>
          </>
        ) : (
          <>
            <Button type="button" size="sm" variant="outline" disabled={pending} onClick={toggleStatus}>
              {isActive ? "Nonaktifkan" : "Aktifkan"}
            </Button>
            <Button type="button" size="sm" variant="ghost" disabled={pending} onClick={() => setConfirmDelete(true)} className="text-red-600 hover:text-red-700">
              Hapus
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
