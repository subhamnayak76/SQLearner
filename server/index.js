import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database(':memory:');

// Initialize sample database
db.exec(`
  CREATE TABLE cities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    population INTEGER
  );

  INSERT INTO cities (name, country, population) VALUES
    ('New York', 'USA', 8400000),
    ('London', 'UK', 8900000),
    ('Tokyo', 'Japan', 37400000),
    ('Paris', 'France', 2100000);
`);

const lessons = [
  {
    id: 1,
    title: "Your First Query - SELECT Everything",
    content: `
      <p>Let's start with the simplest SQL query! To see all data in a table, we use SELECT * (the * means "everything"):</p>
      <pre>SELECT * FROM table_name;</pre>
      <p>Try selecting everything from our cities table!</p>
    `,
    example: "SELECT * FROM cities;",
    solution: "SELECT * FROM cities;",
    difficulty: "beginner",
    expectedOutput: [
      { id: 1, name: "New York", country: "USA", population: 8400000 },
      { id: 2, name: "London", country: "UK", population: 8900000 },
      { id: 3, name: "Tokyo", country: "Japan", population: 37400000 },
      { id: 4, name: "Paris", country: "France", population: 2100000 }
    ]
  },
  {
    id: 2,
    title: "SELECT Specific Columns",
    content: `
      <p>Instead of getting all columns with *, we can choose just the ones we want to see:</p>
      <pre>SELECT name FROM cities;</pre>
      <p>This will show us just the city names. Try getting just the names!</p>
    `,
    example: "SELECT name FROM cities;",
    solution: "SELECT name FROM cities;",
    difficulty: "beginner",
    expectedOutput: [
      { name: "New York" },
      { name: "London" },
      { name: "Tokyo" },
      { name: "Paris" }
    ]
  },
  {
    id: 3,
    title: "SELECT Two Columns",
    content: `
      <p>We can select multiple columns by separating them with commas:</p>
      <pre>SELECT name, country FROM cities;</pre>
      <p>Try getting both the city names and their countries!</p>
    `,
    example: "SELECT name, country FROM cities;",
    solution: "SELECT name, country FROM cities;",
    difficulty: "beginner",
    expectedOutput: [
      { name: "New York", country: "USA" },
      { name: "London", country: "UK" },
      { name: "Tokyo", country: "Japan" },
      { name: "Paris", country: "France" }
    ]
  },
  {
    id: 4,
    title: "Simple WHERE - Finding One City",
    content: `
      <p>We can find specific cities using WHERE:</p>
      <pre>SELECT name, population FROM cities WHERE name = 'Tokyo';</pre>
      <p>Try finding information about Tokyo!</p>
    `,
    example: "SELECT name, population FROM cities WHERE name = 'Tokyo';",
    solution: "SELECT name, population FROM cities WHERE name = 'Tokyo';",
    difficulty: "beginner",
    expectedOutput: [
      { name: "Tokyo", population: 37400000 }
    ]
  },
  {
    id: 5,
    title: "WHERE with Numbers",
    content: `
      <p>We can also find cities based on their population size using > (greater than):</p>
      <pre>SELECT name FROM cities WHERE population > 5000000;</pre>
      <p>This will show cities with more than 5 million people. Try it!</p>
    `,
    example: "SELECT name FROM cities WHERE population > 5000000;",
    solution: "SELECT name FROM cities WHERE population > 5000000;",
    difficulty: "beginner",
    expectedOutput: [
      { name: "New York" },
      { name: "London" },
      { name: "Tokyo" }
    ]
  }
];

const querySchema = z.object({
  query: z.string().min(1),
});

app.post('/api/execute', (req, res) => {
  try {
    const { query } = querySchema.parse(req.body);
    const results = db.prepare(query).all();
    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/lessons', (_, res) => {
  res.json(lessons);
});

app.post('/api/lessons/:id/verify', (req, res) => {
  try {
    const { query } = querySchema.parse(req.body);
    const lesson = lessons.find(l => l.id === parseInt(req.params.id));
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const results = db.prepare(query).all();
    const expectedResults = lesson.expectedOutput;

    const success = JSON.stringify(results) === JSON.stringify(expectedResults);
    res.json({ success, results, expectedResults });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});