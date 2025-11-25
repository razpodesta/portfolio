import { core } from '@metashark-cms/core';

describe('Architecture Integrity: CMS Core', () => {
  it('should execute core logic', () => {
    expect(core()).toBe('core');
  });
});
