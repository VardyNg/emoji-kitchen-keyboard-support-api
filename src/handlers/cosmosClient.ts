import { CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient({
    endpoint: process.env.FORM_COSMOS_ENDPOINT,
    key: process.env.FORM_COSMOS_KEY,
});
const databaseId = process.env.FORM_DATABASE_ID;
const containerId = process.env.FORM_CONTAINER_ID;
const container = cosmosClient.database(databaseId).container(containerId);

export default container;