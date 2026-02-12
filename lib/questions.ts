import { createAdminClient } from './appwrite';
import { Question } from '../types';

export async function getQuestions() {
  try {
    const { databases } = await createAdminClient();
    
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_QUESTIONS!
    );
    
    return response.documents as unknown as Question[];
  } catch (error: any) {
    console.error('Appwrite Server Error:', error.message);
    return [];
  }
}