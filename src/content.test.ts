import { describe, expect, it } from 'vitest';
import { content } from './content';

describe('AeroRIS content model', () => {
  it('uses Chinese project-homepage positioning with preserved research terms', () => {
    expect(content.hero.title).toBe('AeroRIS');
    expect(content.hero.subtitle).toContain('面向低空智能感知');
    expect(content.hero.subtitle).toContain('指代表达理解');
    expect(content.hero.subtitle.endsWith('。')).toBe(false);
    expect(content.nav.map((item) => item.label)).toEqual([
      '概览',
      'AeroRIS 数据集',
      '基准评测',
      '方法',
      '演示',
      '局限与展望'
    ]);
  });

  it('provides AeroRIS dataset detail content without mentioning RefDrone in the overview', () => {
    expect(content.nav.find((item) => item.label === 'AeroRIS 数据集')?.href).toBe('/dataset');
    expect(content.hero.actions.find((action) => action.label === '数据集')?.href).toBe('/dataset');
    expect(content.datasetDetail.overview.title).toBe('AeroRIS 数据集详情');
    expect(content.datasetDetail.overview.description).not.toMatch(/RefDrone/i);
    expect(content.datasetDetail.metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: '17,882', label: '表达级样本' }),
        expect.objectContaining({ value: '63,557', label: '实例掩码' })
      ])
    );
    expect(content.datasetDetail.annotationFlow).toEqual(
      expect.objectContaining({
        figure: '/assets/aeroris-dataset/annotation-flow.png',
        figureAlt: 'AeroRIS 数据集构建流程示意图'
      })
    );
    expect(content.datasetDetail.samples.length).toBeGreaterThanOrEqual(20);
    expect(content.datasetDetail.samples[0]).toEqual(
      expect.objectContaining({
        image: expect.stringContaining('/assets/aeroris-dataset/images/'),
        unionMask: expect.stringContaining('/assets/aeroris-dataset/union_masks/'),
        overlay: expect.stringContaining('/assets/aeroris-dataset/visualizations/')
      })
    );
  });

  it('describes the research as two connected stages', () => {
    expect(content.researchStages).toHaveLength(2);
    expect(content.researchStages[0]).toMatchObject({
      chapter: '论文第 3 章',
      title: '第一阶段：基于 RefDrone 的无人机场景指代理解'
    });
    expect(content.researchStages[1]).toMatchObject({
      chapter: '论文第 4-6 章',
      title: '第二阶段：AeroRIS 数据集与 AeroPlug 可插拔方法'
    });
    expect(content.stageTransition).toContain('从候选级指代理解转向像素级指代分割');
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

  it('loads the complete real demo output set for the model demo page', () => {
    expect(content.demo.samples).toHaveLength(50);

    const categoryCounts = content.demo.samples.reduce<Record<string, number>>((counts, sample) => {
      counts[sample.categoryId] = (counts[sample.categoryId] ?? 0) + 1;
      return counts;
    }, {});

    expect(categoryCounts).toEqual({
      empty_target: 10,
      high_density: 10,
      multi_instance: 10,
      small_target: 10,
      spatial_relation: 10
    });

    expect(content.demo.samples[0]).toEqual(
      expect.objectContaining({
        id: 'small_target_01',
        categoryId: 'small_target',
        categoryIndex: 1,
        assetStatus: '真实模型输出'
      })
    );
    expect(content.demo.samples[0].results.baseline).toEqual(
      expect.objectContaining({
        src: '/assets/aeroris-demo/cases/small_target/small_target_01/cris_overlay.jpg',
        status: 'CRIS baseline'
      })
    );
    expect(content.demo.samples[0].results.stage2.src).toBe(
      '/assets/aeroris-demo/cases/small_target/small_target_01/stage2_overlay.jpg'
    );
    expect(content.demo.samples[0].results.overlay.src).toBe(
      '/assets/aeroris-demo/cases/small_target/small_target_01/final_comparison.jpg'
    );
    expect(content.demo.samples[0].caseMetrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'Stage 1',
          primaryLabel: 'IoU',
          primaryValue: '0.789',
          secondaryLabel: 'Dice',
          secondaryValue: '0.882',
          latency: '12.52ms'
        })
      ])
    );
    expect(content.demo.samples.find((sample) => sample.id === 'empty_target_01')?.caseMetrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'Stage 1',
          primaryLabel: 'Empty',
          primaryValue: '未拒识',
          secondaryLabel: 'FP Area',
          secondaryValue: '1,412 px'
        })
      ])
    );
  });

  it('keeps unpublished top actions as internal placeholders while linking the dataset detail page', () => {
    expect(content.hero.actions.filter((action) => ['论文', '代码'].includes(action.label)).every((action) => action.href.startsWith('#'))).toBe(true);
    expect(content.hero.actions.find((action) => action.label === '数据集')?.href).toBe('/dataset');
    expect(content.hero.actions.find((action) => action.label === '演示')?.href).toBe('/demo');
  });

  it('covers every research table while merging continuation tables for display', () => {
    const displayedTables = content.tableGroups.flatMap((group) => group.tables);
    const displayedIds = displayedTables.map((table) => table.id);

    expect(content.tableSourceCount).toBe(15);
    expect(displayedTables).toHaveLength(13);
    expect(displayedIds).toEqual([
      'table-3-1',
      'table-3-2',
      'table-3-3',
      'table-4-1',
      'table-5-1',
      'table-5-2',
      'table-5-3',
      'table-5-4',
      'table-5-5',
      'table-6-1',
      'table-6-2',
      'table-6-3',
      'table-6-4'
    ]);
    expect(displayedIds).not.toContain('student-info');
    expect(displayedTables.find((table) => table.id === 'table-3-1')?.sourceTables).toEqual(['表3-1', '续表3-1']);
    expect(displayedTables.find((table) => table.id === 'table-5-2')?.sourceTables).toEqual(['表5-2', '续表5-2']);
  });

  it('removes citation numbers from table 3-1 representative methods', () => {
    const table31 = content.tableGroups
      .flatMap((group) => group.tables)
      .find((table) => table.id === 'table-3-1');

    expect(table31).toBeDefined();
    const methods = table31?.rows.map((row) => row[1]) ?? [];
    expect(methods).toEqual([
      'UNetFormer',
      'ABCNet',
      'BANet',
      'ClusDet',
      'UFPMP-Det',
      'LAVT',
      'CRIS',
      'VLT',
      'PolyFormer',
      'ReLA(GRES)',
      'ETRIS',
      'RRSIS(LGCE)',
      'RMSIN',
      'SAARN(RIS-LAD)',
      'AeroRIS'
    ]);
    expect(methods.some((method) => /\[\d+\]/.test(method))).toBe(false);
  });

  it('adds guidance copy for each table group and each displayed table', () => {
    for (const group of content.tableGroups) {
      expect(group.intro.length).toBeGreaterThan(12);
      for (const table of group.tables) {
        expect(table.guide.length).toBeGreaterThan(12);
        expect(table.columns.length).toBeGreaterThan(1);
        expect(table.rows.length).toBeGreaterThan(0);
      }
    }
  });
});
