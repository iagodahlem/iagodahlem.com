---
title: I Gave My AI Agent a Face
description: 'Building a living animated avatar that reflects my AI agent emotional state — rendered on a watercooler LCD and in the browser.'
date: '2026-03-02'
tags: ['ai', 'side-project', 'javascript', 'linux']
---

I've been running a personal AI agent on my home server for a while now. It handles my day-to-day assistant stuff — helping me think through projects, keeping memory across sessions, that kind of thing.

At some point I thought: this thing is always running, always aware, always processing. It deserves a face.

## The Idea

My PC has an NZXT Kraken 3 watercooler with an LCD display on the pump head. Most people throw a system monitor or a static image on it. I wanted something more interesting — a living, breathing avatar that reflects what my agent is actually doing at any given moment.

The goal: an animated avatar that changes based on the agent's emotional state. Thinking looks different from idle. Responding looks different from excited. And it renders in two places — on the Kraken LCD and in the browser.

## The Architecture

The system has three pieces:

**State Server** — a small Express + WebSocket server that holds the agent's current state. The agent calls `POST /state` whenever something changes. All clients subscribe via WebSocket and get updates in real time.

**Browser Client** — a Vite app with a canvas-based renderer. Connects to the state server via WebSocket, animates accordingly. Also serves as a preview and debugging tool.

**Kraken Bridge** — a daemon running on the host that consumes the WebSocket stream, renders the current mood as a GIF, and sends it to the LCD via `liquidctl`.

```
Agent
  └── POST /state
        └── State Server (WebSocket broadcast)
              ├── Browser Client  →  canvas animation
              └── Kraken Bridge   →  GIF → liquidctl → LCD
```

## The Avatar Design

I didn't want a humanoid face. The agent has an ocean aesthetic — deep teal, bioluminescent cyan, midnight blue. So the avatar is an abstract entity: a glowing orb surrounded by fluid wave rings and a particle system.

Each mood maps to a distinct visual:

- **Idle** — slow sine waves, sparse drifting particles, gentle core pulse
- **Thinking** — waves spiral inward, violet accent bleeds in, particles orbit tighter
- **Responding** — outward ripples from center, bright cyan dominant
- **Done** — soft gold flash, one settling ripple, then back to idle
- **Alert** — sharp tight pulse, amber tones, erratic particles
- **Excited** — explosive outward burst, all the colors, then a slow settle

Transitions between moods are interpolated over ~400ms so nothing feels jarring.

## State Design

```typescript
interface AgentState {
  mood: 'idle' | 'thinking' | 'responding' | 'done' | 'alert' | 'excited'
  intensity: number  // 0.0 – 1.0
  message?: string
  updatedAt: string
}
```

`intensity` lets the same mood express subtle differences — thinking hard vs. a quick lookup, for instance.

Some moods auto-transition: `excited` fades to `done` after 2 seconds, `done` fades to `idle` after 1.5 seconds. Most others persist until explicitly changed.

## The Tech

- **State server:** Node.js, Express, `ws`
- **Browser client:** Vite, vanilla canvas
- **Renderer:** pure canvas — no framework, shared between browser and bridge
- **Kraken bridge:** Node.js, `@napi-rs/canvas`, `gifenc`, `child_process` → `liquidctl`
- **Monorepo:** pnpm workspaces

The whole thing runs in Docker on the host machine, managed from the server container via the Docker socket.

## What's Next

The immediate next step is the Kraken bridge — wiring up the GIF rendering pipeline and `liquidctl` integration so the LCD actually lights up.

After that, deeper integration with the agent itself: automatic state updates as it starts thinking, finishes responding, or wants to flag something worth attention.

Eventually I'd like to generate proper avatar artwork — right now the renderer is pure generative canvas, but having a real illustrated face underneath the effects would be something special.

The repo is open: [github.com/iagodahlem/mara-avatar](https://github.com/iagodahlem/mara-avatar)
