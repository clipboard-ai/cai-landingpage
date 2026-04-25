---
title: "Community Extensions"
description: "Browse and install community-built extensions for Cai. Pre-built custom actions and destinations shared by other users."
---

# Community Extensions

Community extensions are pre-built [custom actions](/docs/usage/saved-actions) and [destinations](/docs/usage/destinations) shared by other Cai users. Browse and install them directly from the in-app extension browser, or from the [cai-extensions](https://github.com/cai-layer/cai-extensions) repository on GitHub.

## How to Install

1. Open **Settings > Community Extensions**
2. Browse available extensions
3. Click **Install** on the extension you want
4. The extension is added as a custom action or destination in your Cai settings

To uninstall, go back to Community Extensions and click the extension again.

> **Tip:** You can also install extensions by copying a `# cai-extension` YAML snippet to your clipboard. Cai detects it automatically and shows a trust confirmation dialog. This is useful for installing extensions shared outside the community repository.

## Extension Types

| Type          | What it does                                              | Installs as | Needs LLM? |
| ------------- | --------------------------------------------------------- | ----------- | ---------- |
| `prompt`      | Sends clipboard text to the LLM with a custom instruction | Action      | Yes        |
| `url`         | Opens a URL with `%s` replaced by clipboard text          | Action      | No         |
| `shell`       | Runs a shell command with the text                        | Action      | No         |
| `webhook`     | Sends text to an HTTP endpoint                            | Destination | No         |
| `deeplink`    | Opens a URL scheme / deep link                            | Destination | No         |
| `applescript` | Runs an AppleScript with the text                         | Destination | No         |

**Custom actions** appear in the Cai action window. You trigger them just like built-in actions. **Destinations** are output targets that receive text after an action runs (or directly from clipboard).

## Security

Cai takes a cautious approach to community extensions:

- **Trust confirmation**: every extension shows a confirmation dialog before installation, whether installed from the in-app browser or via clipboard. You always see what it does before it's added.
- **AppleScript and shell types cannot be installed via clipboard**: these types are blocked from clipboard install for safety. You can install them through the in-app extension browser or create them manually in Settings.
- **No auto-execution**: extensions are never run automatically. You must explicitly trigger them like any other action.

> **Caution:** Only install extensions from sources you trust. Even though dangerous types are blocked, webhook destinations can still send your text to external servers. Always review the extension details before installing.

---

## Creating an Extension

Each extension is a single YAML file inside a folder in the community repository. Here's how to create one.

### Required Fields

Every `extension.yaml` must start with `# cai-extension` on the first line and include these fields:

| Field         | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `name`        | Display name shown in Cai (title case)                                           |
| `description` | One-line summary — what users see when browsing                                  |
| `author`      | Your GitHub username                                                             |
| `version`     | Version string, quoted (e.g. `"1.0"`)                                            |
| `tags`        | Array of lowercase tags for search/filtering                                     |
| `icon`        | [SF Symbol](https://developer.apple.com/sf-symbols/) name (e.g. `envelope.fill`) |
| `type`        | `prompt`, `url`, `webhook`, or `deeplink`                                        |

### Prompt Action

Sends your selected text to the LLM with your instruction:

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

### URL Action

Opens a URL with `%s` replaced by your selected text:

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

Your selected text is automatically URL-encoded.

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

### Shell Action

Runs a shell command with your selected text. Shell actions can't be installed via clipboard for safety — create them locally in Cai's Custom Actions settings or install them through the in-app extension browser.

```yaml
# cai-extension
name: Kill Port
description: Kill the process running on a given port number
author: your-github-username
version: "1.0"
tags: [developer, system]
icon: xmark.circle.fill
type: shell
shell: lsof -ti :{{result}} | xargs kill -9 && echo "Killed process on port {{result}}"
```

Use `{{result}}` for your selected text. Note: substitution is **raw**, not escaped — always quote it (`'{{result}}'`) when the text may contain spaces or special characters.

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

| Placeholder     | Used in                               | Description                                                                                                                                                                |
| --------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `%s`            | URL actions (`type: url`)             | Replaced with selected text, **URL-encoded** automatically                                                                                                                 |
| `{{result}}`    | Shell, webhook, deeplink, AppleScript | Replaced with selected text. Escaping varies by type: JSON for webhooks, percent-encoding for deeplinks, AppleScript escaping for AppleScript, **raw/unescaped for shell** |
| `{{field_key}}` | Any destination with `setup:`         | Replaced with user-configured setup field value (from Keychain or UserDefaults)                                                                                            |

> **Shell actions are raw.** `{{result}}` is substituted verbatim into shell commands. Always wrap it in quotes (`"{{result}}"` or `'{{result}}'`), and for URL-encoded use cases prefer a URL action over a shell action. See [cai-extensions shell examples](https://github.com/cai-layer/cai-extensions/tree/main/extensions) for working patterns.

### Setup Fields

Setup fields let users configure values like API keys and webhook URLs when they first use the extension. Define them with the `setup` key:

```yaml
setup:
  - key: api_key
    label: "API Key"
    secret: true # stored in Keychain, masked in UI
  - key: channel
    label: "Channel Name"
    secret: false
```

Reference them in your templates with `{{key_name}}`.

---

## Submitting an Extension

### Share from Cai (recommended)

The easiest way to share a custom action or destination you've built:

1. Open **Settings > Custom Actions** (or **Custom Destinations**)
2. Click the **share icon** (↗) on the custom action or destination you want to share
3. Cai copies the extension YAML to your clipboard and opens the community repo
4. Fork the repo, create a folder under `extensions/` with a kebab-case name (e.g. `professional-email`)
5. Paste the YAML as `extension.yaml` and open a pull request

The generated YAML includes all the required fields. You just need to update `author` to your GitHub username, write a short `description`, and add relevant `tags`.

### Create manually

You can also write the YAML by hand:

1. Fork the [cai-extensions](https://github.com/cai-layer/cai-extensions) repository
2. Create a folder under `extensions/` with a kebab-case name
3. Add an `extension.yaml` file inside it (must start with `# cai-extension`)
4. Open a pull request

All PRs require review and approval before merging.

### Guidelines

- **One extension per folder**: keep it focused
- **Test your extension** in Cai before submitting (copy the YAML, press Option+C)
- **Use [SF Symbol](https://developer.apple.com/sf-symbols/) names** for icons
- **Write a clear description**: one sentence, no period
- **No API keys in YAML**: use `setup` fields for secrets
- **`applescript` and `shell` types require extra review**: these are accepted but will be scrutinized more carefully before merging

### What Happens After You Submit

1. CI validates your YAML automatically (required fields, format, type)
2. A maintainer reviews your extension
3. Once approved and merged, the extension appears in the community repository
