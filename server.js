const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path =require('path')
const cors = require('cors')
dotenv.config()



if (process.env.NODE_ENV ==='local') {
    app.use(cors({
        origin: 'http://localhost:3000/',
        credentials: true
    }))
} else {
    app.use(cors({
        
        credentials: true
    }))
}

 if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"./frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./","frontend","dist","index.html"))
    })
 }

const dbConnect = async ()=>{
    try {
        if (process.env.NODE_ENV === 'local') {
            await mongoose.connect(process.env.LOCAL_DB_URI)
            console.log('local database has benn connected')


        } else {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('production database has benn connected')
        }
    } catch (error) {
        console.log('database connection failed')
    }
}
dbConnect()


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is runing on port ${PORT}...`)
})

