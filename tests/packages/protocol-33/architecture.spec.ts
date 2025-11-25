// RUTA: tests/packages/protocol-33/architecture.spec.ts
import { calculateProgress, LEVELS } from '@razpodesta/protocol-33';

describe('Architecture Integrity: Protocol 33', () => {
  it('should verify pure logic without external dependencies', () => {
    // Nivel 1 empieza en 0 XP
    const progressStart = calculateProgress(0);
    expect(progressStart.currentLevel).toBe(1);
    expect(progressStart.progressPercent).toBe(0);

    // Verificar consistencia de datos estáticos
    expect(LEVELS).toHaveLength(50);
    expect(LEVELS[0].minXp).toBe(0);
  });
});
