import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const cosmosDBConnectionString = process.env.CosmosDBConnectionString;
const databaseId = "YourDatabaseId";
const containerId = "YourContainerId";

export async function setForm(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    context.log(process.env)

    try {
        const cosmosClient = new CosmosClient(cosmosDBConnectionString);
        const container = cosmosClient.database(databaseId).container(containerId);

        // Define the item you want to insert into Cosmos DB
        const newItem = {
            id: Date.now().toString(), // You should use a unique ID for your items
            name: name,
            // Add other properties as needed
        };

        const { resource } = await container.items.create(newItem);
        return {
            status: 200,
            body: `Item inserted with ID: ${resource.id}`,
        };
    } catch (error) {
        return {
            status: 500,
            body: `Error inserting item into Cosmos DB: ${error.message}`,
        };
    }
};

app.http('form', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: setForm
});