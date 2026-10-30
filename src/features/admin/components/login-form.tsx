"use client";

import { CircleAlert, Eye, EyeOff, LoaderCircle, Lock, Mail, TriangleAlert } from "lucide-react";
import { useActionState, useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, type LoginState } from "@/features/admin/actions/auth";

/** Gaya input untuk latar gelap (kartu kaca di halaman login). */
const INPUT_CLASS =
  "h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-white/40 focus-visible:border-white/40 focus-visible:ring-[#e11d2a]/40 dark:bg-white/10 md:text-base [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgba(40,12,18,0.95)]";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const trackCapsLock = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(event.getModifierState("CapsLock"));
  };

  return (
    <form action={formAction} className="space-y-4 sm:space-y-5" noValidate>
      {state.error ? (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-red-400/40 bg-red-500/15 px-3.5 py-3 text-sm text-red-100">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{state.error}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-white/90">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/50" aria-hidden />
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Masukan email"
            defaultValue={state.email}
            required
            aria-invalid={state.error ? true : undefined}
            className={`${INPUT_CLASS} pl-10`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-white/90">
          Kata sandi
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/50" aria-hidden />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan kata sandi"
            required
            onKeyDown={trackCapsLock}
            onKeyUp={trackCapsLock}
            onBlur={() => setCapsLock(false)}
            aria-invalid={state.error ? true : undefined}
            className={`${INPUT_CLASS} pl-10 pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            aria-pressed={showPassword}
            className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
        {capsLock ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-amber-300">
            <TriangleAlert className="size-3.5" aria-hidden />
            Caps Lock sedang aktif.
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full bg-[#e11d2a] text-base font-semibold text-white shadow-[0_10px_28px_-10px_rgba(225,29,42,0.8)] transition-colors hover:bg-[#c8141f] focus-visible:ring-white/60 disabled:opacity-70"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden />
            Memeriksa akun…
          </>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
}
