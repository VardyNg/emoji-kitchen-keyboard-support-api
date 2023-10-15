import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { v4 as uuidv4 } from 'uuid';
import { container } from './util/cosmosdbClient';

export async function setForm(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    context.log(process.env)
    context.log(request.body)
    try {
        const deviceType = request.query.get('deviceType')    
        const selectedDeviceType = request.query.get('selectedDeviceType')
        const selectedDeviceModel = request.query.get('selectedDeviceModel')
        const selectedOS = request.query.get('selectedOS')
        const selectedIssues = request.query.get('selectedIssues')
        const describedIssues = request.query.get('describedIssues')
        const inputEmail = request.query.get('inputEmail')

        // Define the item you want to insert into Cosmos DB
        const newItem = {
            id: uuidv4(), // You should use a unique ID for your items
            insertTime: new Date().toISOString(),
            deviceType: deviceType,
            selectedDeviceType: selectedDeviceType,
            selectedDeviceModel: selectedDeviceModel,
            selectedOS: selectedOS,
            selectedIssues: selectedIssues,
            describedIssues: describedIssues,
            inputEmail: inputEmail
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