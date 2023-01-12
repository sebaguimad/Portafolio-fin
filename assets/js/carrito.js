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

let productosCarro = [];

let precioTotalCompra = 0;

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
                <input type="number" min="1" value=${producto.cantidad} class="input__elemento">
                </td>
                <td>${totalProducto}</td>
            </tr>
    `;
    acumuladorFilas += template;
  });

  document.querySelector("#productos-carrito tbody").innerHTML =
    acumuladorFilas;
    document.querySelector("#precio-total").innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`
}

function encontrarProducto(sku){
  let encontrado = productos.find(producto => producto.sku == sku)
  return encontrado;
}

//LÓGICA VACIAR CARRITO
document.getElementById("btn-vaciar").addEventListener("click", function(event){
  event.preventDefault();
  localStorage.setItem("productos", "[]");
  location.reload();
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