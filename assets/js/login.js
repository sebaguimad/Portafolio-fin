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

// busca el elemento por id "form-login", luego addEventListener() Registra un evento a un objeto en específico.
document.getElementById("form-login").addEventListener("submit", function(event){
    // Cancela el evento si este es cancelable, sin detener el resto del funcionamiento 
    // del evento, es decir, puede ser llamado de nuevo.
    event.preventDefault();
    // Se define el nombre y el password con getElement que busca el valor asociado a esas id's.
    let nombre = document.getElementById("login-nombre").value;
    let password = document.getElementById("login-password").value;
    // Busca si hace match el usuario.nombre con nombre y el password del usuario predefinido con el password.
    let encontrado = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)

    // Sí lo encuentra, el usuario es autenticado, si no, los datos son incorrectos.
    if(encontrado){
        alert("Usuario autenticado.");
        location.href= "/";
    }else{
        alert("Datos incorrectos.");
    }
})