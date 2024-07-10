const express = require("express")
const fs = require("fs")
const path = require('path')
const router = express.Router()


const productsFilePath = path.join(__dirname, '../../data/products.json')

// Función para leer productos desde el archivo
const readProducts = () => {
    if (!fs.existsSync(productsFilePath)) {
     return []
    }
   const data = fs.readFileSync(productsFilePath, 'utf-8')
   return JSON.parse(data)
 }

//GET --OK
router.get("/products",(req,res) =>{
    res.json(readProducts())
})

//GET --OK
router.get("/products/:pid",(req,res) =>{    
    const pid = parseInt(req.params.pid) 
    const products =  readProducts() 
    const productoEncontrado = products.find( (product) => product.pid === pid )    
    if(productoEncontrado){
        res.json(productoEncontrado)
    }else {
        res.status(404).json({message: "Producto no encontrado"})
    }

})

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

router.put('/products/:pid', (req, res) => {
    const { pid } = req.params
    const updatedFields = req.body
    let products = readProducts()
    const productIndex = products.findIndex(p => p.pid == pid)

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' })
    }
       
    // Solo actualizar los campos proporcionados en el cuerpo de la solicitud
    const updatedProduct = { ...products[productIndex], ...updatedFields }

    products[productIndex] = updatedProduct
    writeProducts(products)

    res.json({ message: 'Producto actualizado', product: updatedProduct })
})
    

router.delete('/products/:pid', (req, res) => {
    const { pid } = req.params
    let products = readProducts()
    const filteredProducts = products.filter(p => p.pid != pid)

    if (filteredProducts.length === products.length) {
        return res.status(404).json({ message: 'Producto no encontrado' })
    }

    writeProducts(filteredProducts)

    res.json({ message: 'Producto eliminado' })

})


module.exports = router