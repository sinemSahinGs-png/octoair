import { Suspense } from "react";
import AdminLoginClient from "./login-client";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070A] text-[#F2F7FF]">
          Yükleniyor...
        </div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
