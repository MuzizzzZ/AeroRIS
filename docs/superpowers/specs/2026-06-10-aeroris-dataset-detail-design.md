# AeroRIS Dataset Detail Design

## Goal

Create a dedicated AeroRIS dataset detail page at `/dataset` that users can reach from the homepage dataset entry. The page presents dataset scale, annotation structure, split statistics, and real sample browsing without mentioning RefDrone in the overview copy.

## Content Structure

- Hero: dataset name, concise positioning, key metrics for expressions, unique images, union masks, instance masks, and empty expressions.
- Structure section: explain the dataset as image plus language expression, instance masks, union mask, and optional visualization overlay.
- Interactive browser: allow users to filter by split, choose real samples, and switch between original image, union mask, overlay, and instance mask thumbnails where available.
- Statistics: show split-level counts and feature cards for small targets, multi-instance expressions, empty targets, and low-altitude UAV scenes.

## Real Assets

Use selected real samples copied from `/Users/hozeeric/Downloads/AeroRIS` into `public/assets/aeroris-dataset`. Do not copy the full 2.6GB dataset into the frontend.

## Navigation

The homepage dataset nav item and the dataset section title link to `/dataset`. The detail page header includes a return link to `/`.

## Constraints

- Overview copy must not mention RefDrone.
- Preserve the existing visual language: quiet research presentation, restrained cards, readable tables, and real imagery.
- Keep implementation local to the current Vite/React app without adding a router dependency.
