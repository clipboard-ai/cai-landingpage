---
title: "How It Works"
description: "Learn how Cai detects clipboard content, offers smart actions, and processes text with AI. Content types, context awareness, and settings."
---

# How It Works

## The Core Flow

1. **Select text** anywhere on your Mac
2. Press **⌥C** (Option+C)
3. Cai detects the content type and shows relevant actions
4. Pick an action with **↑↓** arrows or **⌘1–9**
5. The result is auto-copied to your clipboard. Just **⌘V** to paste. Or press **⌘1** to replace your original selection inline. You can also send it to an [output destination](/docs/usage/destinations/) like Slack, Bear, or a webhook.

While an action works, a **Running** pill shows progress. Results are never lost: if an action doesn't send its output anywhere, it shows in Cai, and you can page through kept results with **←/→**.

## Content Types & Actions

Cai automatically detects what you copied and offers the right actions:

| Content Type | Detection | Actions |
|---|---|---|
| **URL** | `https://...`, `www.` | Open in Browser |
| **JSON** | Valid JSON object or array | Pretty Print |
| **Meeting** | Date/time references | Create Calendar Event, Open in Maps |
| **Address** | Street patterns, "at [Place Name]" | Open in Maps |
| **Word** | 1–2 words | Define, Explain, Translate, Search |
| **Short Text** | Less than 100 characters | Explain, Reply, Fix Grammar, Translate, Search |
| **Long Text** | 100+ characters | Summarize, Reply, Fix Grammar, Translate, Search |
| **Image** | Clipboard image or screenshot | Extract Text (OCR), then all text actions |

All text types also get [**Ask AI**](#ask-ai) for free-form AI prompts.

### Context Awareness

Cai is context-aware: it detects what app you're in (email, Slack, code editor, etc.) and tailors its actions accordingly. For example, **Reply** uses this context to generate an appropriate response based on whether you're replying to an email, a chat message, or a code review comment.

### Type to Reveal Hidden Actions

The default action list is focused per content type. You won't see Reply on a meeting invite, or Fix Grammar on a single word. When you need an action that isn't shown, just **start typing its name**: filter-to-reveal surfaces every applicable action regardless of detection.

You can also explicitly hide built-in actions you don't use under **Settings → Actions → Built-in**. Hidden actions stay reachable by typing to filter — they just stop crowding the default view.

## Examples

- Select `"serendipity"` → Define, Explain, Translate, Search
- Select an email body → Reply, Summarize, Translate
- Select `"Let's meet Tuesday at 3pm at Starbucks"` → Create Calendar Event, Open in Maps
- Select `"123 Main St, NYC 10001"` → Open in Maps
- Select `https://github.com/...` → Open in Browser
- Select `{"name": "John"}` → Pretty Print JSON

## System Actions vs AI Actions

**System actions** work without any LLM server:
- Open URL in browser
- Open address in Maps (Apple or Google)
- Create calendar event (via ICS file — works with any calendar app)
- Web search
- Pretty print JSON
- Extract text from images (OCR via Apple Vision)

**AI actions** use the [built-in model](/docs/getting-started/llm-setup/) by default, or a connected external provider:
- Summarize / Explain
- Reply (context-aware responses)
- Fix Grammar
- Translate
- Define
- Ask AI (your own prompt)

### Ask AI

Ask AI runs any prompt against your selected text — it appears for every content type, first in the list unless you've pinned custom actions ahead of it:

1. Select text, press **⌥C**, and choose **Ask AI**
2. Type your instruction ("translate to Spanish", "extract all emails", "convert to a markdown table")
3. Press **⌘↵** to submit; the result is auto-copied to your clipboard

It works out of the box with the [built-in model](/docs/getting-started/llm-setup/), and you can press **⌘N** for a New Chat without any selection.

### Follow-up Questions

After any AI action returns a result, press **Tab** to ask a follow-up question. The full conversation history is sent to the LLM, so it has context from the previous result. You can chain multiple follow-ups in a single session.

Press **⌘N** to start a new chat — ask anything without clipboard content.

### Action Chaining

Every custom action and destination has a **"Then run"** field. Pipe a selection through a sequence of actions, destinations, inline LLM steps, and Apple Shortcuts in one keystroke. See [Action Chains](/docs/usage/action-chains/) for the full syntax and recipes.

## Clipboard History

Press **⌘0** in the action window to open clipboard history. Features include:

- **Search**: type to filter your history
- **Pinning**: pin important items so they stay at the top
- **Configurable size**: adjust the history limit in settings

## Settings

Left-click the Cai menu bar icon to access Settings. Main screens:

- **General** — translation language (default English), search URL (default Brave Search), maps provider (Apple or Google Maps), model provider (Built-in by default), launch at login
- **Personalization** — "About You" (global context for AI responses) and [Context Snippets](/docs/usage/context-snippets/) (per-app context)
- **Actions** — tabbed: **Custom** (your prompts, URLs, shell scripts) and **Built-in** (toggle visibility of Define, Search, etc.). Pin, drag-to-reorder, and chain via ["Then run"](/docs/usage/action-chains/)
- **Destinations** — webhooks, AppleScript, URL schemes, shell commands. Same chaining surface as Actions
- **Connections** — tabbed: **Agents** ([agent-authored actions](/docs/usage/agent-actions/) via Claude Code, Cursor, or Codex), **Tools** ([GitHub and Linear connectors](/docs/usage/connectors/)), and **System Access** ([macOS grants](/docs/usage/system-access/): Calendar, Contacts, Reminders, Accessibility, Automation)
- **Secrets** — Keychain-backed tokens for shell actions, referenced as [`{{secrets.NAME}}`](/docs/usage/secrets/)
- **Extensions** — browse and install [community extensions](/docs/usage/extensions/)

## Limits

Cai is optimized for short-to-medium selections, not full documents. Two caps apply:

| Cap | Limit | What happens when exceeded |
|---|---|---|
| **Clipboard history entry** | ~10,000 chars (~2,500 words) | Entries are clamped on save |
| **LLM input** (system + history + message) | ~50,000 chars | Oldest conversation history is dropped first |

Apple Intelligence has a tighter **4K token** context window. For long inputs, switch to Ministral 3B or an external provider. See [troubleshooting](/docs/troubleshooting/common-issues/#long-documents-get-truncated) for details.
