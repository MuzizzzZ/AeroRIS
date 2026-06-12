import demoManifestRaw from './demoManifest.json';
import type { DemoCaseMetric, DemoCategory, DemoCategoryId, DemoMetric, DemoSample } from './content';

type DemoMethodKey = 'cris' | 'stage1' | 'stage2';

type ManifestCaseMetric = {
  iou: number | null;
  dice: number | null;
  empty_correct: boolean | null;
  false_positive_area_px?: number;
  latency_ms: number;
};

type ManifestCase = {
  case_id: string;
  category_id: DemoCategoryId;
  category_index: number;
  category_total: number;
  title: string;
  category: string;
  split: string;
  dataset_index: string;
  image_id: string;
  expression: string;
  is_empty_target: boolean;
  instance_count: number;
  union_area_px: number;
  bbox_xywh: number[];
  display_focus: string;
  assets: {
    original: string;
    gt_mask: string;
    gt_overlay: string;
    cris_mask: string;
    cris_heatmap: string;
    cris_overlay: string;
    stage1_mask: string;
    stage1_heatmap: string;
    stage1_overlay: string;
    stage2_mask: string;
    stage2_heatmap: string;
    stage2_overlay: string;
    final_comparison: string;
  };
  per_case_metrics: Record<DemoMethodKey, ManifestCaseMetric>;
};

type ManifestMetric = {
  method: string;
  mIoU: number;
  oIoU: number;
  latency_ms: number;
  fps: number;
  empty_correct: number | null;
  empty_total?: number;
};

type DemoManifest = {
  cases: ManifestCase[];
  global_metrics: ManifestMetric[];
};

const demoManifest = demoManifestRaw as unknown as DemoManifest;
const assetBase = '/assets/aeroris-demo/';

const categoryCopy: Record<DemoCategoryId, { title: string; label: string }> = {
  small_target: { title: '小目标单实例', label: 'Small Target' },
  multi_instance: { title: '多实例集合', label: 'Multi Instance' },
  spatial_relation: { title: '空间关系表达', label: 'Spatial Relation' },
  high_density: { title: '高密度目标', label: 'High Density' },
  empty_target: { title: '空目标拒识', label: 'Empty Target' }
};

const categoryOrder: DemoCategoryId[] = [
  'small_target',
  'multi_instance',
  'spatial_relation',
  'high_density',
  'empty_target'
];

function asset(path: string) {
  return `${assetBase}${path}`;
}

function metricLine(metric: ManifestCaseMetric) {
  if (metric.empty_correct !== null) {
    const status = metric.empty_correct ? '拒识正确' : '存在误激活';
    const area = metric.false_positive_area_px === undefined ? '' : ` / FP ${metric.false_positive_area_px}px`;
    return `${status}${area} / ${metric.latency_ms.toFixed(2)}ms`;
  }

  return `IoU ${metric.iou?.toFixed(3) ?? '-'} / Dice ${metric.dice?.toFixed(3) ?? '-'} / ${metric.latency_ms.toFixed(2)}ms`;
}

function caseMetric(method: string, metric: ManifestCaseMetric): DemoCaseMetric {
  if (metric.empty_correct !== null) {
    return {
      method,
      primaryLabel: 'Empty',
      primaryValue: metric.empty_correct ? '已拒识' : '未拒识',
      secondaryLabel: 'FP Area',
      secondaryValue: `${(metric.false_positive_area_px ?? 0).toLocaleString('en-US')} px`,
      latency: `${metric.latency_ms.toFixed(2)}ms`
    };
  }

  return {
    method,
    primaryLabel: 'IoU',
    primaryValue: metric.iou?.toFixed(3) ?? '-',
    secondaryLabel: 'Dice',
    secondaryValue: metric.dice?.toFixed(3) ?? '-',
    latency: `${metric.latency_ms.toFixed(2)}ms`
  };
}

function instanceText(count: number) {
  if (count === 0) {
    return 'empty target';
  }

  if (count === 1) {
    return '1 instance';
  }

  return `${count} instances`;
}

function buildStageNotes(caseItem: ManifestCase): DemoSample['stageNotes'] {
  return {
    input: `${caseItem.case_id} 来自 ${caseItem.split} 集，表达为真实 AeroRIS 样例。`,
    baseline: `CRIS baseline：${metricLine(caseItem.per_case_metrics.cris)}。`,
    stage1: `AeroCRIS Stage 1：${metricLine(caseItem.per_case_metrics.stage1)}。`,
    stage2: `AeroCRIS Stage 2 TTA：${metricLine(caseItem.per_case_metrics.stage2)}。`,
    final: caseItem.display_focus
  };
}

function buildDemoSample(caseItem: ManifestCase): DemoSample {
  const category = categoryCopy[caseItem.category_id];

  return {
    id: caseItem.case_id,
    title: category.title,
    category: category.label,
    categoryId: caseItem.category_id,
    categoryIndex: caseItem.category_index,
    expression: caseItem.expression,
    image: asset(caseItem.assets.original),
    stats: [
      `${caseItem.split}-${caseItem.dataset_index}`,
      instanceText(caseItem.instance_count),
      `${caseItem.union_area_px.toLocaleString('en-US')} px`
    ],
    assetStatus: '真实模型输出',
    observation: caseItem.display_focus,
    caseMetrics: [
      caseMetric('CRIS', caseItem.per_case_metrics.cris),
      caseMetric('Stage 1', caseItem.per_case_metrics.stage1),
      caseMetric('Stage 2', caseItem.per_case_metrics.stage2)
    ],
    stageNotes: buildStageNotes(caseItem),
    results: {
      original: {
        src: asset(caseItem.assets.original),
        alt: `${caseItem.case_id} original image`,
        status: 'Original',
        note: `${caseItem.image_id} / ${caseItem.expression}`,
        variant: 'image'
      },
      gt: {
        src: asset(caseItem.assets.gt_overlay),
        alt: `${caseItem.case_id} GT overlay`,
        status: 'GT',
        note: caseItem.is_empty_target ? '空目标 GT 为全黑 mask。' : 'GT union mask 叠加到原图。',
        variant: 'overlay'
      },
      baseline: {
        src: asset(caseItem.assets.cris_overlay),
        alt: `${caseItem.case_id} CRIS baseline`,
        status: 'CRIS baseline',
        note: metricLine(caseItem.per_case_metrics.cris),
        variant: 'overlay'
      },
      stage1: {
        src: asset(caseItem.assets.stage1_overlay),
        alt: `${caseItem.case_id} Stage 1`,
        status: 'AeroCRIS Stage 1',
        note: metricLine(caseItem.per_case_metrics.stage1),
        variant: 'overlay'
      },
      stage2: {
        src: asset(caseItem.assets.stage2_overlay),
        alt: `${caseItem.case_id} Stage 2 TTA`,
        status: 'AeroCRIS Stage 2 TTA',
        note: metricLine(caseItem.per_case_metrics.stage2),
        variant: 'overlay'
      },
      overlay: {
        src: asset(caseItem.assets.final_comparison),
        alt: `${caseItem.case_id} final comparison`,
        status: 'Final comparison',
        note: 'Original / GT / CRIS / Stage 1 / Stage 2 对比图。',
        variant: 'image'
      }
    }
  };
}

export const demoCategories: DemoCategory[] = categoryOrder.map((id) => ({
  id,
  title: categoryCopy[id].title,
  label: categoryCopy[id].label,
  count: demoManifest.cases.filter((caseItem) => caseItem.category_id === id).length
}));

export const demoSamples: DemoSample[] = demoManifest.cases.map(buildDemoSample);

export const demoMetrics: DemoMetric[] = demoManifest.global_metrics.map((metric) => ({
  label: metric.method,
  miou: metric.mIoU.toFixed(2),
  oiou: metric.oIoU.toFixed(2),
  latency: `${metric.latency_ms.toFixed(2)}ms / ${metric.fps.toFixed(2)} FPS`,
  note:
    metric.empty_correct === null || metric.empty_total === undefined
      ? '真实模型输出'
      : `空目标拒识 ${metric.empty_correct}/${metric.empty_total}`
}));
