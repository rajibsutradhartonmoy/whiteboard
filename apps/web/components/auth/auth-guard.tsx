"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./auth-provider";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  fallback,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
