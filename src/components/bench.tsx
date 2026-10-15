"use client"

import Image from "next/image"
import { useState, useSyncExternalStore } from "react"
import { toast } from "sonner"
import { AddProjectDialog } from "@/components/add-project-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  KINDS,
  combinedShelf,
  getServerShelfSnapshot,
  getShelfSnapshot,
  hostLabel,
  subscribeShelf,
  updateShelf,
  visibleItems,
  type ShelfFilter,
  type ShelfItem,
} from "@/lib/shelf"
import { cn } from "cn"

const FILTERS: ShelfFilter[] = ["All", ...KINDS]

export function Bench() {
  const state = useSyncExternalStore(subscribeShelf, getShelfSnapshot, getServerShelfSnapshot)
  const [filter, setFilter] = useState<ShelfFilter>("All")
  const [openId, setOpenId] = useState<string | null>("cursor")

  const items = visibleItems(combinedShelf(state), filter)

  function add(item: ShelfItem) {
    updateShelf((current) => ({ ...current, yours: [...current.yours, item] }))
    setFilter("All")
    setOpenId(item.id)
  }

  function remove(id: string) {
    updateShelf((current) => ({
      ...current,
      yours: current.yours.filter((item) => item.id !== id),
      margins: Object.fromEntries(Object.entries(current.margins).filter(([key]) => key !== id)),
    }))
    if (openId === id) setOpenId(null)
    toast("Removed from this computer")
  }

  function setMargin(id: string, value: string) {
    updateShelf((current) => ({ ...current, margins: { ...current.margins, [id]: value } }))
  }

  return (
    <section aria-label="Shelf" className="min-w-0">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            On the shelf
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Projects I use, with room for the next one. Open a row to read the note.
          </p>
        </div>
        <AddProjectDialog onAdd={add} />
      </div>

      <div className="flex flex-wrap gap-x-1 gap-y-2 pt-4" role="group" aria-label="Filter by kind">
        {FILTERS.map((kind) => {
          const selected = filter === kind
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(kind)}
              className={cn(
                "px-2 py-1 font-mono text-[11px] tracking-[0.14em] uppercase",
                selected
                  ? "border-b border-mark text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {kind}
            </button>
          )
        })}
      </div>

      {items.length === 0 ? (
        <p className="border-b border-border py-10 text-sm leading-6 text-muted-foreground">
          Nothing filed under {filter} yet. Add one when you find it. It will stay on this computer.
        </p>
      ) : (
        <ul className="divide-y divide-border border-b border-border">
          {items.map((item, index) => (
            <ShelfRow
              key={item.id}
              item={item}
              index={index}
              open={openId === item.id}
              margin={state.margins[item.id] ?? ""}
              onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              onMargin={(value) => setMargin(item.id, value)}
              onRemove={() => remove(item.id)}
            />
          ))}
        </ul>
      )}

      <p className="mt-6 max-w-md text-xs leading-5 text-muted-foreground">
        Notes you type stay in this browser. Nothing is uploaded.
      </p>
    </section>
  )
}

function ShelfPicture({ item }: { item: ShelfItem }) {
  if (item.awaitingPhoto) {
    return (
      <div className="mb-5 flex min-h-36 max-w-xl items-end border border-dashed border-border bg-background px-4 py-5">
        <p className="font-serif text-xl tracking-tight text-muted-foreground">
          A picture of my own Odysseus will go here.
        </p>
      </div>
    )
  }
  if (!item.image) return null
  return (
    <figure className="mb-5 max-w-xl">
      <Image
        src={item.image}
        alt={item.imageAlt ?? ""}
        width={item.imageWidth ?? 1600}
        height={item.imageHeight ?? 900}
        className={
          (item.imageHeight ?? 0) > (item.imageWidth ?? 0)
            ? "mx-auto h-auto w-full max-w-[280px] border border-border bg-background"
            : "h-auto w-full border border-border bg-background"
        }
      />
      {item.imageCredit ? (
        <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
          {item.imageCreditHref ? (
            <a
              href={item.imageCreditHref}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {item.imageCredit}
            </a>
          ) : (
            item.imageCredit
          )}
        </figcaption>
      ) : null}
    </figure>
  )
}

function ShelfRow({
  item,
  index,
  open,
  margin,
  onToggle,
  onMargin,
  onRemove,
}: {
  item: ShelfItem
  index: number
  open: boolean
  margin: string
  onToggle: () => void
  onMargin: (value: string) => void
  onRemove: () => void
}) {
  const paragraphs = item.essay.split(/\n\n+/).filter(Boolean)
  return (
    <li className={cn(open && "bg-card")}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-1 py-5 text-left hover:bg-foreground/[0.03]"
      >
        <span className="mt-1.5 w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-2xl tracking-tight text-foreground">{item.name}</span>
            <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {item.origin === "yours" ? "This computer" : item.kind}
            </span>
          </span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.summary}</span>
        </span>
      </button>
      {open ? (
        <div className="mr-1 mb-6 ml-11 border-l-2 border-mark pr-2 pl-4">
          {item.origin === "yours" ? (
            <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {item.kind}
            </p>
          ) : null}
          <ShelfPicture item={item} />
          <div className="max-w-xl space-y-3 text-[15px] leading-7">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Open {hostLabel(item.href)}
          </a>
          <label htmlFor={`margin-${item.id}`} className="mt-5 block font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            In the margin
          </label>
          <Textarea
            id={`margin-${item.id}`}
            value={margin}
            onChange={(event) => onMargin(event.target.value)}
            placeholder="A private aside. It stays on this computer."
            className="mt-2 max-h-40 min-h-20 bg-background"
          />
          {item.origin === "yours" ? (
            <Button type="button" variant="ghost" className="mt-2 px-0" onClick={onRemove}>
              Remove from this computer
            </Button>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}
