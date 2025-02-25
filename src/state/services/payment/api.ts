import {HttpSuccessResponse} from '../../../types/ApiResponse';
import {
  PaymentPlanCode,
  PaymentPlans,
  ProceedToPayResponse,
} from '../../../types/Payment';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {baseApi as api} from '../baseApi';
import {subscriptionEndpoints} from './endpoints';
import {ProceedToSubscribeParams, UpgradeOrDowngradePlanParams} from './type';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getPaymentPlans: build.query<PaymentPlans, void>({
      query: () => subscriptionEndpoints.GET_PAYMENT_PLANS,
      transformResponse: (response: HttpSuccessResponse<PaymentPlans>) =>
        response.data,
    }),
    upgradeOrDowngradePlan: build.query<
      PaymentPlanCode,
      UpgradeOrDowngradePlanParams
    >({
      query: queryArg => ({
        url: subscriptionEndpoints.UPGRADE_OR_DOWNGRADE,
        params: queryArg,
      }),
      transformResponse: (response: HttpSuccessResponse<PaymentPlanCode>) =>
        response.data,
    }),
    // getAllBanks: build.query({
    //   query: () => `payment/list-of-banks`,
    //   transformResponse: (response: {
    //     data: Array<{name: string; code: string}>;
    //   }) => response.data,
    // }),
    // verifyAccountNumber: build.query({
    //   query: ({accountNumber, bankCode}) =>
    //     `payment/verify-account-number?accountNumber=${accountNumber}&bankCode=${bankCode}`,
    //   transformResponse: (response: {
    //     data: {accountNumber: string; accountName: string};
    //   }) => response.data,
    // }),
    // setupPayment: build.mutation({
    //   query: (values: SetupPayment) => ({
    //     url: `payment/setup-payment`,
    //     method: REQUEST_METHODS.POST,
    //     body: {
    //       ...values,
    //     },
    //   }),
    //   invalidatesTags: [{type: 'Payment', id: 'LIST'}],
    // }),
    // deactivatePaymentSetup: build.mutation({
    //   query: (values: DeactivatePaymentSetup) => ({
    //     url: `payment/deactivate-payment-setup`,
    //     method: REQUEST_METHODS.POST,
    //     body: {
    //       ...values,
    //     },
    //   }),
    //   invalidatesTags: [{type: 'Payment', id: 'LIST'}],
    // }),
    proceedToSubscribe: build.mutation<
      ProceedToPayResponse,
      ProceedToSubscribeParams
    >({
      query: queryArg => ({
        url: subscriptionEndpoints.PROCEED_TO_SUBSCRIBE,
        method: REQUEST_METHODS.POST,
        body: queryArg,
      }),
      transformResponse: (
        response: HttpSuccessResponse<ProceedToPayResponse>,
      ) => response.data,
    }),
    cancelSubscription: build.mutation({
      query: () => ({
        url: subscriptionEndpoints.CANCEL_SUBSCRIBE,
        method: REQUEST_METHODS.POST,
      }),
    }),
  }),
});
export {injectedRtkApi as subscriptionApi};
export const {
  useGetPaymentPlansQuery,
  useUpgradeOrDowngradePlanQuery,
  useCancelSubscriptionMutation,
  useProceedToSubscribeMutation,
} = injectedRtkApi;
