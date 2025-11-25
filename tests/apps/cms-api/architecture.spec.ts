// RUTA: tests/apps/cms-api/architecture.spec.ts
// IMPORTANTE: Probamos la importación de un paquete interno (Protocolo 33)
import { ARTIFACTS, getArtifactById } from '@razpodesta/protocol-33';
// IMPORTANTE: Probamos el paquete de seguridad
import { TokenManager } from '@razpodesta/auth-shield';

describe('Architecture Integrity: CMS API', () => {
  it('should execute in a Node.js environment (No DOM)', () => {
    // Verificar que NO estamos en un navegador
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    expect(process.version).toBeDefined();
  });

  it('should resolve sovereign packages correctly (@razpodesta/*)', () => {
    // Verificar integración con Protocolo 33
    const artifact = getArtifactById('monolito-obsidiana');
    expect(artifact).toBeDefined();
    expect(artifact?.house).toBe('ARCHITECTS');
    expect(ARTIFACTS.length).toBeGreaterThan(0);
  });

  it('should handle crypto operations via Auth Shield', () => {
    const manager = new TokenManager({ secret: 'test-secret', expiresIn: '1h' });
    const token = manager.sign({ userId: '123', email: 'test@test.com' });
    const decoded = manager.verify(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe('123');
  });
});
