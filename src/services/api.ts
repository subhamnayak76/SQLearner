const API_URL = 'http://localhost:3000';

export async function executeQuery(query: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function getLessons(): Promise<any> {
  const response = await fetch(`${API_URL}/api/lessons`);
  if (!response.ok) throw new Error('Failed to fetch lessons');
  return response.json();
}

export async function verifyLessonSolution(lessonId: number, query: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/lessons/${lessonId}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}