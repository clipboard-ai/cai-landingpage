---
title: "Context Snippets"
description: "Teach Cai per-app context so every AI action gets smarter. Tell Cai 'when I copy from Terminal, assume Rails' or 'when I copy from Slack, match the sender's tone' — and Cai adapts automatically."
---

# Context Snippets

Context Snippets let you teach Cai **per-app context** that gets injected into every AI action. Tell Cai about your workflow once, and every Summarize, Explain, Reply, or Custom Prompt from that app gets automatically smarter.

**The classic example:** when you copy an error from Terminal, you're probably debugging a specific codebase. When you copy from Slack, you want a professional-but-casual reply. Context Snippets make Cai smart enough to know the difference — automatically, based on which app you copied from.

> **v1 is power-user territory (JSON config).** You edit a config file on disk, Cai reads it at startup, done. A full Settings UI with app picker + inline editor is coming in v1.4. If you want it sooner, [let us know](https://github.com/cai-layer/cai/issues).

---

## Quick Start

### 1. Open the config file

The fastest path: **Settings → Personalization → Context Snippets → "Open snippets.json in Finder"**. Cai highlights the file for you — double-click to open in your default editor.

Or open it directly from Terminal:

```bash
open ~/.config/cai/snippets.json
```

On first launch, Cai creates the file with an empty template:

```json
{
  "version": 1,
  "snippets": []
}
```

### 2. Find an app's bundle ID

Context Snippets match apps by their **bundle ID** (e.g. `com.apple.Terminal`), not their display name. Bundle IDs are stable across macOS languages and app rebrands.

```bash
osascript -e 'id of app "Terminal"'
# → com.apple.Terminal

osascript -e 'id of app "Slack"'
# → com.tinyspeck.slackmacgap

osascript -e 'id of app "Visual Studio Code"'
# → com.microsoft.VSCode
```

### 3. Add a snippet

Edit `~/.config/cai/snippets.json`. Only three fields are required — `bundleId`, `appName`, and `context`:

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

Save the file.

**Optional fields:**

- `id` — a UUID. Auto-generated if omitted. Only matters once the v1.4 Settings UI ships edit functionality.
- `enabled` — defaults to `true` if omitted. Set to `false` to keep a snippet around without using it.

### 4. Restart Cai

**Important:** v1 reads `snippets.json` once at startup. Quit Cai (right-click menu bar → Quit) and relaunch. The next AI action from Terminal will use your snippet automatically.

Live reload (pick up file changes without restarting) is on the roadmap for a future release.

---

## Example Snippets

Copy-paste these as starting points. Each snippet needs just three fields.

### Terminal — Rails/backend debugging

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

### Visual Studio Code — code reviews

```json
{
  "bundleId": "com.microsoft.VSCode",
  "appName": "Visual Studio Code",
  "context": "When I copy from VS Code, the content is source code or a code review comment. Explain code in plain English without dumbing it down. For reviews, be direct but constructive — point out real issues, suggest concrete improvements, no softening."
}
```

### GitHub Desktop — issue titles and PR descriptions

```json
{
  "bundleId": "com.github.GitHubDesktop",
  "appName": "GitHub Desktop",
  "context": "When I copy from GitHub Desktop, I'm writing an issue title or PR description. Use BUG:, FEAT:, CHORE:, or DOCS: prefixes for titles. Keep titles under 60 characters. Descriptions follow the 'what / why / how' format."
}
```

### Safari — research and reading

```json
{
  "bundleId": "com.apple.Safari",
  "appName": "Safari",
  "context": "When I copy from Safari, it's usually a blog post, article, or documentation I'm researching. Summarize for future reference — I want the key takeaway, not a rehash of the whole thing. Bullet points for multiple points, prose for single-idea content."
}
```

---

## Schema Reference

```json
{
  "version": 1,
  "snippets": [
    {
      "bundleId": "<reverse-DNS app identifier>",
      "appName": "<display name shown in AI prompts>",
      "context": "<your instructions, ~500 chars works best>"
    }
  ]
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `version` | integer | ✅ | Always `1` for now. Future versions will migrate automatically. |
| `snippets` | array | ✅ | Empty array `[]` is valid (no snippets configured). |
| `snippets[].bundleId` | string | ✅ | Reverse-DNS bundle ID. Find with `osascript -e 'id of app "AppName"'`. |
| `snippets[].appName` | string | ✅ | Display name. Shown in the AI prompt header (`[App context: Terminal]`). |
| `snippets[].context` | string | ✅ | Your instructions to Cai. Plain text. ~500 chars works best — longer is allowed but small models pay less attention to long instructions. |
| `snippets[].id` | UUID string | ⬜ | Optional. Auto-generated if omitted. Only matters once the v1.4 Settings UI ships edit functionality. Format: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`. |
| `snippets[].enabled` | boolean | ⬜ | Optional. Defaults to `true`. Set to `false` to keep a snippet around without using it. |

### Rules

- Each `bundleId` should appear at most once. If you have duplicates, the first **enabled** one wins.
- The whole file loads once at startup. **Restart Cai for changes to take effect.**
- If the file has a JSON error, Cai keeps running normally — you just won't get per-app enrichment until you fix the file.

---

## How It Works

When you trigger an AI action (Option+C → Summarize, Translate, Reply, etc.), Cai:

1. Captures the **bundle ID** of whatever app you copied from
2. Looks up an enabled snippet matching that bundle ID
3. If found, injects the snippet into the LLM system prompt as a structured section:

```
About the user: <your "About You" field, if set>

[App context: Terminal]
<your snippet's context text>

<the action's system prompt — e.g., "Output only the summary...">
```

The `[App context: ...]` label is important — it tells smaller AI models (like Ministral 3B) that the next chunk is contextual information about the app, separate from the action it's being asked to perform.

### Layering: "About You" vs Context Snippets

Cai has two layers of personalization:

| Layer | Where it lives | Scope | Best for |
|---|---|---|---|
| **About You** | Settings → Personalization → About You | Global (every action, every app) | "I'm a backend engineer at an e-commerce company" |
| **Context Snippets** | `~/.config/cai/snippets.json` | Per-app | "When I copy from Terminal, assume Rails context" |

Both layers stack automatically — your "About You" context is always present, and Context Snippets add per-app specifics on top. They never conflict.

---

## Troubleshooting

### "I edited the file but nothing changed"

Did you restart Cai? v1 only reads `snippets.json` at startup. Quit Cai (right-click menu bar → Quit) and relaunch.

### "Cai shows a toast about a JSON error"

Your file has a syntax error. Validate it with:

```bash
jq . ~/.config/cai/snippets.json
```

If `jq` reports an error, that's the issue. Common causes:

- Missing comma between fields
- Trailing comma after the last item in an array
- Unquoted strings (every key and string value must be in `"double quotes"`)
- Invalid UUID in the optional `id` field (if present, must be `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX` format — or omit the field entirely)

Fix the file, restart Cai, and the toast will go away.

### "My snippet isn't being injected"

Check, in order:

1. Is `enabled: true`?
2. Is the `bundleId` correct? Verify with `osascript -e 'id of app "AppName"'`.
3. Did you restart Cai after editing the file?
4. Are you actually copying *from* the app you think? Context Snippets match the **frontmost** app at the moment you pressed Option+C.

---

## FAQ

### Why JSON instead of a Settings UI?

v1 ships JSON-only to get the feature into power users' hands quickly. The Settings UI is coming in v1.4 — it'll add a list view, app picker (running apps + Finder fallback), inline editor, character counter, and enable toggle, all without changing the JSON format. If you want the UI sooner, [let us know](https://github.com/cai-layer/cai/issues).

### What happens if I add a snippet for an app that's not installed?

Nothing bad — the snippet just never matches anything. The v1.4 Settings UI will grey out snippets for uninstalled apps.

### Can I share my snippets with my team?

Not yet. v1 is local-only. In a future release, team-shared snippet packs are planned.

### Will my snippets sync across machines?

Not yet. A "Settings Export / Import" feature is on the roadmap and will let you move all your Cai settings (including snippets) between Macs in one file.

### How long can a context snippet be?

Technically unlimited, but **~500 characters works best**. Longer snippets:

- Cost more tokens per LLM call (adds up across many actions)
- Get less attention from small models
- Can crowd out the actual clipboard content

If you need more, consider splitting into multiple shorter snippets per app, or moving generic context into the global "About You" field.

### Does this work with all AI providers?

**Yes — all providers.** The snippet is injected into the system prompt at the message-construction layer, before any provider-specific code runs. Whether you're using the built-in MLX model, Apple Intelligence, LM Studio, or Ollama, Context Snippets work identically.

### What about privacy?

`~/.config/cai/snippets.json` is a local file on your Mac. Cai never reads, sends, syncs, or telemeters the contents. The snippets are passed to whichever LLM provider you've configured — same privacy boundary as everything else Cai sends to that provider.
