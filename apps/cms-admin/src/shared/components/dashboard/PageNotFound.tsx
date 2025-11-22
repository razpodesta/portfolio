// RUTA: apps/cms-admin/src/shared/components/dashboard/PageNotFound.tsx

import React from 'react';

const PageNotFound = ({ noLayout = false }: { noLayout?: boolean }) => {
  const content = (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );

  if (noLayout) {
    return content;
  }

  // Si en el futuro tienes un MainLayout, puedes envolverlo aquí.
  return content;
};

export default PageNotFound;
