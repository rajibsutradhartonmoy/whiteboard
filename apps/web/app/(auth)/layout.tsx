import Link from "next/link";
import { Database } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2">
          <Database className="h-8 w-8" />
          <span className="text-2xl font-bold">Whiteboard</span>
        </Link>
        <div className="space-y-4">
          <blockquote className="text-lg">
            &ldquo;Whiteboard transformed how our team designs database schemas.
            The real-time collaboration and offline support are game-changers.&rdquo;
          </blockquote>
          <div>
            <p className="font-semibold">Alex Chen</p>
            <p className="text-sm opacity-80">Senior Database Architect</p>
          </div>
        </div>
        <p className="text-sm opacity-70">
          &copy; {new Date().getFullYear()} Whiteboard. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}
