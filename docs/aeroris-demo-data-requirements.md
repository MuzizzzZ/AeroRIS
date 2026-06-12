# AeroRIS 模型演示页数据输出需求

本文档用于指导服务器侧模型推理输出，目标是让前端 `/demo` 页面能够将当前占位结果替换为真实模型结果。当前前端演示采用 5 步流程：输入任务、CRIS baseline、AeroCRIS Stage 1、AeroCRIS Stage 2 TTA、最终输出。

## 1. 展示样例

要求每个展示类别输出 10 个样例，总计 50 个样例。每个类别可以选 1 个主推样例用于首页式演示，其余 9 个用于扩展浏览、备选展示和后续替换。

| category_id | 展示类型 | 每类数量 | 说明 |
| --- | --- | --- | --- |
| small_target | 小目标单实例 | 10 | 展示 CRIS 对小目标激活不足，以及 AeroCRIS 的小目标增强效果。 |
| multi_instance | 多实例集合 | 10 | 展示同一句表达指向多个实例时，union mask 覆盖是否完整。 |
| spatial_relation | 空间关系表达 | 10 | 展示模型是否理解“在……旁边 / 周围 / 左侧”等空间约束。 |
| high_density | 高密度目标 | 10 | 展示密集目标、遮挡、背景复杂时的预测稳定性。 |
| empty_target | 空目标拒识 | 10 | 展示表达中目标不存在时，模型是否输出 empty mask。当前前端为占位，后续需要真实样例替换。 |

每个样例最好来自 AeroRIS 数据集真实图像，并保留原始英文表达。前端可显示中文标题，但模型输入建议使用论文实验中的英文 expression。

`case_id` 使用 `category_id_两位序号` 的格式，例如 `small_target_01`、`small_target_02`、`empty_target_10`。每个类别必须覆盖 `01` 到 `10`。

## 2. 每个样例必须提供的数据

每个样例输出一个目录，并按类别分组。推荐结构如下：

```text
aeroris_demo_outputs/
  manifest.json
  cases/
    small_target/
      small_target_01/
        input.jpg
        gt_union_mask.png
        gt_overlay.jpg
        cris_mask.png
        cris_heatmap.png
        cris_overlay.jpg
        stage1_mask.png
        stage1_heatmap.png
        stage1_overlay.jpg
        stage2_mask.png
        stage2_heatmap.png
        stage2_overlay.jpg
        final_comparison.jpg
        logits/
          cris_logits.npy
          stage1_logits.npy
          stage2_logits.npy
      small_target_02/
        ...
      ...
      small_target_10/
        ...
    empty_target/
      empty_target_01/
        ...
      ...
      empty_target_10/
        ...
```

### 必须文件

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| input.jpg | RGB 图像 | 原始无人机图像。 |
| gt_union_mask.png | 单通道 PNG | 表达级 GT union mask，非空目标为 0/255，空目标全黑。 |
| gt_overlay.jpg | RGB 图像 | GT mask 叠加到原图的可视化。 |
| cris_mask.png | 单通道 PNG | CRIS baseline 二值预测 mask。 |
| cris_heatmap.png | RGB 或灰度图 | CRIS baseline logits / probability 热力图。 |
| cris_overlay.jpg | RGB 图像 | CRIS baseline 预测叠加图。 |
| stage1_mask.png | 单通道 PNG | AeroCRIS Stage 1 预测 mask。 |
| stage1_heatmap.png | RGB 或灰度图 | Stage 1 logits / probability 热力图。 |
| stage1_overlay.jpg | RGB 图像 | Stage 1 预测叠加图。 |
| stage2_mask.png | 单通道 PNG | AeroCRIS Stage 2 TTA 最终预测 mask。 |
| stage2_heatmap.png | RGB 或灰度图 | Stage 2 TTA 校准后热力图。 |
| stage2_overlay.jpg | RGB 图像 | Stage 2 TTA 最终预测叠加图。 |
| final_comparison.jpg | RGB 图像 | 一张对比图，建议横向排列 Original / GT / CRIS / Stage 1 / Stage 2。 |

### 推荐保留文件

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| cris_logits.npy | float32 numpy | 复现实验或生成不同阈值结果。 |
| stage1_logits.npy | float32 numpy | 复现实验或可视化 Stage 1 激活变化。 |
| stage2_logits.npy | float32 numpy | 复现实验或可视化 TTA 残差校准。 |
| instance_masks/*.png | 单通道 PNG | 多实例样例可选，用于解释实例 mask 到 union mask 的构建。 |
| residual_map.png | RGB 或灰度图 | Stage 2 TTA 的残差校准可视化，可选但适合答辩展示。 |

## 3. 图像与 mask 规范

1. 所有 mask 必须与原图保持相同宽高。
2. 二值 mask 使用 `0` 表示背景，`255` 表示前景。
3. heatmap 建议使用固定 colormap，并保持相同的归一化规则，避免不同样例之间视觉不可比。
4. overlay 建议使用半透明红色或绿色叠加，且不要遮挡原图主体。
5. `final_comparison.jpg` 中每一列建议标注短标题：Original、GT、CRIS、Stage 1、Stage 2。
6. 空目标样例的 `gt_union_mask.png` 必须全黑；如果模型正确拒识，`stage2_mask.png` 也应全黑。

## 4. manifest.json 字段

服务器最终需要输出一个统一的 `manifest.json`，前端后续只读取这一份 manifest 即可替换占位。

`manifest.json` 的 `cases` 数组必须包含 50 个对象，每个 `category_id` 恰好 10 个样例。

```json
{
  "version": "1.0",
  "generated_at": "2026-06-12T00:00:00+08:00",
  "note": "AeroRIS demo outputs for frontend presentation",
  "cases": [
    {
      "case_id": "small_target_01",
      "category_id": "small_target",
      "category_index": 1,
      "category_total": 10,
      "title": "小目标单实例",
      "category": "Small Target",
      "split": "test",
      "dataset_index": "3003",
      "image_id": "0000006_00611_d_0000002.jpg",
      "expression": "The blue cars park near the construction materials.",
      "is_empty_target": false,
      "instance_count": 1,
      "union_area_px": 1538,
      "bbox_xywh": [0, 0, 0, 0],
      "display_focus": "展示 baseline 对小目标响应不足，以及 Stage 2 TTA 的激活增强。",
      "assets": {
        "original": "cases/small_target/small_target_01/input.jpg",
        "gt_mask": "cases/small_target/small_target_01/gt_union_mask.png",
        "gt_overlay": "cases/small_target/small_target_01/gt_overlay.jpg",
        "cris_mask": "cases/small_target/small_target_01/cris_mask.png",
        "cris_heatmap": "cases/small_target/small_target_01/cris_heatmap.png",
        "cris_overlay": "cases/small_target/small_target_01/cris_overlay.jpg",
        "stage1_mask": "cases/small_target/small_target_01/stage1_mask.png",
        "stage1_heatmap": "cases/small_target/small_target_01/stage1_heatmap.png",
        "stage1_overlay": "cases/small_target/small_target_01/stage1_overlay.jpg",
        "stage2_mask": "cases/small_target/small_target_01/stage2_mask.png",
        "stage2_heatmap": "cases/small_target/small_target_01/stage2_heatmap.png",
        "stage2_overlay": "cases/small_target/small_target_01/stage2_overlay.jpg",
        "final_comparison": "cases/small_target/small_target_01/final_comparison.jpg"
      },
      "per_case_metrics": {
        "cris": {
          "iou": 0.0,
          "dice": 0.0,
          "empty_correct": null,
          "latency_ms": 0.0
        },
        "stage1": {
          "iou": 0.0,
          "dice": 0.0,
          "empty_correct": null,
          "latency_ms": 0.0
        },
        "stage2": {
          "iou": 0.0,
          "dice": 0.0,
          "empty_correct": null,
          "latency_ms": 0.0
        }
      }
    }
  ],
  "global_metrics": [
    {
      "method": "CRIS baseline",
      "mIoU": 17.82,
      "oIoU": 24.41,
      "latency_ms": 12.34,
      "fps": 81.07,
      "empty_correct": null
    },
    {
      "method": "AeroCRIS Stage 1",
      "mIoU": 34.22,
      "oIoU": 38.61,
      "latency_ms": 12.52,
      "fps": 79.88,
      "empty_correct": null
    },
    {
      "method": "AeroCRIS Stage 2 TTA",
      "mIoU": 36.76,
      "oIoU": 41.11,
      "latency_ms": 15.57,
      "fps": 64.21,
      "empty_correct": null
    }
  ]
}
```

其中 `bbox_xywh` 使用 `[x, y, width, height]`。如果一个表达对应多个实例，建议填写 union bbox。

## 5. 每个阶段对应的前端展示数据

| 前端阶段 | 需要使用的数据 | 说明 |
| --- | --- | --- |
| 输入任务 | original、expression、GT metadata | 展示图像和语言表达，不展示预测。 |
| CRIS baseline | cris_mask、cris_heatmap、cris_overlay、per_case_metrics.cris | 展示 baseline 的失败或不足。 |
| Stage 1 | stage1_mask、stage1_heatmap、stage1_overlay、per_case_metrics.stage1 | 展示训练侧监督修正的效果。 |
| Stage 2 TTA | stage2_mask、stage2_heatmap、stage2_overlay、per_case_metrics.stage2 | 展示推理侧轻量校准的效果。 |
| 最终输出 | final_comparison、global_metrics | 用于答辩时总结模型提升。 |

## 6. 空目标拒识样例的额外要求

空目标类别需要输出 10 个真实空目标样例，必须能清楚展示“表达不存在目标时不应强行分割背景”。

每个空目标样例必须提供：

1. `is_empty_target: true`
2. 全黑 `gt_union_mask.png`
3. CRIS baseline 输出，可展示其是否误激活背景
4. Stage 1 输出
5. Stage 2 TTA 输出
6. `empty_correct` 字段，表示该模型是否正确输出空 mask

空目标样例的 `per_case_metrics` 推荐格式：

```json
{
  "cris": {
    "iou": null,
    "dice": null,
    "empty_correct": false,
    "false_positive_area_px": 2350,
    "latency_ms": 12.34
  },
  "stage1": {
    "iou": null,
    "dice": null,
    "empty_correct": true,
    "false_positive_area_px": 0,
    "latency_ms": 12.52
  },
  "stage2": {
    "iou": null,
    "dice": null,
    "empty_correct": true,
    "false_positive_area_px": 0,
    "latency_ms": 15.57
  }
}
```

## 7. 推荐选择的真实样例与补充数量

当前前端已使用下列真实样例作为基础，服务器侧可以优先把它们作为对应类别的 `01` 号样例，并为每个类别继续补齐到 10 个样例。

| 类别 | 推荐 01 号样例 | 还需补充数量 | expression |
| --- | --- | --- | --- |
| small_target | test / 3003 | 9 | The blue cars park near the construction materials. |
| multi_instance | train / 8522 | 9 | The white cars park along the sidewalk. |
| spatial_relation | test / 2895 | 9 | The white cars park around the central green area. |
| high_density | train / 8104 | 9 | The people are scattered throughout the pool area. |
| empty_target | 待选择真实空目标样例 | 10 | 需要从 AeroRIS empty expressions 中选择真实不存在目标表达。 |

## 8. 最低交付版本

如果服务器侧时间有限，最低需要交付：

1. 50 个样例目录，每个类别 10 个
2. 每个样例的 `input.jpg`
3. 每个样例的 `gt_union_mask.png`
4. 每个样例的 `cris_overlay.jpg`
5. 每个样例的 `stage1_overlay.jpg`
6. 每个样例的 `stage2_overlay.jpg`
7. 每个样例的 `final_comparison.jpg`
8. 一个完整 `manifest.json`

如果最低版本能按上述文件输出，前端就可以先完成占位替换。后续再补充 heatmap、logits、instance masks 和更详细指标。

## 9. 质量检查清单

服务器侧输出完成后，请检查：

- [ ] 每个 manifest 中的文件路径都能在输出目录中找到。
- [ ] `cases` 数组总数为 50。
- [ ] `small_target`、`multi_instance`、`spatial_relation`、`high_density`、`empty_target` 每个类别都恰好 10 个样例。
- [ ] 所有 mask 与原图宽高一致。
- [ ] 非空样例的 GT mask 不是全黑。
- [ ] 10 个空目标样例的 GT mask 都是全黑。
- [ ] overlay 没有明显错位。
- [ ] `final_comparison.jpg` 能直观看出 CRIS、Stage 1、Stage 2 的差异。
- [ ] 每个样例都有 per-case 指标。
- [ ] 三个模型都有 global metrics。
- [ ] 文件名不包含中文、空格或特殊符号。
