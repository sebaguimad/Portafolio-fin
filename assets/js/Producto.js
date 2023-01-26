let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];

export default class Producto{
    constructor(sku, nombre = "", descripcion = "Sin descripción", precio = 999999, descuento = 0, cantidad = 0, categoria="Sin descripción",imagen="url"){
        this.sku = sku;
        this.nombre = nombre;
        this.descripcion= descripcion
        this.precio = precio;
        this.descuento = descuento;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.imagen = imagen;
    }

    getProducts(){
        productosStorage = productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage;
    }
    getProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage.find(producto => producto.sku == this.sku);
    }
    deleteProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage = productosStorage.filter(producto => producto.sku != this.sku)
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage;
    }
    updateProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        let producto = productosStorage.find(producto => producto.sku == this.sku)
        producto.nombre= this.nombre;
        producto.descripcion= this.descripcion;
        producto.precio = this.precio;
        descuento = this.descuento;
        producto.cantidad = this.cantidad;
        categoria = this.categoria;
        imagen = this.imagen;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return producto;
    }
    addProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage.push(
            {
                sku: this.sku,
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                descuento: this.descuento, 
                cantidad: this.cantidad,
                categoria: this.categoria,
                imagen: this.imagen,
            }
            )
            localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage
    }
}