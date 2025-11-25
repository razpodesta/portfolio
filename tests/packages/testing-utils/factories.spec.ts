// RUTA: tests/packages/testing-utils/factories.spec.ts
import { buildUser } from '@portfolio/testing-utils';

describe('Architecture Integrity: Testing Utils', () => {
  it('should generate mock data using Faker', () => {
    const user = buildUser();

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user.email).toContain('@');
    expect(user.active).toBe(true);
  });

  it('should allow overrides in factory', () => {
    const customUser = buildUser({ username: 'OverrideUser', privilege: 'god' });
    expect(customUser.username).toBe('OverrideUser');
    expect(customUser.privilege).toBe('god');
  });
});
