---
title: "Community Extensions"
description: "Browse and install community-built extensions for Cai. Pre-built shortcuts and destinations shared by other users."
---

# Community Extensions

Community extensions are pre-built [shortcuts](/docs/usage/shortcuts) and [destinations](/docs/usage/destinations) shared by other Cai users. Browse and install them from the [cai-extensions](https://github.com/clipboard-ai/cai-extensions) repository.

## How to Install

1. Find an extension in the [community repository](https://github.com/clipboard-ai/cai-extensions)
2. Copy the extension block (a `# cai-extension` YAML snippet) to your clipboard
3. Cai detects it automatically and shows a trust confirmation dialog
4. Review the extension details — name, type, author — and click **Install** if you trust it

The extension is added as a shortcut or destination in your Cai settings.

## Extension Types

| Type | What it does | Installs as | Needs LLM? |
|------|-------------|-------------|------------|
| `prompt` | Sends clipboard text to the LLM with a custom instruction | Shortcut | Yes |
| `url` | Opens a URL with `%s` replaced by clipboard text | Shortcut | No |
| `shell` | Runs a shell command with the text | Shortcut | No |
| `webhook` | Sends text to an HTTP endpoint | Destination | No |
| `deeplink` | Opens a URL scheme / deep link | Destination | No |
| `applescript` | Runs an AppleScript with the text | Destination | No |

**Shortcuts** appear as actions in the Cai action window — you trigger them just like built-in actions. **Destinations** are output targets that receive text after an action runs (or directly from clipboard).

## Security

Cai takes a cautious approach to community extensions:

- **Trust confirmation** — Every extension shows a Gatekeeper-style dialog before installation. You always see what it does before it's added.
- **AppleScript and shell types are blocked** — Extensions cannot install AppleScript or shell command destinations via clipboard install. Only safe types (prompt, URL, webhook, deeplink) are allowed.
- **No auto-execution** — Extensions are never run automatically. You must explicitly trigger them like any other action.

> **Caution:** Only install extensions from sources you trust. While dangerous types are blocked, webhook destinations can still send your text to external servers. Always review the extension details before installing.

---

## Creating an Extension

Each extension is a single YAML file inside a folder in the community repository. Here's how to create one.

### Required Fields

Every `extension.yaml` must start with `# cai-extension` on the first line and include these fields:

| Field | Description |
|-------|-------------|
| `name` | Display name shown in Cai (title case) |
| `description` | One-line summary — what users see when browsing |
| `author` | Your GitHub username |
| `version` | Version string, quoted (e.g. `"1.0"`) |
| `tags` | Array of lowercase tags for search/filtering |
| `icon` | [SF Symbol](https://developer.apple.com/sf-symbols/) name (e.g. `envelope.fill`) |
| `type` | `prompt`, `url`, `webhook`, or `deeplink` |

### Prompt Shortcut

Sends clipboard text to the LLM with your instruction:

```yaml
# cai-extension
name: Professional Email
description: Rewrite text as a polished professional email
author: your-github-username
version: "1.0"
tags: [writing, email]
icon: envelope.fill
type: prompt
prompt: |
  Rewrite the following text as a professional email.
  Keep the core message but make it polished and clear.
  Include a greeting and sign-off.
  Do not use any markdown formatting.
```

**Prompt tips:**

- Be specific about format, tone, and what to preserve
- Include "Do not use any markdown formatting" — output goes to clipboard, not a renderer
- Don't add preambles like "The user has copied:" — Cai handles that automatically
- Don't include `{{text}}` or `{{clipboard}}` placeholders — text is passed automatically
- Cai's system prompt already says "Output ONLY the processed text" — don't repeat that

### URL Shortcut

Opens a URL with `%s` replaced by the clipboard text:

```yaml
# cai-extension
name: Search StackOverflow
description: Search StackOverflow for the selected text
author: your-github-username
version: "1.0"
tags: [developer, search]
icon: magnifyingglass
type: url
url: "https://stackoverflow.com/search?q=%s"
```

The clipboard text is automatically URL-encoded.

### Webhook Destination

Sends text to an HTTP endpoint:

```yaml
# cai-extension
name: Send to Slack
description: Post text to a Slack channel via webhook
author: your-github-username
version: "1.0"
tags: [productivity, slack]
icon: bubble.left.fill
type: webhook
show_in_action_list: true
webhook:
  url: "{{slack_webhook_url}}"
  method: POST
  headers:
    Content-Type: application/json
  body: '{"text": "{{result}}"}'
setup:
  - key: slack_webhook_url
    label: Slack Webhook URL
    secret: false
```

### Deeplink Destination

Opens a URL scheme / deep link with the result text:

```yaml
# cai-extension
name: Save to Bear
description: Create a new note in Bear
author: your-github-username
version: "1.0"
tags: [productivity, notes]
icon: doc.text
type: deeplink
show_in_action_list: true
deeplink: "bear://x-callback-url/create?text={{result}}"
```

### Template Placeholders

| Placeholder | Used in | Description |
|-------------|---------|-------------|
| `%s` | URL shortcuts | Replaced with clipboard text (URL-encoded) |
| `{{result}}` | Destinations | Replaced with the text to send (auto-escaped per destination type) |
| `{{field_key}}` | Destinations | Replaced with user-configured setup field value |

### Setup Fields

Setup fields let users configure values like API keys and webhook URLs when they first use the extension. Define them with the `setup` key:

```yaml
setup:
  - key: api_key
    label: "API Key"
    secret: true    # stored in Keychain, masked in UI
  - key: channel
    label: "Channel Name"
    secret: false
```

Reference them in your templates with `{{key_name}}`.

---

## Submitting an Extension

### Share from Cai (recommended)

The easiest way to share a shortcut or destination you've built:

1. Open **Settings > Custom Shortcuts** (or **Output Destinations**)
2. Click the **share icon** (↗) on the shortcut or destination you want to share
3. Cai copies the extension YAML to your clipboard and opens the community repo
4. Fork the repo, create a folder under `extensions/` with a kebab-case name (e.g. `professional-email`)
5. Paste the YAML as `extension.yaml` and open a pull request

The generated YAML includes all the required fields. You just need to update `author` to your GitHub username, write a short `description`, and add relevant `tags`.

### Create manually

You can also write the YAML by hand:

1. Fork the [cai-extensions](https://github.com/clipboard-ai/cai-extensions) repository
2. Create a folder under `extensions/` with a kebab-case name
3. Add an `extension.yaml` file inside it (must start with `# cai-extension`)
4. Open a pull request

All PRs require review and approval before merging.

### Guidelines

- **One extension per folder** — keep it focused
- **Test your extension** in Cai before submitting (copy the YAML, press Option+C)
- **Use [SF Symbol](https://developer.apple.com/sf-symbols/) names** for icons
- **Write a clear description** — one sentence, no period
- **No API keys in YAML** — use `setup` fields for secrets
- **No `applescript` or `shell` types** — these are not accepted from community contributors

### What Happens After You Submit

1. CI validates your YAML automatically (required fields, format, type)
2. A maintainer reviews your extension
3. Once approved and merged, the extension appears in the community repository
