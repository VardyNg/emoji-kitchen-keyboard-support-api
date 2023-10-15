import {
  app,
  InvocationContext,
} from "@azure/functions";

export async function notfiyUser(documents: unknown[], context: InvocationContext): Promise<void> {
  console.log('notifyUser called');
  console.log(documents);
  console.log(context);  

};

app.cosmosDB('cosmosDBTrigger', {
  connection: 'e2eTest_cosmosDB',
  databaseName: process.env.FORM_DATABASE_ID,
  containerName: process.env.FORM_CONTAINER_ID,
  connectionStringSetting: process.env.COSMOSDB_CONNECTION_STRING,
  createLeaseCollectionIfNotExists: true,
  handler: notfiyUser,
});