import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import container from './cosmosClient';
const storeForm: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Typescript HTTP trigger function processed a request.');

  const item = {
    id: "unique-item-id",
    name: "John Doe",
    age: 30,
  };

  try {
    const { resource: createdItem } = await container.items.create(item);
    context.res = {
      status: 200,
      body: createdItem,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
  if (req.query.name || (req.body?.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: `Hello ${(req.query.name || req.body.name)}`
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body'
    };
  }
}

module.exports.storeForm = storeForm;