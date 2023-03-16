import { Connection, Client } from '@temporalio/client';
import { cancelSubscription } from "./src/workflows";

async function run() {
  const connection = await Connection.connect();

  const client = new Client({ connection });

  // This should be called from db or something...
  const workflowId = 'subscription-workflow--5swYpqujtXRFQi9UsPOM';

  const handle = await client.workflow.getHandle(workflowId);
  await handle.signal(cancelSubscription);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});