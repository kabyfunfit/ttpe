export interface Question {
    $id: string;
    $createdAt: string;
    content: string;
    author_id?: string | null;
    is_anonymous: boolean;
    wants_podcast: boolean;
    status: 'pending' | 'answered' | 'rejected';
    vote_count: number;
}

export interface Vote {
    $id: string;
    question_id: string;
    user_id: string;
}

export interface Question {
  $id: string;
  $createdAt: string;
  content: string;
  status: 'pending' | 'answered' | 'rejected';
  wants_podcast: boolean;
  is_anonymous: boolean;
  vote_count: number;
  author_id?: string | null; // Fix: Added null to match Appwrite's requirements
}