import classNames from 'classnames';
import React from 'react';
import styles from './PageHeader.module.scss';
import { IHeading } from '@type/general';
import { ExternalImage } from '@shared/ExternalImage';

const PageHeader = ({ children, className, imageUrl }: IHeading) => {
  const getHeaderClassName = (): string => {
    const headerClass: string = classNames(
      styles.pageHeading,
      className,
      imageUrl && styles.image
    );
    return headerClass;
  };

  const headerClassName: string = getHeaderClassName();
  return (
    <div className={headerClassName}>
      {imageUrl && (
        <div className={styles.image}>
          <ExternalImage
            src={imageUrl}
            alt={children?.toString()}
            width='42'
            height='42'
          />
        </div>
      )}
      <h1>{children}</h1>
    </div>
  );
};

export default PageHeader;
