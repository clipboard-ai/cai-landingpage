---
title: "Common Issues"
description: "Troubleshoot common Cai issues. Fix global hotkey problems, LLM connection errors, busy ports, Apple Intelligence setup, and more."
---

# Common Issues

## Global hotkey doesn't work

- Open **System Settings → Privacy & Security → Accessibility** and make sure Cai is listed and **enabled**
- If it's listed but still not working, remove Cai from the list, then re-add it
- Check that no other app is using ⌥C (or your custom hotkey) — e.g., Raycast, Alfred, BetterTouchTool

## LLM not connecting

- Verify your server is running:
  ```bash
  curl http://127.0.0.1:1234/v1/models
  ```
- Check that the URL in Preferences matches your server's address and port
- Ollama uses port `11434`, LM Studio uses `1234` — make sure you selected the right provider
- If using a Custom URL, make sure it includes the full path (e.g., `http://127.0.0.1:1234/v1`)

## Date/meeting not detected

- Detection works best with English dates ("Tuesday at 3pm", "lunch tomorrow at noon")
- Try rephrasing: "3pm tomorrow" instead of "tomorrow 15h"
- Some informal formats may not be recognized — explicit dates work most reliably

## Calendar event has wrong details

Cai generates ICS files from detected text. For best results, include a clear date/time and optionally a location in the copied text. The ICS file opens in your default calendar app, where you can review and edit before saving.

## Built-in model can't start

Cai's built-in LLM server uses ports 8690–8699, picking the first available one. If a previous server didn't shut down cleanly, Cai automatically cleans up orphan processes on next launch.

If you still see issues, open Terminal:

```bash
# Find any leftover llama-server processes
lsof -i :8690-8699 | grep LISTEN

# Kill the process (replace <PID> with the actual process ID)
kill -9 <PID>
```

## Apple Intelligence not working

Apple Intelligence requires:

- **Apple Silicon** (M1 chip or later)
- **macOS 26** or later
- Apple Intelligence enabled in **System Settings > Apple Intelligence & Siri**

If you meet the requirements but Apple Intelligence isn't showing as a provider option, make sure you've enabled it in System Settings first, then restart Cai.

## Result text looks odd

Cai renders results as Markdown. If your LLM returns unexpected formatting, try a different model or adjust your custom prompt to request plain text output.

## Built-in model download fails

The built-in model (~2.15 GB) downloads on first launch. If the download fails:

- Check your internet connection
- Make sure you have enough disk space
- Try quitting and relaunching Cai — the download resumes where it left off
- Check the `~/Library/Application Support/Cai/models/` directory for partial downloads
