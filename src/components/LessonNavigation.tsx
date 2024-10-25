import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function LessonNavigation({ 
  onNext, 
  onPrevious, 
  hasNext, 
  hasPrevious 
}: LessonNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`flex items-center px-4 py-2 rounded ${
          hasPrevious 
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`flex items-center px-4 py-2 rounded ${
          hasNext 
            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
            : 'bg-blue-300 text-white cursor-not-allowed'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}