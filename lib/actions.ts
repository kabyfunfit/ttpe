'use server'

import { ID } from 'node-appwrite';
import { createAdminClient } from './appwrite';
import { revalidatePath } from 'next/cache';

export async function submitQuestion(formData: FormData, authorId?: string) {
  const rawFormData = {
    content: formData.get('content') as string,
    is_anonymous: formData.get('is_anonymous') === 'on',
    wants_podcast: formData.get('wants_podcast') === 'on',
  };

  try {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_QUESTIONS!,
      ID.unique(),
      {
        content: rawFormData.content,
        is_anonymous: rawFormData.is_anonymous,
        wants_podcast: rawFormData.wants_podcast,
        status: 'pending', // Matches your Enum
        vote_count: 0,
        author_id: authorId || null, // Links to the user if they registered
      }
    );

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Submission Error:', error);
    return { error: 'Failed to submit question.' };
  }
}