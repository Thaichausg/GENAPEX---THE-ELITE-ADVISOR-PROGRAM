import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method === 'GET' && request.url === '/api/health') {
    try {
      await pool.query('SELECT 1');
      return response.status(200).json({ status: 'ok', database: 'connected' });
    } catch {
      return response.status(200).json({ status: 'ok', database: 'disconnected' });
    }
  }

  if (request.method === 'POST' && request.url === '/api/applicants') {
    try {
      const { fullName, email, phone, age, experience, source } = request.body;
      
      const result = await pool.query(
        `INSERT INTO applicants (full_name, email, phone, age, experience, source, status, applied_date, interview_date)
         VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW(), '2026-03-31')
         RETURNING *`,
        [fullName, email, phone, age, experience, source]
      );
      
      return response.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error inserting applicant:', error);
      return response.status(500).json({ success: false, error: 'Database error' });
    }
  }

  if (request.method === 'GET' && request.url === '/api/applicants') {
    try {
      const result = await pool.query('SELECT * FROM applicants ORDER BY applied_date DESC');
      return response.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Error fetching applicants:', error);
      return response.status(500).json({ success: false, error: 'Database error' });
    }
  }

  return response.status(404).json({ error: 'Not found' });
}