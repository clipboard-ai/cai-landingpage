---
title: "Installation"
description: "Download and install Cai on macOS. Requirements, first launch setup, and accessibility permissions."
---

# Installation

## Download

1. Download the `.dmg` from the [latest release](https://github.com/cai-layer/cai/releases/latest)
2. Open the DMG and drag **Cai.app** to your Applications folder
3. Open the app and grant Accessibility permission (see [First Launch Setup](#first-launch-setup) below)
4. A built-in MLX model downloads on first launch. You can switch to Apple Intelligence (macOS 26+) or connect your own provider in Preferences at any time — see [LLM Setup](/docs/getting-started/llm-setup/)

---

## Requirements

- **macOS 13.0** (Ventura) or later
- **Accessibility permission** (for the global hotkey ⌥C)
- **LLM provider** — Cai includes a built-in model. You can also use Apple Intelligence (macOS 26+) or any local/cloud provider

---

## First Launch Setup

On first launch, Cai will ask for Accessibility permission. This is required so Cai can use the global hotkey (⌥C) and simulate ⌘C to copy your selection — it's what allows Cai to work seamlessly across all apps.

**Step 1** — Click **Open System Settings** when prompted.

**Step 2** — Toggle Cai **on** in the Accessibility list.

You're all set! Press **⌥C** with any text selected to start using Cai.

---

## Building from Source

Want to build Cai yourself or contribute? See [Build from Source](https://github.com/cai-layer/cai#build-from-source) in the repository README.
