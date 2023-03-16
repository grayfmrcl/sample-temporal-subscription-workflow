import { sleep, proxyActivities } from '@temporalio/workflow';
import * as activities from './activities';

const {
  sendWelcomeEmail,
  sendSubscriptionEndedEmail
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute'
});

export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  await sendWelcomeEmail(email);
  await sleep(trialPeriod);
  await sendSubscriptionEndedEmail(email);
}