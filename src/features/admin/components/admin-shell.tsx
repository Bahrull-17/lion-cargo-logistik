import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/admin/actions/auth";
import { AdminNav } from "@/features/admin/components/admin-nav";
import { getAdmin } from "@/features/admin/lib/get-admin";

/** Header + pengecekan admin. Dirender di dalam <Suspense> karena membaca cookie. */
export async function AdminShell({ children }: { children: ReactNode }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">Panel Admin</p>
            <p className="truncate text-xs text-muted-foreground">{admin.user.email}</p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Keluar
            </Button>
          </form>
        </div>
        <div className="mx-auto max-w-5xl px-4">
          <AdminNav />
        </div>
      </header>
      {children}
    </div>
  );
}
