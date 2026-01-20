import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDataBase from "./db.js";

// Conneting DATABASe
const db=await connectDataBase();
const app = express();
app.use(express.json());

// Allow Front-end (Browser Request)

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  }),
);

app.get("/users/view-all", async (req, res) => {
    
  try {
    const [userRecords, schema] =await db.execute(`SELECT * from USERS`);
    return res
      .status(200)
      .json({
        data: userRecords,
        schema,
        message: "Data is retrieved successfully",
      });
  } catch (error) {
    console.log('error ',error);
    return res.status(500).json({ error, success: false });
  }
});


app.get("/users/view-one/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const [singleRecord,schema]= await db.execute(`Select * from USERS where id=?`,[id]);
        return res.status(200).json({success:true, message: "Data is retrieved successfully",data:singleRecord});
    } catch (error) {

        return res.status(500).json({error,success:false})
        
    }
})


// Create
app.post("/users/create",async(req,res)=>{
 
const {username,email}=req.body;

    try {
        const [response,schema]=await db.execute(`INSERT INTO USERS (username,email) VALUES (?,?)`,[username,email]);
        return res.status(200).json({success:true, message: "Record is created successfully",data: {recordId:response?.insertId}})
    } catch (error) {
        return res.status(500).json({success:false,error:error,});
    }
})


app.put("/users/update/:id",async(req,res)=>{
    const {id}=req.params;
    const {username,email}=req.body;

    console.log("username ",username, " email ",email);
    try {

        const [singleRow,schema]=await db.execute(`UPDATE USERS SET username=?, email=? where id=?`,[username,email,id]);
        
        return res.status(200).json({success:true,data:singleRow,message: "Data is updated successfully"});
    } catch (error) {
        res.status(500).json({success:false, error,});
    }
})


app.delete("/users/delete/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const [deleteQuery]=(await db).execute(`DELETE FROM USERS where id=?`,[id]);
        return res.status({success:200,message:"Data is deleted successfully",data:deleteQuery.insertId});

    } catch (error) {
        return res.status(500).json({success:false,error});
        
    }
})


app.listen(4242,()=>{console.log("Sever is running on port 4242")});