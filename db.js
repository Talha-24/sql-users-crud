import mySql2 from "mysql2/promise"
const connectDataBase=async()=>{
    
    try {
    
        const database=await mySql2.createConnection({
            host: "127.0.0.1",
            user: "root",
            port: 3306,
            database: "college",
            password: "P@ssword321",
        })
        console.log("Database is connected successfully");
        return database;
    } catch (error) {
        console.log("Database is not connected");
    }
}

export default connectDataBase;