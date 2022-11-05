console.log("hi soy index.js");

//inicio websocket del lado del front
const socketCli = io();

const campoMessage = document.getElementById("messageField");
const campoEmail = document.getElementById("emailField");
const contMensajes = document.getElementById("contMensajes");
const btnEnviar = document.getElementById("btnEnviar");
const campoTitle = document.getElementById("title");
const campoPrice = document.getElementById("price");
const campoThumbnail = document.getElementById("thumbnail");

// crea un nuevo objeto Date
var today = new Date();
var fechaMensaje = today.toLocaleString();

socketCli.on("messageFromServer",(data)=>{
    console.log(data);
})

btnEnviar.addEventListener("click",()=>{
    if(campoTitle.value != "" && campoPrice.value != "" && campoThumbnail.value != ""){
        socketCli.emit("product",
            {
                title:campoTitle.value,
                price:campoPrice.value,
                thumbnail:campoThumbnail.value
            }
        )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tiene que ingresar title, price y thumbnail para ingresar un producto!',
            timer:3000,
            toast:true,
            timerProgressBar:true
          })
    }
})

campoMessage.addEventListener("keydown",(data)=>{
    if(data.key == "Enter"){
        if(campoEmail.value != "" && campoMessage.value != ""){
            var fechaMensaje = today.toLocaleString();
            socketCli.emit("message",
            {
                email:campoEmail.value,
                message:campoMessage.value,
                datetime:fechaMensaje
            }
            )
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tiene que ingresar si o si un email y un mensaje!',
                timer:3000,
                toast:true,
                timerProgressBar:true
              })
        }
    }
})

socketCli.on("chat",(data)=>{
    contMensajes.innerHtml = ""
    let elem = ""
    data.forEach(element => {
        console.log(element);
        elem = `<p id="mensaje"><strong id="email">${element.email}</strong> | <strong id="fecha">${element.fechaMensaje} | </strong> - <span id="m">${element.mensaje}</span></p>` + elem
    });

    contMensajes.innerHTML = elem;
})

socketCli.on("todoProductos",(data)=>{
    const tablaProds = document.getElementById("tablaProds")
    let tabla = ""
    data.forEach(item =>{
        tabla = `<tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td><img class="imagenProd" src=${item.thumbnail}/></td>
                </tr>` + tabla
    })
    tablaProds.innerHTML = `<tr><td>Id</td><td>Title</td><td>Price</td><td>Img</td></tr>`+tabla
})