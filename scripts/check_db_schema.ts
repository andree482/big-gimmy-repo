
import { pool } from "../server/db";

async function checkSchema() {
  try {
    console.log("Connecting to DB...");
    const client = await pool.connect();
    console.log("Connected.");

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log("Tables in public schema:");
    for (const row of res.rows) {
      console.log(`- ${row.table_name}`);
      const cols = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
      `, [row.table_name]);
      console.log(`  Columns: ${cols.rows.map(r => `${r.column_name} (${r.data_type})`).join(", ")}`);
    }

    client.release();
    process.exit(0);
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  }
}

checkSchema();
