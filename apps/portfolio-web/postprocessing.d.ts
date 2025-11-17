// RUTA: apps/portfolio-web/postprocessing.d.ts
// VERSIÓN: 1.0 - Contrato de Tipos a Medida para la Librería 'postprocessing'
// DESCRIPCIÓN: Este archivo de declaración proporciona a TypeScript los tipos
//              mínimos necesarios para las clases de 'postprocessing' que utilizamos
//              en el proyecto. Esto resuelve los errores de compilación de forma
//              segura y nos permite mantener un tipado estricto en toda la aplicación.

declare module 'postprocessing' {
  import {
    Scene,
    Camera,
    WebGLRenderer,
    Vector2,
    Texture,
    WebGLRenderTarget,
  } from 'three';

  // --- Clase Base para Efectos ---
  export class Effect {
    constructor(name: string, fragmentShader: string, options?: object);
    blendMode: {
      opacity: {
        value: number;
      };
    };
  }

  // --- Efectos Específicos que Utilizamos ---
  export class BloomEffect extends Effect {
    constructor(options?: object);
  }

  export class ChromaticAberrationEffect extends Effect {
    constructor(options?: object);
    offset: Vector2;
  }

  // --- Pases del Composer ---
  export class Pass {
    constructor(name: string, scene?: Scene, camera?: Camera);
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget, deltaTime?: number, stencilTest?: boolean): void;
    setSize(width: number, height: number): void;
  }

  export class RenderPass extends Pass {
    constructor(scene: Scene, camera: Camera);
  }

  export class EffectPass extends Pass {
    constructor(camera: Camera, ...effects: Effect[]);
    effects: Effect[];
  }

  // --- El Orquestador Principal ---
  export class EffectComposer {
    constructor(renderer: WebGLRenderer, options?: object);
    addPass(pass: Pass): void;
    render(deltaTime: number): void;
    setSize(width: number, height: number): void;
    dispose(): void;
    passes: Pass[];
  }
}
