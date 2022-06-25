export enum ProfileTab {
  MY_PROFILE = 0,
  MY_NFTS = 1,
  MY_PACKS = 2,
  LIKED_NFTS = 3,
}

export enum ProfileTabLink {
  MY_PROFILE = 'profile',
  MY_NFTS = 'my-nfts',
  MY_PACKS = 'my-packs',
  LIKED_NFTS = 'liked-nfts',
}

export const profilePageNav = [
  {
    id: 0,
    contentId: ProfileTab.MY_PROFILE,
    name: `My Profile`,
    linkTo: ProfileTabLink.MY_PROFILE,
    content: <div>My profile</div>,
  },
  {
    id: 1,
    contentId: ProfileTab.MY_NFTS,
    name: `My NFTs`,
    linkTo: ProfileTabLink.MY_NFTS,
    content: <div>My NFTs</div>,
  },
  {
    id: 2,
    contentId: ProfileTab.MY_PACKS,
    name: `My Packs`,
    linkTo: ProfileTabLink.MY_PACKS,
    content: <div>My Packs</div>,
  },
  {
    id: 3,
    contentId: ProfileTab.LIKED_NFTS,
    name: `Liked NFTs`,
    linkTo: ProfileTabLink.LIKED_NFTS,
    content: <div style={{ textAlign: 'center' }}>Liked NFTs</div>,
  },
];
