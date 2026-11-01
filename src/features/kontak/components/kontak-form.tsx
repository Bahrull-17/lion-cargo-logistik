"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2 } from "lucide-react";
import { waLink } from "@/lib/wa-link";

const SUBJECT_KEYS = ["consult", "rates", "animal", "b2b", "other"] as const;
type SubjectKey = (typeof SUBJECT_KEYS)[number];

const INPUT_CLASS = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all";

/** 8–15 digit setelah spasi, tanda hubung, dan tanda kurung dibuang; "+" hanya boleh di awal. */
function isValidPhone(value: string): boolean {
  const compact = value.replace(/[\s\-()]/g, "");
  return /^\+?\d{8,15}$/.test(compact);
}

export function KontakForm() {
  const t = useTranslations("pages.contact.form");

  const [formData, setFormData] = useState<{ nama: string; noHp: string; email: string; subjek: SubjectKey; pesan: string }>({
    nama: "",
    noHp: "",
    email: "",
    subjek: "consult",
    pesan: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone(formData.noHp)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);

    const nama = formData.nama.trim();
    const email = formData.email.trim();

    // Format pesan WhatsApp otomatis dari isi formulir
    const lines = [t("whatsapp.intro", { name: nama, phone: formData.noHp.trim() }), "", ...(email ? [t("whatsapp.email", { email })] : []), t("whatsapp.subject", { subject: t(`subject.options.${formData.subjek}`) }), t("whatsapp.message", { message: formData.pesan.trim() })];

    // Buka WhatsApp; bila popup diblokir browser, formulir tetap tampil agar bisa dicoba lagi.
    // (window.open dengan "noopener" selalu mengembalikan null, jadi opener dilepas manual.)
    const opened = window.open(waLink(lines.join("\n")), "_blank");
    if (opened) {
      opened.opener = null;
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t("title")}</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">{t("subtitle")}</p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12 space-y-4" role="status">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-10" />
          </div>
          <h3 className="text-lg font-black text-slate-900">{t("success.title")}</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">{t("success.description")}</p>
          <button type="button" onClick={() => setIsSubmitted(false)} className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer">
            {t("success.again")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* NAMA LENGKAP */}
            <div className="space-y-1.5">
              <label htmlFor="kontak-nama" className="text-xs font-bold text-slate-700">
                {t("name.label")}
              </label>
              <input id="kontak-nama" name="name" type="text" required maxLength={100} autoComplete="name" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder={t("name.placeholder")} className={INPUT_CLASS} />
            </div>

            {/* NOMOR HP / WHATSAPP */}
            <div className="space-y-1.5">
              <label htmlFor="kontak-hp" className="text-xs font-bold text-slate-700">
                {t("phone.label")}
              </label>
              <input
                id="kontak-hp"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                maxLength={20}
                autoComplete="tel"
                aria-invalid={phoneError}
                aria-describedby={phoneError ? "kontak-hp-error" : undefined}
                value={formData.noHp}
                onChange={(e) => {
                  setFormData({ ...formData, noHp: e.target.value });
                  if (phoneError) setPhoneError(false);
                }}
                placeholder={t("phone.placeholder")}
                className={INPUT_CLASS}
              />
              {phoneError && (
                <p id="kontak-hp-error" role="alert" className="text-[11px] font-semibold text-red-600">
                  {t("phone.invalid")}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label htmlFor="kontak-email" className="text-xs font-bold text-slate-700">
                {t("email.label")}
              </label>
              <input id="kontak-email" name="email" type="email" maxLength={120} autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t("email.placeholder")} className={INPUT_CLASS} />
            </div>

            {/* SUBJEK PERTANYAAN */}
            <div className="space-y-1.5">
              <label htmlFor="kontak-subjek" className="text-xs font-bold text-slate-700">
                {t("subject.label")}
              </label>
              <select id="kontak-subjek" name="subject" value={formData.subjek} onChange={(e) => setFormData({ ...formData, subjek: e.target.value as SubjectKey })} className={`${INPUT_CLASS} cursor-pointer`}>
                {SUBJECT_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(`subject.options.${key}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ISI PESAN */}
          <div className="space-y-1.5">
            <label htmlFor="kontak-pesan" className="text-xs font-bold text-slate-700">
              {t("message.label")}
            </label>
            <textarea
              id="kontak-pesan"
              name="message"
              required
              rows={4}
              maxLength={1000}
              value={formData.pesan}
              onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
              placeholder={t("message.placeholder")}
              className={`${INPUT_CLASS} placeholder:text-slate-400`}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:shadow-red-600/40 active:scale-98 transition-all cursor-pointer"
          >
            <Send className="size-4" />
            <span>{t("submit")}</span>
          </button>

          <p className="text-[11px] text-center text-slate-400 pt-1">{t("note")}</p>
        </form>
      )}
    </div>
  );
}
