import { Question } from '../types';

export default function QuestionList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">No questions found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q.$id} className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-lg leading-relaxed">{q.content}</p>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            {/* The Fix: If anonymous OR no author_id, show 'Anonymous' */}
            <span>
              {q.is_anonymous || !q.author_id ? 'Anonymous' : 'User'}
            </span>
            
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
              {q.vote_count} votes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}