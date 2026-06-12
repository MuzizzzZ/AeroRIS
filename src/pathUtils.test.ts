import { describe, expect, it } from 'vitest';
import { resolveAppPath, resolveRoutePath, stripBasePath } from './pathUtils';

describe('GitHub Pages path helpers', () => {
  it('resolves internal routes and assets under the AeroRIS project base', () => {
    expect(resolveRoutePath('/', '/AeroRIS/')).toBe('/AeroRIS/');
    expect(resolveRoutePath('/demo', '/AeroRIS/')).toBe('/AeroRIS/demo');
    expect(resolveRoutePath('/#method', '/AeroRIS/')).toBe('/AeroRIS/#method');
    expect(resolveAppPath('/assets/thesis/fig.png', '/AeroRIS/')).toBe('/AeroRIS/assets/thesis/fig.png');
  });

  it('keeps hash links and local root-base paths stable', () => {
    expect(resolveRoutePath('#overview', '/AeroRIS/')).toBe('#overview');
    expect(resolveRoutePath('/demo', '/')).toBe('/demo');
    expect(resolveAppPath('/assets/thesis/fig.png', '/')).toBe('/assets/thesis/fig.png');
  });

  it('strips the project base before route matching', () => {
    expect(stripBasePath('/AeroRIS/', '/AeroRIS/')).toBe('/');
    expect(stripBasePath('/AeroRIS/dataset', '/AeroRIS/')).toBe('/dataset');
    expect(stripBasePath('/AeroRIS/demo', '/AeroRIS/')).toBe('/demo');
    expect(stripBasePath('/demo', '/AeroRIS/')).toBe('/demo');
  });
});
