import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Users, Cloud, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Whiteboard</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Sign In
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Design Database Schemas{" "}
              <span className="text-primary">Collaboratively</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Professional, production-ready database schema designer with
              real-time collaboration, offline support, and comprehensive
              database modeling features.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Start for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything You Need
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Database className="h-8 w-8" />}
                title="Multi-Database Support"
                description="PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and more."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Real-Time Collaboration"
                description="Work together with live cursors, presence, and instant sync."
              />
              <FeatureCard
                icon={<Cloud className="h-8 w-8" />}
                title="Offline First"
                description="Keep working without internet. Sync when you're back online."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Code Generation"
                description="Export to Prisma, TypeORM, Django, Laravel, and more."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Whiteboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
