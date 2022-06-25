import Injector from 'src/injector';
import { AUTH_REPO } from 'src/injector/constants';
import HTTPAuthRepo from './HTTPAuthRepo';
// import MockAuthRepo from './MockAuthRepo';

Injector.set(AUTH_REPO, new HTTPAuthRepo());
// Injector.set(AUTH_REPO, new MockAuthRepo());
