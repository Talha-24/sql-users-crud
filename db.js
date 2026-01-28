import dotenv from "dotenv";
dotenv.config();
import mySql2 from "mysql2/promise"

const connectDataBase = async () => {
    try {
        const config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: parseInt(process.env.DB_PORT),
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            connectTimeout: 60000, // 60 seconds
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        };

        console.log(`Connecting to database at ${config.host}:${config.port}...`);
        console.log(`Using database: ${config.database}`);
        
        const database = await mySql2.createConnection(config);
        
        console.log("✅ Database is connected successfully");
        return database;
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        console.error("Full error:", error);
        throw error;
    }
}

export default connectDataBase;