---
title: I Gave My AI Agent a Face
description: 'Building a living avatar that reflects my AI agent emotional state in real-time — on a browser and on my PC watercooler LCD.'
date: '2026-03-02'
tags: ['ai', 'side-project', 'node', 'canvas']
---

I've been setting up a personal AI agent that runs on my home server — a local assistant I can message via WhatsApp, that has memory, can run code, manage files, and help me think through problems. It lives in a Docker container and is always on.

At some point I started wondering: what does it *look* like right now? Is it thinking? Idle? Just finished something?

I had an NZXT Kraken 3 watercooler sitting on my machine with a 480×480 LCD on it. And I thought — that's a face.

## The Idea

The goal was simple: build a small service that tracks my agent's current emotional state and renders an animated avatar reflecting it. Two surfaces — the browser and the Kraken LCD.

The states I wanted to represent:

- **idle** — breathing slowly, waiting
- **thinking** — processing something
- **responding** — generating output
- **done** — just finished, brief satisfaction
- **alert** — something needs attention
- **excited** — for genuinely good moments

## Architecture

The project, called `mara-avatar`, is a small monorepo with three packages:

**`state-server`** is a tiny Express app with WebSocket support. It holds the current agent state and broadcasts changes to all connected clients in real-time. The agent updates it via a simple `POST /state` call whenever its mood changes.

**`browser-client`** is a Vite app with a canvas renderer. It connects to the state server over WebSocket and animates the avatar live in the browser.

**`kraken-bridge`** (coming next) will run on the host machine, consume the WebSocket stream, render GIF frames, and push them to the Kraken LCD via `liquidctl`.

## The Avatar

I didn't want something humanoid. The aesthetic I had in mind was abstract — oceanic. A glowing orb surrounded by fluid wave rings and particle systems. Color palette and motion tempo shift per mood.

For example, `thinking` bleeds violet into the teal base and spirals particles inward. `excited` bursts outward with a full-spectrum ocean explosion before settling. `alert` pulses amber in tight concentric rings.

The renderer is pure canvas — no framework, no dependencies beyond the browser. Each mood is defined as a set of parameters: wave speed, period, particle count, color palette, pulse scale. Transitions between moods interpolate these params over ~400ms so nothing snaps.

```js
// Mood params drive everything
const MOODS = {
  thinking: {
    coreColor: '#1A3A6B',
    glowColor: '#7B4FC0',
    waveSpeed: 0.018,
    particleCount: 60,
    // ...
  },
  // ...
}
```

The particle system is simple: each particle spawns near the core, follows an angle + distance path, fades out at the end of its lifecycle, and resets. Different moods change how fast they move and in which direction.

## Auto-Transitions

Some moods are transient by design. `excited` automatically transitions to `done` after 2 seconds, which then fades to `idle`. This way the agent can express a moment of excitement without getting stuck there.

```js
const AUTO_TRANSITIONS = {
  done: { to: 'idle', delayMs: 1500 },
  excited: { to: 'done', delayMs: 2000 },
}
```

## Running It

The services run as Docker containers on the host machine. The agent's container has access to the host Docker socket, so it can trigger redeployments and interact with sibling containers directly.

```bash
docker compose up -d
```

State server on `:3131`, browser client on `:3132`.

To update state from anywhere:

```bash
curl -X POST http://localhost:3131/state \
  -H "Content-Type: application/json" \
  -d '{"mood": "thinking", "intensity": 0.8}'
```

## What's Next

The Kraken bridge is the next piece — rendering the canvas animation as a GIF and pushing it to the LCD via `liquidctl`. The Kraken 3 display is 480×480 and circular, which is a perfect shape for this kind of avatar.

After that, I want to wire up OpenClaw hooks so the state updates automatically as the agent processes requests — no manual `curl` needed.

The end goal is a setup where I can glance at my PC and immediately know what my agent is doing. Thinking. Responding. Done. Waiting.

It's a small thing. But there's something satisfying about giving presence to something that otherwise only exists as text on a screen.

---

The project is open source: [github.com/iagodahlem/mara-avatar](https://github.com/iagodahlem/mara-avatar)
