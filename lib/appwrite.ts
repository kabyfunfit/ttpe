import { Client, Account, ID } from 'appwrite'; // Browser SDK
import { Client as AdminClient, Databases as AdminDatabases } from 'node-appwrite'; // Server SDK

// 1. Browser-Side (For the Popup)
// No API Key here. Safe for the browser.
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export { ID };

// 2. Server-Side (For your Actions)
// This is your original code that keeps the data logic on the server.
export async function createAdminClient() {
  const adminClient = new AdminClient()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); // Secret key stays on the server

  return {
    get databases() {
      return new AdminDatabases(adminClient);
    },
  };
}