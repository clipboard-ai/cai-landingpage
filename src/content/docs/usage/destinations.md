---
title: "Custom Destinations"
description: "Send Cai results to any app or service. Configure webhooks, AppleScript, URL schemes, and shell commands for automated workflows."
---

# Custom Destinations

By default, Cai copies results to your clipboard. You can also replace your original selection inline, or send results to any app or service.

Destinations can receive AI-processed text (after an action runs) or your raw selected text directly.

## Replace Selection

**Replace Selection** is a built-in destination that pastes the AI result directly over the text you originally selected, replacing it inline. It's enabled by default and pinned to **⌘1** in the result view.

When you use it, Cai:

1. Dismisses the action window
2. Reactivates the app you were in
3. Pastes the AI result over your selection
4. Restores your original clipboard contents

This is perfect for "fix grammar and replace," "translate in place," or any action where you want the result to overwrite the source text.

> **Safety:** If you switch to a different app while Cai is processing, it won't paste into the wrong window. Instead, it copies the result to your clipboard so you can paste manually.

## Custom Destination Types

| Type              | Use Case                                | Example                                            |
| ----------------- | --------------------------------------- | -------------------------------------------------- |
| **Webhook**       | Send to any API via HTTP POST/PUT/PATCH | Post to a Slack channel, create a Notion page      |
| **AppleScript**   | Control any macOS app                   | Add to Things, Shortcuts, create an OmniFocus task |
| **URL Scheme**    | Open deep links with your text          | Save to Bear, open in Obsidian                     |
| **Shell Command** | Run terminal commands and scripts       | Append to a log file, pipe to a script             |

> **Caution:** Shell Command and AppleScript destinations execute code on your Mac with your user-level permissions. They can modify files, send network requests, and control other applications. Only create these destinations if you understand exactly what the script does. Never paste commands from untrusted sources. The authors of Cai are not responsible for any damage or data loss caused by user-created scripts.

## Template Placeholders

Use these placeholders in your destination templates:

- **`{{result}}`**: your selected text or AI-processed text (auto-escaped for the destination type)
- **`{{field_key}}`**: value from a setup field (e.g. `{{api_key}}` for API tokens)

Text is automatically escaped based on the destination type — JSON encoding for webhooks, percent-encoding for URL schemes, AppleScript string escaping for AppleScript, and single-quote wrapping for shell commands.

> **Shell destinations differ from Shell custom actions.** In **destinations**, `{{result}}` is auto-wrapped in single quotes — write `curl -d {{result}}`, not `curl -d '{{result}}'`. In **custom actions**, you wrap the placeholder yourself (see [Custom Actions](/docs/usage/saved-actions/)).

## Setup Fields

Setup fields let you store values like API keys and tokens separately from your template. They're resolved at execution time and masked in the UI.

To add a setup field, click **Add Field** when creating a destination. Reference it in your template with `{{field_key}}` where `field_key` is the name you gave it.

## Show in Action List

Enable **"Show in action list"** to make a destination appear as a direct action in the Cai action window. This skips the AI step entirely. Useful for quick-send workflows like "Send to Slack" or "Save to Bear" directly from your selection.

## Creating a Destination

1. Left-click the **Cai menu bar icon** to open Preferences
2. Go to **Custom Destinations**
3. Click **+** to add a new destination
4. Choose a **type** (Webhook, AppleScript, URL Scheme, or Shell Command)
5. Give it a **name** and configure the template
6. Optionally add **setup fields** for API keys or tokens
7. Optionally enable **"Show in action list"** for direct access
8. Click **Save**

## Examples

### Append to a Daily Journal

- **Type:** Shell Command
- **Command:** `echo "[$(date '+%Y-%m-%d %H:%M')] {{result}}" >> ~/journal.md`

Appends the result to a Markdown file with a timestamp — great for logging quick notes, ideas, or AI-generated summaries throughout the day.

> **Sending to GitHub or Linear?** Use the [GitHub or Linear connector](/docs/usage/connectors/) instead of shelling out to `gh` — they provide structured forms, duplicate detection, and proper API integration.

### Save to Bear

- **Type:** URL Scheme
- **URL:** `bear://x-callback-url/create?text={{result}}`

### Post to Slack via Webhook

- **Type:** Webhook
- **Method:** POST
- **URL:** `https://hooks.slack.com/services/{{webhook_url}}`
- **Body:**
  ```json
  { "text": "{{result}}" }
  ```
- **Setup field:** `webhook_url` → your Slack webhook path
