import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { cancelSubscription } from "./workflows";

async function run() {
  const connection = await Connection.connect();

  const client = new Client({ connection });

  // This should be called from db or something...
  const workflowId = 'subscription-workflow-g3cmBQMBtDlrf249mIQ1R';

  const handle = await client.workflow.getHandle(workflowId);
  await handle.signal(cancelSubscription);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});