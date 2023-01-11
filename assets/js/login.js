let usuarios = [
    {
        nombre: "Pedro",
        password: "123456"
    },
    {
        nombre: "Carlos",
        password: "123456"
    },

]

document.getElementById("form-login").addEventListener("submit", function(event){
    event.preventDefault();
    let nombre = document.getElementById("login-nombre").value;
    let password = document.getElementById("login-password").value;

    let encontrado = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if(encontrado){
        alert("Usuario autenticado.");
        location.href= "/";
    }else{
        alert("Datos incorrectos.");
    }
})