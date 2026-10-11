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

### Frontend / Dashboard (`/frontend` or single-file template)
- **Framework:** Streamlit or a lightweight FastAPI + Tailwind/HTMX stack (Streamlit is preferred for rapid agent-loop visualization).
- **Key Views:**
  1. **Market Monitor:** Active markets, current market price vs. AI estimated probability, and calculated edge percentage.
  2. **Agent Audit Log:** Step-by-step breakdown of what the Research Agent found (with source links/articles), Red-Team critiques, and the Forecasting Judge's calibration logic.
  3. **Manual Trade Checklist:** Clear "BUY YES" / "BUY NO" recommendations with confidence scores and reasoning summaries to copy/paste or execute manually on Kalshi.

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
- [ ] **Milestone 3:** Build Streamlit dashboard UI displaying market lists, edge metrics, and detailed agent audit cards.
- [ ] **Milestone 4:** Run manual end-to-end tests on 3 live prediction market contracts and audit probability calibration over time.

---

## Coding Guidelines for Claude
- Always use asynchronous Python (`async def`/`await`) for agent processing pipelines.
- Enforce Pydantic validation on all LLM outputs to prevent downstream parsing failures.
- Keep UI components clean, modular, and focused on transparent, readable rationales for human decision-making.
- When generating code, keep files concise and strictly adhere to the single-file/modular boundaries specified.