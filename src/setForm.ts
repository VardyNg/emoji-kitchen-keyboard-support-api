import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { v4 as uuidv4 } from 'uuid';
import { container } from './lib/cosmosdbClient';

export async function setForm(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    context.log(process.env)

    try {
        

        // Define the item you want to insert into Cosmos DB
        const newItem = {
            id: uuidv4(), // You should use a unique ID for your items
            insertTime: new Date().toISOString(),
        };

        console.log(newItem)

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