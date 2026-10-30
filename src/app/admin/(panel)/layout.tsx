import { Suspense, type ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Memuat…</div>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
