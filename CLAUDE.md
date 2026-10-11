# Project: Multi-Agent Prediction Market Forecasting Engine & Dashboard

## Overview
This project builds a local, human-in-the-loop multi-agent forecasting suite designed to analyze prediction markets (e.g., Kalshi), perform deep research and red-teaming, output calibrated probabilities, and surface trade opportunities via a clean local UI. 

**Core Philosophy:** The AI acts as an analytical analyst team; the human retains final execution control. Transparency, explainability, and rigorous probability calibration are prioritized over automation speed.

---

## Architecture & Tech Stack

### Backend (`/backend`)
- **Language:** Python 3.11+
- **Concurrency:** `asyncio` with bounded semaphores for rate-limiting API and LLM calls.
- **Data Integrity:** Pydantic v2 for structured schemas and type safety.
- **LLM Integration:** LiteLLM or direct provider SDKs (OpenAI / Anthropic) with mandatory JSON schema enforcement (`response_format`).
- **Database/State:** SQLite (`aiosqlite`) to persist markets, agent transcripts, research articles found, red-team critiques, and final probability scores.

### Frontend (`/frontend`)
- **Framework:** React + TypeScript (Vite)
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query for server state, Zustand for local UI state
- **Key Views:**
  1. **Market Browser:** Markets organized by category (Politics, Sports, Economics, etc.) with market price vs. AI probability and edge % at a glance.
  2. **Pipeline Manager:** Trigger and monitor agent pipelines per market; see live status of each agent (Research → Red-Team → Judge).
  3. **Agent Audit Detail:** Step-by-step breakdown of Research findings (with source links), Red-Team critiques, and the Forecasting Judge's calibration logic.
  4. **Action Queue:** "BUY YES" / "BUY NO" recommendations with confidence scores and reasoning summaries to review and act on manually.

---

## Multi-Agent Pipeline Workflow

1. **Ingestion & Market Context:** User inputs or API syncs market title, ticker, rules, and live implied probability.
2. **Research Agent:** Scrapes/searches web articles, regulatory filings, or background data. Outputs bull/bear arguments and raw summaries with citation links.
3. **Red-Team Agent:** Critiques the research, targets LLM overconfidence bias, and tests alternative interpretations.
4. **Forecasting Judge Agent:** Synthesizes research and critique to output a strict decimal probability (`0.0` to `1.0`) and structural reasoning.
5. **Edge & Risk Evaluation:** Calculates `Edge = AI_Probability - Market_Price`. Flags opportunities where absolute edge exceeds threshold (e.g., > 10%).

---

## Development Milestones & Phase 1 Scope

- [ ] **Milestone 1:** Setup Python asynchronous project structure, SQLite schema for state persistence, and Pydantic models.
- [ ] **Milestone 2:** Implement mock/live connectors for Research Agent (Perplexity/Tavily search API integration) and core agent chain.
- [ ] **Milestone 3:** Build React/TypeScript dashboard UI displaying market lists, edge metrics, pipeline status, and detailed agent audit cards.
- [ ] **Milestone 4:** Run manual end-to-end tests on 3 live prediction market contracts and audit probability calibration over time.

---

## Coding Guidelines for Claude
- Always use asynchronous Python (`async def`/`await`) for agent processing pipelines.
- Enforce Pydantic validation on all LLM outputs to prevent downstream parsing failures.
- Keep React components clean, modular, and focused on transparent, readable rationales for human decision-making.
- Use TypeScript strictly — no `any` types.
- Co-locate component files with their types; avoid barrel re-exports unless the module is truly public-facing.
- When generating code, keep files concise and strictly adhere to the single-file/modular boundaries specified.