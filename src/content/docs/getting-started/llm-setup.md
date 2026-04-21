---
title: "LLM Setup"
description: "Set up AI models for Cai. Use the built-in MLX models, Apple Intelligence on macOS 26+, LM Studio, Ollama, OpenRouter, or any OpenAI-compatible provider."
---

# LLM Setup

Cai works with three kinds of model providers: the **built-in MLX models** (default, local), **Apple Intelligence** (macOS 26+, on-device), and **external providers** like LM Studio, Ollama, or cloud APIs like OpenRouter.

---

## Built-in MLX Models

The default. Cai ships with a small picker of MLX models that run **in-process** on Apple Silicon: no external server, no subprocess, no configuration needed. Models stream tokens progressively, so long responses appear word-by-word instead of waiting for the full reply.

The built-in model handles all AI-powered actions out of the box: Summarize, Reply, Fix Grammar, Translate, Explain, and Ask AI.

### Curated Models

Cai includes a small, curated picker with two MLX models:

| Slot        | Model        | Download | RAM tier | Why it's there                                                               |
| ----------- | ------------ | -------- | -------- | ---------------------------------------------------------------------------- |
| **Default** | Ministral 3B | ~1.8 GB  | 8 GB+    | Best quality-to-size ratio — on par with Apple Intelligence for most actions |
| **Power**   | Qwen 2.5 7B  | ~4.3 GB  | 16 GB+   | Highest quality, slower — for capable Macs                                   |

Pick one from the model picker in **Settings**, or click the **chip icon** in the action view. Cai downloads the model in the background and switches automatically when ready.

### Any Model from HuggingFace MLX Community 🤗

Beyond the curated picker, Cai supports **any MLX model** from the [HuggingFace mlx-community](https://huggingface.co/mlx-community): thousands of open-source models, all optimized for Apple Silicon.

To load one, open the model picker in **Settings** and paste the HuggingFace repo ID:

```
mlx-community/Llama-3.2-3B-Instruct-4bit
mlx-community/Mistral-7B-Instruct-v0.3-4bit
mlx-community/Phi-3.5-mini-instruct-4bit
mlx-community/DeepSeek-R1-Distill-Qwen-7B-4bit
```

Cai downloads, converts, and loads the model automatically. Browse the [mlx-community on HuggingFace](https://huggingface.co/mlx-community) for the full catalog. New models are added daily.

> **Tip:** Look for `4bit` or `8bit` in the repo name. These are quantized versions that use less RAM and run faster, with minimal quality loss.

---

## Apple Intelligence

Available on Macs with an M1 chip or later running **macOS 26+**. Apple Intelligence runs fully on-device via the Neural Engine and uses ~36 MB of RAM, a great option if you want the absolute lightest footprint.

Apple Intelligence handles all AI-powered actions: Summarize, Reply, Fix Grammar, Translate, Explain, and Ask AI. Select it from the model picker in **Settings**, no download or API key needed.

> **Trade-off:** Apple Intelligence has a hard **4K token context window**, much smaller than typical local models (8K–32K) or cloud providers (128K+). This means long documents and long follow-up conversations may get truncated. For very long inputs, switch to a built-in MLX model or an external provider with a larger context window.
>
> Cai also caps total LLM input at **~50,000 characters** (system prompt + history + message) across all providers to prevent freezes. Oldest history is dropped first when the cap is hit. See [Limits](/docs/usage/how-it-works/#limits).

---

## External Providers

Want a different or larger model? Cai works with any OpenAI-compatible server, local or remote. Just switch the provider in settings.

### Supported Providers

| Provider       | Default URL                    | Setup                                                                                     |
| -------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| **LM Studio**  | `http://127.0.0.1:1234/v1`     | [Download](https://lmstudio.ai) → Load a model → Start server                             |
| **Ollama**     | `http://127.0.0.1:11434/v1`    | [Install](https://ollama.ai) → `ollama pull llama3.2`                                     |
| **OpenRouter** | `https://openrouter.ai/api/v1` | [Get API key](https://openrouter.ai/keys) → Enter in Cai settings                         |
| **Anthropic**  | `https://api.anthropic.com/v1` | [Get API key](https://console.anthropic.com) → Enter in Cai settings                      |
| **Mistral**    | `https://api.mistral.ai/v1`    | [Get API key](https://console.mistral.ai) → Enter in Cai settings                         |
| **Custom**     | User-defined                   | Any OpenAI-compatible endpoint (Jan AI, LocalAI, Open WebUI, GPT4All, or your own server) |

### How to Configure

1. Left-click the **Cai menu bar icon** (or click the Cai logo in the action window footer)
2. Select your **Model Provider** from the dropdown
3. If using **Custom**, enter your server's full URL

That's it. Cai will use your external LLM instead of the built-in model.

### API Key (Optional)

If your server requires authentication (e.g., cloud providers), enter your API key in Cai's settings. The key is stored locally on your Mac and sent only to the server you configure, never to Cai or any third party.

### OpenRouter

**[OpenRouter](https://openrouter.ai)** is a gateway to 400+ models through a single API key. A good option if you want to switch between frontier models without managing separate accounts per provider.

**Setup:**

1. Create an account and add credits at [openrouter.ai](https://openrouter.ai)
2. Generate an API key at [openrouter.ai/keys](https://openrouter.ai/keys)
3. Open Cai → **Settings** → **Model Provider** → **OpenRouter**
4. Paste your key
5. Pick a model slug in the **Model** field (e.g. `anthropic/claude-opus-4.7` or `openai/gpt-5.4-mini`)

Once your key is saved, Cai fetches the full model catalog from your account so you can browse and switch models from a picker. You can also paste a slug manually if you know what you want.

**Cost:** pay-per-use, billed to your OpenRouter account. See [openrouter.ai/models](https://openrouter.ai/models) for current pricing.

**Privacy note:** requests go through OpenRouter to the selected upstream provider. If you want a fully local and private setup, use a built-in MLX model, Apple Intelligence, or LM Studio / Ollama instead.

---

## Choosing a Model

Not sure which model to pick? Here's how to think about it.

### The Trade-offs

Every model has three knobs: size, speed, and quality. Bigger models are smarter but slower and use more RAM. Smaller models are faster and lighter but make more mistakes.

For Cai's typical workloads (summarize, translate, fix grammar, reply), even small models do really well. You don't need a 70B-parameter model to fix a typo.

### By Mac Specs

| Your Mac                   | Recommended model                   | Why                                                        |
| -------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| **8 GB RAM**               | Ministral 3B _(default)_            | Best quality-to-size ratio, on par with Apple Intelligence |
| **16 GB+ RAM**             | Qwen 2.5 7B                         | Highest quality, slower — for capable Macs                 |
| **macOS 26+, M1 or later** | Apple Intelligence                  | Native, ~36 MB RAM, runs on Neural Engine                  |
| **Beyond curated**         | Any HuggingFace mlx-community model | Paste a repo ID in Settings (see above)                    |

### Understanding Quantization (4-bit vs 8-bit)

You'll see things like `4bit` or `8bit` in HuggingFace model names. **Quantization** is how the model's weights are stored. Lower bits = smaller files, less RAM, faster, with slightly less accuracy.

| Format          | RAM         | Speed   | Quality                  | Use when                                           |
| --------------- | ----------- | ------- | ------------------------ | -------------------------------------------------- |
| **4-bit**       | ~½ of 8-bit | Fastest | Very good for most tasks | **Default choice** — best balance for everyday use |
| **8-bit**       | 2× of 4-bit | Slower  | Slightly more accurate   | You need maximum quality and have plenty of RAM    |
| **fp16 / bf16** | 4× of 4-bit | Slowest | Original quality         | Almost never needed for chat/text actions          |

**Concrete example: Llama 3.2 3B**

- `4bit` → ~1.8 GB RAM, fast on M1
- `8bit` → ~3.5 GB RAM, slightly more nuanced answers
- `fp16` → ~6 GB RAM, marginal improvement

**Rule of thumb:**

- **Start with 4-bit.** It's what 95% of users want. Modern quantization (especially MLX's GPTQ-style) is so good you usually can't tell the difference.
- **Try 8-bit** if you notice the model making factual errors, getting confused on long context, or you're doing serious coding/reasoning tasks. The quality bump is real but small.
- **Skip fp16** unless you're benchmarking. The RAM cost isn't worth it for short-form actions.

For Cai specifically (short prompts, quick actions), **4-bit is almost always the right choice**.

### Browse More Models

The [HuggingFace mlx-community](https://huggingface.co/mlx-community) has thousands of MLX-optimized models. New ones are added daily. Filter by your needs:

- **Code:** look for `Qwen-Coder`, `DeepSeek-Coder`, `Codestral`
- **Reasoning:** `Qwen3`, `DeepSeek-R1`, `Llama-3.3`
- **Lightweight:** `Phi-3.5-mini`, `Gemma-2-2B`, `Llama-3.2-1B`

---

## Verify Your Server

You can confirm your external LLM server is running by opening Terminal and running:

```bash
# LM Studio (default)
curl http://127.0.0.1:1234/v1/models

# Ollama
curl http://127.0.0.1:11434/v1/models
```

If you get a JSON response listing models, your server is ready.

> **Note:** Cai uses the OpenAI-compatible `/v1/chat/completions` endpoint. Any server (local or cloud) that implements this API will work.
