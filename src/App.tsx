// import React, { useState } from 'react';
// import { Layout, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
// import SQLEditor from './components/SQLEditor';
// import ResultsTable from './components/ResultsTable';
// import Lesson from './components/Lesson';
// import LessonNavigation from './components/LessonNavigation';
// import { useLessons } from './hooks/useLessons';
// import * as api from './services/api';

// function App() {
//   const { 
//     currentLesson, 
//     loading, 
//     error: lessonError, 
//     nextLesson, 
//     previousLesson,
//     lessons 
//   } = useLessons();
  
//   const [results, setResults] = useState<any[]>([]);
//   const [error, setError] = useState<string>();
//   const [currentQuery, setCurrentQuery] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleExecuteQuery = async (query: string) => {
//     try {
//       setError(undefined);
//       const data = await api.executeQuery(query);
//       setResults(data);

//       if (currentLesson) {
//         const verification = await api.verifyLessonSolution(currentLesson.id, query);
//         setSuccess(verification.success);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   if (lessonError) {
//     return <div className="text-red-500">Error: {lessonError}</div>;
//   }

//   const currentIndex = currentLesson ? lessons.findIndex(l => l.id === currentLesson.id) : -1;
//   const hasNext = currentIndex < lessons.length - 1;
//   const hasPrevious = currentIndex > 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <Layout className="w-8 h-8 text-blue-500" />
//               <span className="ml-2 text-xl font-bold text-gray-900">SQLearner</span>
//             </div>
//             <nav className="flex space-x-4">
//               <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
//                 <BookOpen className="w-5 h-5" />
//               </button>
//               <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
//                 <GraduationCap className="w-5 h-5" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             {currentLesson && (
//               <>
//                 <Lesson
//                   title={currentLesson.title}
//                   content={currentLesson.content}
//                   example={currentLesson.example}
//                   onTryExample={setCurrentQuery}
//                 />
//                 <LessonNavigation
//                   onNext={nextLesson}
//                   onPrevious={previousLesson}
//                   hasNext={hasNext}
//                   hasPrevious={hasPrevious}
//                 />
//               </>
//             )}
//           </div>
          
//           <div className="space-y-6">
//             <SQLEditor
//               onExecute={handleExecuteQuery}
//               initialValue={currentQuery}
//             />
//             <div className="relative">
//               <ResultsTable results={results} error={error} />
//               {success && (
//                 <div className="absolute top-0 right-0 m-4">
//                   <CheckCircle className="w-6 h-6 text-green-500" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { Layout, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import SQLEditor from './components/SQLEditor';
import ResultsTable from './components/ResultsTable';
import Lesson from './components/Lesson';
import LessonNavigation from './components/LessonNavigation';
import { useLessons } from './hooks/useLessons';
import * as api from './services/api';

export default function App() {
  const { 
    currentLesson, 
    loading, 
    error: lessonError, 
    nextLesson, 
    previousLesson,
    lessons 
  } = useLessons();
  
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>();
  const [currentQuery, setCurrentQuery] = useState('');
  const [success, setSuccess] = useState(false);

  const handleExecuteQuery = async (query: string) => {
    try {
      setError(undefined);
      const data = await api.executeQuery(query);
      setResults(data);

      if (currentLesson) {
        const verification = await api.verifyLessonSolution(currentLesson.id, query);
        setSuccess(verification.success);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (lessonError) {
    return <div className="text-red-500">Error: {lessonError}</div>;
  }

  const currentIndex = currentLesson ? lessons.findIndex(l => l.id === currentLesson.id) : -1;
  const hasNext = currentIndex < lessons.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Layout className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">SQLearner</span>
            </div>
            <nav className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <BookOpen className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <GraduationCap className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Lesson Content */}
          <div>
            {currentLesson && (
              <>
                <Lesson
                  title={currentLesson.title}
                  content={currentLesson.content}
                  example={currentLesson.example}
                  onTryExample={setCurrentQuery}
                />
                <LessonNavigation
                  onNext={nextLesson}
                  onPrevious={previousLesson}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                />
              </>
            )}
          </div>
          
          {/* Right Column: Results and Editor */}
          <div className="space-y-6">
            {/* Results Table with Success Indicator */}
            <div className="bg-white rounded-lg shadow relative">
              <ResultsTable results={results} error={error} />
              {success && (
                <div className="absolute top-0 right-0 m-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}
            </div>
            
            {/* SQL Editor */}
            <div className="bg-white rounded-lg shadow">
              <SQLEditor
                onExecute={handleExecuteQuery}
                initialValue={currentQuery}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}