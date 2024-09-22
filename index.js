const express = require('express')
const {connectMongoDB} = require('./connection')
const { userRouter } = require('./routes/userRoute')
const {postRouter} = require('./routes/postRoute')
const app = express()

const port = 3000
app.listen(port,()=>{
    console.log(`listening at ${port}`)
})

app.use(express.json())

app.use('/user',userRouter)
app.use('/post',postRouter)

connectMongoDB("mongodb://127.0.0.1:27017/clubnorms")




