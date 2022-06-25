import { IMyPack } from '@type/pack-token';
import { IPack } from '../models/pack';
export const createPackFromToken = (packToken: IMyPack): IPack => {
  const { pack, id: packTokenId, ...rest } = packToken;
  const item: any = {
    ...pack,
    ...rest,
    status: '',
    packsNft: [
      {
        id: packTokenId,
        opened: packToken.opened,
        createdAt: packToken.createdAt,
        deletedAt: packToken.deletedAt,
        updatedAt: packToken.updatedAt,
      },
    ],
  };
  return item;
};
