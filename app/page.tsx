import { getQuestions } from '../lib/questions';
import QuestionList from '../components/QuestionList';
import QuestionForm from '../components/QuestionForm';

export default async function Home() {
  const questions = await getQuestions();

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">The Third Place Experiment</h1>
          <p className="text-gray-400 italic">Questions for the project.</p>
        </header>

        <QuestionForm />

        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">Questions</h2>
          <QuestionList questions={questions} />
        </section>
      </div>
    </main>
  );
}