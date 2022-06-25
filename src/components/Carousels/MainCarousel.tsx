import Button from '@components/shared/Button';
import { FC, ReactElement, useEffect, useState } from 'react';
import cn from 'classnames';
import { ArrowLeft, ArrowRight, IArrowProps } from './Arrows';
import styles from './MainCarousel.module.scss';
import { Dots } from './Dots';
import { isServer } from 'src/common/utils/common';
import classNames from 'classnames';
import { ExternalImage } from '@components/shared/ExternalImage';

export interface ISlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  imageUrl?: string;
  onButtonClick: () => void;
}

export interface IMainCarouselProps {
  slides: ISlide[];
}

const MainCarouselSlide: FC<ISlide> = ({
  title,
  description,
  buttonText,
  imageUrl,
  onButtonClick,
}) => (
  <div className={classNames(styles.slide, styles['light'])}>
    <div className={styles['slide-content']}>
      <div className={styles['slide-holder']}>
        <div className={styles['slide-title']}>{title}</div>
        <div className={styles['slide-description']}>{description}</div>
        <Button
          size={'s'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          className={styles['slide-button']}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
      <div className={styles['slide-media']}>
        {imageUrl && (
          <ExternalImage
            src={imageUrl}
            className={styles['slide-image']}
            objectFit='cover'
            objectPosition='center left'
          />
        )}
      </div>
    </div>
  </div>
);

export const MainCarousel: FC<IMainCarouselProps> = ({ slides }) => {
  const SLIDE_DELAY = 2000;

  const initialSlides = [slides[slides.length - 1], slides[0], slides[1]];

  const getWidth = () => {
    if (isServer) {
      return 0;
    }
    return window && window.innerWidth;
  };

  const [position, setPosition] = useState(-1 * getWidth());
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliding, setSliding] = useState(false);
  const [slidesShown, setSlidesShown] = useState(initialSlides);

  useEffect(() => {
    if (isSliding) {
      return;
    }
    createShownSlides(activeSlide);
  }, [isSliding]);

  const createShownSlides = (newActiveSlide: number) => {
    const newSlides: ISlide[] = [];
    if (newActiveSlide === 0) {
      newSlides.push(slides[slides.length - 1]);
    } else {
      newSlides.push(slides[newActiveSlide - 1]);
    }
    newSlides.push(slides[newActiveSlide]);
    if (newActiveSlide === slides.length - 1) {
      newSlides.push(slides[0]);
    } else {
      newSlides.push(slides[newActiveSlide + 1]);
    }
    setSlidesShown(newSlides);
    setPosition(-getWidth());
  };

  const manageSliding = (index: number) => {
    setSliding(true);
    setActiveSlide(index);
    setTimeout(() => {
      setSliding(false);
    }, SLIDE_DELAY);
  };

  const moveLeft = () => {
    if (isSliding) {
      return;
    }
    const newActiveSlide =
      activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    manageSliding(newActiveSlide);
    setPosition(0);
  };

  const moveRight = () => {
    if (isSliding) {
      return;
    }
    const newActiveSlide =
      activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
    manageSliding(newActiveSlide);
    setPosition(-2 * getWidth());
  };

  const onDotClick = (id: number) => {
    if (isSliding) {
      return;
    }
    setActiveSlide(id);
    createShownSlides(id);
  };

  const innerWrapperClasses = cn(styles['inner-wrapper'], {
    [styles['inner-wrapper-sliding']]: isSliding,
  });

  return (
    <div className={cn(styles['outer-wrapper'], styles['light'])}>
      <div className={innerWrapperClasses} style={{ left: position }}>
        {slidesShown.map(
          ({ id, title, description, buttonText, imageUrl, onButtonClick }) => (
            <MainCarouselSlide
              key={id}
              id={id}
              title={title}
              imageUrl={imageUrl}
              description={description}
              buttonText={buttonText}
              onButtonClick={onButtonClick}
            />
          )
        )}
      </div>
      <div className={styles.arrowWrap}>
        <ArrowLeft onArrowClick={moveLeft} />
        <ArrowRight onArrowClick={moveRight} />
      </div>
      <Dots
        className={styles.dots}
        dotsTotal={slides.length}
        activeDot={activeSlide}
        onDotClick={onDotClick}
      />
    </div>
  );
};
