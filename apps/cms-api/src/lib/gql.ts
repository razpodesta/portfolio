// RUTA: apps/cms-api/src/lib/gql.ts
// VERSIÓN: 1.1 - Strict Typing (No-Any Policy)
// DESCRIPCIÓN: Reemplazo ligero y nativo para 'graphql-tag'.

export const gql = (chunks: TemplateStringsArray, ...variables: unknown[]): string => {
  return chunks.reduce(
    (accumulator, chunk, index) =>
      `${accumulator}${chunk}${index in variables ? variables[index] : ''}`,
    ''
  );
};

export default gql;
