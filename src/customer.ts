export type Customer = {
  id: string;
  email: string;
  trialPeriod: number;
  billingPeriod: number;
  maxBillingPeriods: number;
  initialBillingPeriodCharge: number;
};