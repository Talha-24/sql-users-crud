import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function importDatabase() {
    try {
        console.log('Connecting to Railway MySQL...');
        
        const connection = await mysql.createConnection({
            uri: process.env.DATABASE_URL,
            multipleStatements: true
        });

        console.log('✅ Connected to database');
        console.log('Reading SQL file...');

        const sqlContent = fs.readFileSync('ailaan_backup.sql', 'utf8');
        
        console.log('Importing database... This may take a moment...');
        await connection.query(sqlContent);
        
        console.log('✅ Database imported successfully!');
        await connection.end();
    } catch (error) {
        console.error('❌ Import failed:', error.message);
        console.error('Full error:', error);
    }
}

importDatabase();