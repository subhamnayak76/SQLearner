import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Book, Layout, Database } from 'lucide-react';

interface SQLEditorProps {
  onExecute: (query: string) => void;
  initialValue?: string;
}

export default function SQLEditor({ onExecute, initialValue = '' }: SQLEditorProps) {
  const [query, setQuery] = useState(initialValue);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">SQL Editor</span>
          </div>
          <button
            onClick={() => onExecute(query)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Query
          </button>
        </div>
      </div>
      <Editor
        height="200px"
        defaultLanguage="sql"
        theme="vs-dark"
        value={query}
        onChange={(value) => setQuery(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}