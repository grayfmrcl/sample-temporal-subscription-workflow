import {
  proxyActivities,
  defineSignal,
  defineQuery,
  sleep,
  setHandler,
  condition,
} from '@temporalio/workflow';
import * as activities from './activities';
import { Customer } from './types';
import { InvalidCustomerError } from './errors';

const {
  sendWelcomeEmail,
  sendTrialCancellationEmail,
  sendSubscriptionCancellationEmail,
  sendSubscriptionEndedEmail,
  chargeCustomer,
  validateCustomer
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: 3,
  }
});

export const cancelSubscription = defineSignal('cancelSignal');

export async function SubscriptionWorkflow(
  customer: Customer
) {
  await sendWelcomeEmail(customer);

  // Use this to observe the deffered execution
  // await sleep(customer.trialPeriod);
  
  // Use this for the non-retryable error scenario
  // await validateCustomer(customer);

  // Use this for the "unreliable" error scenario
  // await chargeCustomer(customer);

  await TrialCycle(customer);
}

async function TrialCycle(customer: Customer) {
  let trialCanceled = false;
  setHandler(cancelSubscription, () => void (trialCanceled = true));
  if (await condition(() => trialCanceled, customer.trialPeriod)) {
    await sendTrialCancellationEmail(customer);
  } else {
    await BillingCycle(customer);
  }
}

async function BillingCycle(customer: Customer) {

  let subscriptionCanceled = false;
  setHandler(cancelSubscription, () => void (subscriptionCanceled = true));

  await chargeCustomer(customer);
  for (let num = 0; num < customer.maxBillingPeriods-1; num++) {
    // Wait 1 billing period to charge customer or if they cancel subscription
    // whichever comes first
    if (await condition(() => subscriptionCanceled, customer.billingPeriod)) {
      // If customer cancelled their subscription send notification email
      await sendSubscriptionCancellationEmail(customer);
      break;
    } else {
      await chargeCustomer(customer);
    }
  }

  if(!subscriptionCanceled) await sendSubscriptionEndedEmail(customer);
}