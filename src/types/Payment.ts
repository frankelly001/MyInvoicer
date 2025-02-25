type PlanNames = 'free' | 'basic' | 'pro';

interface Plan {
  name: PlanNames;
  periodPerMonth: string;
  periodPerYear: string;
  amountPerMonth: string;
  amountPerYear: string;
  description: string;
  benefits: string[];
  status: string;
  currency: string;
}

interface PaymentPlans {
  currency: string;
  currentPlan: PlanNames;
  currentPlanDescription: string;
  amount: string;
  period: string;
  nextPaymentOn: string | null;
  nextPaymentAmount: string;
  plans: Array<Plan>;
}

interface PaymentPlanCode {
  amountPerMonth: string;
  amountPerYear: string;
  savePercentage: string;
  currency: string;
  periodPerYear: string;
  periodPerMonth: string;
  stripeMonthlyPlanCode: string;
  stripeYearlyPlanCode: string;
  terms: string;
}

type SetupPayment = {
  businessId: string;
  paymentGateway: string;
};

type ProceedToPayResponse = {
  authorization_url: string;
  planName: string;
  reference: string;
};

type DeactivatePaymentSetup = Pick<
  SetupPayment,
  'businessId' | 'paymentGateway'
>;

type ProceedToSubscribe = {
  planCode: string;
  planName: PlanNames;
  gateway: string;
};

export type {
  PlanNames,
  PaymentPlans,
  Plan,
  SetupPayment,
  DeactivatePaymentSetup,
  PaymentPlanCode,
  ProceedToSubscribe,
  ProceedToPayResponse,
};
