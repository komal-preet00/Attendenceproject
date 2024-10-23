// src/appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('670ce6ca0037ccaf7f2f') // Replace with your Project ID
 
const database = new Databases(client);

export { client, database };
