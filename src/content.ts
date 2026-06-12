import { demoCategories, demoMetrics, demoSamples } from './demoData';

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

export type ResearchStage = {
  label: string;
  chapter: string;
  title: string;
  description: string;
  points: string[];
};

export type ThesisTable = {
  id: string;
  title: string;
  sourceTables: string[];
  guide: string;
  columns: string[];
  columnWidths?: string[];
  headerRows?: {
    label: string;
    colSpan?: number;
    rowSpan?: number;
  }[][];
  rows: string[][];
};

export type TableGroup = {
  id: string;
  title: string;
  intro: string;
  tables: ThesisTable[];
};

export type DatasetMetric = {
  label: string;
  value: string;
  detail: string;
};

export type DatasetFeature = {
  title: string;
  stat: string;
  description: string;
};

export type DatasetFlowStep = {
  label: string;
  title: string;
  description: string;
};

export type DatasetSplitRow = {
  split: string;
  expressions: string;
  uniqueImages: string;
  instanceAnnotations: string;
  nonemptyExpressions: string;
  emptyExpressions: string;
  unionMasks: string;
  instanceMasks: string;
};

export type DatasetSample = {
  id: string;
  split: 'train' | 'val' | 'test';
  title: string;
  expression: string;
  image: string;
  unionMask: string;
  overlay: string;
  instanceOverlay?: string;
  instanceMasks?: string[];
  fileName: string;
  instances: string;
  unionArea: string;
  bbox: string;
  tags: string[];
};

export type DemoStageId = 'input' | 'baseline' | 'stage1' | 'stage2' | 'final';
export type DemoResultViewId = 'original' | 'gt' | 'baseline' | 'stage1' | 'stage2' | 'overlay';
export type DemoCategoryId = 'small_target' | 'multi_instance' | 'spatial_relation' | 'high_density' | 'empty_target';

export type DemoCategory = {
  id: DemoCategoryId;
  title: string;
  label: string;
  count: number;
};

export type DemoStage = {
  id: DemoStageId;
  title: string;
  label: string;
  viewId: DemoResultViewId;
  description: string;
  presenter: string;
};

export type DemoResultView = {
  id: DemoResultViewId;
  label: string;
  description: string;
};

export type DemoVisual = {
  src?: string;
  alt: string;
  status: string;
  note: string;
  variant: 'image' | 'mask' | 'heatmap' | 'overlay' | 'empty';
};

export type DemoCaseMetric = {
  method: string;
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  latency: string;
};

export type DemoSample = {
  id: string;
  title: string;
  category: string;
  categoryId: DemoCategoryId;
  categoryIndex: number;
  expression: string;
  image: string;
  stats: string[];
  assetStatus: string;
  observation: string;
  caseMetrics: DemoCaseMetric[];
  stageNotes: Record<DemoStageId, string>;
  results: Record<DemoResultViewId, DemoVisual>;
};

export type DemoMetric = {
  label: string;
  miou: string;
  oiou: string;
  latency: string;
  note: string;
};

export const content = {
  nav: [
    { label: '概览', href: '#overview' },
    { label: 'AeroRIS 数据集', href: '/dataset' },
    { label: '基准评测', href: '#benchmark' },
    { label: '方法', href: '#method' },
    { label: '演示', href: '/demo' },
    { label: '局限与展望', href: '#outlook' }
  ] satisfies NavItem[],
  hero: {
    eyebrow: 'LOW-ALTITUDE UAV REFERRING SEGMENTATION',
    title: 'AeroRIS',
    subtitle: '面向低空智能感知的无人机场景指代表达理解与像素级分割研究',
    description:
      '围绕低空无人机图像中的小目标、密集实例、空间关系和多实例集合表达，构建数据集、完成基准评测，并提出轻量化可插拔方法 AeroPlug / AeroCRIS。',
    figure: '/assets/thesis/fig-aerocris-framework-clear.png',
    figureAlt: 'AeroCRIS 总体框架示意图',
    actions: [
      { label: '论文', href: '#overview' },
      { label: '代码', href: '#method' },
      { label: '数据集', href: '/dataset' },
      { label: '演示', href: '/demo' }
    ] satisfies Action[],
    metrics: [
      { value: '17,882', label: '表达数量', detail: 'train / val / test 总计' },
      { value: '8,536', label: '唯一图像', detail: '低空无人机场景样本' },
      { value: '36.76', label: 'AeroCRIS mIoU', detail: 'Stage 2 TTA 测试集' },
      { value: '15.57ms', label: '单查询延迟', detail: '64.21 FPS' }
    ] satisfies Metric[]
  },
  researchStages: [
    {
      label: 'Stage 1',
      chapter: '论文第 3 章',
      title: '第一阶段：基于 RefDrone 的无人机场景指代理解',
      description:
        '先在 RefDrone 数据集上构建 SAM3 候选生成与数量感知集合选择流程，验证低空无人机场景中数量、空间关系和多实例集合表达的重要性。',
      points: ['SAM3 候选区域生成', '语言引导候选集合选择', '数量预测与数字提示库', '多实例集合推理']
    },
    {
      label: 'Stage 2',
      chapter: '论文第 4-6 章',
      title: '第二阶段：AeroRIS 数据集与 AeroPlug 可插拔方法',
      description:
        '在第一阶段经验基础上转向像素级指代分割：构建 AeroRIS 数据集，完成多模型评测与错误分析，并提出 AeroPlug / AeroCRIS 轻量化适配方法。',
      points: ['AeroRIS 指代分割数据集', '多类模型基准评测', 'CRIS baseline 错误分析', 'AeroPlug / AeroCRIS 轻量适配']
    }
  ] satisfies ResearchStage[],
  stageTransition:
    '由于 RefDrone 数据集更新、候选生成流程较重以及实时部署需求，研究从候选级指代理解转向像素级指代分割，并由此进入 AeroRIS 数据集构建、基准评测和可插拔方法设计。',
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
    figure: '/assets/thesis/ch4_aeroris_statistics.svg',
    figureAlt: 'AeroRIS 数据集样本分布与难点统计可视化'
  },
  datasetDetail: {
    overview: {
      eyebrow: 'AERORIS DATASET',
      title: 'AeroRIS 数据集详情',
      description:
        'AeroRIS 面向低空无人机图像中的自然语言指代分割，围绕小目标、密集实例、多目标集合表达和空目标拒识组织表达级样本、实例掩码与 union 掩码。'
    },
    metrics: [
      { label: '表达级样本', value: '17,882', detail: '每条样本对应一条自然语言表达' },
      { label: '唯一图像', value: '8,536', detail: '覆盖道路、路口、停车区等低空场景' },
      { label: '实例掩码', value: '63,557', detail: '非空目标实例的像素级二值掩码' },
      { label: 'Union 掩码', value: '17,036', detail: '多实例表达合并为表达级监督' },
      { label: '空目标表达', value: '846', detail: '训练模型拒识不存在的目标' }
    ] satisfies DatasetMetric[],
    features: [
      {
        title: '低空小目标',
        stat: '26,800 个实例 < 1024 px',
        description: '大量车辆、行人和非机动车只占画面中的很小区域，要求模型保留高分辨率前景线索。'
      },
      {
        title: '多实例集合表达',
        stat: '3,210 条表达含 6+ 实例',
        description: '数据集保留“一排车辆”“分散的人群”等集合表达，评测模型是否能完整覆盖目标集合。'
      },
      {
        title: '表达级 union 标注',
        stat: '17,036 个 union mask',
        description: '每条非空表达都有一个 union mask，直接对应指代表达分割任务的最终监督。'
      },
      {
        title: '空目标拒识',
        stat: '846 条空表达',
        description: '当表达与图像中目标不匹配时，样本保留空掩码，帮助模型学习“不应激活”的场景。'
      }
    ] satisfies DatasetFeature[],
    flow: [
      {
        label: 'Image',
        title: '低空无人机图像',
        description: '原始图像包含密集道路目标、复杂背景和显著尺度变化。'
      },
      {
        label: 'Expression',
        title: '自然语言表达',
        description: '表达包含颜色、类别、位置、数量和空间关系等指代线索。'
      },
      {
        label: 'Instance Masks',
        title: '实例级掩码',
        description: '每个源实例保留独立二值 mask，便于检查目标集合的组成。'
      },
      {
        label: 'Union Mask',
        title: '表达级 union 掩码',
        description: '同一表达中的多个实例被合并为最终分割监督，空目标表达保持空掩码。'
      }
    ] satisfies DatasetFlowStep[],
    annotationFlow: {
      figure: '/assets/aeroris-dataset/annotation-flow.png',
      figureAlt: 'AeroRIS 数据集构建流程示意图',
      caption: '从原始低空无人机图像、表达清洗、指代表达整理到像素级掩码生成，最终形成统一 manifest、划分协议和评测字段。'
    },
    splits: [
      {
        split: 'train',
        expressions: '13,022',
        uniqueImages: '6,407',
        instanceAnnotations: '47,557',
        nonemptyExpressions: '12,339',
        emptyExpressions: '683',
        unionMasks: '12,339',
        instanceMasks: '46,874'
      },
      {
        split: 'val',
        expressions: '1,428',
        uniqueImages: '534',
        instanceAnnotations: '4,741',
        nonemptyExpressions: '1,421',
        emptyExpressions: '7',
        unionMasks: '1,421',
        instanceMasks: '4,734'
      },
      {
        split: 'test',
        expressions: '3,432',
        uniqueImages: '1,595',
        instanceAnnotations: '12,105',
        nonemptyExpressions: '3,276',
        emptyExpressions: '156',
        unionMasks: '3,276',
        instanceMasks: '11,949'
      },
      {
        split: 'total',
        expressions: '17,882',
        uniqueImages: '8,536',
        instanceAnnotations: '64,403',
        nonemptyExpressions: '17,036',
        emptyExpressions: '846',
        unionMasks: '17,036',
        instanceMasks: '63,557'
      }
    ] satisfies DatasetSplitRow[],
    samples: [
      {
        id: 'train-8104',
        split: 'train',
        title: '密集人群集合表达',
        expression: 'The people are scattered throughout the pool area.',
        image: '/assets/aeroris-dataset/images/9999937_00000_d_0000016.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/8104.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/8104_union_overlay.jpg',
        instanceOverlay: '/assets/aeroris-dataset/visualizations/train/8104_instances_overlay.jpg',
        fileName: '9999937_00000_d_0000016.jpg',
        instances: '242',
        unionArea: '98,366 px',
        bbox: '[11, 115, 1378, 927]',
        tags: ['train', 'multi-instance', 'dense']
      },
      {
        id: 'train-8522',
        split: 'train',
        title: '同图多表达：白色车辆',
        expression: 'The white cars park along the sidewalk.',
        image: '/assets/aeroris-dataset/images/0000002_00448_d_0000015.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/8522.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/8522.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/train/8522/31392.png',
          '/assets/aeroris-dataset/instance_masks/train/8522/31393.png',
          '/assets/aeroris-dataset/instance_masks/train/8522/31394.png'
        ],
        fileName: '0000002_00448_d_0000015.jpg',
        instances: '6',
        unionArea: '9,367 px',
        bbox: '[77, 250, 650, 290]',
        tags: ['train', 'same-image', 'vehicle']
      },
      {
        id: 'train-8523',
        split: 'train',
        title: '同图多表达：黑色车辆',
        expression: 'The black cars park in various locations around the area.',
        image: '/assets/aeroris-dataset/images/0000002_00448_d_0000015.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/8523.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/8523.png',
        fileName: '0000002_00448_d_0000015.jpg',
        instances: '4',
        unionArea: '4,780 px',
        bbox: '[96, 238, 665, 302]',
        tags: ['train', 'same-image', 'contrast']
      },
      {
        id: 'train-8521',
        split: 'train',
        title: '同图多表达：红色车辆',
        expression: 'The red cars park near the building.',
        image: '/assets/aeroris-dataset/images/0000002_00448_d_0000015.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/8521.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/8521.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/train/8521/31391.png'],
        fileName: '0000002_00448_d_0000015.jpg',
        instances: '1',
        unionArea: '1,945 px',
        bbox: '[93, 389, 75, 40]',
        tags: ['train', 'same-image', 'single-instance']
      },
      {
        id: 'train-2081',
        split: 'train',
        title: '停车场小尺度车辆',
        expression: 'The green cars park in the parking lot.',
        image: '/assets/aeroris-dataset/images/0000002_00005_d_0000014.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/2081.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/2081.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/train/2081/7501.png'],
        fileName: '0000002_00005_d_0000014.jpg',
        instances: '1',
        unionArea: '1,360 px',
        bbox: '[540, 374, 64, 33]',
        tags: ['train', 'small-target', 'vehicle']
      },
      {
        id: 'train-2525',
        split: 'train',
        title: '成排货车集合',
        expression: 'The white trucks park in rows near the building with a red roof.',
        image: '/assets/aeroris-dataset/images/0000007_04999_d_0000036.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/2525.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/2525.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/train/2525/9140.png',
          '/assets/aeroris-dataset/instance_masks/train/2525/9141.png',
          '/assets/aeroris-dataset/instance_masks/train/2525/9142.png'
        ],
        fileName: '0000007_04999_d_0000036.jpg',
        instances: '8',
        unionArea: '117,523 px',
        bbox: '[243, 544, 912, 221]',
        tags: ['train', 'row-layout', 'truck']
      },
      {
        id: 'train-5021',
        split: 'train',
        title: '建筑附近密集车辆',
        expression: 'The white cars park near the dealership building.',
        image: '/assets/aeroris-dataset/images/0000007_05999_d_0000038.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/5021.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/5021.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/train/5021/18181.png',
          '/assets/aeroris-dataset/instance_masks/train/5021/18182.png',
          '/assets/aeroris-dataset/instance_masks/train/5021/18183.png'
        ],
        fileName: '0000007_05999_d_0000038.jpg',
        instances: '20',
        unionArea: '50,069 px',
        bbox: '[397, 15, 525, 624]',
        tags: ['train', 'dense-vehicle', 'building']
      },
      {
        id: 'train-5521',
        split: 'train',
        title: '分离单车目标',
        expression: 'The white car parked separately on the left side.',
        image: '/assets/aeroris-dataset/images/0000007_05499_d_0000037.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/5521.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/5521.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/train/5521/20039.png'],
        fileName: '0000007_05499_d_0000037.jpg',
        instances: '1',
        unionArea: '10,069 px',
        bbox: '[10, 412, 143, 117]',
        tags: ['train', 'single-instance', 'spatial']
      },
      {
        id: 'train-9492',
        split: 'train',
        title: '道路底部黑色车辆',
        expression: 'The black cars on the bottom side of the road.',
        image: '/assets/aeroris-dataset/images/0000003_00231_d_0000016.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/train/9492.png',
        overlay: '/assets/aeroris-dataset/visualizations/train/9492.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/train/9492/34782.png',
          '/assets/aeroris-dataset/instance_masks/train/9492/34783.png',
          '/assets/aeroris-dataset/instance_masks/train/9492/34784.png'
        ],
        fileName: '0000003_00231_d_0000016.jpg',
        instances: '4',
        unionArea: '3,191 px',
        bbox: '[209, 266, 740, 61]',
        tags: ['train', 'spatial', 'road']
      },
      {
        id: 'val-238',
        split: 'val',
        title: '验证集多实例车辆',
        expression: 'The white cars parked along the sidewalk and navigating the road.',
        image: '/assets/aeroris-dataset/images/0000001_02999_d_0000005.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/238.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/238.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/238/808.png',
          '/assets/aeroris-dataset/instance_masks/val/238/809.png',
          '/assets/aeroris-dataset/instance_masks/val/238/810.png'
        ],
        fileName: '0000001_02999_d_0000005.jpg',
        instances: '12',
        unionArea: '23,022 px',
        bbox: '[585, 23, 426, 794]',
        tags: ['val', 'multi-instance', 'road']
      },
      {
        id: 'val-1128',
        split: 'val',
        title: '路口白色摩托车',
        expression: 'The white motorcycles near the intersection.',
        image: '/assets/aeroris-dataset/images/0000001_03999_d_0000007.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/1128.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/1128.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/1128/3719.png',
          '/assets/aeroris-dataset/instance_masks/val/1128/3720.png',
          '/assets/aeroris-dataset/instance_masks/val/1128/3721.png'
        ],
        fileName: '0000001_03999_d_0000007.jpg',
        instances: '10',
        unionArea: '11,838 px',
        bbox: '[837, 379, 634, 659]',
        tags: ['val', 'intersection', 'motorcycle']
      },
      {
        id: 'val-1129',
        split: 'val',
        title: '路口行人穿越',
        expression: 'The pedestrians crossing the road.',
        image: '/assets/aeroris-dataset/images/0000001_03999_d_0000007.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/1129.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/1129.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/1129/3729.png',
          '/assets/aeroris-dataset/instance_masks/val/1129/3730.png',
          '/assets/aeroris-dataset/instance_masks/val/1129/3731.png'
        ],
        fileName: '0000001_03999_d_0000007.jpg',
        instances: '4',
        unionArea: '2,207 px',
        bbox: '[778, 696, 257, 210]',
        tags: ['val', 'pedestrian', 'small-target']
      },
      {
        id: 'val-1218',
        split: 'val',
        title: '停车场黄色车辆',
        expression: 'The yellow cars park in the lot.',
        image: '/assets/aeroris-dataset/images/0000001_05249_d_0000009.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/1218.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/1218.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/val/1218/3974.png'],
        fileName: '0000001_05249_d_0000009.jpg',
        instances: '1',
        unionArea: '1,013 px',
        bbox: '[1192, 132, 36, 35]',
        tags: ['val', 'small-target', 'color']
      },
      {
        id: 'val-239',
        split: 'val',
        title: '红色棚车集合',
        expression: 'The red awning-tricycles scattered around the scene.',
        image: '/assets/aeroris-dataset/images/0000001_02999_d_0000005.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/239.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/239.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/239/816.png',
          '/assets/aeroris-dataset/instance_masks/val/239/817.png',
          '/assets/aeroris-dataset/instance_masks/val/239/818.png'
        ],
        fileName: '0000001_02999_d_0000005.jpg',
        instances: '8',
        unionArea: '10,867 px',
        bbox: '[357, 77, 515, 786]',
        tags: ['val', 'multi-instance', 'tricycle']
      },
      {
        id: 'val-249',
        split: 'val',
        title: '开放区域白色行人',
        expression: 'The white pedestrians walk along the sidewalk and open space.',
        image: '/assets/aeroris-dataset/images/0000001_04527_d_0000008.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/249.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/249.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/249/855.png',
          '/assets/aeroris-dataset/instance_masks/val/249/856.png',
          '/assets/aeroris-dataset/instance_masks/val/249/857.png'
        ],
        fileName: '0000001_04527_d_0000008.jpg',
        instances: '12',
        unionArea: '3,013 px',
        bbox: '[854, 52, 358, 524]',
        tags: ['val', 'pedestrian', 'open-space']
      },
      {
        id: 'val-444',
        split: 'val',
        title: '沿路白色车辆',
        expression: 'The white cars parked along the road.',
        image: '/assets/aeroris-dataset/images/0000001_03499_d_0000006.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/val/444.png',
        overlay: '/assets/aeroris-dataset/visualizations/val/444.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/val/444/1479.png',
          '/assets/aeroris-dataset/instance_masks/val/444/1480.png',
          '/assets/aeroris-dataset/instance_masks/val/444/1481.png'
        ],
        fileName: '0000001_03499_d_0000006.jpg',
        instances: '6',
        unionArea: '42,051 px',
        bbox: '[242, 477, 659, 603]',
        tags: ['val', 'roadside', 'vehicle']
      },
      {
        id: 'test-3005',
        split: 'test',
        title: '测试集小目标道路场景',
        expression: 'The white cars park on the dirt patches near the roads.',
        image: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/3005.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/3005.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/test/3005/10684.png',
          '/assets/aeroris-dataset/instance_masks/test/3005/10685.png',
          '/assets/aeroris-dataset/instance_masks/test/3005/10686.png'
        ],
        fileName: '0000006_00611_d_0000002.jpg',
        instances: '9',
        unionArea: '34,433 px',
        bbox: '[280, 260, 495, 477]',
        tags: ['test', 'small-target', 'road']
      },
      {
        id: 'test-1760',
        split: 'test',
        title: '红顶建筑旁车辆排布',
        expression: 'The white cars park in a row next to the buildings with red roofs.',
        image: '/assets/aeroris-dataset/images/0000006_01275_d_0000004.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/1760.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/1760.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/test/1760/6420.png',
          '/assets/aeroris-dataset/instance_masks/test/1760/6421.png',
          '/assets/aeroris-dataset/instance_masks/test/1760/6422.png'
        ],
        fileName: '0000006_01275_d_0000004.jpg',
        instances: '6',
        unionArea: '21,362 px',
        bbox: '[495, 59, 161, 230]',
        tags: ['test', 'row-layout', 'building']
      },
      {
        id: 'test-1997',
        split: 'test',
        title: '土路附近白色车辆',
        expression: 'The white cars park near the small structures and along the dirt road.',
        image: '/assets/aeroris-dataset/images/0000006_00159_d_0000001.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/1997.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/1997.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/test/1997/7275.png',
          '/assets/aeroris-dataset/instance_masks/test/1997/7276.png',
          '/assets/aeroris-dataset/instance_masks/test/1997/7277.png'
        ],
        fileName: '0000006_00159_d_0000001.jpg',
        instances: '12',
        unionArea: '25,651 px',
        bbox: '[0, 255, 924, 308]',
        tags: ['test', 'multi-instance', 'dirt-road']
      },
      {
        id: 'test-2625',
        split: 'test',
        title: '院落蓝色货车',
        expression: 'The blue trucks park in the yard.',
        image: '/assets/aeroris-dataset/images/0000006_01659_d_0000004.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/2625.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/2625.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/test/2625/9405.png',
          '/assets/aeroris-dataset/instance_masks/test/2625/9406.png',
          '/assets/aeroris-dataset/instance_masks/test/2625/9407.png'
        ],
        fileName: '0000006_01659_d_0000004.jpg',
        instances: '9',
        unionArea: '60,266 px',
        bbox: '[410, 122, 931, 435]',
        tags: ['test', 'truck', 'yard']
      },
      {
        id: 'test-2895',
        split: 'test',
        title: '绿地周围白色车辆',
        expression: 'The white cars park around the central green area.',
        image: '/assets/aeroris-dataset/images/0000006_01111_d_0000003.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/2895.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/2895.png',
        instanceMasks: [
          '/assets/aeroris-dataset/instance_masks/test/2895/10311.png',
          '/assets/aeroris-dataset/instance_masks/test/2895/10312.png',
          '/assets/aeroris-dataset/instance_masks/test/2895/10313.png'
        ],
        fileName: '0000006_01111_d_0000003.jpg',
        instances: '6',
        unionArea: '39,886 px',
        bbox: '[581, 156, 594, 423]',
        tags: ['test', 'spatial', 'green-area']
      },
      {
        id: 'test-3003',
        split: 'test',
        title: '建筑材料旁蓝色车辆',
        expression: 'The blue cars park near the construction materials.',
        image: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/3003.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/3003.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/test/3003/10682.png'],
        fileName: '0000006_00611_d_0000002.jpg',
        instances: '1',
        unionArea: '1,538 px',
        bbox: '[387, 387, 40, 44]',
        tags: ['test', 'small-target', 'construction']
      },
      {
        id: 'test-3004',
        split: 'test',
        title: '左上角红色货车',
        expression: 'The red trucks are parked in the upper left corner of the image.',
        image: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
        unionMask: '/assets/aeroris-dataset/union_masks/test/3004.png',
        overlay: '/assets/aeroris-dataset/visualizations/test/3004.png',
        instanceMasks: ['/assets/aeroris-dataset/instance_masks/test/3004/10683.png'],
        fileName: '0000006_00611_d_0000002.jpg',
        instances: '1',
        unionArea: '6,456 px',
        bbox: '[72, 145, 119, 88]',
        tags: ['test', 'spatial', 'truck']
      }
    ] satisfies DatasetSample[]
  },
  demo: {
    overview: '当前页面使用真实 AeroRIS 样例与模型输出结果，支持按类别浏览五步推理过程。',
    stages: [
      {
        id: 'input',
        title: '输入任务',
        label: 'Step 1',
        viewId: 'original',
        description: '展示无人机图像与自然语言表达，定义像素级指代分割任务。',
        presenter: '输入是一张低空无人机图像和一句指代表达，输出是表达所指目标的二值 mask。'
      },
      {
        id: 'baseline',
        title: 'CRIS baseline',
        label: 'Step 2',
        viewId: 'baseline',
        description: '展示轻量 baseline 的预测状态，观察小目标响应不足和覆盖不完整。',
        presenter: 'CRIS 速度快，但在低空小目标和复杂背景中容易漏检、欠分割或局部响应。'
      },
      {
        id: 'stage1',
        title: 'Stage 1',
        label: 'Step 3',
        viewId: 'stage1',
        description: '展示训练侧监督修正后的结果，强调小目标区域得到更稳定监督。',
        presenter: 'Stage 1 主要改变训练目标，通过面积保持、前景均衡和小目标加权改善监督信号。'
      },
      {
        id: 'stage2',
        title: 'Stage 2 TTA',
        label: 'Step 4',
        viewId: 'stage2',
        description: '展示推理侧 Tiny Target Activation 的轻量校准效果。',
        presenter: 'Stage 2 TTA 在推理阶段校准 logits，增强目标区域激活并抑制背景误响应。'
      },
      {
        id: 'final',
        title: '最终输出',
        label: 'Step 5',
        viewId: 'overlay',
        description: '并列展示 GT、CRIS baseline 与 AeroCRIS Stage 2 TTA 的最终观察结论。',
        presenter: '最终输出强调 AeroCRIS 相比 baseline 在目标完整性、响应强度和背景抑制上的改善。'
      }
    ] satisfies DemoStage[],
    views: [
      { id: 'original', label: 'Original', description: '原始无人机图像' },
      { id: 'gt', label: 'GT', description: '表达级 Union Mask' },
      { id: 'baseline', label: 'CRIS', description: 'CRIS baseline 预测' },
      { id: 'stage1', label: 'Stage 1', description: '训练侧监督修正结果' },
      { id: 'stage2', label: 'Stage 2', description: 'TTA 校准结果' },
      { id: 'overlay', label: 'Overlay', description: '图像叠加可视化' }
    ] satisfies DemoResultView[],
    categories: demoCategories,
    samples: demoSamples,
    legacySamples: [
      {
        id: 'test-3003',
        title: '小目标单实例',
        category: 'Small Target',
        expression: 'The blue cars park near the construction materials.',
        image: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
        stats: ['test-3003', '1 instance', '1,538 px'],
        assetStatus: '真实样例 + 预测占位',
        observation: '目标面积很小，适合展示 baseline 小目标激活不足与 Stage 2 TTA 的增强作用。',
        stageNotes: {
          input: '这个样例的目标区域只有 1,538 px，是低空无人机图像中很典型的小目标。',
          baseline: 'baseline 容易只激活局部，或者被建筑材料和道路纹理干扰。',
          stage1: 'Stage 1 让训练阶段更关注小面积前景，缓解小目标监督被背景淹没的问题。',
          stage2: 'Stage 2 TTA 用轻量残差校准增强目标区域，让小目标响应更集中。',
          final: '并列展示 GT、CRIS baseline 与 AeroCRIS Stage 2 TTA，说明小目标激活更完整。'
        },
        results: {
          original: {
            src: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
            alt: '小目标单实例原始无人机图像',
            status: '真实样例',
            note: '原始低空无人机图像。',
            variant: 'image'
          },
          gt: {
            src: '/assets/aeroris-dataset/union_masks/test/3003.png',
            alt: '小目标单实例 GT union mask',
            status: '真实 Union Mask',
            note: '白色区域是表达所指的小目标车辆。',
            variant: 'mask'
          },
          baseline: {
            alt: '小目标单实例 CRIS baseline 预测占位',
            status: '待替换真实预测',
            note: '占位用于模拟 baseline 对小目标响应较弱的情况。',
            variant: 'heatmap'
          },
          stage1: {
            alt: '小目标单实例 Stage 1 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示训练侧监督修正后目标响应增强。',
            variant: 'mask'
          },
          stage2: {
            alt: '小目标单实例 Stage 2 TTA 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示 TTA 校准后目标区域更集中。',
            variant: 'overlay'
          },
          overlay: {
            src: '/assets/aeroris-dataset/visualizations/test/3003.png',
            alt: '小目标单实例 overlay 可视化',
            status: '真实 Overlay',
            note: '真实 overlay 用于定位目标在原图中的位置。',
            variant: 'overlay'
          }
        }
      },
      {
        id: 'train-8522',
        title: '多实例集合',
        category: 'Multi Instance',
        expression: 'The white cars park along the sidewalk.',
        image: '/assets/aeroris-dataset/images/0000002_00448_d_0000015.jpg',
        stats: ['train-8522', '6 instances', '9,367 px'],
        assetStatus: '真实样例 + 预测占位',
        observation: '同一表达指向多个白色车辆，适合解释 instance mask 与 union mask 的关系。',
        stageNotes: {
          input: '表达不是单个目标，而是同一场景中一组白色车辆。',
          baseline: 'baseline 在多实例集合中可能只覆盖部分目标，导致 union mask 不完整。',
          stage1: 'Stage 1 的监督修正让多实例前景整体获得更稳定的训练约束。',
          stage2: 'Stage 2 TTA 进一步增强多个小目标区域，减少漏掉远处实例的情况。',
          final: '最终观察重点是集合覆盖是否完整，而不是只命中其中一辆车。'
        },
        results: {
          original: {
            src: '/assets/aeroris-dataset/images/0000002_00448_d_0000015.jpg',
            alt: '多实例集合原始无人机图像',
            status: '真实样例',
            note: '同一图像中存在多种颜色和位置的车辆。',
            variant: 'image'
          },
          gt: {
            src: '/assets/aeroris-dataset/union_masks/train/8522.png',
            alt: '多实例集合 GT union mask',
            status: '真实 Union Mask',
            note: '多个实例被合并为表达级 union mask。',
            variant: 'mask'
          },
          baseline: {
            alt: '多实例集合 CRIS baseline 预测占位',
            status: '待替换真实预测',
            note: '占位用于模拟 baseline 只覆盖部分车辆。',
            variant: 'heatmap'
          },
          stage1: {
            alt: '多实例集合 Stage 1 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示集合目标覆盖更完整。',
            variant: 'mask'
          },
          stage2: {
            alt: '多实例集合 Stage 2 TTA 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示多个目标区域同步增强。',
            variant: 'overlay'
          },
          overlay: {
            src: '/assets/aeroris-dataset/visualizations/train/8522.png',
            alt: '多实例集合 overlay 可视化',
            status: '真实 Overlay',
            note: '红框和 overlay 展示多实例集合所在区域。',
            variant: 'overlay'
          }
        }
      },
      {
        id: 'test-2895',
        title: '空间关系表达',
        category: 'Spatial Relation',
        expression: 'The white cars park around the central green area.',
        image: '/assets/aeroris-dataset/images/0000006_01111_d_0000003.jpg',
        stats: ['test-2895', '6 instances', 'green area'],
        assetStatus: '真实样例 + 预测占位',
        observation: '表达中的空间关系决定目标集合，需要模型区分中心绿地周围和其他区域车辆。',
        stageNotes: {
          input: '这个样例的关键不是“白色车”本身，而是“围绕中心绿地”的空间约束。',
          baseline: 'baseline 可能被同类车辆干扰，激活不符合空间关系的目标。',
          stage1: 'Stage 1 改善前景监督，让被指代区域的目标响应更稳定。',
          stage2: 'Stage 2 TTA 在推理侧增强符合空间关系的目标区域。',
          final: '最终观察重点是模型是否遵循表达中的空间限定。'
        },
        results: {
          original: {
            src: '/assets/aeroris-dataset/images/0000006_01111_d_0000003.jpg',
            alt: '空间关系表达原始无人机图像',
            status: '真实样例',
            note: '图中存在多个相似车辆区域。',
            variant: 'image'
          },
          gt: {
            src: '/assets/aeroris-dataset/union_masks/test/2895.png',
            alt: '空间关系表达 GT union mask',
            status: '真实 Union Mask',
            note: 'GT 只覆盖中心绿地周围的白色车辆。',
            variant: 'mask'
          },
          baseline: {
            alt: '空间关系表达 CRIS baseline 预测占位',
            status: '待替换真实预测',
            note: '占位用于模拟空间关系约束不足时的误响应。',
            variant: 'heatmap'
          },
          stage1: {
            alt: '空间关系表达 Stage 1 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示监督修正后的目标响应。',
            variant: 'mask'
          },
          stage2: {
            alt: '空间关系表达 Stage 2 TTA 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示空间相关目标区域被增强。',
            variant: 'overlay'
          },
          overlay: {
            src: '/assets/aeroris-dataset/visualizations/test/2895.png',
            alt: '空间关系表达 overlay 可视化',
            status: '真实 Overlay',
            note: '真实 overlay 展示空间关系筛选后的目标集合。',
            variant: 'overlay'
          }
        }
      },
      {
        id: 'train-8104',
        title: '高密度目标',
        category: 'High Density',
        expression: 'The people are scattered throughout the pool area.',
        image: '/assets/aeroris-dataset/images/9999937_00000_d_0000016.jpg',
        stats: ['train-8104', '242 instances', 'dense'],
        assetStatus: '真实样例 + 预测占位',
        observation: '密集人群样例展示大量实例、局部重叠和 union 监督压力。',
        stageNotes: {
          input: '这个样例包含大量实例，表达指向一个密集区域内的目标集合。',
          baseline: 'baseline 在密集区域中容易出现局部漏检或背景误激活。',
          stage1: 'Stage 1 通过更平衡的前景监督缓解密集小目标被背景主导的问题。',
          stage2: 'Stage 2 TTA 进一步校准目标区域响应，让密集区域激活更稳定。',
          final: '最终观察重点是密集区域的整体覆盖和背景抑制。'
        },
        results: {
          original: {
            src: '/assets/aeroris-dataset/images/9999937_00000_d_0000016.jpg',
            alt: '高密度目标原始无人机图像',
            status: '真实样例',
            note: '原图包含密集人群和复杂背景。',
            variant: 'image'
          },
          gt: {
            src: '/assets/aeroris-dataset/union_masks/train/8104.png',
            alt: '高密度目标 GT union mask',
            status: '真实 Union Mask',
            note: 'union mask 覆盖表达所指的密集人群区域。',
            variant: 'mask'
          },
          baseline: {
            alt: '高密度目标 CRIS baseline 预测占位',
            status: '待替换真实预测',
            note: '占位用于模拟密集场景中的局部响应不足。',
            variant: 'heatmap'
          },
          stage1: {
            alt: '高密度目标 Stage 1 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示训练监督修正后的密集前景覆盖。',
            variant: 'mask'
          },
          stage2: {
            alt: '高密度目标 Stage 2 TTA 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示 TTA 后的密集区域激活。',
            variant: 'overlay'
          },
          overlay: {
            src: '/assets/aeroris-dataset/visualizations/train/8104_union_overlay.jpg',
            alt: '高密度目标 overlay 可视化',
            status: '真实 Overlay',
            note: '真实 overlay 展示密集目标区域。',
            variant: 'overlay'
          }
        }
      },
      {
        id: 'empty-placeholder',
        title: '空目标拒识',
        category: 'Empty Target',
        expression: 'The yellow bus parked beside the red building.',
        image: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
        stats: ['846 empty', 'empty mask', '待替换'],
        assetStatus: '空目标占位，真实空目标样例后续替换',
        observation: '用于展示表达不存在目标时应输出空 mask，而不是强行激活背景。',
        stageNotes: {
          input: '这是空目标拒识占位样例：表达中的目标后续会替换为真实不存在目标场景。',
          baseline: 'baseline 在空目标场景中可能强行激活相似背景或无关目标。',
          stage1: 'Stage 1 可提供空目标监督，但仍需继续改善拒识稳定性。',
          stage2: 'Stage 2 TTA 增强非空目标时可能影响 empty correct，这也是后续工作重点。',
          final: '最终输出应为空 mask；真实空目标样例后续替换当前占位。'
        },
        results: {
          original: {
            src: '/assets/aeroris-dataset/images/0000006_00611_d_0000002.jpg',
            alt: '空目标拒识占位原始图像',
            status: '占位原图',
            note: '真实空目标图像后续替换。',
            variant: 'image'
          },
          gt: {
            alt: '空目标拒识 GT empty mask 占位',
            status: '待替换真实样例',
            note: '空目标表达的 GT 应为空 mask。',
            variant: 'empty'
          },
          baseline: {
            alt: '空目标拒识 CRIS baseline 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示 baseline 可能出现无关激活。',
            variant: 'heatmap'
          },
          stage1: {
            alt: '空目标拒识 Stage 1 预测占位',
            status: '待替换真实预测',
            note: '占位用于表示训练侧空目标监督。',
            variant: 'empty'
          },
          stage2: {
            alt: '空目标拒识 Stage 2 TTA 预测占位',
            status: '待替换真实预测',
            note: '占位用于说明 TTA 对 empty correct 的影响需要谨慎处理。',
            variant: 'empty'
          },
          overlay: {
            alt: '空目标拒识最终 empty mask 占位',
            status: '待替换真实样例',
            note: '最终应输出空 mask，而不是强行分割背景。',
            variant: 'empty'
          }
        }
      }
    ],
    metrics: demoMetrics,
    legacyMetrics: [
      { label: 'CRIS baseline', miou: '17.82', oiou: '24.41', latency: '12.34ms', note: '速度快，但小目标响应不足' },
      { label: 'AeroCRIS Stage 1', miou: '34.22', oiou: '38.61', latency: '12.52ms', note: '训练侧监督修正后显著提升' },
      { label: 'AeroCRIS Stage 2 TTA', miou: '36.76', oiou: '41.11', latency: '15.57ms / 64.21 FPS', note: '轻量推理校准后继续提升' }
    ]
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
  tableSourceCount: 15,
  tableGroups: [
    {
      id: 'research-context',
      title: '研究背景与第一阶段实验',
      intro: '这一组表格对应论文第 3 章：先比较低空无人机指代表达相关研究范式，再展示第一阶段 RefDrone pipeline 的对比结果与组件消融。',
      tables: [
        {
          id: 'table-3-1',
          title: '表3-1 低空无人机视角指代表达理解相关研究范式对比（含续表）',
          sourceTables: ['表3-1', '续表3-1'],
          guide: '该表说明本文任务为什么不能被传统无人机语义分割、目标检测、通用指代分割或遥感指代分割完全覆盖：低空无人机场景同时需要语言理解、实例级目标和多目标集合表达能力。',
          columns: ['方法类别', '代表方法', '发表来源', '年份', '面向无人机', '语言理解', '实例级目标', '多目标', '不足'],
          rows: [
            ['无人机语义分割', 'UNetFormer', 'ISPRS J.', '2022', '√', '×', '×', '-', '不处理语言指代'],
            ['无人机语义分割', 'ABCNet', 'ISPRS J.', '2021', '√', '×', '×', '-', '缺少实例级定位'],
            ['无人机语义分割', 'BANet', 'Remote Sens.', '2021', '√', '×', '×', '-', '仅面向场景解析'],
            ['无人机目标检测', 'ClusDet', 'ICCV', '2019', '√', '×', '部分', '-', '仅输出框，缺少语言理解'],
            ['无人机目标检测', 'UFPMP-Det', 'AAAI', '2022', '√', '×', '部分', '-', '仅输出框，缺少指代建模'],
            ['通用指代分割', 'LAVT', 'CVPR', '2022', '×', '√', '√', '×', '非无人机场景设计'],
            ['通用指代分割', 'CRIS', 'CVPR', '2022', '×', '√', '√', '×', '密集无人机目标适应不足'],
            ['通用指代分割', 'VLT', 'TPAMI', '2023', '×', '√', '√', '×', '非无人机'],
            ['通用指代分割', 'PolyFormer', 'CVPR', '2023', '×', '√', '√', '×', '缺少无人机场景适配'],
            ['广义指代分割', 'ReLA(GRES)', 'CVPR Highlight', '2023', '×', '√', '√', '√', '缺少显式数量感知'],
            ['广义指代分割', 'ETRIS', 'ICCV', '2023', '×', '√', '√', '×', '对密集无人机场景适配不足'],
            ['遥感指代分割', 'RRSIS(LGCE)', 'IEEE TGRS', '2024', '部分', '√', '√', '×', '偏单目标，非低空无人机'],
            ['遥感指代分割', 'RMSIN', 'CVPR', '2024', '部分', '√', '√', '×', '非低空无人机视角'],
            ['低空无人机指代分割', 'SAARN(RIS-LAD)', 'AAAI', '2026', '√', '√', '√', '×', '主要面向单目标'],
            ['本文第一阶段方法', 'AeroRIS', '-', '2026', '√', '√', '√', '√', '-']
          ]
        },
        {
          id: 'table-3-2',
          title: '表3-2 第一阶段方法与现有方法在 RefDrone 上的对比结果',
          sourceTables: ['表3-2'],
          guide: '该表展示第一阶段 SAM3 候选生成与数量感知集合选择流程的收益。原表后四列为实例级与图像级评价指标，前端用可读列名承接。',
          columns: ['模型', '方法类别', '是否依赖 REC 大模型', '实例级 F1', '实例级 Acc', '图像级 F1', '图像级 Acc'],
          rows: [
            ['MDETR', 'Grounding', '否', '32.60', '19.49', '19.17', '10.81'],
            ['GLIP', 'Grounding', '否', '24.23', '14.86', '16.92', '13.29'],
            ['NGDINO-T', 'Grounding', '否', '33.33', '20.97', '32.41', '22.81'],
            ['NGDINO-B', 'Grounding', '否', '35.28', '22.36', '34.53', '24.21'],
            ['GDINO-T', 'Grounding', '否', '29.48', '18.46', '28.74', '20.45'],
            ['GDINO-B', 'Grounding', '否', '31.67', '19.83', '31.21', '21.89'],
            ['MiniGPT-v2', 'MLLM', '是', '4.97', '2.74', '13.56', '8.97'],
            ['LLaVA-v1.5', 'MLLM', '是', '6.00', '3.63', '14.43', '11.57'],
            ['Qwen-VL', 'MLLM', '是', '14.14', '7.61', '20.10', '11.17'],
            ['AeroRIS', 'SAM-based', '否', '55.44', '38.50', '39.69', '25.70']
          ]
        },
        {
          id: 'table-3-3',
          title: '表3-3 RefDrone 上 AeroRIS 主要组件消融结果',
          sourceTables: ['表3-3'],
          guide: '该表说明数量预测头、数字提示库和外观感知候选表示对第一阶段集合选择的重要性，尤其是数量预测头缺失时指标直接崩塌。',
          columns: ['数量预测头', '数字提示库', '外观感知候选表示', '实例级 F1', '实例级 Acc', '图像级 F1', '图像级 Acc'],
          rows: [
            ['×', '√', '√', '0.00', '1.29', '0.00', '4.55'],
            ['√', '×', '√', '54.95', '38.05', '35.72', '22.81'],
            ['√', '√', '×', '54.77', '37.87', '40.56', '26.37'],
            ['√', '×', '×', '54.65', '37.75', '36.21', '23.11'],
            ['√', '√', '√', '55.44', '38.50', '39.69', '25.70']
          ]
        }
      ]
    },
    {
      id: 'dataset-tables',
      title: 'AeroRIS 数据集统计',
      intro: '这一组表格对应论文第 4 章，展示 AeroRIS 的表达数量、图像数量、实例标注、空目标和 union mask 规模。',
      tables: [
        {
          id: 'table-4-1',
          title: '表4-1 AeroRIS 数据集表达数量统计',
          sourceTables: ['表4-1'],
          guide: '该表是页面数据集部分的核心依据，说明训练、验证、测试划分中均保留了非空实例、空标注和 union mask。',
          columns: ['split', '表达式', '唯一图像', '实例标注', '非空实例', '空标注', 'union mask', 'instance mask'],
          rows: [
            ['train', '13022', '6407', '47557', '46874', '683', '12339', '46874'],
            ['val', '1428', '534', '4741', '4734', '7', '1421', '4734'],
            ['test', '3432', '1595', '12105', '11949', '156', '3276', '11949'],
            ['总计', '17882', '8536', '64403', '63557', '846', '17036', '63557']
          ]
        }
      ]
    },
    {
      id: 'benchmark-tables',
      title: 'AeroRIS 基准评测与错误分析',
      intro: '这一组表格对应论文第 5 章，完整呈现微调模型、零样本/开放词汇模型、多模态大模型、效率权衡和 CRIS 错误切片。',
      tables: [
        {
          id: 'table-5-1',
          title: '表5-1 AeroRIS 数据集主要微调模型结果',
          sourceTables: ['表5-1'],
          guide: '该表给出通用、遥感和广义指代分割模型在 Val/Test 上的完整指标，是判断 AeroRIS 任务难度和模型分层的主要依据。',
          columns: ['模型', '发表刊物', 'Val oIoU', 'Test oIoU', 'Val mIoU', 'Test mIoU', 'Val Pr@0.5', 'Test Pr@0.5', 'Val Pr@0.7', 'Test Pr@0.7', 'Val Pr@0.9', 'Test Pr@0.9'],
          rows: [
            ['LAVT', 'CVPR 2022', '40.32', '34.82', '31.81', '31.8', '28.85', '30.19', '14.5', '14.28', '1.82', '1.92'],
            ['CRIS', 'CVPR 2022', '30.93', '24.41', '19.78', '17.82', '15.97', '12.24', '3.85', '4.92', '0.21', '3.38'],
            ['ASDA', 'MM 2024', '32.3', '27.63', '29.65', '28.09', '25.91', '23.34', '11.55', '7.34', '0.84', '0.26'],
            ['FIANet', 'IEEE TGRS 2024', '32.25', '28.94', '23.59', '25.53', '17.86', '21.27', '6.51', '6.73', '0.49', '2.07'],
            ['RMSIN', 'CVPR 2024', '48.99', '48.03', '41.28', '45.68', '41.18', '48.43', '26.26', '30.68', '9.94', '8.92'],
            ['RsRefSeg', 'IGARSS 2025', '49.58', '48.31', '39.26', '43.55', '39.15', '45.72', '24.93', '29.17', '10.15', '10.14'],
            ['CADFormer', 'JSTARS 2025', '47.99', '50.23', '41.75', '47.2', '42.09', '50.41', '25.35', '31.99', '8.54', '6.7'],
            ['ReLA', 'CVPR 2023', '50.81', '53.24', '44.12', '50.48', '44.68', '54.63', '28.85', '34.97', '11.13', '8.8'],
            ['CoHD', 'ICCV 2025', '50.96', '52.94', '43.71', '49.12', '44.54', '53.99', '26.33', '33.89', '8.75', '6.32']
          ]
        },
        {
          id: 'table-5-2',
          title: '表5-2 AeroRIS 数据集零样本基础模型、开放词汇模型以及多模态大模型结果（含续表）',
          sourceTables: ['表5-2', '续表5-2'],
          guide:
            '该表按模型族群、参数或骨干网络、提示方式以及是否依赖外部 grounding / segmentation 模块重新组织零样本结果，便于区分 SAM 管线、原生提示分割、开放词汇分割和通用多模态大模型之间的能力差异。',
          columns: [
            'Group',
            'Method',
            'Params/Backbone',
            'Prompt Type',
            'External Grounder/Segmenter',
            'Val oIoU',
            'Test oIoU',
            'Val mIoU',
            'Test mIoU',
            'Val Pr@0.5',
            'Test Pr@0.5',
            'Val Pr@0.6',
            'Test Pr@0.6',
            'Val Pr@0.7',
            'Test Pr@0.7',
            'Val Pr@0.8',
            'Test Pr@0.8',
            'Val Pr@0.9',
            'Test Pr@0.9'
          ],
          columnWidths: [
            '136px',
            '132px',
            '176px',
            '134px',
            '168px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px',
            '68px'
          ],
          headerRows: [
            [
              { label: 'Group', rowSpan: 2 },
              { label: 'Method', rowSpan: 2 },
              { label: 'Params/Backbone', rowSpan: 2 },
              { label: 'Prompt Type', rowSpan: 2 },
              { label: 'External Grounder/Segmenter', rowSpan: 2 },
              { label: 'oIoU', colSpan: 2 },
              { label: 'mIoU', colSpan: 2 },
              { label: 'Pr@0.5', colSpan: 2 },
              { label: 'Pr@0.6', colSpan: 2 },
              { label: 'Pr@0.7', colSpan: 2 },
              { label: 'Pr@0.8', colSpan: 2 },
              { label: 'Pr@0.9', colSpan: 2 }
            ],
            [
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' },
              { label: 'Val' },
              { label: 'Test' }
            ]
          ],
          rows: [
            [
              'Grounded SAM Pipelines',
              'Grounded-SAM',
              'GroundingDINO-base + SAM ViT-B',
              'text expression -> boxes -> masks',
              'Grounding DINO',
              '1.36',
              '1.68',
              '10.02',
              '14.64',
              '9.45',
              '13.87',
              '8.4',
              '11.77',
              '7.07',
              '10.34',
              '6.16',
              '8.97',
              '3.71',
              '6.21'
            ],
            [
              'Grounded SAM Pipelines',
              'Grounded-SAM2',
              'GroundingDINO-base + SAM2-B',
              'text expression -> boxes -> masks',
              'Grounding DINO',
              '1.5',
              '1.95',
              '10.53',
              '15.05',
              '9.66',
              '13.72',
              '8.61',
              '12.09',
              '7.56',
              '10.66',
              '6.37',
              '9.41',
              '4.9',
              '6.35'
            ],
            [
              'Grounded SAM Pipelines',
              'Grounded-SAM3',
              'GroundingDINO-base + SAM3-843M',
              'text expression -> boxes -> masks',
              'Grounding DINO',
              '1.47',
              '2.05',
              '10.57',
              '15.68',
              '9.73',
              '14.16',
              '8.54',
              '12.59',
              '7.56',
              '11.22',
              '6.86',
              '10.2',
              '5.67',
              '9.18'
            ],
            [
              'Native prompt segmentation',
              'SAM3',
              '843M',
              'short concept phrase -> mask',
              'None',
              '5.31',
              '3.22',
              '6.21',
              '5.64',
              '0.7',
              '1.34',
              '0.35',
              '0.79',
              '0.14',
              '0.64',
              '0.14',
              '0.58',
              '0.07',
              '0.47'
            ],
            [
              'Native prompt segmentation',
              'X-Decoder',
              'Focal-L',
              'language prompt',
              'None',
              '6.55',
              '6.94',
              '20.43',
              '18.62',
              '20.24',
              '16.46',
              '15.97',
              '13.99',
              '12.32',
              '12.09',
              '10.15',
              '10.14',
              '6.16',
              '6.06'
            ],
            [
              'Native prompt segmentation',
              'X-Decoder',
              'Focal-T',
              'language prompt',
              'None',
              '12.78',
              '9.54',
              '20.12',
              '16',
              '18.35',
              '12.73',
              '15.27',
              '10.43',
              '10.5',
              '7.84',
              '8.12',
              '5.8',
              '3.99',
              '3.21'
            ],
            [
              'Native prompt segmentation',
              'SEEM_v1',
              'Focal-L',
              'language prompt',
              'None',
              '6.09',
              '4.81',
              '20.44',
              '18.18',
              '20.66',
              '16.03',
              '16.32',
              '13.17',
              '12.32',
              '11.19',
              '10.01',
              '9.24',
              '5.11',
              '4.9'
            ],
            [
              'Native prompt segmentation',
              'SEEM_v1',
              'Focal-T',
              'language prompt',
              'None',
              '5.06',
              '5.47',
              '18.62',
              '15.6',
              '17.93',
              '13.23',
              '14.64',
              '11.13',
              '10.85',
              '8.92',
              '8.75',
              '6.99',
              '4.97',
              '3.47'
            ],
            [
              'Native prompt segmentation',
              'SEEM_v1',
              'SAM-ViT-B',
              'language prompt',
              'None',
              '8',
              '3.49',
              '16.58',
              '10.88',
              '16.04',
              '9.18',
              '12.75',
              '8.04',
              '10.43',
              '6.88',
              '8.54',
              '6',
              '5.53',
              '3.96'
            ],
            [
              'Native prompt segmentation',
              'SEEM_v1',
              'SAM-ViT-L',
              'language prompt',
              'None',
              '2.82',
              '1.36',
              '9.93',
              '4.51',
              '10.22',
              '3.9',
              '8.33',
              '3.32',
              '6.3',
              '2.8',
              '5.25',
              '2.36',
              '3.5',
              '1.78'
            ],
            [
              'Open-vocabulary segmentation',
              'OpenSeeD',
              'Swin-T',
              'open-vocabulary text labels',
              'None',
              '7.21',
              '11.69',
              '5.36',
              '11.41',
              '3.5',
              '9.79',
              '2.87',
              '8.13',
              '2.24',
              '6.96',
              '1.61',
              '6.09',
              '1.19',
              '5.07'
            ],
            [
              'Open-vocabulary segmentation',
              'OpenSeeD',
              'SwinT-O365',
              'open-vocabulary text labels',
              'None',
              '1.55',
              '6.1',
              '1.97',
              '8.48',
              '1.4',
              '7.37',
              '1.12',
              '6.44',
              '1.05',
              '5.91',
              '0.84',
              '5.45',
              '0.63',
              '4.92'
            ],
            [
              'YOLOE26',
              'YOLOE26L_MCLIP2',
              'YOLO26',
              'open-vocabulary text labels',
              'None',
              '2.59',
              '1.8',
              '7.65',
              '6.24',
              '2.24',
              '2.07',
              '1.68',
              '1.43',
              '1.26',
              '1.05',
              '0.77',
              '0.64',
              '0.49',
              '0.47'
            ],
            [
              'General LVLMs',
              'Qwen2.5-VL',
              '3B',
              'language prompt',
              'SAM3',
              '21.49',
              '7.79',
              '17.43',
              '6.55',
              '15.62',
              '5.3',
              '12.61',
              '4.37',
              '10.36',
              '3.55',
              '8.26',
              '3.12',
              '5.88',
              '2.39'
            ],
            [
              'General LVLMs',
              'Qwen2.5-VL',
              '7B',
              'language prompt',
              'SAM3',
              '26.38',
              '9.6',
              '17.68',
              '7.92',
              '14.99',
              '6.44',
              '11.83',
              '5.48',
              '9.17',
              '4.6',
              '6.79',
              '4.25',
              '4.62',
              '3.55'
            ],
            [
              'General LVLMs',
              'Qwen3-VL',
              '4B',
              'language prompt',
              'SAM3',
              '47.02',
              '51.35',
              '30.56',
              '42.02',
              '30.6',
              '44.64',
              '26.4',
              '39.54',
              '22.48',
              '34.47',
              '18.56',
              '29.11',
              '15.41',
              '24.53'
            ],
            [
              'General LVLMs',
              'Qwen3-VL',
              '8B',
              'language prompt',
              'SAM3',
              '48.63',
              '55.03',
              '43.11',
              '54.43',
              '41.32',
              '56.44',
              '34.8',
              '48.14',
              '29.27',
              '40.71',
              '23.67',
              '34.59',
              '19.19',
              '29.22'
            ],
            [
              'General LVLMs',
              'GLM-4.1V-9B',
              '9B',
              'language prompt',
              'SAM3',
              '36.46',
              '35.57',
              '35.25',
              '39.22',
              '30.74',
              '34.88',
              '25.28',
              '28.38',
              '20.52',
              '23.89',
              '16.6',
              '20.51',
              '13.66',
              '16.38'
            ],
            [
              'General LVLMs',
              'DeepSeek-VL2-Tiny',
              '3B',
              'language prompt',
              'SAM3',
              '5.12',
              '2.66',
              '2.68',
              '5.45',
              '2.31',
              '5.22',
              '2.17',
              '4.92',
              '1.89',
              '4.69',
              '1.61',
              '4.43',
              '1.47',
              '4.05'
            ],
            [
              'General LVLMs',
              'Rex-Omni',
              '3B',
              'language prompt',
              'SAM3',
              '48.42',
              '53.19',
              '46.83',
              '56.3',
              '42.79',
              '57.11',
              '36.41',
              '48.43',
              '29.55',
              '40.3',
              '24.09',
              '34.27',
              '19.19',
              '28.15'
            ],
            [
              'General LVLMs',
              'Kosmos-2',
              '1.6B',
              'language prompt',
              'SAM3',
              '1.15',
              '2.31',
              '0.9',
              '3.57',
              '0.84',
              '1.67',
              '0.61',
              '1.45',
              '0.37',
              '1.39',
              '0.31',
              '0.63',
              '0.22',
              '0.53'
            ]
          ]
        },
        {
          id: 'table-5-3',
          title: '表5-3 AeroRIS 模型精度与效率对比',
          sourceTables: ['表5-3'],
          guide: '该表把精度和部署成本放在一起看，解释为什么论文选择速度较快但精度不足的 CRIS 作为轻量化改进对象。',
          columns: ['Method', 'mIoU', 'oIoU', 'Latency(ms/query)', 'FPS', 'FLOPs(G)', 'Params(M)'],
          rows: [
            ['LAVT', '31.80', '34.82', '20.20', '49.50', '193.97', '227.74'],
            ['CRIS', '17.82', '24.41', '16.70', '59.88', '58.79', '146.85'],
            ['ASDA', '28.09', '27.63', '16.51', '60.55', '271.61', '193.09'],
            ['FIANet', '25.53', '28.94', '30.33', '32.97', '205.50', '251.92'],
            ['RMSIN', '45.68', '48.03', '25.93', '38.57', '154.30', '240.04'],
            ['RsRefSeg', '43.55', '48.31', '123.44', '8.10', '687.03', '984.28'],
            ['CADFormer', '47.20', '50.23', '31.40', '31.85', '233.31', '359.25'],
            ['ReLA', '50.48', '53.24', '34.84', '28.70', '109.59', '225.52'],
            ['CoHD', '49.12', '52.94', '43.80', '22.83', '116.57', '248.02']
          ]
        },
        {
          id: 'table-5-4',
          title: '表5-4 CRIS 模型在 AeroRIS 测试集上的错误类型分析',
          sourceTables: ['表5-4'],
          guide: '该表把 CRIS 的错误拆成 miss、partial overlap、severe mismatch 等类型，说明 baseline 的主要问题不是边界细节，而是目标激活和位置选择。',
          columns: ['错误类型', '样本数量', 'mIoU'],
          rows: [
            ['miss（漏检）', '1429', '0'],
            ['partial_overlap（部分重叠）', '766', '32.45'],
            ['severe_mismatch（严重错配）', '525', '2.14'],
            ['good（预测良好）', '304', '61.36'],
            ['under_segment（欠分割）', '163', '18.62'],
            ['over_segment（过分割）', '89', '21.27']
          ]
        },
        {
          id: 'table-5-5',
          title: '表5-5 CRIS 模型在 AeroRIS 测试集上的小目标检测分析',
          sourceTables: ['表5-5'],
          guide: '该表进一步从目标面积切片解释 CRIS 的失败原因：目标越小，miss 占比越高。',
          columns: ['GT Area', '数量', 'mIoU', 'Pr@0.5', '主要错误原因及样本数量'],
          rows: [
            ['<0.1%', '457', '2.04', '0.22', 'miss:370'],
            ['0.1-0.5%', '1612', '12.23', '6.64', 'miss:795'],
            ['0.5-2%', '983', '22.56', '14.14', 'partial_overlap:335'],
            ['>=2%', '224', '30.11', '25.45', 'partial_overlap:70']
          ]
        }
      ]
    },
    {
      id: 'method-tables',
      title: 'AeroPlug / AeroCRIS 方法实验',
      intro: '这一组表格对应论文第 6 章，展示 Stage 1、Stage 2、跨模型泛化和最终效率对比。',
      tables: [
        {
          id: 'table-6-1',
          title: '表6-1 AeroCRIS Stage 1 消融实验',
          sourceTables: ['表6-1'],
          guide: '该表说明面积保持监督、小目标加权和数量一致性如何逐步提升 CRIS，同时也暴露出空目标正确数下降的问题。',
          columns: ['变体', 'Test mIoU', 'Test oIoU', 'Pr@0.5', 'Pr@0.7', '空目标正确数'],
          rows: [
            ['CRIS baseline', '17.82', '24.41', '12.24', '4.92', '116/156'],
            ['area_bce', '31.29', '35.24', '24.33', '7.31', '14/156'],
            ['tiny', '33.64', '35.56', '29.78', '10.05', '1/156'],
            ['tiny_count_w010', '34.22', '38.61', '31.32', '11.89', '31/156'],
            ['tiny_count_w005', '33.80', '35.55', '30.36', '10.93', '1/156'],
            ['tiny_count_late', '33.21', '37.23', '29.75', '9.47', '9/156']
          ]
        },
        {
          id: 'table-6-2',
          title: '表6-2 AeroCRIS Stage 2 TTA 实验结果',
          sourceTables: ['表6-2'],
          guide: '该表展示 TTA 轻量残差校准在 Stage 1 基础上继续提升 mIoU、oIoU 和 Pr@0.5，但空目标正确数进一步下降。',
          columns: ['变体', 'Test mIoU', 'Test oIoU', 'Pr@0.5', 'Pr@0.7', '空目标正确数'],
          rows: [
            ['CRIS baseline', '17.82', '24.41', '12.24', '4.92', '116/156'],
            ['AeroCRIS Stage 1', '34.22', '38.61', '31.32', '11.89', '31/156'],
            ['AeroCRIS Stage 2 TTA', '36.76', '41.11', '35.20', '13.14', '15/156']
          ]
        },
        {
          id: 'table-6-3',
          title: '表6-3 AeroCRIS 精度与效率对比',
          sourceTables: ['表6-3'],
          guide: '该表是方法部分的最终效率证据：Stage 1 基本不增加推理成本，Stage 2 只引入很小的 FLOPs 和参数量增量。',
          columns: ['模型变体', 'Test mIoU', 'Test oIoU', 'Latency(ms/query)', 'FPS', 'FLOPs(G)', 'Inference Params(M)'],
          rows: [
            ['CRIS', '17.82', '24.41', '12.34', '81.07', '58.79', '146.85'],
            ['AeroCRIS Stage 1', '34.22', '38.61', '12.52', '79.88', '58.79', '146.85'],
            ['AeroCRIS Stage 2 TTA', '36.76', '41.11', '15.57', '64.21', '58.81', '146.89']
          ]
        },
        {
          id: 'table-6-4',
          title: '表6-4 AeroPlug 跨模型泛化结果',
          sourceTables: ['表6-4'],
          guide: '该表验证 AeroPlug 并非只对 CRIS 有效，而是在 LAVT、ASDA、FIANet、CADFormer 上也能产生正向适配；其中 FIANet 需要安全化接入。',
          columns: ['模型', '变体', 'Test mIoU', 'Test oIoU', 'Pr@0.5', 'Pr@0.7', '空目标正确数'],
          rows: [
            ['LAVT', 'Baseline', '31.80', '34.82', '30.19', '14.28', '56/156'],
            ['LAVT', '+Stage1', '45.09', '47.41', '48.51', '27.04', '53/156'],
            ['LAVT', '+Stage1+TTA', '44.90', '47.49', '47.81', '28.50', '56/156'],
            ['ASDA', 'Baseline', '28.09', '27.63', '23.34', '7.34', '5/156'],
            ['ASDA', '+Stage1', '36.99', '39.68', '33.54', '11.33', '0/156'],
            ['ASDA', '+Stage1+TTA', '37.96', '42.41', '35.55', '11.77', '12/156'],
            ['FIANet', 'Baseline', '25.53', '28.94', '21.27', '6.73', '69/156'],
            ['FIANet', '+Stage1', '47.32', '51.46', '50.87', '32.08', '45/156'],
            ['FIANet', '+Stage1-safe+TTA-safe', '47.44', '51.53', '51.17', '32.05', '48/156'],
            ['CADFormer', 'Baseline', '47.20', '50.23', '50.41', '31.99', '38/156'],
            ['CADFormer', '+Stage1', '47.99', '49.21', '50.64', '30.51', '11/256'],
            ['CADFormer', '+Stage1+TTA', '49.20', '49.85', '52.01', '32.05', '13/156']
          ]
        }
      ]
    }
  ] satisfies TableGroup[],
  outlook: [
    '空目标拒识仍然困难，TTA 增强非空目标时会降低 empty correct。',
    'Pr@0.9 等高阈值指标仍然较低，边界精细度和高质量掩码预测仍需加强。',
    '后续可扩展复杂天气、夜间和动态场景样本，检查模型鲁棒性。',
    '可探索基础模型候选生成与端到端轻量模型之间的混合架构。',
    '可接入低空无人机视频流，评估连续帧稳定性、实时交互延迟和系统可用性。'
  ]
} as const;
