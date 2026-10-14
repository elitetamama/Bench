import { Bench } from "@/components/bench"

export default function Home() {
  return (
    <div className="grid gap-12 px-5 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:px-12 md:py-16">
      <header className="md:sticky md:top-12 md:self-start">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Austin</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-foreground">Bench</h1>
        <p className="mt-5 text-sm leading-6">David Erthal</p>
        <p className="text-sm leading-6 text-muted-foreground">Account Executive, Red Hat</p>
        <p className="mt-6 text-[15px] leading-7">
          I sell infrastructure software. Before Red Hat, that was Broadcom and VMware. This page is
          the hobby: projects I open, and notes I can still explain on a call.
        </p>
        <a
          href="https://www.linkedin.com/in/daviderthal"
          className="mt-6 inline-block text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          LinkedIn
        </a>
      </header>
      <Bench />
    </div>
  )
}
