import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { SubscriptionWorkflow } from "./workflows";
import { Customer } from './types';

async function run() {
  const connection = await Connection.connect();

  const client = new Client({ connection });

  const customer: Customer = {
    id: 'customer-001',
    email: 'foo@bar.com',
    trialPeriod: '10s',
    billingPeriod: '10s',
    maxBillingPeriods: 3,
    initialBillingPeriodCharge: 50
  }

  const handle = await client.workflow.start(SubscriptionWorkflow, {
    workflowId: 'subscription-workflow-' + nanoid(),
    taskQueue: 'subscription-workflow-v1',
    args: [customer]
  });
  // The workflowId should be persisted in your app
  // if you run long running workflow

  console.log(`Started workflow ${handle.workflowId}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});