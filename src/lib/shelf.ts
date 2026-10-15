// The shelf people see. Edit the words here. The page reads this list.

export const KINDS = ["Editor", "Models", "Hardware", "Other"] as const

export type Kind = (typeof KINDS)[number]

export type ShelfFilter = Kind | "All"

export type ShelfItem = {
  id: string
  name: string
  href: string
  kind: Kind
  summary: string
  essay: string
  origin: "seed" | "yours"
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  imageCredit?: string
  imageCreditHref?: string
  awaitingPhoto?: boolean
}

export type ShelfState = {
  yours: ShelfItem[]
  margins: Record<string, string>
}

export const STORAGE_KEY = "bench.v1"

export const EMPTY_SHELF: ShelfState = { yours: [], margins: {} }

export const SEEDS: readonly ShelfItem[] = [
  {
    id: "cursor",
    name: "Cursor",
    href: "https://cursor.com",
    kind: "Editor",
    summary: "The editor I used to build this page.",
    essay: `I put this page together in Cursor. I describe a small thing, read what comes back, and change it until it sounds like me. That is how I learn the tool: by making something I can click, then figuring out what I still don't understand. Most other projects on this shelf were done relying heavily on Cursor as my coach and council throughout the project.

The fun is the loop. Try something, run it, and keep going.`,
    image: "/shelf/cursor.jpg",
    imageAlt: "The Cursor editor, with a chat beside an open document.",
    imageWidth: 1600,
    imageHeight: 840,
    imageCredit: "Screenshot from cursor.com",
    imageCreditHref: "https://cursor.com",
    origin: "seed",
  },
  {
    id: "odysseus",
    name: "Odysseus",
    href: "https://github.com/odysseus-dev/odysseus",
    kind: "Models",
    summary: "My family's assistant, hosted at home and open from anywhere.",
    essay: `Odysseus is a self-hosted place to talk to models, with chat, agents, and tools, on a machine you control. I am learning it because I want to understand the pieces: where a model runs, what it can touch, and what can stay on the machine. Odysseus has given a second life to my home PC where it now acts as the host for my family's own personal AI assistant. Cloudflare makes that computer my own website, so I can open it from anywhere.

The repo belongs to the Odysseus project. I am finding my way through it, and the note is mine.`,
    image: "/shelf/odysseus.jpg",
    imageAlt: "Odysseus on a phone, ready for a new chat.",
    imageWidth: 720,
    imageHeight: 1564,
    imageCredit: "My instance",
    origin: "seed",
  },
  {
    id: "flipper",
    name: "Flipper Zero",
    href: "https://github.com/flipperdevices/flipperzero-firmware",
    kind: "Hardware",
    summary: "Pocket hardware with public firmware, apps, and issues.",
    essay: `Flipper Zero is a pocket multi-tool for infrared, NFC, RFID, and sub-GHz. The firmware, the apps, and the docs are public, so I can follow along instead of only pressing buttons.

What I love about the Flipper Zero is that it enables me to "see" and interact with so many otherwise invisible frequencies and waves that are around us at all times. It helps me learn more about the ways the tech world works, and the ways in which we need to protect ourselves from those with malicious intent.`,
    image: "/shelf/flipper.jpg",
    imageAlt: "A white Flipper Zero, its screen showing a scan.",
    imageWidth: 1280,
    imageHeight: 794,
    imageCredit: "Photo by Turbospok, CC BY-SA 4.0, via Wikimedia Commons",
    imageCreditHref: "https://commons.wikimedia.org/wiki/File:Flipper_Zero.jpg",
    origin: "seed",
  },
  {
    id: "sesame",
    name: "Sesame",
    href: "https://github.com/dorianborian/sesame-robot",
    kind: "Hardware",
    summary: "A 3D-printed quadruped I built from the public repo.",
    essay: `Sesame is a small quadruped: a printed body, servos, and a little screen for a face. I printed the body, then used Cursor and the project's GitHub repo to learn enough robotics to get a working prototype.

Next I want an AI camera and a microphone, so I can talk to it outside the app.

The repo belongs to the Sesame project. The robot on my desk is the part I made.`,
    image: "/shelf/sesame.jpg",
    imageAlt: "A yellow 3D-printed quadruped robot with a small screen face.",
    imageWidth: 1400,
    imageHeight: 655,
    imageCredit: "Photo from the sesame-robot project",
    imageCreditHref: "https://github.com/dorianborian/sesame-robot",
    origin: "seed",
  },
  {
    id: "gods-eye",
    name: "God's Eye View",
    href: "https://github.com/bilawalsidhu/gods-eye-view",
    kind: "Other",
    summary: "A live 3D globe I got running, APIs and all.",
    essay: `God's Eye View is an open-source globe in the browser: live public data on a photorealistic Earth. I used Cursor to get it running. That meant learning how the APIs fit together, and using the Google Cloud console to turn on the paid photorealistic 3D tiles, the fancy Earth view.

The interface is the other lesson. It is clean, and it is the nicest UI I have worked in.

The repo belongs to the God's Eye View project. Getting my own copy running is the part I did.`,
    image: "/shelf/gods-eye-austin.jpg",
    imageAlt: "God's Eye View over downtown Austin, with public cameras along the street.",
    imageWidth: 566,
    imageHeight: 332,
    imageCredit: "From the God's Eye View project",
    imageCreditHref: "https://github.com/bilawalsidhu/gods-eye-view",
    origin: "seed",
  },
]

export function validateName(value: string): string | null {
  const name = value.trim()
  if (!name) return "Give it a name."
  if (name.length > 80) return "Keep the name under 80 characters."
  return null
}

export function validateSummary(value: string): string | null {
  const summary = value.trim()
  if (!summary) return "Add one sentence about why it's here."
  if (summary.length > 240) return "Keep that sentence under 240 characters."
  return null
}

export function normalizeHref(value: string): string | null {
  const href = value.trim()
  if (!href) return null
  const candidate = /^https?:\/\//i.test(href) ? href : `https://${href}`
  try {
    const url = new URL(candidate)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    if (!url.hostname.includes(".")) return null
    return url.toString()
  } catch {
    return null
  }
}

export function validateHref(value: string): string | null {
  if (!value.trim()) return "Paste a full link, including https://."
  if (!normalizeHref(value)) return "That link doesn't look complete."
  return null
}

export function hostLabel(href: string): string {
  try {
    return new URL(href).host.replace(/^www\./, "")
  } catch {
    return href
  }
}

export function isKind(value: unknown): value is Kind {
  return typeof value === "string" && (KINDS as readonly string[]).includes(value)
}

function parseItem(value: unknown): ShelfItem | null {
  if (!value || typeof value !== "object") return null
  const item = value as Record<string, unknown>
  if (typeof item.id !== "string" || item.id.length === 0) return null
  if (typeof item.name !== "string" || validateName(item.name)) return null
  const href = typeof item.href === "string" ? normalizeHref(item.href) : null
  if (!href) return null
  if (typeof item.summary !== "string" || validateSummary(item.summary)) return null
  if (!isKind(item.kind)) return null
  const essay = typeof item.essay === "string" && item.essay.trim() ? item.essay.trim() : item.summary.trim()
  return {
    id: item.id,
    name: item.name.trim(),
    href,
    kind: item.kind,
    summary: item.summary.trim(),
    essay,
    origin: "yours",
  }
}

export function parseShelfState(raw: string | null): ShelfState {
  if (!raw) return EMPTY_SHELF
  try {
    const data = JSON.parse(raw) as unknown
    if (!data || typeof data !== "object") return EMPTY_SHELF
    const record = data as { yours?: unknown; margins?: unknown }
    const yours = Array.isArray(record.yours) ? record.yours.flatMap((item) => {
      const parsed = parseItem(item)
      return parsed ? [parsed] : []
    }) : []
    const margins: Record<string, string> = {}
    if (record.margins && typeof record.margins === "object") {
      for (const [key, value] of Object.entries(record.margins)) {
        if (typeof value === "string") margins[key] = value.slice(0, 1000)
      }
    }
    return { yours, margins }
  } catch {
    return EMPTY_SHELF
  }
}

export function combinedShelf(state: ShelfState): ShelfItem[] {
  return [...SEEDS, ...state.yours]
}

export function visibleItems(items: readonly ShelfItem[], filter: ShelfFilter): ShelfItem[] {
  if (filter === "All") return [...items]
  return items.filter((item) => item.kind === filter)
}

export function createShelfItem(input: {
  name: string
  href: string
  kind: Kind
  summary: string
}): ShelfItem {
  const summary = input.summary.trim()
  return {
    id: `yours-${crypto.randomUUID()}`,
    name: input.name.trim(),
    href: normalizeHref(input.href) ?? input.href.trim(),
    kind: input.kind,
    summary,
    essay: summary,
    origin: "yours",
  }
}

export function loadShelfState(): ShelfState {
  if (typeof window === "undefined") return EMPTY_SHELF
  try {
    return parseShelfState(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return EMPTY_SHELF
  }
}

export function saveShelfState(state: ShelfState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const listeners = new Set<() => void>()
let cached: ShelfState | null = null

export function subscribeShelf(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getShelfSnapshot(): ShelfState {
  if (!cached) cached = loadShelfState()
  return cached
}

export function getServerShelfSnapshot(): ShelfState {
  return EMPTY_SHELF
}

export function updateShelf(updater: (state: ShelfState) => ShelfState) {
  cached = updater(getShelfSnapshot())
  saveShelfState(cached)
  for (const listener of listeners) listener()
}
