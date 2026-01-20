import mysql2 from "mysql2/promise"


const db=await mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "P@ssword321",
    database: "college",
    port: 3306,
})


//Create Table
/*const [insertquery]=await db.execute(`CREATE TABLE USERS(
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(30),
email VARCHAR(50) NOT NULL UNIQUE
);`)
if(insertquery.insertId){
console.log("Table is created successfully")}

*/

// const [allRecords,schema]=await db.execute("SELECT * from USERS");
// console.log("Data ",allRecords);



// // Adding record dynamic value



//// To Insert Single Value

// const data= {username: "Mohamad Rashid",email: "rashid@gmail.com"};
// await db.query(`INSERT INTO USERS (username,email) VALUES (?,?)`,[data.username,data.email]);

//// To Insert Array of Objects

const obj=[
    {username: "Usman",email: "usman@gmail.com"},
    {username: "wahab",email: "wahab@gmail.com"},
    {username: "shahab",email: "shahab@gmail.com"},
]

const filteredData=obj.map((object)=>{
    
return Object.values(object);    
})


// Create

// const res=await db.query(`INSERT INTO USERS (username,email) VALUES ?`,[filteredData])


// console.log("Data ",await db.execute("Select * from USERS"));



// Read (single)

// const [data,schema]=await db.execute(`SELECT * from USERS where username="Mohammad Talha" `,[2]);


// Update ( single )


const [updatedResponse,schema]=await db.execute(`UPDATE USERS 

     SET username='TalhaBhatti', email='Talha@gmail.com' where id=1`);


// const [tableRows]=await db.execute("SELECT * from USERS");
// console.log("Table Rows ",tableRows);


// const [singleRecord]=await db.execute("SELECT * from USERS where id= ?",[3]);
// console.log("signle record ",singleRecord);



// Create




// Read



// Update





// Delete