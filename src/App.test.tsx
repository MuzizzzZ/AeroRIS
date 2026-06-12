import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('AeroRIS homepage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Chinese public research homepage structure', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'AeroRIS' })).toBeInTheDocument();
    expect(screen.getByText('面向低空智能感知的无人机场景指代表达理解与像素级分割研究')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'AeroCRIS 总体框架示意图' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-aerocris-framework-clear.png'
    );
    expect(screen.queryByText('论文方法框架作为首屏研究总览。')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: '页面目录' })).toBeInTheDocument();
    expect(within(screen.getByRole('complementary', { name: '页面目录' })).getByRole('link', { name: '研究概览' })).toHaveAttribute(
      'aria-current',
      'true'
    );
    expect(screen.getByRole('heading', { name: 'AeroRIS 数据集' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AeroPlug \/ AeroCRIS 方法' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '局限与展望' })).toBeInTheDocument();
  });

  it('keeps top actions as internal placeholder links', () => {
    render(<App />);

    const actions = screen.getByLabelText('项目链接');
    for (const label of ['论文', '代码']) {
      const link = within(actions).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', expect.stringMatching(/^#/));
    }
    expect(within(actions).getByRole('link', { name: '数据集' })).toHaveAttribute('href', '/dataset');
    expect(within(actions).getByRole('link', { name: '演示' })).toHaveAttribute('href', '/demo');
    expect(within(screen.getByRole('navigation', { name: '主导航' })).getByRole('link', { name: '演示' })).toHaveAttribute(
      'href',
      '/demo'
    );
  });

  it('links the homepage AeroRIS dataset entry to the detail page', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(within(screen.getByRole('navigation', { name: '主导航' })).getByRole('link', { name: 'AeroRIS 数据集' })).toHaveAttribute(
      'href',
      '/dataset'
    );
    expect(within(screen.getByRole('complementary', { name: '页面目录' })).getByRole('link', { name: 'AeroRIS 数据集' })).toHaveAttribute(
      'href',
      '#dataset'
    );
    expect(screen.getByRole('link', { name: '进入 AeroRIS 数据集详情' })).toHaveAttribute('href', '/dataset');
  });

  it('renders an interactive AeroRIS dataset detail page', () => {
    window.history.pushState({}, '', '/dataset');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'AeroRIS 数据集详情' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: '页面目录' })).toBeInTheDocument();
    expect(within(screen.getByRole('complementary', { name: '页面目录' })).getByRole('link', { name: '概览' })).toHaveAttribute(
      'href',
      '#dataset-overview'
    );
    expect(
      within(screen.getByRole('complementary', { name: '页面目录' })).getByRole('link', { name: '样例展示' })
    ).toHaveAttribute('href', '#samples');
    expect(screen.queryByText(/RefDrone/i)).not.toBeInTheDocument();
    expect(screen.getAllByText('表达级样本').length).toBeGreaterThan(0);
    expect(screen.getAllByText('实例掩码').length).toBeGreaterThan(0);
    expect(screen.getByRole('table', { name: 'AeroRIS 数据集划分统计' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'AeroRIS 数据集构建流程示意图' })).toHaveAttribute(
      'src',
      '/assets/aeroris-dataset/annotation-flow.png'
    );
    expect(screen.getByRole('heading', { name: 'AeroRIS数据集样例展示' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '交互式查看真实 AeroRIS 样例' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'train' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Overlay' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(screen.getByLabelText('AeroRIS 样例列表')).getAllByRole('button').length).toBeGreaterThanOrEqual(
      20
    );
    fireEvent.click(within(screen.getByLabelText('AeroRIS 样例列表')).getByRole('button', { name: /同图多表达：白色车辆/ }));
    expect(screen.getByText('实例掩码缩略图')).toBeInTheDocument();
    expect(screen.getByText(/黑底小图是同一表达中每个目标实例的单独 mask/)).toBeInTheDocument();
    const datasetPageText = document.body.textContent ?? '';
    expect(datasetPageText.indexOf('Train / Val / Test 规模')).toBeLessThan(
      datasetPageText.indexOf('AeroRIS数据集样例展示')
    );

    fireEvent.click(screen.getByRole('button', { name: 'Union Mask' }));

    expect(screen.getByRole('button', { name: 'Union Mask' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: /union mask/i })).toHaveAttribute(
      'src',
      expect.stringContaining('/assets/aeroris-dataset/union_masks/')
    );
  });

  it('renders the defense-oriented AeroRIS model demo page', () => {
    window.history.pushState({}, '', '/demo');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'AeroRIS Demo' })).toBeInTheDocument();
    expect(screen.queryByText('面向答辩展示的 AeroCRIS 模型运行演示台。')).not.toBeInTheDocument();
    expect(screen.queryByText('当前为预置结果演示，未接入在线模型后端。')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '答辩讲解' })).not.toBeInTheDocument();
    expect(screen.queryByText('演示流程')).not.toBeInTheDocument();
    expect(screen.queryByText('典型样例')).not.toBeInTheDocument();
    expect(screen.queryByText('关键指标')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '运行演示' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '小目标单实例' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '空目标拒识' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'small_target_01 小目标单实例' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(screen.getByLabelText('Demo 样例选择')).getAllByRole('button')).toHaveLength(10);

    const stageControls = screen.getByLabelText('五步演示阶段');
    for (const stage of ['输入任务', 'CRIS baseline', 'Stage 1', 'Stage 2 TTA', '最终输出']) {
      expect(within(stageControls).getByRole('button', { name: stage })).toBeInTheDocument();
    }

    const resultViews = screen.getByLabelText('结果视图');
    for (const view of ['Original', 'GT', 'CRIS', 'Stage 1', 'Stage 2', 'Overlay']) {
      expect(within(resultViews).getByRole('button', { name: view })).toBeInTheDocument();
    }

    expect(screen.queryByText(/待替换真实预测/)).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /small_target_01 original/i })).toHaveAttribute(
      'src',
      '/assets/aeroris-demo/cases/small_target/small_target_01/input.jpg'
    );
    const runtimePanel = screen.getByRole('region', { name: '输入任务' });
    const scriptPanel = screen.getByLabelText('Demo 类别选择').closest('aside') as HTMLElement;

    expect(within(runtimePanel).getByLabelText('当前指代表达')).toHaveTextContent(
      'The blue cars park near the construction materials.'
    );
    expect(within(scriptPanel).queryByLabelText('当前指代表达')).not.toBeInTheDocument();
    expect(within(scriptPanel).getByRole('heading', { name: '整体指标' })).toBeInTheDocument();
    expect(within(runtimePanel).getByRole('heading', { name: '当前样例指标' })).toBeInTheDocument();
    expect(within(runtimePanel).getByText('0.789')).toBeInTheDocument();
    expect(within(runtimePanel).getByText('0.882')).toBeInTheDocument();
    expect(screen.queryByText(/当前页面使用真实 AeroRIS 样例与预置演示结果/)).not.toBeInTheDocument();
  });

  it('filters the real demo outputs by category and displays model overlays', () => {
    window.history.pushState({}, '', '/demo');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '空目标拒识' }));

    expect(screen.getByRole('button', { name: 'empty_target_01 空目标拒识' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(screen.getByLabelText('Demo 样例选择')).getAllByRole('button')).toHaveLength(10);

    fireEvent.click(within(screen.getByLabelText('五步演示阶段')).getByRole('button', { name: 'Stage 2 TTA' }));

    expect(screen.getByRole('img', { name: /empty_target_01 Stage 2 TTA/i })).toHaveAttribute(
      'src',
      '/assets/aeroris-demo/cases/empty_target/empty_target_01/stage2_overlay.jpg'
    );
    expect(screen.getByText('未拒识')).toBeInTheDocument();
    expect(screen.getByText('1,412 px')).toBeInTheDocument();
  });

  it('plays the five-step demo flow and resets when selecting another case', () => {
    vi.useFakeTimers();
    window.history.pushState({}, '', '/demo');
    render(<App />);

    const stageControls = screen.getByLabelText('五步演示阶段');

    expect(within(stageControls).getByRole('button', { name: '输入任务' })).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: '运行演示' }));

    act(() => {
      vi.advanceTimersByTime(7000);
    });

    expect(within(stageControls).getByRole('button', { name: '最终输出' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByText(/并列展示 GT、CRIS baseline 与 AeroCRIS Stage 2 TTA/).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: '空目标拒识' }));

    expect(within(stageControls).getByRole('button', { name: '输入任务' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '空目标拒识' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'empty_target_01 空目标拒识' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders benchmark and method evidence tables', () => {
    render(<App />);

    expect(screen.queryByRole('table', { name: '主要模型基准评测结果' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '主要微调模型部分场景的可视化结果' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-finetuned-model-scenes.png'
    );
    expect(screen.getByRole('img', { name: '零样本泛化模型部分场景的可视化结果' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-zero-shot-scenes.png'
    );
    expect(screen.getByText('主要微调模型部分场景的可视化结果')).toBeInTheDocument();
    expect(screen.getByText('零样本泛化模型部分场景的可视化结果')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'CRIS baseline错误类型的可视化图（论文图5-5）' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-cris-errors.png'
    );
    expect(screen.getByRole('img', { name: 'AeroCRIS阶段对比图（论文图6-5）' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-aerocris-comparison.png'
    );
    expect(screen.getByText(/论文图5-5：CRIS baseline 错误类型可视化/)).toBeInTheDocument();
    expect(screen.getByText(/论文图6-5：AeroCRIS 阶段对比/)).toBeInTheDocument();
    expect(screen.getAllByText('ReLA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CRIS baseline').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AeroCRIS Stage 2 TTA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('36.76').length).toBeGreaterThan(0);
  });

  it('places the AeroCRIS framework in the method section without the compact result table', () => {
    render(<App />);

    const methodSection = screen.getByRole('heading', { name: 'AeroPlug / AeroCRIS 方法' }).closest('section');

    expect(methodSection).not.toBeNull();
    expect(
      within(methodSection as HTMLElement).getByRole('img', {
        name: '以 CRIS 模型为 baseline 形成的 AeroCRIS 模型框架图'
      })
    ).toHaveAttribute('src', '/assets/thesis/fig-aerocris-framework-clear.png');
    expect(within(methodSection as HTMLElement).getByText('以CRIS模型为baseline形成的AeroCRIS模型框架图')).toBeInTheDocument();
    expect(screen.queryByRole('table', { name: 'AeroCRIS 精度与效率对比' })).not.toBeInTheDocument();
    expect(screen.queryByText(/Stage 1 的数量辅助头只在训练阶段/)).not.toBeInTheDocument();
  });

  it('shows Stage 1 and Stage 2 design diagrams before the method experiment tables', () => {
    render(<App />);

    const methodSectionText =
      screen.getByRole('heading', { name: 'AeroPlug / AeroCRIS 方法' }).closest('section')?.textContent ?? '';

    expect(screen.getByRole('img', { name: 'Stage 1 训练侧监督修正结构设计示意图' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-stage1-supervision-design.png'
    );
    expect(screen.getByRole('img', { name: 'Stage 2 TTA 模块结构设计示意图' })).toHaveAttribute(
      'src',
      '/assets/thesis/fig-stage2-tta-design.png'
    );
    expect(screen.getByText(/训练阶段在 CRIS 基线推理结构不变的前提下/)).toBeInTheDocument();
    expect(screen.getByText(/推理阶段以 Stage 1 基础 logits 与归一化坐标图为输入/)).toBeInTheDocument();
    expect(methodSectionText.indexOf('Stage 1 训练侧监督修正结构设计示意图')).toBeLessThan(
      methodSectionText.indexOf('AeroPlug / AeroCRIS 方法实验')
    );
    expect(methodSectionText.indexOf('Stage 2 TTA 模块结构设计示意图')).toBeLessThan(
      methodSectionText.indexOf('AeroPlug / AeroCRIS 方法实验')
    );
  });

  it('renders complete thesis tables in narrative groups', () => {
    render(<App />);

    expect(screen.queryByRole('heading', { name: '完整论文表格' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '论文信息' })).not.toBeInTheDocument();
    expect(screen.queryByText('表格依据')).not.toBeInTheDocument();
    expect(screen.queryByText('表格证据')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '从失败模式到激活修正' })).not.toBeInTheDocument();
    expect(screen.queryByText('样例对比')).not.toBeInTheDocument();
    expect(screen.getByText('第一阶段研究')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '基于RefDrone数据集的无人机场景指代理解方法研究' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '研究背景与第一阶段实验' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AeroRIS 基准评测与错误分析' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: '表3-1 低空无人机视角指代表达理解相关研究范式对比（含续表）' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: '表5-2 AeroRIS 数据集零样本基础模型、开放词汇模型以及多模态大模型结果（含续表）' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: '表6-3 AeroCRIS 精度与效率对比' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: '表6-4 AeroPlug 跨模型泛化结果' })).toBeInTheDocument();
  });

  it('adds Chinese explanations to CRIS error types in table 5-4', () => {
    render(<App />);

    const table = screen.getByRole('table', {
      name: '表5-4 CRIS 模型在 AeroRIS 测试集上的错误类型分析'
    });

    for (const errorType of [
      'miss（漏检）',
      'partial_overlap（部分重叠）',
      'severe_mismatch（严重错配）',
      'good（预测良好）',
      'under_segment（欠分割）',
      'over_segment（过分割）'
    ]) {
      expect(within(table).getByRole('rowheader', { name: errorType })).toBeInTheDocument();
    }
  });

  it('renders the two-stage research route and transition', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: '两阶段研究路线' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '第一阶段：基于 RefDrone 的无人机场景指代理解' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '第二阶段：AeroRIS 数据集与 AeroPlug 可插拔方法' })).toBeInTheDocument();
    expect(screen.getByText(/从候选级指代理解转向像素级指代分割/)).toBeInTheDocument();
  });

  it('shows the AeroRIS dataset statistics figure as a standalone row without the split table', () => {
    render(<App />);

    const datasetSection = screen.getByRole('heading', { name: 'AeroRIS 数据集' }).closest('section');

    expect(datasetSection).not.toBeNull();
    expect(screen.queryByRole('table', { name: 'AeroRIS 数据集划分' })).not.toBeInTheDocument();

    const figure = within(datasetSection as HTMLElement).getByRole('img', {
      name: 'AeroRIS 数据集样本分布与难点统计可视化'
    });
    expect(figure).toHaveAttribute('src', '/assets/thesis/ch4_aeroris_statistics.svg');
    expect(figure.closest('.dataset-layout')?.querySelectorAll('figure')).toHaveLength(1);
    expect(figure.closest('.dataset-layout')?.querySelectorAll('table')).toHaveLength(0);
  });

  it('decorates selected result tables with first second and third rank cues', () => {
    render(<App />);

    const decoratedTables = [
      '表3-2 第一阶段方法与现有方法在 RefDrone 上的对比结果',
      '表3-3 RefDrone 上 AeroRIS 主要组件消融结果',
      '表5-1 AeroRIS 数据集主要微调模型结果',
      '表5-2 AeroRIS 数据集零样本基础模型、开放词汇模型以及多模态大模型结果（含续表）',
      '表5-3 AeroRIS 模型精度与效率对比'
    ];

    for (const tableName of decoratedTables) {
      const table = screen.getByRole('table', { name: tableName });
      expect(table.querySelectorAll('td.rank-cell[data-rank="1"]').length).toBeGreaterThan(0);
      expect(table.querySelectorAll('td.rank-cell[data-rank="2"]').length).toBeGreaterThan(0);
      expect(table.querySelectorAll('td.rank-cell[data-rank="3"]').length).toBeGreaterThan(0);
    }

    const refDroneComparisonTable = screen.getByRole('table', { name: decoratedTables[0] });
    expect(refDroneComparisonTable.querySelectorAll('td.rank-cell')).toHaveLength(12);
    expect(within(refDroneComparisonTable).getByText('55.44')).toHaveAttribute('data-rank', '1');
  });

  it('uses F1 and Acc labels for RefDrone instance and image metrics', () => {
    render(<App />);

    const tableNames = [
      '表3-2 第一阶段方法与现有方法在 RefDrone 上的对比结果',
      '表3-3 RefDrone 上 AeroRIS 主要组件消融结果'
    ];

    for (const tableName of tableNames) {
      const table = screen.getByRole('table', { name: tableName });

      for (const header of ['实例级 F1', '实例级 Acc', '图像级 F1', '图像级 Acc']) {
        expect(within(table).getByRole('columnheader', { name: header })).toBeInTheDocument();
      }

      expect(within(table).queryByText(/指标\s*1/)).not.toBeInTheDocument();
      expect(within(table).queryByText(/指标\s*2/)).not.toBeInTheDocument();
    }
  });

  it('organizes table 5-2 by model group, prompt details, and grouped metrics', () => {
    render(<App />);

    const table = screen.getByRole('table', {
      name: '表5-2 AeroRIS 数据集零样本基础模型、开放词汇模型以及多模态大模型结果（含续表）'
    });

    for (const header of ['Group', 'Method', 'Params/Backbone', 'Prompt Type', 'External Grounder/Segmenter']) {
      expect(within(table).getByRole('columnheader', { name: header })).toBeInTheDocument();
    }

    expect(within(table).getByRole('columnheader', { name: 'oIoU' })).toHaveAttribute('colspan', '2');
    expect(within(table).getByRole('columnheader', { name: 'Pr@0.6' })).toHaveAttribute('colspan', '2');
    expect(within(table).getByRole('columnheader', { name: 'Pr@0.8' })).toHaveAttribute('colspan', '2');
    expect(within(table).getAllByRole('columnheader', { name: 'Val' })).toHaveLength(7);
    expect(within(table).getAllByRole('columnheader', { name: 'Test' })).toHaveLength(7);

    expect(within(table).getByRole('rowheader', { name: 'Grounded SAM Pipelines' })).toHaveAttribute(
      'rowspan',
      '3'
    );
    expect(within(table).getByRole('rowheader', { name: 'Native prompt segmentation' })).toHaveAttribute(
      'rowspan',
      '7'
    );
    expect(within(table).getByRole('rowheader', { name: 'General LVLMs' })).toHaveAttribute('rowspan', '8');
    expect(within(table).getByText('X-Decoder')).toHaveAttribute('rowspan', '2');
    expect(within(table).getByText('SEEM_v1')).toHaveAttribute('rowspan', '4');
    expect(within(table).getByText('GroundingDINO-base + SAM3-843M')).toBeInTheDocument();
    expect(within(table).getAllByText('SAM3').length).toBeGreaterThan(1);
    expect(table.querySelectorAll('tbody tr')).toHaveLength(21);
    expect(table).toHaveClass('wide-evidence-table');
    expect(table.closest('.thesis-table-card')).toHaveClass('thesis-table-card-wide');
    expect(table.closest('.table-scroll')).toHaveClass('wide-table-scroll');
    expect(table.querySelectorAll('col')).toHaveLength(19);
    expect(within(table).getByText('Grounded-SAM2').closest('td')).toHaveAttribute('data-col', '1');
  });

  it('decorates AeroPlug experiment tables with first second and third rank cues', () => {
    render(<App />);

    const decoratedTables = [
      '表6-1 AeroCRIS Stage 1 消融实验',
      '表6-2 AeroCRIS Stage 2 TTA 实验结果',
      '表6-3 AeroCRIS 精度与效率对比',
      '表6-4 AeroPlug 跨模型泛化结果'
    ];

    for (const tableName of decoratedTables) {
      const table = screen.getByRole('table', { name: tableName });
      expect(table.querySelectorAll('td.rank-cell[data-rank="1"]').length).toBeGreaterThan(0);
      expect(table.querySelectorAll('td.rank-cell[data-rank="2"]').length).toBeGreaterThan(0);
      expect(table.querySelectorAll('td.rank-cell[data-rank="3"]').length).toBeGreaterThan(0);
    }

    const stageOneTable = screen.getByRole('table', { name: decoratedTables[0] });
    expect(stageOneTable.querySelectorAll('td.rank-cell')).toHaveLength(15);
    expect(within(stageOneTable).getByText('34.22')).toHaveAttribute('data-rank', '1');
  });

  it('merges repeated category cells in comparison tables', () => {
    render(<App />);

    const paradigmTable = screen.getByRole('table', {
      name: '表3-1 低空无人机视角指代表达理解相关研究范式对比（含续表）'
    });
    const uavSemanticCell = within(paradigmTable).getByRole('rowheader', { name: '无人机语义分割' });
    const universalReferringCell = within(paradigmTable).getByRole('rowheader', { name: '通用指代分割' });

    expect(uavSemanticCell).toHaveAttribute('rowspan', '3');
    expect(universalReferringCell).toHaveAttribute('rowspan', '4');
    expect(within(paradigmTable).getAllByRole('rowheader', { name: '无人机语义分割' })).toHaveLength(1);

    const generalizationTable = screen.getByRole('table', { name: '表6-4 AeroPlug 跨模型泛化结果' });
    const lavtCell = within(generalizationTable).getByRole('rowheader', { name: 'LAVT' });
    const asdaCell = within(generalizationTable).getByRole('rowheader', { name: 'ASDA' });

    expect(lavtCell).toHaveAttribute('rowspan', '3');
    expect(asdaCell).toHaveAttribute('rowspan', '3');
    expect(within(generalizationTable).getAllByRole('rowheader', { name: 'LAVT' })).toHaveLength(1);
  });

  it('places the efficiency table before the cross-model generalization table after renumbering', () => {
    render(<App />);

    const methodSectionText =
      screen.getByRole('heading', { name: 'AeroPlug / AeroCRIS 方法实验' }).closest('section')?.textContent ?? '';

    expect(methodSectionText.indexOf('表6-2 AeroCRIS Stage 2 TTA 实验结果')).toBeLessThan(
      methodSectionText.indexOf('表6-3 AeroCRIS 精度与效率对比')
    );
    expect(methodSectionText.indexOf('表6-3 AeroCRIS 精度与效率对比')).toBeLessThan(
      methodSectionText.indexOf('表6-4 AeroPlug 跨模型泛化结果')
    );
  });
});
