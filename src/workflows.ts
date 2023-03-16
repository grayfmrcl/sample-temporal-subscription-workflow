import { sleep, proxyActivities, setHandler, defineSignal } from '@temporalio/workflow';
import * as activities from './activities';

const {
  sendWelcomeEmail,
  sendSubscriptionEndedEmail
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute'
});

export const cancelSubscription = defineSignal('cancelSignal');

export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  let isCanceled = false;
  setHandler(cancelSubscription, () => void (isCanceled = true));

  await sendWelcomeEmail(email);
  await sleep(trialPeriod);

  if (isCanceled) {
    await activities.sendTrialCancellationEmail(email);
  } else {
    await sendSubscriptionEndedEmail(email);
  }
}