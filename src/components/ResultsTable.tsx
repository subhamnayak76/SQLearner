import { Table } from 'lucide-react';

interface ResultsTableProps {
  results: any[];
  error?: string;
}

export default function ResultsTable({ results, error }: ResultsTableProps) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-4 text-center">
        <Table className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Run a query to see results</p>
      </div>
    );
  }

  const columns = Object.keys(results[0]);

  return (
    <div className="overflow-x-auto mt-4 border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}