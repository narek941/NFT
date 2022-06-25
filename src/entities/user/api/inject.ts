import Injector from 'src/injector';
import { USER_REPO } from 'src/injector/constants';
import HTTPUserRepo from './HTTPUserRepo';

Injector.set(USER_REPO, new HTTPUserRepo());
