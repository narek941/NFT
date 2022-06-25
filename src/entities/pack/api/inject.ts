import Injector from 'src/injector';
import { PACK_REPO } from 'src/injector/constants';
// import MockPackRepo from './MockPackRepo';
import HTTPPackRepo from './HTTPPackRepo';

// Injector.set(PACK_REPO, new MockPackRepo());
Injector.set(PACK_REPO, new HTTPPackRepo());
