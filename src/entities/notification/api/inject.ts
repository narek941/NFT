import Injector from 'src/injector';
import { NOTIFICATION_REPO } from 'src/injector/constants';
import HTTPNotificationRepo from './HTTPNotificationRepo';

Injector.set(NOTIFICATION_REPO, new HTTPNotificationRepo());
