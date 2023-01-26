import productos from "./productos.js"
import Producto from "./Producto.js";

function cargarTabla(listaProductos){
    let cuerpoTabla = document.querySelector(".section_mantenedor_productos tbody");
    cuerpoTabla.innerHTML = "";

    let acumuladorFilas = "";
    listaProductos.forEach(producto => {
        acumuladorFilas += `
                <tr>
                    <th scope="row">${producto.sku}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.descuento}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.imagen}</td>
                </tr>
        `
    });
    cuerpoTabla.innerHTML = acumuladorFilas;

}

function buscarProducto(sku){
    let producto = new Producto(sku);
    return producto.getProduct();
}

crud_form.addEventListener("submit", (event)=>{
    event.preventDefault();
})


//funcion que capture evento del input crud_sku

let inputSku = document.getElementById("crud_sku");
inputSku.addEventListener("change", (event) =>{
    event.preventDefault();
    let sku =  inputSku.value;
    let producto = buscarProducto(sku);
    if(producto){
        crud_nombre.value = producto.nombre;
        crud_descripcion.value = producto.descripcion;
        crud_precio.value = producto.precio;
        crud_descuento.value = producto.descuento;
        crud_cantidad.value = producto.cantidad;
        crud_categoria.value = producto.categoria;
        crud_imagen.value = producto.imagen;
    }else{
        crud_nombre.value = "";
        crud_descripcion.value = "";
        crud_precio.value = 0;
        crud_descuento.value = 0;
        crud_cantidad.value = 0;
        crud_categoria.value = "";
        crud_imagen.value = "";
    }
})

//AGREGAR PRODUCTOS
document.getElementById("btn-agregar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_sku.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let descuento = crud_descuento.value;
    let cantidad = crud_cantidad.value;
    let categoria = crud_categoria.value;
    let imagen = crud_imagen.value;
    
    let nuevoProducto = new Producto(sku, nombre, descripcion, precio,descuento, cantidad,categoria,imagen);
    if(nuevoProducto.getProduct()){
        alert("Ya existe un producto con dicho Sku.")
    }else{
        nuevoProducto.addProduct();
        cargarTabla(nuevoProducto.getProducts());
    } 
})

//ELIMINAR PRODUCTOS
document.getElementById("btn-eliminar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_sku.value;
    
    let producto = new Producto(sku);
    if(producto.getProduct()){
        let respuesta = confirm("Está seguro que quiere eliminar el producto con Sku: " + producto.sku);
        if(respuesta){
            producto.deleteProduct();
        cargarTabla(producto.getProducts());
        }
        
    }else{
        alert("El producto que intenta eliminar no existe en la BD.")
    }
    
})

//MODIFICAR PRODUCTOS
document.getElementById("btn-modificar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_sku.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let descuento = crud_descuento.value;
    let cantidad = crud_cantidad.value;
    let categoria = crud_categoria.value;
    let imagen = crud_imagen.value;
    
    let producto= new Producto(sku, nombre, descripcion, precio,descuento,cantidad,categoria,imagen);
    if(producto.getProduct()){
        producto.updateProduct();
        cargarTabla(producto.getProducts());
    }else{
        alert("El producto que intenta actualizar no existe en la BD.")
    } 
})

function main(){
    let productosStorage = JSON.parse(localStorage.getItem("productos"));
    if(!productosStorage){
        productosStorage = productos;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
    }

    cargarTabla(productosStorage);

}

main();