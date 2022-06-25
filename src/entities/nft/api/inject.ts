import Injector from 'src/injector';
import { NFT_REPO } from 'src/injector/constants';
import HTTPNFTRepo from './HTTPNFTRepo';

Injector.set(NFT_REPO, new HTTPNFTRepo());
