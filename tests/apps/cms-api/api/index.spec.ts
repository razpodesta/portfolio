// tests/apps/cms-api/api/index.spec.ts
// Simulación conceptual para validar el Singleton
describe('Serverless Handler', () => {
  it('should reuse database connection across invocations', async () => {
    // Mock de Sequelize
    // Validar que .authenticate() se llama
    // Validar que .sync() NUNCA se llama
  });
});
