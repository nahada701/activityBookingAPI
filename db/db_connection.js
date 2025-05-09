const mongoose=require("mongoose")

const connection_string=process.env.connection_string

mongoose.connect(connection_string).then(res=>{
    console.log('MongoDB connectd successfully')
}).catch(err=>{
    console.log(`Error connecting to DB : ${err}`)
})
