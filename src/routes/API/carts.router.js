const express = require("express")
const fs = require("fs")
const path = require('path')
const router = express.Router()

const productsFilePath = path.join(__dirname, '../../data/products.json')
const cartsFilePath = path.join(__dirname, '../../data/carts.json')


// Función para leer carritos desde el archivo
const readCarts = () => {
    if (!fs.existsSync(cartsFilePath)) {
     return []
    }
   const data = fs.readFileSync(cartsFilePath, 'utf-8')
   return JSON.parse(data)
 }

// Función para leer productos desde el archivo
const readProducts = () => {
    if (!fs.existsSync(productsFilePath)) {
     return []
    }
   const data = fs.readFileSync(productsFilePath, 'utf-8')
   return JSON.parse(data)
 }

//GET OK
router.get("/carts",(req,res) =>{
    res.json(readCarts())
})

//GET OK
router.get("/carts/:cid",(req,res) =>{    
    const cid = parseInt(req.params.cid)      
    const carts = readCarts()
    const cartEncontrado = carts.find((c) => c.cid === cid)
    if(cartEncontrado){
        res.json(cartEncontrado)
    }else {
        res.status(404).json({message: "Carrito no encontrado"})
    }

})


/*************************** */

router.post('/products', (req, res) => {    

    const { title, description, code, price, status = true, stock, category, thumbnail } = req.body
    const products = readProducts()
    const pid = products.length + 1
    const newProduct = { pid, title, description, code, price, status, stock, category, thumbnail }

    products.push(newProduct)
    writeProducts(products)

    res.json({ message: 'Producto agregado'})
    })    
    
    const writeProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
}

//POST OK
router.post("/carts",(req,res) =>{
    

    
    carts.push(newCart)
    res.json({massage: "Carrito agregado"})
})

 //La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto
 router.post("/api/carts/:cid/product/:pid",(req,res) =>{
    const recivedProduct = req.body
    const cartEncontrado = carts.find((cart) => cart.cid === cid)
    if(cartEncontrado){
        const prodEncontrado = products.find((product) => product.pid === pid)
        
                
    } else {
        pes.status(404).json({message: "Carrito no encontrado."})        
    }
    
    carts.push(newCart)
    res.json({massage: "Carrito agregado"})
})

//GET /:cid La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/api/carts",(req,res) =>{
    res.json(carts)
 })

module.exports = router