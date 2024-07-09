const express = require("express")
const router = express.Router()

const carts = []
const products = []

//GET OK
router.get("/api/carts",(req,res) =>{
   res.json(carts)
})

//GET OK
router.get("/api/carts/:cid",(req,res) =>{    
    const cid = parseInt(req.params.cid)      
    const cartEncontrado = carts.find( (cart) => cart.cid === cid )
    console.log(`Carrito encontrado: ${cartEncontrado}`)
    if(cartEncontrado){
        res.json(cartEncontrado)
    }else {
        res.status(404).json({message: "Producto no encontrado"})
    }

})

//POST OK
router.post("/api/carts",(req,res) =>{
    const products = []
    const recivedProduct = req.body
    const newCart = {
        cid : carts.length + 1,
        products : products.push(recivedProduct.products)         
    }
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