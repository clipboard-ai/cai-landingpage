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

## Built-in model uses too much memory

The built-in MLX model runs in-process and can use ~2 GB of RAM while loaded. To free that memory immediately, switch to **Apple Intelligence** (macOS 26+) or any external provider in Settings — Cai unloads the MLX model and reclaims the RAM as soon as you switch.

If you want a model that uses less RAM, the default **Ministral 3B** (~1.8 GB) is already the lightest in the curated picker. On macOS 26+, switching to **Apple Intelligence** uses far less RAM (~36 MB) since it runs on the Neural Engine.

## Built-in model is slow or unresponsive

If the built-in MLX model feels slow:

- Stick with the default **Ministral 3B** — it's the lightest and fastest in the curated picker
- Make sure no other heavy app is using GPU/Neural Engine resources
- On macOS 26+ with Apple Silicon, switch to **Apple Intelligence** — it uses ~60× less RAM and runs natively on the Neural Engine

## Apple Intelligence not working

Apple Intelligence requires:

- **Apple Silicon** (M1 chip or later)
- **macOS 26** or later
- Apple Intelligence enabled in **System Settings > Apple Intelligence & Siri**

If you meet the requirements but Apple Intelligence isn't showing as a provider option, make sure you've enabled it in System Settings first, then restart Cai.

## Result text has stray markdown characters

Cai renders basic markdown in results, but most actions instruct the LLM to return plain text and Unicode bullets — no `**bold**`, `__italic__`, or markdown tables. A few actions (like Define) may use light markdown intentionally.

If you see stray or unwanted markdown characters in results, it usually means the model is ignoring the formatting instructions:

- Try a different model — smaller models sometimes ignore formatting instructions
- For custom prompts, add an explicit "Output plain text only, no markdown" line at the end
- The built-in Ministral 3B and Apple Intelligence are tuned to follow these instructions reliably

## Built-in model download fails

The built-in MLX model downloads on first launch (size depends on which model you picked). If the download fails:

- Check your internet connection
- Make sure you have enough disk space
- Closing Cai during a download is safe — the download continues in the background and resumes if needed
- The default Ministral 3B is ~1.8 GB — for slower connections, this is already the smaller of the curated options

## Long documents get truncated

Cai caps the total input sent to the LLM at **50,000 characters** (system prompt + conversation history + your latest message). This prevents memory issues and freezes when summarizing long documents. If your input exceeds the cap, older conversation history is dropped first to make room for the latest message.

For very long documents, try splitting them into chunks and processing each separately.

## App freezes or slows down after copying large text

Cai limits clipboard processing to ~10,000 characters (~2,500 words) to prevent performance issues. If you copy very large documents, Cai silently truncates the text. This is by design — Cai is optimized for short-to-medium text selections, not full documents.
