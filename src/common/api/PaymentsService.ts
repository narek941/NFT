import { $apiWithToken } from './index';
import { ICreatePaymentRes } from '@type/paymentsService';

export enum ReferenceValues {
  nft = 'NFT',
  packs = 'PACKS',
}

export interface ICreatePaymentPayload {
  reference: ReferenceValues;
  referenceId: number;
  currency: string;
  type: string;
}

export default class PaymentsService {
  static async createPayment(
    payload: ICreatePaymentPayload
  ): Promise<ICreatePaymentRes> {
    return $apiWithToken
      .post('/payments', payload)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('payment request failed: ', err);
        return {
          clientSecret: undefined,
        };
      });
  }
}
