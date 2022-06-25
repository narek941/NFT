import React from 'react';
import Modal from '@components/modal';
import styles from './PopUpTerms.module.scss';
import ScrollingWrapper from '../shared/ScrollingWrapper';

type showTextType = 'all' | 'terms' | 'privacy';

interface IPopUpTerms {
  isShow: boolean;
  onClose: () => void;
  showText?: showTextType;
}
const PopUpTerms = ({ onClose, isShow, showText = 'all' }) => {
  return (
    <Modal className={styles.modal} onClose={onClose} show={isShow}>
      <div className={styles.container}>
        <div className={styles.heading}>Legal information</div>
        <ScrollingWrapper color='light' size='l' className={styles.content}>
          {showText !== 'terms' && (
            <div className={styles.section}>
              <div className={styles.subHeading}>Privacy Policy</div>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                vel dui maecenas ultricies in vitae nunc. Dolor, at aliquam ac
                aliquam consequat consectetur lectus. Sagittis egestas et duis
                facilisis egestas nunc, feugiat malesuada. Eget et cras lobortis
                nunc tellus euismod donec. Aliquam etiam ultrices mi congue.
                Laoreet ac lacus morbi egestas eu a adipiscing. Pharetra iaculis
                consectetur pellentesque lacus. Cursus sem faucibus bibendum
                sed. Gravida eget facilisis eleifend pharetra purus aliquam. Ut
                malesuada pretium purus, enim dictum ac nunc. Elit lacus ipsum
                fusce libero sapien. Mauris, faucibus pharetra quis eu erat.
                Posuere varius potenti feugiat etiam. Et lacus nulla nibh nulla
                tortor. Diam sagittis tempor in gravida id. Consequat ornare
                urna tristique cursus pulvinar sed. Nunc, sodales suspendisse
                cras amet. Nisi curabitur pretium massa sed rutrum ullamcorper
                id ac. Vitae nunc justo, vestibulum mollis purus ut pellentesque
                nisi nunc. Turpis nunc tincidunt nam elit. Ultrices et eget
                amet, facilisi ultrices sed feugiat. Integer adipiscing felis
                iaculis nisi nibh praesent pretium. Enim non nunc, gravida lorem
                dui varius et platea non. Consequat amet sed et amet, nisl
                ullamcorper. Sapien sit aliquam arcu feugiat vitae. Quam quis
                commodo amet purus non, pulvinar at. Non et viverra ipsum
                pharetra risus. Dolor aliquam pellentesque nisi tellus neque,
                amet ullamcorper rutrum. Sit pharetra porttitor fringilla cras
                quis ornare. Neque, nunc eget ipsum aliquam pretium, nam nibh
                duis venenatis. Placerat dictumst lectus elementum auctor. Proin
                quis quam elit neque magna magna. Eu tincidunt ut sodales
                fermentum turpis morbi nulla interdum eu. Auctor blandit massa
                nunc purus enim habitant quis vestibulum. Velit ultrices etiam
                nisi, sit pulvinar id lobortis at et. Vitae tempor id sem nec
                ornare sed vulputate urna sit. Suspendisse viverra quisque cras
                nunc, lacus, tortor. Non aenean nunc eget et leo. Habitasse
                condimentum eu, quis magna. Massa ultrices fermentum elementum
                egestas in eget tristique facilisis adipiscing. Consectetur.
              </p>
            </div>
          )}
          {showText !== 'privacy' && (
            <div className={styles.section}>
              <div className={styles.subHeading}>Terms and conditions</div>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                sed egestas eget consectetur semper id sed lorem. Fringilla dui
                est, pharetra commodo cras viverra pharetra. Eget sit etiam
                sagittis, massa. Elit vestibulum congue at eleifend imperdiet in
                orci, nunc adipiscing. Sit feugiat scelerisque aliquet nibh quam
                blandit. Elementum morbi placerat dictumst donec elementum.
                Dolor aliquam in vulputate venenatis, id arcu faucibus.
                Tristique placerat cras cum mauris viverra dictum. Eget tempus
                feugiat cras consectetur ut lacinia eu. Nisl rhoncus, elementum
                suspendisse condimentum feugiat vulputate magna. Sem nunc
                tristique porttitor aliquet morbi egestas dictum commodo
                malesuada. Porttitor facilisi molestie commodo laoreet
                pellentesque netus nec. Eget ornare vel vel egestas sed mattis
                habitasse. Tellus at ipsum consectetur egestas. A, et ipsum odio
                enim vitae, nisi, pellentesque sed. Tellus eget elementum
                commodo tempus, tempor eget adipiscing adipiscing. Condimentum
                odio est at ultricies in lectus imperdiet. Morbi posuere ut
                eleifend placerat mauris lacus erat tincidunt. Viverra in
                aliquet tincidunt aliquam, vel vitae, at ornare. Adipiscing
                scelerisque a ullamcorper tincidunt lorem. Lacus vitae at felis
                scelerisque sed bibendum at. Lectus in at imperdiet hac. Neque,
                mauris, massa id donec adipiscing blandit odio mauris.
                Venenatis, sed interdum aliquet senectus euismod. Vel proin
                aliquet lectus vel duis. Commodo ac at morbi dolor odio vel nunc
                egestas non. Nunc mauris netus diam eu, nunc lectus ac, in.
                Dictumst mi aenean turpis nulla praesent massa. Sit nunc quam
                ultricies ligula sed accumsan. Sed lectus mattis facilisis
                fermentum et est orci. Ut mi tempus morbi pretium tortor justo
                pellentesque praesent. Sed eget aliquet at amet diam quam
                hendrerit. Tortor gravida senectus faucibus aliquam dictumst eu,
                quisque. Mauris enim bibendum tempor massa. Arcu vel semper nunc
                duis laoreet. Consequat fames elit eu malesuada commodo faucibus
                quam dictum. Sed nunc dis maecenas sodales semper.
              </p>
            </div>
          )}
        </ScrollingWrapper>
      </div>
    </Modal>
  );
};

export default PopUpTerms;
