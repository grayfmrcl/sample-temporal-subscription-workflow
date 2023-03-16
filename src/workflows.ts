import { sleep,
  proxyActivities,
  setHandler,
  defineSignal,
  condition
} from '@temporalio/workflow';
import * as activities from './activities';

const {
  sendWelcomeEmail,
  sendSubscriptionEndedEmail,
  sendTrialCancellationEmail
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

  if (await condition(() => isCanceled, trialPeriod)) {
    await sendTrialCancellationEmail(email);
  } else {
    await sendSubscriptionEndedEmail(email);
  }
}