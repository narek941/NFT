import React, { FC } from 'react';

export interface IRarityRankProps {
  className?: string;
  rarityRank?: string;
}

const RarityRank: FC<IRarityRankProps> = ({ className = '', rarityRank }) => {
  if (!rarityRank) return <div />;
  return <div className={className}>#{rarityRank}</div>;
};

export default RarityRank;
