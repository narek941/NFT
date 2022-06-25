import React, { FC } from 'react';

import RarityScoreIcon from 'public/other/rarityScore.svg';

import styles from './RarityScore.module.scss';

export interface IRarityScoreProps {
  className?: string;
  width?: string;
  height?: string;
  rarityScore?: string;
}

const RarityScore: FC<IRarityScoreProps> = ({
  className = '',
  width = '14',
  height = '13',
  rarityScore,
}) => {
  if (!rarityScore) return <div />;
  return (
    <div className={className}>
      <RarityScoreIcon className={styles.icon} width={width} height={height} />
      {rarityScore}
    </div>
  );
};

export default RarityScore;
