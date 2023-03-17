export type Customer = {
  id: string;
  email: string;
  trialPeriod: number | string;
  billingPeriod: number | string;
  maxBillingPeriods: number;
  initialBillingPeriodCharge: number;
};