const express = require("express")
const { pid } = require("process")
const router = express.Router()

const products = []

//GET --OK
router.get("/api/products/",(req,res) =>{
    res.json(products)
})

//GET --OK
router.get("/api/products/:pid",(req,res) =>{    
    const pid = parseInt(req.params.pid)   
    const productoEncontrado = products.find( (product) => product.pid === pid )    
    if(productoEncontrado){
        res.json(productoEncontrado)
    }else {
        res.status(404).json({message: "Producto no encontrado"})
    }

})

//POST OK
router.post("/api/products",(req,res) =>{
    const recivedProduct = req.body
    const newProduct = {
        pid : products.length + 1,
        title : recivedProduct.title,
        description : recivedProduct.title,
        code : recivedProduct.code,
        price : recivedProduct.price,
        status : recivedProduct.status = true,
        stock : recivedProduct.stock,
        categoty : recivedProduct.category,
        thumbnails : recivedProduct.thumbnails
    }
    products.push(newProduct)
    res.json({massage: "Producto agregado"})
})

//PUT --OK
router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updates = req.body;
    // Buscar el producto por pid
    const productIndex = products.findIndex(p => p.pid === pid);
    if (productIndex === -1) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }
    // Filtrar para asegurarse de que el id no se actualice
    const { pid: ignore, ...filteredUpdates } = updates;
    // Actualizar el producto con los datos filtrados
    products[productIndex] = {
        ...products[productIndex],
        ...filteredUpdates
    };

    res.send(products[productIndex]);
});

//DELETE -- OK
router.delete("/api/products/:pid",(req,res) =>{
    const pid = parseInt(req.params.pid);

    // Buscar el índice del producto por pid
    const productIndex = products.findIndex(p => p.pid === pid);
    if (productIndex === -1) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    // Eliminar el producto del array
    const deletedProduct = products.splice(productIndex, 1)[0];

    res.send({ message: 'Producto eliminado', product: deletedProduct });

})


module.exports = router