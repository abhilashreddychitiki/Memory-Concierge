# Memory Concierge

Memory Concierge is a luxury hotel AI concierge demo for The Aurelian Vale, a fictional grand hotel with a quiet fantasy atmosphere. It remembers returning guests across stays, prepares their room and itinerary from local guest memory, and adapts the stay plan when real-time events occur.

The demo story centers on a returning guest, Sarah Chen, whose delayed flight is already understood by the concierge before she arrives.

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- NVIDIA NIM via the OpenAI-compatible SDK
- ElevenLabs text-to-speech

## AI Model

The API routes use NVIDIA's OpenAI-compatible endpoint:

```txt
https://integrate.api.nvidia.com/v1
```

Configured model:

```txt
meta/llama-3.1-70b-instruct
```

This model is used for the JSON-producing concierge routes:

- `POST /api/welcome`
- `POST /api/adapt`

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.local.example .env.local
```

Add your API keys:

```env
NVIDIA_API_KEY=your_nvidia_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Demo Flow

1. Select an arriving guest.
2. The app calls `/api/welcome` to generate a personalized welcome, room note, dinner note, tomorrow brief, and concierge memory.
3. Use the real-time event buttons to simulate changes such as a delayed flight, dietary update, quiet room request, or dinner delay.
4. The app calls `/api/adapt` and displays the automated actions taken.
5. Click `Play Welcome` to generate speech through ElevenLabs.

## Data

Guest memory is stored locally in:

```txt
data/guests.json
```

There is no auth and no database. The app is designed as a self-contained demo with deterministic local guest profiles and live AI-generated concierge copy.

## Project Structure

```txt
app/
  api/
    adapt/route.ts
    voice/route.ts
    welcome/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  AlertBanner.tsx
  DashboardHeader.tsx
  GuestSelector.tsx
  ItineraryCard.tsx
  MemoryTimeline.tsx
  RoomReadyCard.tsx
  TriggerPanel.tsx
  VoiceButton.tsx
data/
  guests.json
lib/
  elevenlabs.ts
  json.ts
  openai.ts
```

## Build

Run a production build:

```bash
npm run build
```

The app should compile without requiring API keys at build time. Keys are required when the API routes are called at runtime.
