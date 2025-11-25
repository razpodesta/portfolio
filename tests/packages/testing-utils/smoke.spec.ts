import { buildUser } from '@portfolio/testing-utils';

describe('Testing Utils Smoke Test', () => {
  it('should create a mock user', () => {
    const user = buildUser();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
  });
});
