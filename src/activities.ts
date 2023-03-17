import { Customer } from './types';

export async function sendWelcomeEmail(customer: Customer) {
  const result = `Welcome email sent to: ${customer.email}`;
  console.log(result)
  return Promise.resolve(result);
}

export async function sendTrialCancellationEmail(customer: Customer) {
  const result = `Trial cancellation email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionCancellationEmail(customer: Customer) {
  const result = `Subscription cancellation email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionEndedEmail(customer: Customer) {
  const result = `Subscription ended email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function chargeCustomer(customer: Customer) {
  const result = `Customer ${customer.id} have been charged $${customer.initialBillingPeriodCharge}`;
  console.log(result);
  return Promise.resolve(result);
}



