const express = require("express")
const path = require("path")
const productsRouter = require("./routes/API/products.router.js")
const cartsRouter = require("./routes/API/carts.router.js")

const app = express()    
const PORT = 8080


//Middlewares
app.use(express.json()) // para que pueda recibir json
app.use(express.urlencoded({ extended:true })) //permite que se pueda enviar informacion desde una url

app.use("/", productsRouter)
app.use("/", cartsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)})