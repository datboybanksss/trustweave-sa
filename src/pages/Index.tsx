import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/shared/Navigation";

const Index = () => {
  const onCreateTrust = () => toast({ title: "Create New Trust", description: "Launching the Trust Builder wizard." });
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <section className="mx-auto max-w-3xl text-center animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Legacy Builder — Premium Trust & Wealth Platform</h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">Plan trusts, manage legal documents, and learn from experts — tailored for South Africa and multi‑generational families.</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="hero" onClick={onCreateTrust}>Create New Trust</Button>
            <Button variant="outline">Explore Education</Button>
          </div>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Secure Document Vault", desc: "Encrypt, OCR, and categorize wills, trust deeds, and records.", },
            { title: "Expert Consultations", desc: "Book vetted attorneys and advisors in your language.", },
            { title: "SA‑Specific Guidance", desc: "Tax, POPIA, customary law, and cross‑border planning.", },
          ].map((f) => (
            <article key={f.title} className="rounded-lg border bg-card p-6 shadow-sm transition-transform hover:scale-[1.01]">
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
