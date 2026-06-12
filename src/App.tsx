import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Boxes,
  Database,
  Eye,
  FileText,
  Gauge,
  Home,
  Images,
  Layers3,
  Play,
  RotateCcw,
  MapPinned,
  Waypoints
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  content,
  type DatasetSample,
  type DemoCategoryId,
  type DemoResultViewId,
  type DemoSample,
  type DemoStage,
  type ResearchStage,
  type TableGroup,
  type ThesisTable
} from './content';
import { resolveAppPath, resolveRoutePath, stripBasePath } from './pathUtils';

const sectionIcons = {
  overview: Eye,
  dataset: Database,
  benchmark: BarChart3,
  method: Layers3,
  outlook: MapPinned
};

const homeTocItems = [
  { id: 'overview', label: '研究概览' },
  { id: 'research-route', label: '研究路线' },
  { id: 'dataset', label: 'AeroRIS 数据集' },
  { id: 'benchmark', label: '基准评测' },
  { id: 'method', label: 'AeroPlug / AeroCRIS 方法' },
  { id: 'outlook', label: '局限与展望' }
];

type TocItem = {
  id: string;
  label: string;
};

const datasetTocItems: TocItem[] = [
  { id: 'dataset-overview', label: '概览' },
  { id: 'features', label: '数据特点' },
  { id: 'structure', label: '标注结构' },
  { id: 'splits', label: '划分统计' },
  { id: 'samples', label: '样例展示' }
];

function SectionHeading({
  id,
  eyebrow,
  title,
  children
}: {
  id: keyof typeof sectionIcons;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  const Icon = sectionIcons[id];

  return (
    <div className="section-heading">
      <div className="section-kicker">
        <Icon aria-hidden="true" size={18} />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function MetricGrid() {
  return (
    <dl className="metric-grid" aria-label="核心指标">
      {content.hero.metrics.map((metric) => (
        <div className="metric-item" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
          <p>{metric.detail}</p>
        </div>
      ))}
    </dl>
  );
}

function ResearchStageCard({ stage }: { stage: ResearchStage }) {
  return (
    <article className="stage-card">
      <div className="stage-card-meta">
        <span className="stage-label">{stage.label}</span>
        <span className="stage-chapter">{stage.chapter}</span>
      </div>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>
      <ul>
        {stage.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

function ResearchStages() {
  return (
    <section className="content-section stage-route-section" id="research-route" aria-labelledby="stage-route-title">
      <div className="stage-route-heading">
        <div className="section-kicker">
          <MapPinned aria-hidden="true" size={18} />
          <span>研究路线</span>
        </div>
        <h2 id="stage-route-title">两阶段研究路线</h2>
        <p>
          论文不是从一开始就直接进入像素级分割，而是先用 RefDrone 验证低空无人机场景下的指代理解难点，再把问题推进到自建数据集、基准评测和可插拔方法设计。
        </p>
      </div>
      <div className="stage-route-grid">
        {content.researchStages.map((stage) => (
          <ResearchStageCard stage={stage} key={stage.label} />
        ))}
      </div>
      <p className="stage-transition">{content.stageTransition}</p>
    </section>
  );
}

function PageToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    setActiveId(items[0]?.id ?? '');

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const readingLine = Math.min(260, window.innerHeight * 0.34);
      const hasMeasurableLayout = sections.some((section) => section.getBoundingClientRect().height > 0);

      if (!hasMeasurableLayout) {
        return;
      }

      let currentId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentId = section.id;
        }
      }

      setActiveId(currentId);
    };

    const requestActiveSectionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', requestActiveSectionUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestActiveSectionUpdate);
      window.removeEventListener('resize', requestActiveSectionUpdate);
    };
  }, [items]);

  return (
    <aside className="page-toc" aria-label="页面目录">
      <p>CONTENT</p>
      <nav>
        {items.map((item) => (
          <a
            aria-current={activeId === item.id ? 'true' : undefined}
            href={`#${item.id}`}
            key={item.id}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function getTableGroup(id: string) {
  const group = content.tableGroups.find((item) => item.id === id);

  if (!group) {
    throw new Error(`Missing table group: ${id}`);
  }

  return group;
}

const rankedTableIds = new Set([
  'table-3-2',
  'table-3-3',
  'table-5-1',
  'table-5-2',
  'table-5-3',
  'table-6-1',
  'table-6-2',
  'table-6-3',
  'table-6-4'
]);
const lowerIsBetterColumns = new Map<string, Set<number>>([
  ['table-5-3', new Set([3, 5, 6])]
]);
const rankedColumnStartIndexes = new Map<string, number>([['table-5-2', 5]]);
const wideTableIds = new Set(['table-5-2']);
const mergedColumnIndexes = new Map<string, Set<number>>([
  ['table-3-1', new Set([0])],
  ['table-5-2', new Set([0, 1])],
  ['table-6-4', new Set([0])]
]);
const tableEvidenceFigures = new Map<
  string,
  {
    src: string;
    alt: string;
    caption: string;
  }
>([
  [
    'table-5-1',
    {
      src: '/assets/thesis/fig-finetuned-model-scenes.png',
      alt: '主要微调模型部分场景的可视化结果',
      caption: '主要微调模型部分场景的可视化结果'
    }
  ],
  [
    'table-5-2',
    {
      src: '/assets/thesis/fig-zero-shot-scenes.png',
      alt: '零样本泛化模型部分场景的可视化结果',
      caption: '零样本泛化模型部分场景的可视化结果'
    }
  ],
  [
    'table-5-5',
    {
      src: '/assets/thesis/fig-cris-errors.png',
      alt: 'CRIS baseline错误类型的可视化图（论文图5-5）',
      caption:
        '论文图5-5：CRIS baseline 错误类型可视化，展示 miss（漏检）、severe mismatch（严重错配）、partial overlap（部分重叠）和 under-segment（欠分割）等典型失败模式。'
    }
  ],
  [
    'table-6-2',
    {
      src: '/assets/thesis/fig-aerocris-comparison.png',
      alt: 'AeroCRIS阶段对比图（论文图6-5）',
      caption:
        '论文图6-5：AeroCRIS 阶段对比，展示 CRIS baseline、AeroCRIS Stage 1 与 Stage 2 TTA 在典型样本上的预测变化。'
    }
  ]
]);
const methodDesignFigures = [
  {
    src: '/assets/thesis/fig-stage1-supervision-design.png',
    alt: 'Stage 1 训练侧监督修正结构设计示意图',
    title: 'Stage 1 训练侧监督修正结构设计示意图',
    description:
      '训练阶段在 CRIS 基线推理结构不变的前提下，引入面积保持式目标缩放、小目标面积权重、前景均衡 BCE、Dice 损失与数量一致性辅助监督，强化低空小目标和多实例集合表达的学习。'
  },
  {
    src: '/assets/thesis/fig-stage2-tta-design.png',
    alt: 'Stage 2 TTA 模块结构设计示意图',
    title: 'Stage 2 TTA 模块结构设计示意图',
    description:
      '推理阶段以 Stage 1 基础 logits 与归一化坐标图为输入，通过特征拼接、1×1 bottleneck、深度可分离卷积、ECA 通道注意力和有界残差校准，增强目标区域激活并抑制背景响应。'
  }
];

function parseScore(cell: string) {
  const normalized = cell.replace(/[%，,]|ms\/query|ms/gi, '').trim();
  const value = Number.parseFloat(normalized);

  return Number.isFinite(value) ? value : null;
}

function getRankedCells(table: ThesisTable) {
  const ranks = new Map<string, number>();

  if (!rankedTableIds.has(table.id)) {
    return ranks;
  }

  const startColumnIndex = rankedColumnStartIndexes.get(table.id) ?? 1;

  for (let columnIndex = startColumnIndex; columnIndex < table.columns.length; columnIndex += 1) {
    const scoredRows = table.rows
      .map((row, rowIndex) => {
        const score = parseScore(row[columnIndex]);

        return score === null ? null : { rowIndex, score };
      })
      .filter((item): item is { rowIndex: number; score: number } => item !== null);

    if (scoredRows.length < 3) {
      continue;
    }

    const isLowerBetter = lowerIsBetterColumns.get(table.id)?.has(columnIndex) ?? false;
    scoredRows.sort((left, right) =>
      isLowerBetter ? left.score - right.score : right.score - left.score
    );

    for (const [rankIndex, item] of scoredRows.slice(0, 3).entries()) {
      ranks.set(`${item.rowIndex}-${columnIndex}`, rankIndex + 1);
    }
  }

  return ranks;
}

function getMergedCells(table: ThesisTable) {
  const merges = new Map<string, { rowSpan: number; hidden: boolean }>();
  const columns = mergedColumnIndexes.get(table.id);

  if (!columns) {
    return merges;
  }

  for (const columnIndex of columns) {
    let startIndex = 0;

    while (startIndex < table.rows.length) {
      const cell = table.rows[startIndex][columnIndex];
      let endIndex = startIndex + 1;

      while (endIndex < table.rows.length && table.rows[endIndex][columnIndex] === cell) {
        endIndex += 1;
      }

      const rowSpan = endIndex - startIndex;

      if (rowSpan > 1) {
        merges.set(`${startIndex}-${columnIndex}`, { rowSpan, hidden: false });

        for (let rowIndex = startIndex + 1; rowIndex < endIndex; rowIndex += 1) {
          merges.set(`${rowIndex}-${columnIndex}`, { rowSpan: 0, hidden: true });
        }
      }

      startIndex = endIndex;
    }
  }

  return merges;
}

function ThesisTableBlock({ table }: { table: ThesisTable }) {
  const rankedCells = getRankedCells(table);
  const mergedCells = getMergedCells(table);
  const isWideTable = wideTableIds.has(table.id);
  const evidenceFigure = tableEvidenceFigures.get(table.id);
  const tableMinWidth = table.columnWidths
    ? table.columnWidths.reduce((total, width) => total + Number.parseFloat(width), 0)
    : Math.max(320, table.columns.length * 92);

  return (
    <article className={`thesis-table-card${isWideTable ? ' thesis-table-card-wide' : ''}`}>
      <div className="thesis-table-copy">
        <div className="source-pills" aria-label={`${table.title} 来源`}>
          {table.sourceTables.map((source) => (
            <span key={source}>{source}</span>
          ))}
        </div>
        <h4>{table.title}</h4>
        <p>{table.guide}</p>
      </div>
      <div className={`table-scroll thesis-table-scroll${isWideTable ? ' wide-table-scroll' : ''}`}>
        <table
          aria-label={table.title}
          className={isWideTable ? 'wide-evidence-table' : undefined}
          style={{ minWidth: `${tableMinWidth}px` }}
        >
          {table.columnWidths ? (
            <colgroup>
              {table.columnWidths.map((width, index) => (
                <col key={`${table.id}-col-${index}`} style={{ width }} />
              ))}
            </colgroup>
          ) : null}
          <thead>
            {table.headerRows ? (
              table.headerRows.map((headerRow, rowIndex) => (
                <tr key={`${table.id}-header-${rowIndex}`}>
                  {headerRow.map((header, headerIndex) => (
                    <th
                      colSpan={header.colSpan}
                      key={`${table.id}-header-${rowIndex}-${header.label}-${headerIndex}`}
                      rowSpan={header.rowSpan}
                      scope="col"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                {table.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${table.id}-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const merge = mergedCells.get(cellKey);

                  if (merge?.hidden) {
                    return null;
                  }

                  const rank = rankedCells.get(`${rowIndex}-${cellIndex}`);
                  const isMergedCell = merge !== undefined && merge.rowSpan > 1;
                  const mergedClassName = isMergedCell ? 'merged-row-header' : undefined;
                  const logicalColumnClass = `table-col-${cellIndex}`;
                  const metricColumnStart = rankedColumnStartIndexes.get(table.id);
                  const isMetricCell = metricColumnStart !== undefined && cellIndex >= metricColumnStart;
                  const isDescriptorCell = isWideTable && cellIndex >= 2 && cellIndex <= 4;
                  const rankProps =
                    rank === undefined
                      ? {}
                      : {
                          className: 'rank-cell',
                          'data-rank': rank,
                          'data-rank-label': `#${rank}`,
                          'aria-label': `${cell}，第${rank}名`
                        };

                  return cellIndex === 0 ? (
                    <th
                      className={[logicalColumnClass, mergedClassName].filter(Boolean).join(' ') || undefined}
                      data-col={cellIndex}
                      rowSpan={merge?.rowSpan}
                      scope="row"
                      key={`${table.id}-${rowIndex}-${cellIndex}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      className={[
                        logicalColumnClass,
                        isDescriptorCell ? 'descriptor-cell' : undefined,
                        isMetricCell ? 'metric-cell' : undefined,
                        rankProps.className,
                        mergedClassName
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      data-col={cellIndex}
                      data-rank={rankProps['data-rank']}
                      data-rank-label={rankProps['data-rank-label']}
                      aria-label={rankProps['aria-label']}
                      key={`${table.id}-${rowIndex}-${cellIndex}`}
                      rowSpan={merge?.rowSpan}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {evidenceFigure ? (
        <figure className="thesis-evidence-figure">
          <img src={resolveAppPath(evidenceFigure.src)} alt={evidenceFigure.alt} />
          <figcaption>{evidenceFigure.caption}</figcaption>
        </figure>
      ) : null}
    </article>
  );
}

function TableGroupBlock({ group }: { group: TableGroup }) {
  return (
    <section className="table-group-block" aria-labelledby={`${group.id}-title`}>
      <div className="table-group-heading">
        <h3 id={`${group.id}-title`}>{group.title}</h3>
        <p>{group.intro}</p>
      </div>
      <div className="thesis-table-list">
        {group.tables.map((table) => (
          <ThesisTableBlock table={table} key={table.id} />
        ))}
      </div>
    </section>
  );
}

type SampleMode = 'image' | 'union' | 'overlay' | 'instances';
type DatasetSplitFilter = 'all' | DatasetSample['split'];

const splitFilters: DatasetSplitFilter[] = ['all', 'train', 'val', 'test'];
const sampleModes: { id: SampleMode; label: string }[] = [
  { id: 'image', label: 'Original' },
  { id: 'union', label: 'Union Mask' },
  { id: 'overlay', label: 'Overlay' },
  { id: 'instances', label: 'Instances' }
];

function getSampleModeSrc(sample: DatasetSample, mode: SampleMode) {
  if (mode === 'image') {
    return sample.image;
  }

  if (mode === 'union') {
    return sample.unionMask;
  }

  if (mode === 'instances') {
    return sample.instanceOverlay ?? sample.instanceMasks?.[0] ?? sample.overlay;
  }

  return sample.overlay;
}

function getSampleModeAlt(sample: DatasetSample, mode: SampleMode) {
  if (mode === 'image') {
    return `${sample.title} original image`;
  }

  if (mode === 'union') {
    return `${sample.title} union mask`;
  }

  if (mode === 'instances') {
    return `${sample.title} instance masks`;
  }

  return `${sample.title} overlay`;
}

function SampleExplorer() {
  const [splitFilter, setSplitFilter] = useState<DatasetSplitFilter>('all');
  const [selectedSampleId, setSelectedSampleId] = useState(content.datasetDetail.samples[0].id);
  const [mode, setMode] = useState<SampleMode>('overlay');

  const visibleSamples = content.datasetDetail.samples.filter(
    (sample) => splitFilter === 'all' || sample.split === splitFilter
  );
  const selectedSample = visibleSamples.find((sample) => sample.id === selectedSampleId) ?? visibleSamples[0];
  const mediaSrc = resolveAppPath(getSampleModeSrc(selectedSample, mode));
  const mediaAlt = getSampleModeAlt(selectedSample, mode);

  return (
    <section className="dataset-browser-section" id="samples" aria-labelledby="dataset-browser-title">
      <div className="dataset-browser-heading">
        <div>
          <div className="section-kicker">
            <Images aria-hidden="true" size={18} />
            <span>样例浏览</span>
          </div>
          <h2 id="dataset-browser-title">AeroRIS数据集样例展示</h2>
          <p>切换数据划分、表达样例和显示模式，观察同一张无人机图像如何对应不同语言表达与掩码监督。</p>
        </div>
        <div className="dataset-filter-group" aria-label="数据划分筛选">
          {splitFilters.map((split) => (
            <button
              aria-pressed={splitFilter === split}
              key={split}
              onClick={() => {
                const nextSamples = content.datasetDetail.samples.filter(
                  (sample) => split === 'all' || sample.split === split
                );
                setSplitFilter(split);
                setSelectedSampleId(nextSamples[0]?.id ?? content.datasetDetail.samples[0].id);
                setMode('overlay');
              }}
              type="button"
            >
              {split}
            </button>
          ))}
        </div>
      </div>

      <div className="dataset-browser-layout">
        <div className="sample-list" aria-label="AeroRIS 样例列表">
          {visibleSamples.map((sample) => (
            <button
              aria-pressed={selectedSample.id === sample.id}
              className="sample-list-item"
              key={sample.id}
              onClick={() => {
                setSelectedSampleId(sample.id);
                setMode('overlay');
              }}
              type="button"
            >
              <span>{sample.title}</span>
              <small>{sample.split} · {sample.instances} 个实例</small>
            </button>
          ))}
        </div>

        <article className="sample-viewer">
          <div className="sample-media-toolbar" aria-label="样例显示模式">
            {sampleModes.map((item) => {
              const hasInstanceView = Boolean(selectedSample.instanceOverlay || selectedSample.instanceMasks?.length);
              const disabled = item.id === 'instances' && !hasInstanceView;

              return (
                <button
                  aria-pressed={mode === item.id}
                  disabled={disabled}
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <figure className="sample-media">
            <img src={mediaSrc} alt={mediaAlt} />
            <figcaption>{selectedSample.expression}</figcaption>
          </figure>

          <div className="sample-detail-grid">
            <div>
              <p className="sample-detail-label">文件</p>
              <p>{selectedSample.fileName}</p>
            </div>
            <div>
              <p className="sample-detail-label">Union 面积</p>
              <p>{selectedSample.unionArea}</p>
            </div>
            <div>
              <p className="sample-detail-label">Union bbox</p>
              <p>{selectedSample.bbox}</p>
            </div>
            <div>
              <p className="sample-detail-label">标签</p>
              <p>{selectedSample.tags.join(' / ')}</p>
            </div>
          </div>

          {selectedSample.instanceMasks?.length ? (
            <div className="instance-strip" aria-label={`${selectedSample.title} 实例 mask 缩略图`}>
              <div className="instance-strip-copy">
                <p>实例掩码缩略图</p>
                <span>
                  黑底小图是同一表达中每个目标实例的单独 mask；白色区域表示该实例，用于和上方的 Union Mask 区分。
                </span>
              </div>
              <div className="instance-mask-grid">
                {selectedSample.instanceMasks.map((instanceMask, index) => (
                  <img
                    src={resolveAppPath(instanceMask)}
                    alt={`${selectedSample.title} instance mask ${index + 1}`}
                    key={instanceMask}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function DemoVisualPanel({ sample, stage, viewId }: { sample: DemoSample; stage: DemoStage; viewId: DemoResultViewId }) {
  const visual = sample.results[viewId] ?? sample.results.original;
  const isRealImage = Boolean(visual.src);

  return (
    <figure className="demo-visual-panel">
      <div className={`demo-visual-frame demo-visual-${visual.variant}`} data-status={visual.status}>
        {isRealImage ? (
          <img src={resolveAppPath(visual.src ?? '')} alt={visual.alt} />
        ) : (
          <div className="demo-generated-visual" role="img" aria-label={visual.alt}>
            <span>{visual.variant === 'empty' ? 'Empty Mask' : visual.status}</span>
            <i aria-hidden="true" />
          </div>
        )}
        <span className="demo-status-badge">{visual.status}</span>
      </div>
      <figcaption>
        <strong>{stage.title}</strong>
        <span>{visual.note}</span>
      </figcaption>
    </figure>
  );
}

function DemoPage() {
  const { demo } = content;
  const [selectedCategoryId, setSelectedCategoryId] = useState<DemoCategoryId>(demo.categories[0].id);
  const [selectedSampleId, setSelectedSampleId] = useState(demo.samples[0].id);
  const [activeStageId, setActiveStageId] = useState(demo.stages[0].id);
  const [activeViewId, setActiveViewId] = useState<DemoResultViewId>(demo.stages[0].viewId);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedCategorySamples = demo.samples.filter((sample) => sample.categoryId === selectedCategoryId);
  const selectedSample = selectedCategorySamples.find((sample) => sample.id === selectedSampleId) ?? selectedCategorySamples[0] ?? demo.samples[0];
  const activeStage = demo.stages.find((stage) => stage.id === activeStageId) ?? demo.stages[0];

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStageId((currentStageId) => {
        const currentIndex = demo.stages.findIndex((stage) => stage.id === currentStageId);
        const nextStage = demo.stages[Math.min(currentIndex + 1, demo.stages.length - 1)];

        setActiveViewId(nextStage.viewId);

        if (nextStage.id === demo.stages[demo.stages.length - 1].id) {
          window.clearInterval(interval);
          setIsPlaying(false);
        }

        return nextStage.id;
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, [demo.stages, isPlaying]);

  const resetToInput = () => {
    setIsPlaying(false);
    setActiveStageId(demo.stages[0].id);
    setActiveViewId(demo.stages[0].viewId);
  };

  const selectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    resetToInput();
  };

  const selectCategory = (categoryId: DemoCategoryId) => {
    const firstSample = demo.samples.find((sample) => sample.categoryId === categoryId);

    if (!firstSample) {
      return;
    }

    setSelectedCategoryId(categoryId);
    setSelectedSampleId(firstSample.id);
    resetToInput();
  };

  const runDemo = () => {
    setActiveStageId(demo.stages[0].id);
    setActiveViewId(demo.stages[0].viewId);
    setIsPlaying(true);
  };

  const selectStage = (stage: DemoStage) => {
    setIsPlaying(false);
    setActiveStageId(stage.id);
    setActiveViewId(stage.viewId);
  };

  const selectView = (viewId: DemoResultViewId) => {
    setIsPlaying(false);
    setActiveViewId(viewId);
  };

  return (
    <div className="site-shell demo-shell-page">
      <header className="site-header">
        <a className="brand" href={resolveRoutePath('/')} aria-label="返回 AeroRIS 首页">
          AeroRIS Demo
        </a>
        <nav aria-label="模型演示页面导航">
          <a href={resolveRoutePath('/')}>首页</a>
          <a href={resolveRoutePath('/dataset')}>数据集</a>
          <a href={resolveRoutePath('/#method')}>方法</a>
        </nav>
      </header>

      <main id="top">
        <section className="demo-hero" aria-labelledby="demo-title">
          <div className="demo-hero-copy">
            <p className="eyebrow">AERORIS MODEL DEMO</p>
            <h1 id="demo-title">AeroRIS Demo</h1>
          </div>

          <div className="demo-console" aria-label="AeroCRIS 五步运行演示台">
            <aside className="demo-script-panel">
              <div className="demo-panel-heading">
                <p>Demo Script</p>
                <h2>选择样例</h2>
              </div>
              <div className="demo-category-selector" aria-label="Demo 类别选择">
                {demo.categories.map((category) => (
                  <button
                    aria-label={category.title}
                    aria-pressed={selectedCategoryId === category.id}
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    type="button"
                  >
                    <span>{category.title}</span>
                    <small>{category.count} 个样例</small>
                  </button>
                ))}
              </div>
              <div className="demo-case-selector" aria-label="Demo 样例选择">
                {selectedCategorySamples.map((sample) => (
                  <button
                    aria-label={`${sample.id} ${sample.title}`}
                    aria-pressed={selectedSample.id === sample.id}
                    key={sample.id}
                    onClick={() => selectSample(sample.id)}
                    type="button"
                  >
                    <span>{sample.id}</span>
                    <small>{sample.stats.join(' / ')}</small>
                  </button>
                ))}
              </div>

              <p className="demo-asset-status">{selectedSample.assetStatus}</p>
              <p className="demo-placeholder-note">{selectedSample.stats.join(' / ')}</p>

              <div className="demo-run-actions">
                <button className="button-link demo-run-button" onClick={runDemo} type="button">
                  <Play aria-hidden="true" size={16} />
                  <span>运行演示</span>
                </button>
                <button className="demo-reset-button" onClick={resetToInput} type="button">
                  <RotateCcw aria-hidden="true" size={15} />
                  <span>重置</span>
                </button>
              </div>

              <section className="demo-global-metrics" aria-labelledby="demo-global-metrics-title">
                <div className="demo-panel-heading">
                  <p>Benchmark</p>
                  <h3 id="demo-global-metrics-title">整体指标</h3>
                </div>
                <div className="demo-global-metric-list">
                  {demo.metrics.map((metric) => (
                    <article key={metric.label}>
                      <strong>{metric.label}</strong>
                      <dl>
                        <div>
                          <dt>mIoU</dt>
                          <dd>{metric.miou}</dd>
                        </div>
                        <div>
                          <dt>oIoU</dt>
                          <dd>{metric.oiou}</dd>
                        </div>
                      </dl>
                      <p>{metric.latency}</p>
                      <span>{metric.note}</span>
                    </article>
                  ))}
                </div>
              </section>
            </aside>

            <section className="demo-main-panel" aria-labelledby="demo-stage-title">
              <div className="demo-main-topbar">
                <div className="demo-runtime-copy">
                  <p className="demo-label">Model Runtime</p>
                  <h2 id="demo-stage-title">{activeStage.title}</h2>
                  <p>{activeStage.description}</p>
                </div>
                <div className="demo-expression-box demo-expression-box-prominent" role="group" aria-label="当前指代表达">
                  <p className="demo-label">Expression</p>
                  <p>{selectedSample.expression}</p>
                </div>
                <span className="demo-step-badge">{activeStage.label}</span>
              </div>

              <div className="demo-stage-controls" aria-label="五步演示阶段">
                {demo.stages.map((stage) => (
                  <button
                    aria-label={stage.title}
                    aria-pressed={activeStage.id === stage.id}
                    key={stage.id}
                    onClick={() => selectStage(stage)}
                    type="button"
                  >
                    <span>{stage.label}</span>
                    <strong>{stage.title}</strong>
                    <small>{stage.description}</small>
                  </button>
                ))}
              </div>

              <DemoVisualPanel sample={selectedSample} stage={activeStage} viewId={activeViewId} />

              <section className="demo-case-metrics" aria-labelledby="demo-case-metrics-title">
                <div className="demo-metrics-heading">
                  <div>
                    <p className="demo-label">Metrics</p>
                    <h3 id="demo-case-metrics-title">当前样例指标</h3>
                  </div>
                  <span>{selectedSample.id}</span>
                </div>
                <div className="demo-case-metric-grid">
                  {selectedSample.caseMetrics.map((metric) => (
                    <article className="demo-case-metric" key={metric.method}>
                      <strong>{metric.method}</strong>
                      <dl>
                        <div>
                          <dt>{metric.primaryLabel}</dt>
                          <dd>{metric.primaryValue}</dd>
                        </div>
                        <div>
                          <dt>{metric.secondaryLabel}</dt>
                          <dd>{metric.secondaryValue}</dd>
                        </div>
                        <div>
                          <dt>Latency</dt>
                          <dd>{metric.latency}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>

              <div className="demo-view-controls" aria-label="结果视图">
                {demo.views.map((view) => (
                  <button
                    aria-pressed={activeViewId === view.id}
                    key={view.id}
                    onClick={() => selectView(view.id)}
                    type="button"
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function DatasetDetailPage() {
  const { datasetDetail } = content;

  return (
    <div className="site-shell dataset-detail-shell">
      <header className="site-header">
        <a className="brand" href={resolveRoutePath('/')} aria-label="返回 AeroRIS 首页">
          AeroRIS
        </a>
        <nav aria-label="数据集页面导航">
          <a href={resolveRoutePath('/')}>首页</a>
          <a href="#structure">结构</a>
          <a href="#splits">划分统计</a>
          <a href="#samples">样例浏览</a>
        </nav>
      </header>

      <div className="dataset-page-layout">
        <PageToc items={datasetTocItems} />
        <main id="top">
        <section
          className="dataset-detail-hero"
          id="dataset-overview"
          aria-labelledby="dataset-detail-title"
        >
          <div className="dataset-detail-copy">
            <p className="eyebrow">{datasetDetail.overview.eyebrow}</p>
            <h1 className="dataset-detail-title" id="dataset-detail-title" aria-label={datasetDetail.overview.title}>
              <span>AeroRIS</span>
              <span>数据集详情</span>
            </h1>
            <p>{datasetDetail.overview.description}</p>
            <a className="button-link" href={resolveRoutePath('/')}>
              <Home aria-hidden="true" size={16} />
              <span>返回首页</span>
            </a>
          </div>
          <dl className="dataset-detail-metrics" aria-label="AeroRIS 数据集关键规模">
            {datasetDetail.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
                <p>{metric.detail}</p>
              </div>
            ))}
          </dl>
        </section>

        <section className="dataset-detail-section" id="features" aria-labelledby="dataset-feature-title">
          <div className="section-kicker">
            <Database aria-hidden="true" size={18} />
            <span>数据特点</span>
          </div>
          <h2 id="dataset-feature-title">低空无人机场景的四类核心压力</h2>
          <div className="dataset-feature-grid">
            {datasetDetail.features.map((feature) => (
              <article className="dataset-feature" key={feature.title}>
                <p>{feature.stat}</p>
                <h3>{feature.title}</h3>
                <span>{feature.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="dataset-detail-section" id="structure" aria-labelledby="dataset-structure-title">
          <div className="section-kicker">
            <Waypoints aria-hidden="true" size={18} />
            <span>标注结构</span>
          </div>
          <h2 id="dataset-structure-title">从表达级样本到像素级监督</h2>
          <div className="dataset-flow">
            {datasetDetail.flow.map((step) => (
              <article key={step.label}>
                <p>{step.label}</p>
                <h3>{step.title}</h3>
                <span>{step.description}</span>
              </article>
            ))}
          </div>
          <figure className="annotation-flow-figure">
            <img src={resolveAppPath(datasetDetail.annotationFlow.figure)} alt={datasetDetail.annotationFlow.figureAlt} />
            <figcaption>{datasetDetail.annotationFlow.caption}</figcaption>
          </figure>
        </section>

        <section className="dataset-detail-section" id="splits" aria-labelledby="dataset-splits-title">
          <div className="section-kicker">
            <BarChart3 aria-hidden="true" size={18} />
            <span>划分统计</span>
          </div>
          <h2 id="dataset-splits-title">Train / Val / Test 规模</h2>
          <div className="table-scroll">
            <table aria-label="AeroRIS 数据集划分统计">
              <thead>
                <tr>
                  <th>Split</th>
                  <th>表达级样本</th>
                  <th>唯一图像</th>
                  <th>实例标注</th>
                  <th>非空表达</th>
                  <th>空目标表达</th>
                  <th>Union Mask</th>
                  <th>Instance Mask</th>
                </tr>
              </thead>
              <tbody>
                {datasetDetail.splits.map((row) => (
                  <tr key={row.split}>
                    <th scope="row">{row.split}</th>
                    <td>{row.expressions}</td>
                    <td>{row.uniqueImages}</td>
                    <td>{row.instanceAnnotations}</td>
                    <td>{row.nonemptyExpressions}</td>
                    <td>{row.emptyExpressions}</td>
                    <td>{row.unionMasks}</td>
                    <td>{row.instanceMasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <SampleExplorer />
      </main>
      </div>
    </div>
  );
}

function HomePage() {
  const researchContextTables = getTableGroup('research-context');
  const datasetTables = getTableGroup('dataset-tables');
  const benchmarkTables = getTableGroup('benchmark-tables');
  const methodTables = getTableGroup('method-tables');

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AeroRIS 首页">
          AeroRIS
        </a>
        <nav aria-label="主导航">
          {content.nav.map((item) => (
            <a key={item.href} href={resolveRoutePath(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="home-layout">
        <PageToc items={homeTocItems} />
        <main id="top">
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-figure-wrap">
              <figure className="hero-figure">
                <img src={resolveAppPath(content.hero.figure)} alt={content.hero.figureAlt} />
              </figure>
            </div>

            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="hero-title">{content.hero.title}</h1>
              <p className="hero-subtitle">{content.hero.subtitle}</p>
              <p className="hero-description">{content.hero.description}</p>
              <div className="hero-actions" role="group" aria-label="项目链接">
                {content.hero.actions.map((action) => (
                  <a className="button-link" href={resolveRoutePath(action.href)} key={action.label}>
                    <span>{action.label}</span>
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <MetricGrid />

          <section className="content-section" id="overview">
          <SectionHeading id="overview" eyebrow="研究概览" title={content.overview.title}>
            {content.overview.body}
          </SectionHeading>
          <div className="challenge-grid">
            {content.overview.challenges.map((challenge) => (
              <article className="challenge-item" key={challenge.title}>
                <p className="challenge-stat">{challenge.stat}</p>
                <h3>{challenge.title}</h3>
                <p>{challenge.text}</p>
              </article>
            ))}
          </div>
          <div className="complete-table-intro">
            <SectionHeading id="overview" eyebrow="第一阶段研究" title="基于RefDrone数据集的无人机场景指代理解方法研究">
              这一部分集中展示第一阶段基于 RefDrone 数据集的研究范式对比、模型结果和组件消融。续表已经合并，便于连续阅读。
            </SectionHeading>
          </div>
          <TableGroupBlock group={researchContextTables} />
          </section>

          <ResearchStages />

          <section className="content-section" id="dataset">
          <SectionHeading id="dataset" eyebrow="数据集" title={content.dataset.title}>
            {content.dataset.description}
          </SectionHeading>
          <div className="dataset-layout">
            <figure className="paper-figure dataset-figure">
              <img src={resolveAppPath(content.dataset.figure)} alt={content.dataset.figureAlt} />
              <figcaption>测试集切片显示小目标、多实例和关系表达是 AeroRIS 的主要压力来源。</figcaption>
            </figure>
          </div>
          <a className="button-link dataset-detail-link" href={resolveRoutePath('/dataset')}>
            <span>进入 AeroRIS 数据集详情</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <TableGroupBlock group={datasetTables} />
          </section>

          <section className="content-section" id="benchmark">
          <SectionHeading id="benchmark" eyebrow="基准评测" title="AeroRIS 上的模型表现">
            多类模型在 AeroRIS 上呈现明显分层：广义指代分割模型精度较高，CRIS 速度快但小目标响应不足。
          </SectionHeading>
          <TableGroupBlock group={benchmarkTables} />
          </section>

          <section className="content-section method-section" id="method">
          <SectionHeading id="method" eyebrow="方法" title="AeroPlug / AeroCRIS 方法">
            AeroPlug 不是新的重型主干，而是围绕低空场景特征设计的训练监督修正与轻量解码校准模块。
          </SectionHeading>
          <figure className="paper-figure method-framework-figure">
            <img src={resolveAppPath(content.hero.figure)} alt="以 CRIS 模型为 baseline 形成的 AeroCRIS 模型框架图" />
            <figcaption>以CRIS模型为baseline形成的AeroCRIS模型框架图</figcaption>
          </figure>
          <div className="method-grid">
            {content.methodStages.map((stage) => (
              <article className="method-stage" key={stage.name}>
                <p className="stage-name">{stage.name}</p>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <ul>
                  {stage.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="method-design-figures" aria-label="AeroCRIS 阶段结构设计示意图">
            {methodDesignFigures.map((figure) => (
              <figure className="paper-figure method-design-figure" key={figure.src}>
                <img src={resolveAppPath(figure.src)} alt={figure.alt} />
                <figcaption>
                  <strong>{figure.title}</strong>
                  <span>{figure.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <TableGroupBlock group={methodTables} />
          </section>

          <section className="content-section outlook-section" id="outlook">
          <SectionHeading id="outlook" eyebrow="后续研究" title="局限与展望">
            当前方法显著改善了实时基线，但空目标拒识、高阈值边界质量和复杂场景鲁棒性仍需要继续推进。
          </SectionHeading>
          <ol className="outlook-list">
            {content.outlook.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-brand">AeroRIS</p>
          <p>面向低空智能感知的无人机场景指代表达理解方法研究。</p>
        </div>
        <div className="footer-links" aria-label="页面附加信息">
          <span>
            <BookOpen aria-hidden="true" size={16} />
            中文研究展示
          </span>
          <span>
            <Gauge aria-hidden="true" size={16} />
            实时性分析
          </span>
          <span>
            <Boxes aria-hidden="true" size={16} />
            数据集与方法
          </span>
          <span>
            <FileText aria-hidden="true" size={16} />
            链接待发布
          </span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const currentPath = stripBasePath(window.location.pathname);

  if (currentPath === '/dataset') {
    return <DatasetDetailPage />;
  }

  if (currentPath === '/demo') {
    return <DemoPage />;
  }

  return <HomePage />;
}

export default App;
