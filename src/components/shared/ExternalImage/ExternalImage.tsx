/* global JSX */

import { FC, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import styles from './ExternalImage.styles.module.scss';
import IconClose from '/public/field-icons/icon-close.svg';

declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>;
interface IExternalImageProps {
  src: string;
  className?: string;
  alt?: string;
  height?: string;
  width?: string;
  objectPosition?: ImgElementStyle['objectPosition'];
  objectFit?: ImgElementStyle['objectFit'];
  responsive?: boolean;
  attachPreview?: boolean;
  audioUrl?: string;
}

export const ExternalImage: FC<IExternalImageProps> = (props) => {
  const {
    responsive,
    src,
    className,
    alt,
    height,
    width,
    objectFit,
    objectPosition,
    attachPreview,
    audioUrl,
  } = props;

  const [preview, showPreview] = useState(false);

  const togglePreview = () => showPreview(!preview);

  return (
    <div className={cn(styles.image, className)}>
      {attachPreview && preview && (
        <div className={styles.preview} onClick={togglePreview}>
          <IconClose
            role={'button'}
            width={'17.5px'}
            height={'17.5px'}
            className={styles['icon-close']}
          />
          <Image src={src} alt={alt} objectFit='contain' layout='fill' />
          {audioUrl && (
            <div className={styles.audio}>
              <audio
                src={audioUrl}
                controls
                controlsList='nodownload'
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
              />
            </div>
          )}
        </div>
      )}
      <Image
        className={cn({
          [styles.pointer]: attachPreview,
        })}
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={responsive ? 'responsive' : 'fill'}
        objectFit={objectFit}
        objectPosition={objectPosition}
        onClick={togglePreview}
      />
    </div>
  );
};
