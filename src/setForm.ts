import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { v4 as uuidv4 } from 'uuid';
import { container } from './util/cosmosdbClient';

interface RequestBody {
    deviceType: String;
    selectedDeviceType: String;
    selectedDeviceModel: String;
    selectedOS: String;
    selectedIssues: [String];
    describedIssues: String;
    inputEmail: String;
};

export async function setForm(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    context.log(process.env)
    context.log(request.body)
    context.log(request)
    try {
        const requestBody: RequestBody = request.body as unknown as RequestBody;
        
        console.log(requestBody.deviceType)
        const { deviceType, selectedDeviceType, selectedDeviceModel, selectedOS, selectedIssues, describedIssues, inputEmail } = requestBody;

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