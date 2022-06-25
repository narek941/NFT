import { PackCard } from '@components/pack/PackCard';
import Container from '@components/shared/Container';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { FC, useEffect } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './MyPacksTab.module.scss';
import NoItems from '@shared/NoItems';
import { getUserPacksRequest } from '@entities/pack/redux/actions';
import { DEFAULT_LIMIT, getOffset } from '../../../common/utils/pagination';
import { useDispatch } from 'react-redux';
import { createPackFromToken } from '../../../common/utils/pack-utils';
import { useRouter } from 'next/router';
import EmptyView from '@components/shared/EmptyView';
export interface IMyPacksTabProps {
  packList: IPack[] | any[];
  onPackCardClick: (pack: IPack) => void;
  onPackAction: (pack: IPack) => void;
}

export const MyPacksTab: FC<IMyPacksTabProps> = ({
  packList,
  onPackAction,
  onPackCardClick,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const noItemCallback = () => {
    router.push({
      pathname: '/my-profile?tab=profile',
    });
  };

  useEffect(() => {
    dispatch(
      getUserPacksRequest({
        take: Number(DEFAULT_LIMIT),
        skip: getOffset(Number(1), Number(DEFAULT_LIMIT)),
        sort: 'id',
      })
    );
  }, []);
  const { isLoading } = useTypedSelector((state) => state.filter);
  console.log('packList', packList);

  return (
    <>
      {packList.length && !isLoading ? (
        <Container className={styles.wrapper}>
          {packList.map((pack) => (
            <PackCard
              key={pack.id}
              item={createPackFromToken(pack)}
              onCardClick={onPackCardClick}
              onButtonClick={onPackAction}
            />
          ))}
        </Container>
      ) : (
        !isLoading && (
          <EmptyView
            emoji='💩'
            btnUrl='/packs'
            btnText='Buy Pack'
            text='No items to display'
          />
        )
      )}
    </>
  );
};
