import Injector from 'src/injector';
import { CONFIGURATION_REPO } from 'src/injector/constants';
import HTTPConfigurationRepo from './HTTPConfigurationRepo';

Injector.set(CONFIGURATION_REPO, new HTTPConfigurationRepo());
