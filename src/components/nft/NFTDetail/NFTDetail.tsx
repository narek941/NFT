import styles from './NFTDetail.module.scss';
import btnStyles from '@components/shared/Button/Button.module.scss';

import { ComponentType, useState } from 'react';
import Button from '@shared/Button';
import type { INFT } from '@type/nft';
import { DetailViewInfo } from './DetailViewInfo';
import Accordion, { IAccordionProps } from '@components/shared/Accordion';
import { PaymentView } from './PaymentView';
import { PaymentIntent } from '@stripe/stripe-js';
import PaymentSuccess from '@components/PaymentSuccess';
import ArrowLeft from 'public/field-icons/arrow-right.svg';
import Placeholder from 'public/assets/img/img-placeholder.svg';
import {
  handleTraitBooleanValue,
  renderDescription,
  renderTraitIndex,
} from '@utils/nftUtils';
import { TableWithoutHeader } from '@shared/Tables/TableWithoutHeader';
import classNames from 'classnames';
import { ExternalImage } from '@components/shared/ExternalImage';
import { BuyWith } from '@components/nft/NFTDetail/BuyWith/BuyWith';
import { MetamaskCheckout } from '@components/nft/NFTDetail/MetamaskCheckout/MetamaskCheckout';

const MOCK_PREVIEW_AUDIO_URL =
  'https://niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com/0e2cb94f-94f8-482c-8e78-acb107f829ba.png';
interface NFTDetailProps {
  nft: INFT;
  defaultBlock?: NFTDetailViews;
  setSelectedNFTId: Function;
  dateFormat?: string;
}

export enum NFTDetailViews {
  detail = 'detail',
  payment = 'payment',
  successPayment = 'successPayment',
  buyWith = 'buyWith',
  metamaskCheckout = 'metamaskCheckout',
}

export const NFTDetail: ComponentType<NFTDetailProps> = ({
  nft,
  defaultBlock = NFTDetailViews.detail,
  setSelectedNFTId,
  dateFormat,
}) => {
  const [view, setView] = useState<NFTDetailViews>(defaultBlock);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | undefined>(
    undefined
  );

  const onSuccess = (paymentIntent: PaymentIntent) => {
    setPaymentIntent(paymentIntent);
    setView(NFTDetailViews.successPayment);
  };

  const renderTraitsData = (traits: Record<string, string>) => {
    return Object.entries(traits).map(([key, value], index) => ({
      id: renderTraitIndex(index),
      title: <span className='text-bold'>{key}:</span>,
      desc: renderDescription(handleTraitBooleanValue(value) + '', dateFormat),
      other: '',
    }));
  };

  const renderTraitsContent = (traits: Record<string, string>) => {
    const traitsData = renderTraitsData(traits);
    return <TableWithoutHeader rowsTable={traitsData} />;
  };

  const renderAccordionData = (nft: INFT) => {
    const basicData: IAccordionProps['data'] = [];
    if (nft.description) {
      basicData.push({
        title: 'Description',
        content: nft?.description,
      });
    }
    if (nft?.traits && Object.keys(nft?.traits).length !== 0) {
      basicData.push({
        title: 'Traits for NFT',
        content: renderTraitsContent(nft?.traits),
      });
    }
    if (nft?.utilityExperience) {
      basicData.push({
        title: 'Utility Experience',
        content: nft.utilityExperience,
      });
    }
    return basicData;
  };

  const showAccordion = (): boolean =>
    Boolean(
      nft?.description ||
        nft?.utilityExperience ||
        (nft?.traits && Object.keys(nft?.traits).length !== 0)
    );

  if (view === NFTDetailViews.successPayment) {
    return (
      <PaymentSuccess
        paymentIntent={paymentIntent}
        onCloseModal={() => setSelectedNFTId(null)}
      />
    );
  }

  const renderMedia = () => {
    if (!nft?.mediaUrl) {
      return <Placeholder className={styles.noImage} width='93' height='93' />;
    }
    const isVideo = nft.mediaType && nft.mediaType.includes('video');
    const isAudio = nft.mediaType && nft.mediaType.includes('audio');

    if (isVideo) {
      return (
        <video
          controls
          autoPlay
          muted
          controlsList='nodownload'
          onContextMenu={(e) => {
            console.log('video context menu is clicked');
            e.preventDefault();
            return false;
          }}
          src={nft.mediaUrl}
          poster={nft.mediaPreviewUrl}
          className={styles.video}
        />
      );
    }
    if (isAudio) {
      const preview = nft.mediaPreviewUrl || MOCK_PREVIEW_AUDIO_URL;
      return (
        <div className={styles.audio}>
          <ExternalImage
            className={styles.image}
            src={preview}
            alt={''}
            responsive
            height='295'
            width='295'
            attachPreview
            audioUrl={nft.mediaUrl}
          />
          <audio
            src={nft.mediaUrl}
            controls
            controlsList='nodownload'
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
          />
        </div>
      );
    }
    return (
      <ExternalImage
        className={styles.image}
        src={nft.mediaUrl}
        alt={''}
        responsive
        height='294'
        width='294'
        attachPreview
      />
    );
  };

  return (
    <div className={styles.general}>
      {view === NFTDetailViews.metamaskCheckout && (
        <MetamaskCheckout
          renderMedia={renderMedia}
          nft={nft}
          setView={setView}
        />
      )}
      {view === NFTDetailViews.buyWith && (
        <BuyWith renderMedia={renderMedia} setView={setView} nft={nft} />
      )}

      {view !== NFTDetailViews.metamaskCheckout &&
        view !== NFTDetailViews.buyWith && (
          <>
            <div className={styles.main}>
              <div className={styles['media-wrapper']}>
                <div className={styles.media}>{renderMedia()}</div>
                {view === NFTDetailViews.payment && (
                  <Button
                    className={classNames(btnStyles['btn-back'], styles.button)}
                    fillStyle={false}
                    fullWidth
                    onClick={() => setView(NFTDetailViews.buyWith)}
                  >
                    <div className={styles['back-button-text']}>
                      <span>
                        <ArrowLeft />
                      </span>
                      Back to NFT details
                    </div>
                  </Button>
                )}
              </div>

              <div className={styles['info-block']}>
                {view === NFTDetailViews.detail && (
                  <DetailViewInfo nft={nft} onClick={setView} />
                )}
                {view === NFTDetailViews.payment && (
                  <PaymentView nft={nft} onClick={onSuccess} />
                )}
              </div>
            </div>
            {view == NFTDetailViews.detail && showAccordion() && (
              <div>
                <Accordion
                  size='l'
                  color='primary'
                  data={renderAccordionData(nft)}
                />
              </div>
            )}
          </>
        )}
    </div>
  );
};
