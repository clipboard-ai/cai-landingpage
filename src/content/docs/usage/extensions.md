---
title: "Community Extensions"
description: "Browse and install community-built extensions for Cai. Pre-built shortcuts and destinations shared by other users."
---

# Community Extensions

Community extensions are pre-built shortcuts and destinations shared by other Cai users. You can browse and install them from the [cai-extensions](https://github.com/clipboard-ai/cai-extensions) repository.

## How to Install

1. Find an extension in the [community repository](https://github.com/clipboard-ai/cai-extensions)
2. Copy the extension block (a `# cai-extension` YAML snippet) to your clipboard
3. Cai detects it automatically and shows a trust confirmation dialog
4. Review the extension details — name, type, author — and click **Install** if you trust it

The extension is added as a shortcut or destination in your Cai settings.

## Security

Cai takes a cautious approach to community extensions:

- **Trust confirmation** — Every extension shows a Gatekeeper-style dialog before installation. You always see what it does before it's added.
- **AppleScript and shell types are blocked** — Extensions cannot install AppleScript or shell command destinations. Only safe types (prompt shortcuts, URL shortcuts, webhooks, URL schemes) are allowed via clipboard install.
- **No auto-execution** — Extensions are never run automatically. You must explicitly trigger them like any other action.

> **Caution:** Only install extensions from sources you trust. While dangerous types are blocked, webhook destinations can still send your text to external servers. Always review the extension details before installing.

## Browse Extensions

Visit the [community extensions repository](https://github.com/clipboard-ai/cai-extensions) to browse available extensions and learn how to contribute your own.
