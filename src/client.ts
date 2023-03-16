import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { SubscriptionWorkflow } from "./workflows";

async function run() {
  const connection = await Connection.connect();

  const client = new Client({ connection });

  const handle = await client.workflow.start(SubscriptionWorkflow, {
    workflowId: 'subscription-workflow-' + nanoid(),
    taskQueue: 'subscription-workflow-v1',
    args: ['foo@bar.com', '30 seconds']
  });

  console.log(`Started workflow ${handle.workflowId}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});