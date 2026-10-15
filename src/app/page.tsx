import { Bench } from "@/components/bench"

export default function Home() {
  return (
    <div className="grid gap-12 px-5 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:px-12 md:py-16">
      <header className="md:sticky md:top-12 md:self-start">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">V0.2</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-foreground">Bench</h1>
        <p className="mt-5 text-sm leading-6">David Erthal</p>
        <p className="mt-6 text-[15px] leading-7">
          I keep this shelf because I like learning how things work. These are the projects I open,
          and the notes are so I can explain them in my own words.
        </p>
        <p className="mt-6 flex gap-4 text-sm">
          <a
            href="https://github.com/elitetamama"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/daviderthal"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
        </p>
      </header>
      <Bench />
    </div>
  )
}
