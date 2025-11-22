// Dependencies
import React, { FC, ReactElement, memo } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// --- INICIO DE LA REFACTORIZACIÓN ARQUITECTÓNICA v2 ---

// Se define una interfaz de props robusta que extiende las de NextLink
// y añade las de un ancla HTML estándar.
interface iProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>, NextLinkProps {
  children: React.ReactNode;
  className?: string;
}

const Link: FC<iProps> = ({
  // Props de NextLink
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  // Props personalizadas y del ancla
  children,
  className,
  ...props // Resto de las props del ancla (target, rel, title, etc.)
}): ReactElement => {
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default memo(Link);
// --- FIN DE LA REFACTORIZACIÓN ARQUITECTÓNICA v2 ---
