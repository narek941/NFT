import { createAction } from '@reduxjs/toolkit';

export const setMetamaskConnected = createAction('metamask/connect');
export const cleatMetamaskDisconnect = createAction('metamask/disconnect');
