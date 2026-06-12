# AeroRIS Project Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chinese, single-page AeroRIS research project homepage that presents the thesis as a public research artifact inspired by UAV-DualCog.

**Architecture:** Create a small Vite + React + TypeScript app. Keep research copy and numeric evidence in `src/content.ts`, render the page from focused React sections in `src/App.tsx`, and keep visual system/responsive layout in `src/App.css`. Extract representative thesis images from the Word document into `public/assets/thesis/` and reference them through the content model.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, jsdom, lucide-react, plain CSS.

---

## Frontend Working Model

**Visual thesis:** A restrained Chinese academic project page: white paper surface, deep blue ink, serif research title, fine rules, and thesis figures as evidence.

**Content plan:** Hero with AeroRIS identity and key metrics, overview of the low-altitude UAV referring segmentation problem, dataset statistics, benchmark and efficiency evidence, AeroPlug/AeroCRIS method story, prediction examples, and limitations/outlook.

**Interaction thesis:** Smooth anchor navigation, subtle hero/section entrance animations, and quiet hover/focus states on buttons, metrics, tables, and example figures.

## File Structure

- Create `package.json`: scripts and dependencies.
- Create `index.html`: Vite mount point and metadata.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite configuration.
- Create `src/vite-env.d.ts`: Vite ambient types.
- Create `src/test/setup.ts`: Testing Library setup.
- Create `src/content.ts`: all Chinese copy, metrics, tables, sections, and asset references.
- Create `src/content.test.ts`: tests for required Chinese content and key numbers.
- Create `src/App.tsx`: React page sections and rendering logic.
- Create `src/App.test.tsx`: rendering and placeholder-link tests.
- Create `src/main.tsx`: app bootstrap.
- Create `src/App.css`: visual system, responsive layout, and motion.
- Create `scripts/extract-thesis-assets.py`: deterministic image extraction from the Word file.
- Create `public/assets/thesis/`: extracted thesis images used by the page.
- Preserve `docs/superpowers/specs/2026-06-10-aeroris-project-homepage-design.md`.

The project directory is not a Git repository, so task checkpoints use build/test verification instead of commits.

---

### Task 1: Project Skeleton And Test Harness

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create package and Vite config files**

Write `package.json`:

```json
{
  "name": "aeroris-project-homepage",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.1.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.1.0"
  }
}
```

Write `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="AeroRIS 面向低空智能感知的无人机场景指代表达理解与像素级分割研究项目主页"
    />
    <title>AeroRIS | 低空无人机场景指代分割研究</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Write `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Write `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Write `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true
  }
});
```

Write `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Write `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: npm creates `node_modules/` and `package-lock.json` without dependency resolution failure.

- [ ] **Step 3: Run the empty test command**

Run:

```bash
npm test -- --passWithNoTests
```

Expected: Vitest exits successfully because no tests exist yet.

- [ ] **Step 4: Run the initial build command**

Run:

```bash
npm run build
```

Expected: Build fails because `src/main.tsx` does not exist yet. This is acceptable at this checkpoint because app code has not been created.

---

### Task 2: Content Model With Red-Green Tests

**Files:**
- Create: `src/content.test.ts`
- Create: `src/content.ts`

- [ ] **Step 1: Write failing content tests**

Write `src/content.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { content } from './content';

describe('AeroRIS content model', () => {
  it('uses Chinese project-homepage positioning with preserved research terms', () => {
    expect(content.hero.title).toBe('AeroRIS');
    expect(content.hero.subtitle).toContain('面向低空智能感知');
    expect(content.hero.subtitle).toContain('指代表达理解');
    expect(content.nav.map((item) => item.label)).toEqual([
      '概览',
      '数据集',
      '基准评测',
      '方法',
      '样例对比',
      '局限与展望'
    ]);
  });

  it('keeps the key thesis statistics visible to the page', () => {
    expect(content.hero.metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: '17,882', label: '表达数量' }),
        expect.objectContaining({ value: '8,536', label: '唯一图像' }),
        expect.objectContaining({ value: '36.76', label: 'AeroCRIS mIoU' }),
        expect.objectContaining({ value: '15.57ms', label: '单查询延迟' })
      ])
    );
  });

  it('contains benchmark rows for baseline and AeroCRIS variants', () => {
    const names = content.methodResults.map((row) => row.model);
    expect(names).toContain('CRIS baseline');
    expect(names).toContain('AeroCRIS Stage 1');
    expect(names).toContain('AeroCRIS Stage 2 TTA');
    expect(content.methodResults.find((row) => row.model === 'AeroCRIS Stage 2 TTA')).toMatchObject({
      miou: '36.76',
      oiou: '41.11',
      latency: '15.57ms'
    });
  });

  it('keeps all top action links as internal placeholders', () => {
    expect(content.hero.actions.every((action) => action.href.startsWith('#'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/content.test.ts
```

Expected: FAIL because `src/content.ts` does not exist.

- [ ] **Step 3: Implement content model**

Write `src/content.ts`:

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Action = {
  label: string;
  href: string;
};

export type BenchmarkRow = {
  model: string;
  category: string;
  miou: string;
  oiou: string;
  latency?: string;
  note: string;
};

export type MethodResult = {
  model: string;
  miou: string;
  oiou: string;
  latency: string;
  fps: string;
  note: string;
};

export type Challenge = {
  title: string;
  text: string;
  stat: string;
};

export type MethodStage = {
  name: string;
  title: string;
  description: string;
  points: string[];
};

export type Example = {
  title: string;
  description: string;
  image: string;
  alt: string;
  caption: string;
};

export const content = {
  nav: [
    { label: '概览', href: '#overview' },
    { label: '数据集', href: '#dataset' },
    { label: '基准评测', href: '#benchmark' },
    { label: '方法', href: '#method' },
    { label: '样例对比', href: '#examples' },
    { label: '局限与展望', href: '#outlook' }
  ] satisfies NavItem[],
  hero: {
    eyebrow: 'LOW-ALTITUDE UAV REFERRING SEGMENTATION',
    title: 'AeroRIS',
    subtitle: '面向低空智能感知的无人机场景指代表达理解与像素级分割研究。',
    description:
      '围绕低空无人机图像中的小目标、密集实例、空间关系和多实例集合表达，构建数据集、完成基准评测，并提出轻量化可插拔方法 AeroPlug / AeroCRIS。',
    figure: '/assets/thesis/fig-aerocris-framework.png',
    figureAlt: 'AeroCRIS 总体框架示意图',
    actions: [
      { label: '论文', href: '#overview' },
      { label: '代码', href: '#method' },
      { label: '数据集', href: '#dataset' },
      { label: '演示', href: '#examples' }
    ] satisfies Action[],
    metrics: [
      { value: '17,882', label: '表达数量', detail: 'train / val / test 总计' },
      { value: '8,536', label: '唯一图像', detail: '低空无人机场景样本' },
      { value: '36.76', label: 'AeroCRIS mIoU', detail: 'Stage 2 TTA 测试集' },
      { value: '15.57ms', label: '单查询延迟', detail: '64.21 FPS' }
    ] satisfies Metric[]
  },
  overview: {
    title: '为什么低空无人机需要指代表达分割',
    body:
      '低空无人机画面中，车辆、行人和非机动车往往只占很小区域。同一类目标又常在道路、路口和停车区域密集出现，用户给出的方位、数量和关系描述会直接决定模型应该分割哪一组目标。',
    challenges: [
      {
        title: '小目标容易消失',
        text: '目标面积小，下采样和背景像素主导会削弱前景监督。',
        stat: '457 条 area < 0.1% 测试样本'
      },
      {
        title: '集合表达要求完整覆盖',
        text: '“一排车辆”“几名行人”要求模型覆盖所有被指代实例。',
        stat: '650 条 6+ 实例测试样本'
      },
      {
        title: '空间关系是核心线索',
        text: '左侧、右下角、靠近路口等词不再是附加信息，而是区分目标的关键。',
        stat: '2,755 条关系表达'
      },
      {
        title: '空目标需要拒识',
        text: '表达不匹配图像内容时，模型应输出空掩码，而不是强行激活背景。',
        stat: '846 条空标注'
      }
    ] satisfies Challenge[]
  },
  dataset: {
    title: 'AeroRIS 数据集',
    description:
      'AeroRIS 将无人机场景指代理解扩展到像素级指代分割：输入低空无人机图像和自然语言表达，输出表达所指对象的二值掩码；多实例表达使用 union mask，空目标表达输出空掩码。',
    splits: [
      { split: 'train', expressions: '13,022', images: '6,407', empty: '683', unionMask: '12,339' },
      { split: 'val', expressions: '1,428', images: '534', empty: '7', unionMask: '1,421' },
      { split: 'test', expressions: '3,432', images: '1,595', empty: '156', unionMask: '3,276' },
      { split: 'total', expressions: '17,882', images: '8,536', empty: '846', unionMask: '17,036' }
    ],
    figure: '/assets/thesis/fig-dataset-stats.png',
    figureAlt: 'AeroRIS 数据集样本分布与难点统计可视化'
  },
  benchmarkRows: [
    { model: 'ReLA', category: '广义指代分割', miou: '50.48', oiou: '-', note: '多目标表达适配较好' },
    { model: 'CoHD', category: '广义指代分割', miou: '49.12', oiou: '-', note: '集合表达能力较强' },
    { model: 'CADFormer', category: '遥感指代分割', miou: '47.20', oiou: '-', latency: '31.40ms', note: '遥感模型中表现最好' },
    { model: 'RMSIN', category: '遥感指代分割', miou: '45.68', oiou: '-', note: '精度较高但非实时基线' },
    { model: 'RsRefSeg', category: '遥感指代分割', miou: '43.55', oiou: '-', latency: '123.44ms', note: '延迟较高' },
    { model: 'LAVT', category: '通用指代分割', miou: '31.80', oiou: '34.82', latency: '20.20ms', note: '通用模型基线' },
    { model: 'ASDA', category: '通用指代分割', miou: '28.09', oiou: '27.63', latency: '16.51ms', note: '速度接近实时' },
    { model: 'CRIS', category: '通用指代分割', miou: '17.82', oiou: '24.41', latency: '12.34ms', note: '速度快但小目标响应不足' }
  ] satisfies BenchmarkRow[],
  methodStages: [
    {
      name: 'Stage 1',
      title: '训练侧监督修正',
      description: '不改变推理主干，通过更适合低空场景的监督信号提升小目标和集合表达学习。',
      points: ['面积保持式目标监督', '前景均衡 BCE 与 Dice 联合监督', '小目标加权分割损失', '数量一致性辅助建模']
    },
    {
      name: 'Stage 2',
      title: 'Tiny Target Activation',
      description: '在 decoder 输出附近加入轻量残差校准，增强目标区域激活并补全部分掩码。',
      points: ['坐标图空间先验', '深度可分离卷积', 'ECA 轻量通道注意力', '有界符号残差校准']
    }
  ] satisfies MethodStage[],
  methodResults: [
    { model: 'CRIS baseline', miou: '17.82', oiou: '24.41', latency: '12.34ms', fps: '81.07', note: '原始实时基线' },
    { model: 'AeroCRIS Stage 1', miou: '34.22', oiou: '38.61', latency: '12.52ms', fps: '79.88', note: '推理结构基本不变' },
    { model: 'AeroCRIS Stage 2 TTA', miou: '36.76', oiou: '41.11', latency: '15.57ms', fps: '64.21', note: '轻量残差校准后进一步提升' }
  ] satisfies MethodResult[],
  examples: [
    {
      title: '微调模型预测结果对比',
      description: '展示主要微调模型在 AeroRIS 典型样本上的预测差异。',
      image: '/assets/thesis/fig-finetuned-visualization.png',
      alt: '主要微调模型在 AeroRIS 数据集上的典型预测结果',
      caption: '来自论文图 5-1'
    },
    {
      title: 'CRIS baseline 错误类型',
      description: 'CRIS 的失败集中在 miss、severe mismatch、partial overlap 和 under-segment。',
      image: '/assets/thesis/fig-cris-errors.png',
      alt: 'CRIS baseline 在 AeroRIS 上的典型错误类型',
      caption: '来自论文图 5-5'
    },
    {
      title: 'AeroCRIS 阶段对比',
      description: '对比 CRIS、AeroCRIS Stage 1 与 Stage 2 TTA 在典型样本上的预测变化。',
      image: '/assets/thesis/fig-aerocris-comparison.png',
      alt: 'CRIS 与 AeroCRIS 不同阶段的分割结果可视化对比',
      caption: '来自论文图 6-5'
    }
  ] satisfies Example[],
  outlook: [
    '空目标拒识仍然困难，TTA 增强非空目标时会降低 empty correct。',
    'Pr@0.9 等高阈值指标仍然较低，边界精细度和高质量掩码预测仍需加强。',
    '后续可扩展复杂天气、夜间和动态场景样本，检查模型鲁棒性。',
    '可探索基础模型候选生成与端到端轻量模型之间的混合架构。',
    '可接入低空无人机视频流，评估连续帧稳定性、实时交互延迟和系统可用性。'
  ]
} as const;
```

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
npm test -- src/content.test.ts
```

Expected: PASS.

---

### Task 3: React Rendering With Accessibility Tests

**Files:**
- Create: `src/App.test.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`

- [ ] **Step 1: Write failing render tests**

Write `src/App.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('AeroRIS homepage', () => {
  it('renders the Chinese public research homepage structure', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'AeroRIS' })).toBeInTheDocument();
    expect(screen.getByText(/面向低空智能感知/)).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AeroRIS 数据集' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AeroPlug / AeroCRIS 方法' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '局限与展望' })).toBeInTheDocument();
  });

  it('keeps top actions as internal placeholder links', () => {
    render(<App />);

    const actions = screen.getByLabelText('项目链接');
    for (const label of ['论文', '代码', '数据集', '演示']) {
      const link = within(actions).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', expect.stringMatching(/^#/));
    }
  });

  it('renders benchmark and method evidence tables', () => {
    render(<App />);

    expect(screen.getByRole('table', { name: '主要模型基准评测结果' })).toBeInTheDocument();
    expect(screen.getByText('ReLA')).toBeInTheDocument();
    expect(screen.getByText('CRIS baseline')).toBeInTheDocument();
    expect(screen.getByText('AeroCRIS Stage 2 TTA')).toBeInTheDocument();
    expect(screen.getAllByText('36.76').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 3: Implement React page**

Write `src/App.tsx` with semantic sections, tables, figures, and internal anchors. Use lucide icons for action and section cues.

Write `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Implementation requirements for `src/App.tsx`:

```tsx
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Boxes,
  Database,
  Eye,
  FileText,
  Gauge,
  Layers3,
  MapPinned,
  Target
} from 'lucide-react';
import { content } from './content';

const iconMap = {
  overview: Eye,
  dataset: Database,
  benchmark: BarChart3,
  method: Layers3,
  examples: Target,
  outlook: MapPinned
};

function App() {
  return (
    <div className="site-shell">
      {/* Render header, hero, overview, dataset, benchmark, method, examples, outlook, footer. */}
    </div>
  );
}

export default App;
```

The final `App.tsx` must include:

- `<nav aria-label="主导航">` with all `content.nav` items.
- `<div className="hero-actions" aria-label="项目链接">` wrapping the four placeholder links.
- `<section id="overview">`, `<section id="dataset">`, `<section id="benchmark">`, `<section id="method">`, `<section id="examples">`, `<section id="outlook">`.
- A table with `aria-label="主要模型基准评测结果"`.
- A table with `aria-label="AeroCRIS 精度与效率对比"`.
- Images rendered from `content.hero.figure`, `content.dataset.figure`, and `content.examples`.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
npm test -- src/App.test.tsx src/content.test.ts
```

Expected: PASS.

---

### Task 4: Visual System, Responsive Styling, And Asset Extraction

**Files:**
- Create: `src/App.css`
- Create: `scripts/extract-thesis-assets.py`
- Create: `public/assets/thesis/*.png`

- [ ] **Step 1: Write asset extraction script**

Write `scripts/extract-thesis-assets.py`:

```python
from pathlib import Path
from zipfile import ZipFile

SOURCE_DOCX = Path('/Users/hozeeric/Desktop/2207030223-李泓哲-面向低空智能感知的无人机场景指代表达理解方法研究.docx')
OUT_DIR = Path('/Users/hozeeric/Desktop/AeroRIS/public/assets/thesis')

IMAGE_MAP = {
    'word/media/image2.png': 'fig-research-route.png',
    'word/media/image8.png': 'fig-dataset-stats.png',
    'word/media/image10.png': 'fig-finetuned-visualization.png',
    'word/media/image13.png': 'fig-accuracy-efficiency.png',
    'word/media/image14.png': 'fig-cris-errors.png',
    'word/media/image15.png': 'fig-aerocris-framework.png',
    'word/media/image23.png': 'fig-aerocris-comparison.png',
}


def main() -> None:
    if not SOURCE_DOCX.exists():
        raise FileNotFoundError(f'Missing thesis file: {SOURCE_DOCX}')
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with ZipFile(SOURCE_DOCX) as archive:
        for source, filename in IMAGE_MAP.items():
            target = OUT_DIR / filename
            target.write_bytes(archive.read(source))
            print(f'wrote {target}')


if __name__ == '__main__':
    main()
```

- [ ] **Step 2: Run asset extraction**

Run:

```bash
python3 scripts/extract-thesis-assets.py
```

Expected: Creates seven PNG files under `public/assets/thesis/`.

- [ ] **Step 3: Write visual CSS**

Write `src/App.css` implementing:

- CSS variables for `--ink`, `--muted`, `--accent`, `--line`, `--paper`, `--soft`.
- `html { scroll-behavior: smooth; }`.
- Sticky header with white translucent background and thin border.
- Full-width hero band with two-column layout on desktop and single-column layout below 820px.
- Serif title treatment for `AeroRIS`; no negative letter spacing.
- Pill buttons with lucide icons and accessible focus states.
- Bounded image blocks with `aspect-ratio`, `object-fit: contain`, and stable dimensions.
- Data cards with restrained border radius of 8px.
- Tables that scroll horizontally on mobile.
- Section reveal animation using CSS `@keyframes` and `prefers-reduced-motion`.
- No decorative gradient orbs and no hero card.

- [ ] **Step 4: Run tests after styling/assets**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: Run build after styling/assets**

Run:

```bash
npm run build
```

Expected: PASS and emits `dist/`.

---

### Task 5: Browser Verification And Final Polish

**Files:**
- Modify if needed: `src/App.tsx`
- Modify if needed: `src/App.css`
- Modify if needed: `src/content.ts`

- [ ] **Step 1: Start dev server**

Run:

```bash
npm run dev -- --port 5173
```

Expected: Vite serves the app at `http://127.0.0.1:5173/` or reports another available port.

- [ ] **Step 2: Verify desktop in browser**

Use the in-app browser to open the dev URL. Check:

- Hero image is visible and not blank.
- Header navigation fits on desktop.
- Chinese hero text does not overlap the figure.
- Metrics are readable.
- Dataset and benchmark tables render.
- Example images render.
- Placeholder links stay within the page.

- [ ] **Step 3: Verify mobile in browser**

Set viewport around 390px wide. Check:

- Header and nav do not overflow incoherently.
- Hero stacks into one column.
- Chinese headings and buttons wrap cleanly.
- Tables are horizontally scrollable instead of breaking layout.
- Images retain stable aspect ratios.

- [ ] **Step 4: Run final verification**

Run:

```bash
npm test
npm run build
```

Expected: Both commands exit 0.

- [ ] **Step 5: Report result**

Final response must include:

- Local dev URL.
- Main files created.
- Verification commands and their outcomes.
- Any known limitations, especially that Paper/Code/Dataset/Demo remain placeholders.
