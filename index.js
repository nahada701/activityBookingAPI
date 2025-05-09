require("dotenv").config()
const cors=require("cors")
const express=require("express")
require('./db/db_connection')
const route=require('./routes/routes.js')
const app=express()
app.use(cors())
app.use(express.json())
app.use(route)
const PORT=3000||process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running successfully at port ${PORT}`)
})

app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">Project running  @ port 3000 and waiting for client request !!! </h1>`)

})
