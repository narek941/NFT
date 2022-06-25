import Injector from 'src/injector';
import { NFT_COLLECTION_REPO } from 'src/injector/constants';
import HTTPNFTCollectionRepo from './HTTPNFTCollectionRepo';

Injector.set(NFT_COLLECTION_REPO, new HTTPNFTCollectionRepo());
