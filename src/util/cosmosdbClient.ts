import { CosmosClient } from "@azure/cosmos";

const cosmosDBConnectionString = process.env.COSMOSDB_CONNECTION_STRING;
const databaseId = process.env.FORM_DATABASE_ID;
const containerId = process.env.FORM_CONTAINER_ID;

const cosmosClient = new CosmosClient(cosmosDBConnectionString);
const container = cosmosClient.database(databaseId).container(containerId);

export { container };