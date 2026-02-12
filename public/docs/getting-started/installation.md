# Installation

## Download

1. Download the `.dmg` from the [latest release](https://github.com/soyasis/cai/releases/latest)
2. Open the DMG and drag **Cai.app** to your Applications folder
3. Open the app and grant Accessibility permission (see [First Launch Setup](#first-launch-setup) below)
4. Configure your LLM server in Preferences (left-click the menu bar icon)

## Requirements

- **macOS 13.0** (Ventura) or later
- **Accessibility permission** (for the global hotkey ⌥C)
- **Local LLM server** (optional — only needed for AI-powered actions)

## First Launch Setup

On first launch, Cai will ask for Accessibility permission. This is required so Cai can use the global hotkey (⌥C) and simulate ⌘C to copy your selection — it's what allows Cai to work seamlessly across all apps.

**Step 1** — Click **Open System Settings** when prompted.

**Step 2** — Toggle Cai **on** in the Accessibility list.

You're all set! Press **⌥C** with any text selected to start using Cai.

## Build from Source

```bash
git clone https://github.com/soyasis/cai.git
cd cai/Cai
open Cai.xcodeproj
```

In Xcode:
1. Select the **Cai** scheme and **My Mac** as destination
2. **Product → Run** (⌘R)

> [!NOTE]
> The app requires Accessibility permission and runs without App Sandbox (required for global hotkey and CGEvent posting).
