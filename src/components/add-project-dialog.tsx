"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  KINDS,
  createShelfItem,
  validateHref,
  validateName,
  validateSummary,
  type Kind,
  type ShelfItem,
} from "@/lib/shelf"
import { cn } from "cn"

type Props = {
  onAdd: (item: ShelfItem) => void
}

const EMPTY_FORM = {
  name: "",
  href: "",
  summary: "",
  kind: "Other" as Kind,
}

export function AddProjectDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<{ name?: string; href?: string; summary?: string }>({})

  function reset() {
    setForm(EMPTY_FORM)
    setErrors({})
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const next = {
      name: validateName(form.name) ?? undefined,
      href: validateHref(form.href) ?? undefined,
      summary: validateSummary(form.summary) ?? undefined,
    }
    setErrors(next)
    if (next.name || next.href || next.summary) return
    const item = createShelfItem(form)
    onAdd(item)
    toast("Saved on this computer")
    setOpen(false)
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger render={<Button variant="outline" className="w-full sm:w-auto" />}>
        Add a project
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a project</DialogTitle>
          <DialogDescription>
            A name, a link, and one sentence. It stays in this browser.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3" noValidate>
          <Field label="Name" error={errors.name} htmlFor="project-name">
            <Input
              id="project-name"
              value={form.name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="The project name"
            />
          </Field>
          <Field label="Link" error={errors.href} htmlFor="project-link">
            <Input
              id="project-link"
              inputMode="url"
              value={form.href}
              aria-invalid={Boolean(errors.href)}
              onChange={(event) => setForm((current) => ({ ...current, href: event.target.value }))}
              placeholder="https://"
            />
          </Field>
          <fieldset className="grid gap-1.5">
            <legend className="text-xs font-medium">Kind</legend>
            <div className="flex flex-wrap gap-1.5">
              {KINDS.map((kind) => {
                const selected = form.kind === kind
                return (
                  <button
                    key={kind}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setForm((current) => ({ ...current, kind }))}
                    className={cn(
                      "rounded-md border px-2 py-1 font-mono text-[11px] tracking-wide uppercase",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {kind}
                  </button>
                )
              })}
            </div>
          </fieldset>
          <Field label="Why it's here" error={errors.summary} htmlFor="project-summary">
            <Textarea
              id="project-summary"
              value={form.summary}
              aria-invalid={Boolean(errors.summary)}
              onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
              placeholder="One sentence you could say out loud."
              className="min-h-20"
            />
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <DialogClose render={<Button type="button" variant="ghost" />}>Cancel</DialogClose>
            <Button type="submit">Add to the shelf</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
