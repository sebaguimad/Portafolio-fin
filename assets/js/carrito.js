// Se define el objeto cupones, para aplicar la lógica de los cupones:
let cupones = [
  {
    nombre: "10%",
    descuento: 10
  },
  {
    nombre: "20%",
    descuento: 20
  }
];

// Se define el array vacío productosCarro, la misma lógica que en index.js
let productosCarro = [];

let precioTotalCompra = 0;

// Se traen los productos con getitem y se transforman de string a objeo con JSON.parse y se actualiza el carro con éstos.
if (localStorage.getItem("productos")) {
  productosCarro = JSON.parse(localStorage.getItem("productos"));
  console.log(productosCarro);
  actualizarCarro(productosCarro);
}

function actualizarCarro(listadoProductos) {

  localStorage.setItem("productos", JSON.stringify(listadoProductos));
  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (accumulator, producto) => accumulator + producto.cantidad,
    valorInicial
  );

  document.querySelector("#cantidad-productos").innerText = sumaProductos;
}

cargarTablaProductos()

// Función que carga la tabla html con los productos en el carro de compras:
function cargarTablaProductos() {
  let acumuladorFilas = "";

  precioTotalCompra = 0;
  productosCarro.forEach((producto, index) => {

    let productoConDetalles = encontrarProducto(producto.sku);
    let precioUnitario = productoConDetalles.precio - productoConDetalles.descuento;
    let totalProducto = producto.cantidad * precioUnitario;
    precioTotalCompra += totalProducto;

    let template = `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${productoConDetalles.sku}</td>
                <td>${productoConDetalles.nombre}</td>
                <td>${productoConDetalles.precio}</td>
                <td>${productoConDetalles.descuento}</td>
                <td>${precioUnitario}</td>
                <td class="table__cantidad">
                <button onclick="plusToCart('${producto.sku}')">+</button>
                ${producto.cantidad}
                <button onclick="removeCart('${producto.sku}')">-</button>
                </td>
                <td>${totalProducto}</td>
            </tr>
    `;
    acumuladorFilas += template;
  });

  document.querySelector("#productos-carrito tbody").innerHTML = acumuladorFilas;
    document.querySelector("#precio-total").innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`
}


// Función que encuentra el sku del producto:
function encontrarProducto(sku){
  let encontrado = productos.find(producto => producto.sku == sku)
  return encontrado;
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


//LÓGICA VACIAR CARRITO
document.getElementById("btn-vaciar").addEventListener("click", function(event){
  event.preventDefault();
  // Se limpia el localStorage
  localStorage.clear()
  window.location.reload();
})


//LÓGICA DESCUENTO POR CUPÓN
document.getElementById("btn-descuento").addEventListener("click", function(event){
  
 let cuponIngresado = document.getElementById("input-cupon").value;

 let cuponEncontrado = cupones.find(cupon => cupon.nombre == cuponIngresado );

 if(cuponEncontrado){
  alert("cupón encontrado.")
  precioTotalCompra = precioTotalCompra - (precioTotalCompra * cuponEncontrado.descuento/100)
  document.querySelector("#precio-total").innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`
 }else{
  alert("El cupón no existe.")
 }
})

// Función removeCart para botón - para quitar elementos y actualizar la carta (en el local storage) y no baje de 0:

function removeCart(sku) {
  // Se define el objProducto como un par clave valor con clave sku y cantidad y valor 1
  let objProducto = {sku,cantidad: 1,};
  // El método find() devuelve el primer elemento de la matriz proporcionada que satisface la 
  // función de prueba proporcionada. Si ningún valor satisface la función de prueba, se devuelve undefined.
  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku);

  // Sí productoEncontrado = True, la cantidad de productoEncontrado será igual a la cantidad producto-1
  // Con un parámetro de entrada dado por Math.max = 0, que no puede ser convertido en uno ni inferior.
  // De lo contrario, El método pop() elimina el último elemento de un array y lo devuelve. 
  // Este método cambia la longitud del array.
  if (productoEncontrado) {
    productoEncontrado.cantidad = Math.max(0, productoEncontrado.cantidad - 1);
  } else {
    productosCarro.pop(objProducto);
  }
  // Actualiza el carro llamando a la función actualizarCarro
  actualizarCarro(productosCarro);
  // Refresca la página.
  window.location.reload();
}

// Función plusToCart para botón + para sumar 1 elementos y actualizar la carta (en el local storage) y no baje de 0:
// tiene la misma lógica que la función anterior pero suma 1 en vez de restar 1.
function plusToCart(sku) {
  let objProducto = {sku,cantidad: 1,};
  
  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku);
  if (productoEncontrado) {
    productoEncontrado.cantidad = Math.max(0, productoEncontrado.cantidad + 1);
  } else {
    productosCarro.pop(objProducto);
  }
  
  actualizarCarro(productosCarro);
  window.location.reload();
}