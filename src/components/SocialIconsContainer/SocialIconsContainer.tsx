import { socialIconsList } from 'configure';
import SocialIcon from '../SocialIcon';

import styles from './SocialIconsContainer.module.scss';

export default function SocialIconsContainer() {
  return (
    <div className={styles.container}>
      {socialIconsList.map((icon) => (
        <SocialIcon
          key={icon.id}
          fileName={icon.fileName}
          linkTo={icon.linkTo}
          width={icon.width}
          height={icon.height}
          name={icon.name}
        />
      ))}
    </div>
  );
}
