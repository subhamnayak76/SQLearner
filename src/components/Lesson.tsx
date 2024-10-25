import { Book } from 'lucide-react';

interface LessonProps {
  title: string;
  content: string;
  example?: string;
  onTryExample?: (query: string) => void;
}

export default function Lesson({ title, content, example, onTryExample }: LessonProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Book className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: content }} />
      {example && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Example Query</h3>
            <button
              onClick={() => onTryExample?.(example)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Try it
            </button>
          </div>
          <pre className="bg-gray-800 text-gray-100 rounded p-3 text-sm overflow-x-auto">
            {example}
          </pre>
        </div>
      )}
    </div>
  );
}