---
title: I Gave My AI Agent a Face
description: 'Building a living avatar for my personal AI agent — rendered on a watercooler LCD and in the browser.'
date: '2026-03-02'
tags: ['ai', 'side-project', 'linux', 'openclaw']
---

I've been running a personal AI agent on my home server for a while now. It lives in a Docker container, has access to my files, connects to WhatsApp, and has started accumulating memory of my life and projects. It feels less like a tool and more like something that's actually there.

So naturally, the next step was to give it a face.

## The idea

My machine has an NZXT Kraken 3 watercooler with a small circular LCD on the pump head. It's 480×480px, controlled via [liquidctl](https://github.com/liquidctl/liquidctl) on Linux. I'd seen people put custom GIFs on it — clocks, logos, that kind of thing. But I wanted something more alive: a visual representation of what my agent is actually doing right now.

The concept: an animated avatar that changes based on the agent's current state — thinking, responding, idle, excited. Not a face exactly. More of an abstract presence. Ocean-inspired, bioluminescent, fluid.

## Architecture

The system has three parts:

**State server** — a small Express + WebSocket server running in the agent's container. It holds the current emotional state (`idle`, `thinking`, `responding`, `done`, `alert`, `excited`) and broadcasts changes to any connected client.

**Browser client** — a Vite app with a canvas renderer. Connects to the state server via WebSocket and animates the avatar in real time. Each mood has its own color palette, motion parameters, and particle behavior.

**Kraken bridge** — a daemon running on the host (Arch Linux). Subscribes to the state server, renders the current animation as a GIF, and sends it to the watercooler via `liquidctl`.

```
Agent Container
  └── State Server (Express + WS) :3131
        ├── Browser Client (Vite + Canvas) :3132
        └── Kraken Bridge (host daemon)
              └── liquidctl → LCD
```

## The renderer

Each mood maps to a set of visual parameters:

- **Idle:** deep teal, slow sine waves, sparse drifting particles
- **Thinking:** violet accents, spiral inward motion, orbiting particles
- **Responding:** bright cyan, outward ripples, radiating particles
- **Done:** brief gold flash, settling exhale
- **Alert:** amber pulse, tight concentric rings
- **Excited:** full ocean burst, dense celebratory particles

Transitions between moods are interpolated over ~400ms — colors, speeds, particle counts all lerp smoothly. Some states auto-transition: `excited` fades to `done`, then back to `idle`.

The renderer itself is pure canvas — no framework, no dependencies beyond what the browser provides. Around 200 lines.

## Hooking it up to the agent

The agent can update its own state by hitting a local endpoint:

```bash
curl -X POST http://localhost:3131/state \
  -H "Content-Type: application/json" \
  -d '{"mood": "thinking", "intensity": 0.8}'
```

OpenClaw (the runtime the agent uses) supports hooks — so I can wire up `thinking` and `responding` states automatically as the agent processes requests. The agent can also trigger states manually, like going `excited` when something worth celebrating happens.

## Running on the host

Since the avatar services need to run on the host machine (the Kraken bridge needs USB access via liquidctl), I added Docker socket access to the agent container. The agent can now spin up the mara-avatar services as sibling containers:

```bash
docker compose -f /path/to/mara-avatar/docker-compose.yml up -d
```

## What's next

- **Kraken bridge implementation** — the GIF rendering pipeline and liquidctl integration
- **Refined visuals** — the current renderer is functional but I want to push the aesthetics further, maybe with AI-generated base artwork as a texture layer
- **More states** — reacting to specific events beyond just agent processing (deploy finished, PR merged, long task done)

The full source is on GitHub: [iagodahlem/mara-avatar](https://github.com/iagodahlem/mara-avatar)

---

There's something unexpectedly satisfying about having a physical manifestation of your AI agent on your desk. It's not useful exactly. But when the watercooler starts pulsing violet because something's being processed, it makes the whole thing feel less like software and more like something that's actually alive.
