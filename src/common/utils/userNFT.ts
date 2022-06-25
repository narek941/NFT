import { INFT } from '@type/nft';

const convertNFT = (nft) => {
  return nft.tokens.map((token) => ({
    ...nft,
    tokenId: token.id,
    tokens: [token],
  }));
};

const finalConvert = (list) =>
  list.reduce((prev, curr) => [...prev, ...convertNFT(curr)], []);

export const getUserNFTArrayData = (
  list: INFT[],
  totalCount
): [INFT[], number] => {
  const finalList = finalConvert(list);
  return [finalList, totalCount];
};
