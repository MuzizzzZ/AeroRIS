# AeroRIS demo output generation report

- Output root: `/root/autodl-tmp/aeroris_demo_outputs`
- Split: `test`
- Cases: `50`
- Categories: `{'small_target': 10, 'multi_instance': 10, 'spatial_relation': 10, 'high_density': 10, 'empty_target': 10}`
- Raw logits were not found; `logits/*.npy` are derived float32 proxy maps from binary masks.
- Heatmaps are generated from the same derived probability maps using a fixed colormap.

## Selected expression IDs
- `small_target`: 3003, 2005, 3102, 1278, 466, 2197, 3272, 267, 3206, 1274
- `multi_instance`: 417, 3343, 1204, 3326, 2157, 2020, 584, 1036, 2162, 190
- `spatial_relation`: 2895, 3356, 2185, 23, 2252, 2010, 164, 1644, 3047, 2810
- `high_density`: 2259, 610, 3347, 676, 2599, 1789, 555, 166, 1656, 361
- `empty_target`: 1855, 583, 2805, 2651, 350, 500, 501, 537, 859, 1583
