import {PlanNames, ProceedToSubscribe} from '../../../types/Payment';

export type UpgradeOrDowngradePlanParams = {
  plan: PlanNames;
};

export type ProceedToSubscribeParams = {
  proceedToSubscribe: ProceedToSubscribe;
};
