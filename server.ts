import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_dU2ilS4RnjaX@ep-jolly-unit-a1mcrxa0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.json({ status: 'ok', database: 'disconnected' });
  }
});

app.post('/api/applicants', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, age, experience, source } = req.body;
    
    const result = await pool.query(
      `INSERT INTO applicants (full_name, email, phone, age, experience, source, status, applied_date, interview_date)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW(), '2026-03-31')
       RETURNING *`,
      [fullName, email, phone, age, experience, source]
    );
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting applicant:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.get('/api/applicants', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM applicants ORDER BY applied_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;