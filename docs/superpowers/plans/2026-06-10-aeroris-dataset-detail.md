# AeroRIS Dataset Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated `/dataset` page with real AeroRIS samples, interactive browsing, and homepage navigation.

**Architecture:** Extend the existing single React app with lightweight pathname-based rendering. Add dataset detail content to `src/content.ts`, render it through new components in `src/App.tsx`, and style it in `src/App.css`.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, static assets under `public/assets`.

---

### Task 1: Dataset Content And Assets

**Files:**
- Modify: `src/content.ts`
- Assets: `public/assets/aeroris-dataset/**`
- Test: `src/content.test.ts`

- [ ] Add dataset detail types and content with metrics, split statistics, feature cards, annotation flow, and sample records.
- [ ] Ensure overview strings do not mention RefDrone.
- [ ] Add tests that assert the content has real asset paths and no RefDrone mention in dataset detail overview.

### Task 2: Routing And Detail Page

**Files:**
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] Add pathname-based rendering for `/dataset`.
- [ ] Update homepage dataset nav/action and dataset section title to link to `/dataset`.
- [ ] Render dataset detail hero, structure, split table, and interactive sample browser.
- [ ] Add tests for the route, links, no RefDrone overview copy, and sample mode controls.

### Task 3: Styling And Verification

**Files:**
- Modify: `src/App.css`

- [ ] Add responsive dataset detail styles using the existing typography, borders, and restrained color system.
- [ ] Run `npm test -- src/App.test.tsx`, `npm test`, and `npm run build`.
- [ ] Verify in the in-app browser that `/dataset` loads real images and the controls switch visible media.
