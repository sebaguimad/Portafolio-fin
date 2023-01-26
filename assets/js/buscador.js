import productos from './productos.js';

const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');


let productosCarro = [];

// Se genera una lógica que trae los productos cuyo nombre se le pasa por parámetro "productos"
if (localStorage.getItem("productos")) {
    // Se transforma de string a array con JSON.parse
    productosCarro = JSON.parse(localStorage.getItem("productos"));
    // Se muestran los productos por consola.
    console.log(productosCarro);
    // se llama a la función actualizarCarro para actualizar el localstorage
    actualizarCarro(productosCarro);
  }

// Función que añade productos a la carta
function addToCart(sku) {
    // Se define el objProducto con sus claves sku y cantidad
    let objProducto = {sku,cantidad: 1,};
    // Se define el producto encontrado cuando encuentra el sku del producto.
    let productoEncontrado = productosCarro.find(
      (producto) => producto.sku == sku);
  
    // a la cantidad del producto encontrado se le suma 1 y puja el elemento objProducto a productosCarro:
    if (productoEncontrado) {
      productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
    } else {
      productosCarro.push(objProducto);
    }
    
    // Actualiza el carro de compras
    actualizarCarro(productosCarro);
    // Alerta al agregar producto  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado correctamente.',
      showConfirmButton: false,
      timer: 600
    })
}


const filtrar =()=>{
    console.log(formulario.value)
    // String vacío:
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase();
    for(let producto of productos){
        let sku = producto.sku.toLowerCase();
        let nombre = producto.nombre.toLowerCase();
        // Condición para buscar por nombre:
        if(nombre.indexOf(texto) !== -1){
                resultado.innerHTML += `
                  <div class="col-12 col-md-6 col-lg-4">
                      <div>
                          <img src="${producto.imagen}" class="card-img-top" width="258px" height="258px" alt="${producto.nombre}">
                          <div class="card-body">
                          <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">${producto.descripcion}</p>
                          <p class="card-text">Precio Normal: $ ${producto.precio}</p>
                          <p class="card-text text-danger">Descuento: -  $ ${producto.descuento}</p>
                          <p class="card-text text-success">Precio final: $ ${producto.precio - producto.descuento}</p>
                          <p class="card-text text-success">Stock disponible: ${producto.cantidad}</p>
                          <a class="btn btn-primary" data-sku="${producto.sku}" onclick="addToCart('${producto.sku}')">Comprar</a>
                      </div>
                  </div>
                `;
        }
        // Condición para buscar por sku:
        else if(sku.indexOf(texto) !== -1){
          resultado.innerHTML += `
          <div class="col-12 col-md-6 col-lg-4">
              <div>
                  <img src="${producto.imagen}" class="card-img-top" width="258px" height="258px" alt="${producto.nombre}">
                  <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text">Precio Normal: $ ${producto.precio}</p>
                  <p class="card-text text-danger">Descuento: -  $ ${producto.descuento}</p>
                  <p class="card-text text-success">Precio final: $ ${producto.precio - producto.descuento}</p>
                  <p class="card-text text-success">Stock disponible: ${producto.cantidad}</p>
                  <a class="btn btn-primary" data-sku="${producto.sku}" onclick="addToCart('${producto.sku}')">Comprar</a>
              </div>
          </div>
        `;
        }
    }
    // Sí el string sigue vacío, imprime Producto no encontrado.
    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        <li>Producto no encontrado</li>
        `
    }
}


boton.addEventListener('click', filtrar)

//FUNCION ENCARGADA DE CARGAR PRODUCTOS modificando para que use resultados filtrados:
function cargarProductos(listadoProductos) {
    // Se define el acumulador de string vacío ""
    let acumulador = "";
    // para cada elemento del listadoProductos (.forEach())
    listadoProductos.forEach((producto) => {
      // Se define el template que recibe el por cada elemento de producto que recorre el array de los productos.js
      let template = `
              <div class="col-12 col-md-6 col-lg-4">
                  <div class="card m-auto my-3" style="width: 18rem;">
                      <img src="${producto.imagen}" class="card-img-top" width="258px" height="258px" alt="${producto.nombre}">
                      <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.descripcion}</p>
                      <p class="card-text">Precio Normal: $ ${producto.precio}</p>
                      <p class="card-text text-danger">Descuento: -  $ ${producto.descuento}</p>
                      <p class="card-text text-success">Precio final: $ ${producto.precio - producto.descuento}</p>
                      <a class="btn btn-primary" data-sku="${producto.sku}" onclick="addToCart('${producto.sku}')">Comprar</a>
                    </div>
                </div>
            </div>
        `;
    // Se define el acumulador que recibe cada iteración en el template del array recorrido.
    acumulador += template;
  });
    // querySelector selecciona el primer ítem que encuentre con la id productos, 
    // y la clase .row y rendizar el acumulador con los templates con innerHTML
    document.querySelector("#productos .row").innerHTML = acumulador;
}


function actualizarCarro(listadoProductos) {
    // Actualiza el local storage con .setItem con el listadoProductos.
    localStorage.setItem("productos", JSON.stringify(listadoProductos));
    
    const valorInicial = 0;
  
    // Con reduce se reduce el array a un valor el que se suma al acumulador con un valor inicial de 0
    const sumaProductos = listadoProductos.reduce(
      (accumulator, producto) => accumulator + producto.cantidad,valorInicial
    );
    // Y con querySelector e innerText se renderiza la cantidad productos.
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
}


