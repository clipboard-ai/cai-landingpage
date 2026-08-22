---
title: "Context Snippets"
description: "Teach Cai per-app context so every AI action gets smarter. Tell Cai 'when I copy from Terminal, assume Rails' or 'when I copy from Slack, match the sender's tone' — and Cai adapts automatically."
---

# Context Snippets

Context Snippets let you teach Cai **per-app context** that gets injected into every AI action. Tell Cai about your workflow once, and every Summarize, Explain, Reply, or Ask AI from that app gets automatically smarter.

**The classic example:** when you select an error in Terminal, you're probably debugging a specific codebase. When you select from Slack, you want a professional-but-casual reply. Context Snippets make Cai smart enough to know the difference, based on which app you selected from.

> Snippets live in a JSON file you edit directly — power-user territory for now. Changes apply automatically on save, no restart needed.

---

## Quick Start

### 1. Open the config file

**Settings → Personalization → Context Snippets → "Open snippets.json in Finder"**, or from Terminal:

```bash
open ~/.config/cai/snippets.json
```

Cai creates the file with an empty template on first launch.

### 2. Find the app's bundle ID

Snippets match apps by **bundle ID** (e.g. `com.apple.Terminal`), not display name — stable across macOS languages and app rebrands:

```bash
osascript -e 'id of app "Slack"'
# → com.tinyspeck.slackmacgap
```

### 3. Add a snippet and save

Three fields required — `bundleId`, `appName`, and `context`:

```json
{
  "version": 1,
  "snippets": [
    {
      "bundleId": "com.apple.Terminal",
      "appName": "Terminal",
      "context": "I'm debugging a Rails 7 app. Errors are usually from `rails logs`, `rspec`, or `bundle exec`. Assume Ruby/Rails context."
    }
  ]
}
```

Save, done — Cai picks up the change immediately. The next AI action from Terminal uses your snippet.

---

## Example Snippets

### Terminal — backend debugging

```json
{
  "bundleId": "com.apple.Terminal",
  "appName": "Terminal",
  "context": "I work on a Rails 7 e-commerce app with Postgres and Sidekiq. When I copy from Terminal, the content is almost always from `rails logs`, `rspec`, `bundle exec`, or `git`. Assume Ruby/Rails context. Be concise — I just need the gist, not a tutorial."
}
```

### Mail — email replies

```json
{
  "bundleId": "com.apple.mail",
  "appName": "Mail",
  "context": "When I copy from Mail, I'm drafting a reply to a coworker or client. Match the sender's tone — casual if they're casual, formal if they're formal. Keep replies to 2-3 short paragraphs max. No greetings or sign-offs unless the original message has them."
}
```

### Slack — team communication

```json
{
  "bundleId": "com.tinyspeck.slackmacgap",
  "appName": "Slack",
  "context": "When I copy from Slack, I'm replying to a teammate. Match their tone. Keep it under 3 sentences unless the question needs more. Don't use emoji unless the sender used one first. We use BUG: / FEAT: / CHORE: prefixes when referencing issues."
}
```

---

## Schema Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `version` | integer | ✅ | Always `1` for now |
| `snippets` | array | ✅ | Empty array `[]` is valid |
| `snippets[].bundleId` | string | ✅ | Reverse-DNS bundle ID. Find with `osascript -e 'id of app "AppName"'` |
| `snippets[].appName` | string | ✅ | Display name, shown in the AI prompt header (`[App context: Terminal]`) |
| `snippets[].context` | string | ✅ | Your instructions, plain text. ~500 chars works best — small models pay less attention to long instructions |
| `snippets[].id` | UUID string | ⬜ | Optional, auto-generated if omitted |
| `snippets[].enabled` | boolean | ⬜ | Optional, defaults to `true`. Set `false` to keep a snippet without using it |

Each `bundleId` should appear at most once; with duplicates, the first **enabled** one wins. A JSON error never breaks Cai — you just lose per-app enrichment until you fix the file.

## How It Works

Cai captures the bundle ID of the app you selected from and, if an enabled snippet matches, injects its context into the LLM system prompt labeled with the app name (`[App context: Terminal]`). This works identically with every provider — built-in, Apple Intelligence, or external.

### Layering: "About You" vs Context Snippets

| Layer | Where it lives | Scope | Best for |
|---|---|---|---|
| **About You** | Settings → Personalization → About You | Global (every action, every app) | "I'm a backend engineer at an e-commerce company" |
| **Context Snippets** | `~/.config/cai/snippets.json` | Per-app | "When I copy from Terminal, assume Rails context" |

Both layers stack: "About You" is always present, snippets add per-app specifics on top.

---

## Troubleshooting

**Cai shows a toast about a JSON error.** Validate with `jq . ~/.config/cai/snippets.json`. Common causes: a missing or trailing comma, unquoted strings, or a malformed `id` (omit the field entirely if unsure). Fix and save; the toast goes away.

**My snippet isn't being injected.** Check, in order: is `enabled: true`? Is the `bundleId` correct (`osascript -e 'id of app "AppName"'`)? Are you selecting from the app you think? Snippets match the **frontmost** app at the moment you pressed ⌥C.

## Privacy

`~/.config/cai/snippets.json` is a local file. Cai never sends or syncs its contents anywhere; snippets are passed only to whichever LLM provider you've configured — the same privacy boundary as everything else Cai sends to that provider.
