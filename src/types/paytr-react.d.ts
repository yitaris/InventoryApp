declare module 'paytr-react' {
  import type { AxiosInstance } from 'axios';

  export interface PayTRConstructorParams {
    merchant_id: string;
    merchant_key: string;
    merchant_salt: string;
    debug_on?: boolean;
    no_installment?: boolean;
    max_installment?: number;
    timeout_limit?: number;
    test_mode?: boolean;
    non_3d?: string;
    lang?: string;
    client?: AxiosInstance;
  }

  export interface PayTRGetTokenParams {
    merchant_oid: string;
    payment_amount: number;
    currency: string;
    email: string;
    user_ip: string;
    user_name: string;
    user_phone: string;
    user_address: string;
    user_basket: Array<{
      name: string;
      price: string;
      quantity: number;
    }>;
    merchant_ok_url: string;
    merchant_fail_url: string;
  }

  export interface PayTRGetTokenResponse {
    token: string;
  }

  export class PayTRClient {
    constructor(params: PayTRConstructorParams);
    getToken(params: PayTRGetTokenParams): Promise<PayTRGetTokenResponse>;
  }
}
