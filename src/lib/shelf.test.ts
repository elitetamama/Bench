import { describe, expect, it } from "vitest"
import {
  SEEDS,
  combinedShelf,
  hostLabel,
  normalizeHref,
  parseShelfState,
  validateHref,
  validateName,
  validateSummary,
  visibleItems,
} from "./shelf"

describe("validateHref", () => {
  it("accepts a normal https link", () => {
    expect(validateHref("https://cursor.com")).toBeNull()
  })

  it("accepts a host and normalizes it to https", () => {
    expect(validateHref("cursor.com")).toBeNull()
    expect(normalizeHref("github.com/odysseus-dev/odysseus")).toBe(
      "https://github.com/odysseus-dev/odysseus",
    )
  })

  it("rejects javascript links", () => {
    expect(validateHref("javascript:alert(1)")).toBeTruthy()
  })
})

describe("validateName and validateSummary", () => {
  it("requires both", () => {
    expect(validateName("  ")).toMatch(/name/)
    expect(validateSummary("")).toMatch(/sentence/)
  })
})

describe("hostLabel", () => {
  it("drops a leading www", () => {
    expect(hostLabel("https://www.linkedin.com/in/daviderthal")).toBe("linkedin.com")
  })
})

describe("parseShelfState", () => {
  it("returns an empty shelf for missing or broken data", () => {
    expect(parseShelfState(null)).toEqual({ yours: [], margins: {} })
    expect(parseShelfState("{")).toEqual({ yours: [], margins: {} })
    expect(parseShelfState("[]")).toEqual({ yours: [], margins: {} })
  })

  it("keeps a valid note and drops a broken one", () => {
    const raw = JSON.stringify({
      yours: [
        {
          id: "yours-1",
          name: "A small CLI",
          href: "https://github.com/example/cli",
          kind: "Other",
          summary: "A weekend read that taught me how CLIs document flags.",
          essay: "Longer note.",
        },
        { id: "bad", name: "Missing link" },
      ],
      margins: { cursor: "Ask about review load.", junk: 4 },
    })
    const parsed = parseShelfState(raw)
    expect(parsed.yours).toHaveLength(1)
    expect(parsed.yours[0]?.origin).toBe("yours")
    expect(parsed.yours[0]?.essay).toBe("Longer note.")
    expect(parsed.margins).toEqual({ cursor: "Ask about review load." })
  })
})

describe("visibleItems", () => {
  it("filters seeds by kind and keeps All intact", () => {
    expect(visibleItems(SEEDS, "All")).toHaveLength(SEEDS.length)
    expect(visibleItems(SEEDS, "Hardware").map((item) => item.id)).toEqual(["flipper"])
    expect(visibleItems(combinedShelf({ yours: [], margins: {} }), "Editor")).toHaveLength(1)
  })
})
