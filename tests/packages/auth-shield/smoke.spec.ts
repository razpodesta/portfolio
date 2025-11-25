import { hashPassword, comparePassword } from '@razpodesta/auth-shield';

describe('Auth Shield Smoke Test', () => {
  it('should hash and verify passwords', async () => {
    const password = 'secret-password';
    const hash = await hashPassword(password);
    const isValid = await comparePassword(password, hash);
    expect(isValid).toBe(true);
  });
});
