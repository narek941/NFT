/* global JSX*/
import Link from 'next/link';

import SocialIconPlaceholder from '../SocialIconPlaceholder';
import Image from 'next/image';
import { ISocialIcon } from 'src/types/general';

export default function SocialIcon({
  fileName,
  linkTo,
  width,
  height,
  name,
}: ISocialIcon): JSX.Element {
  return (
    <Link href={linkTo}>
      <a target='_blank'>
        <SocialIconPlaceholder>
          <Image
            src={`/social-network-icons/${fileName}`}
            width={width}
            height={height}
            alt={name}
          />
        </SocialIconPlaceholder>
      </a>
    </Link>
  );
}
