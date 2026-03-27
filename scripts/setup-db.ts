import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_dU2ilS4RnjaX@ep-jolly-unit-a1mcrxa0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: true,
});

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS applicants (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        age VARCHAR(20),
        experience TEXT,
        source VARCHAR(50) DEFAULT 'website',
        status VARCHAR(20) DEFAULT 'pending',
        applied_date DATE DEFAULT CURRENT_DATE,
        interview_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table created successfully');

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status);
      CREATE INDEX IF NOT EXISTS idx_applicants_applied_date ON applicants(applied_date);
    `);
    console.log('✅ Indexes created');

    // Insert sample data
    await client.query(`
      INSERT INTO applicants (full_name, email, phone, age, experience, source, status, interview_date)
      VALUES 
        ('Nguyễn Văn A', 'nguyenvana@email.com', '0912345678', '25-30', '2 năm kinh nghiệm bán hàng Bảo hiểm', 'facebook', 'pending', '2026-03-31'),
        ('Trần Thị B', 'tranthib@email.com', '0987654321', '31-35', '3 năm kinh nghiệm Tài chính Ngân hàng', 'website', 'interviewed', '2026-03-31'),
        ('Lê Hoàng C', 'lehoangc@email.com', '0901122334', '41-45', '5 năm kinh nghiệm Kinh doanh', 'referral', 'approved', '2026-03-24')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted');

    // Verify
    const result = await client.query('SELECT * FROM applicants');
    console.log(`✅ Database has ${result.rows.length} records`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();