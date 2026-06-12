# AeroRIS Model Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/demo` page that presents an AeroCRIS defense-oriented model demonstration with a five-step scripted flow, fixed samples, and clearly marked placeholder results.

**Architecture:** Extend the current single React app without a router dependency by rendering `DemoPage` when `window.location.pathname === '/demo'`. Store demo sample and stage data in `src/content.ts`; keep interaction state in `src/App.tsx`; add CSS to `src/App.css` following the existing AeroRIS visual language.

**Tech Stack:** Vite, React, TypeScript, lucide-react, Vitest, Testing Library, CSS.

---

### Task 1: Demo Tests

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write failing tests**

Add tests that expect:
- homepage nav and hero actions link to `/demo`
- `/demo` renders `AeroRIS Demo`
- the page states it is a prebuilt demo without an online backend
- the five stage controls are visible
- clicking `运行演示` advances to the final output after timers run
- clicking a sample resets the stage and shows placeholder status

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: fail because `/demo` is not implemented and the homepage does not yet expose an `演示` link.

### Task 2: Demo Data

**Files:**
- Modify: `src/content.ts`

- [ ] **Step 1: Add demo data types**

Add `DemoStage`, `DemoResultView`, `DemoSample`, and `DemoMetric` types.

- [ ] **Step 2: Add `content.demo`**

Add:
- five stages: input, baseline, stage1, stage2, final
- six result views: original, gt, baseline, stage1, stage2, overlay
- five samples: `test-3003`, `train-8522`, `test-2895`, `train-8104`, `empty-placeholder`
- three metrics: CRIS baseline, AeroCRIS Stage 1, AeroCRIS Stage 2 TTA

### Task 3: Demo Page Component

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add stateful `DemoPage`**

Implement:
- selected sample state
- active stage state
- active result view state
- autoplay timer for the five-step flow
- cleanup on unmount and on manual actions

- [ ] **Step 2: Route `/demo`**

Update app routing logic:

```tsx
if (window.location.pathname === '/dataset') return <DatasetDetailPage />;
if (window.location.pathname === '/demo') return <DemoPage />;
return <HomePage />;
```

### Task 4: Navigation and Page Links

**Files:**
- Modify: `src/content.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add `演示` links**

Add `/demo` to homepage navigation and hero actions.

- [ ] **Step 2: Add demo header links**

Use existing header style with links to `/`, `/dataset`, `/#method`, `#demo-flow`, and `#demo-cases`.

### Task 5: Demo CSS

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add desktop layout**

Add CSS for:
- `.demo-shell`
- `.demo-console`
- `.demo-script`
- `.demo-stage`
- `.demo-notes`
- `.demo-stage-controls`
- `.demo-result-grid`
- `.demo-case-grid`
- `.demo-placeholder`

- [ ] **Step 2: Add responsive layout**

At existing breakpoints, stack the three columns, allow controls to wrap or scroll, and prevent text overflow.

### Task 6: Verification

**Files:**
- No source changes expected

- [ ] **Step 1: Run unit tests**

```bash
npm test
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

- [ ] **Step 3: Browser verification**

Open `http://127.0.0.1:5173/demo` and verify:
- header and defense demo copy render
- `运行演示` advances to final output
- sample click resets to input stage
- placeholder badges are visible
- no horizontal overflow at desktop width
- mobile width stacks columns cleanly
