import Favorite from 'public/other/favorite.svg';
import Debounce from 'lodash/debounce';
import styles from '@components/Card/Card.styles.module.scss';
import FavoriteClear from 'public/other/favorite_clear.svg';
import likeStyles from './Like.module.scss';
import { ICardItem } from '@components/Card/Card';
import { likeNFTRequest } from '@entities/nft/redux/actions';
import { useDispatch } from 'react-redux';
import { INFTDetail } from '@type/nft';
import { isLoggedIn, user2FAPassed } from 'src/common/utils/token';
import clsx from 'clsx';
import classNames from 'classnames';

const DEBOUNCE_TIME = 500;

export const LikeHelper = (
  item: ICardItem | INFTDetail,
  color?: 'default' | 'primary'
) => {
  const dispatch = useDispatch();

  const handleLikeNFT = (event, item, like) => {
    event.stopPropagation();
    dispatch(likeNFTRequest({ id: item.id, like: !like }));
  };
  const isFavorite = item.liked || item.likes;
  return (
    <>
      {isLoggedIn() && user2FAPassed() ? (
        isFavorite ? (
          <Favorite
            onClick={Debounce((e) => {
              handleLikeNFT && handleLikeNFT(e, item, isFavorite);
            }, DEBOUNCE_TIME)}
            className={classNames(
              likeStyles.icon,
              likeStyles['icon-favorite'],
              color === 'primary'
                ? likeStyles['like-primary']
                : likeStyles['like-default']
            )}
          />
        ) : (
          <FavoriteClear
            onClick={Debounce((e) => {
              handleLikeNFT && handleLikeNFT(e, item, isFavorite);
            }, DEBOUNCE_TIME)}
            className={classNames(
              likeStyles.icon,
              likeStyles['icon-favorite-clear'],
              color === 'primary'
                ? likeStyles['like-primary']
                : likeStyles['like-default']
            )}
          />
        )
      ) : (
        <div className={clsx(likeStyles.tooltipWrapper)}>
          <span className={clsx(likeStyles.tooltipBottom, likeStyles.tooltip)}>
            Please Sign in
          </span>
          <FavoriteClear
            className={classNames(
              likeStyles.icon,
              likeStyles['icon-favorite-clear']
            )}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
