/* BARRA DE NAVEGACIÓN */

addEventListener('DOMContentLoaded', () => {
  const btn_menu = document.querySelector('.btn_menu')
  if(btn_menu){
      btn_menu.addEventListener('click', () => {
          const menu_items = document.querySelector('.menu_items')
          menu_items.classList.toggle('showMenu')
      })
  }
})

/* Boton de regresar al principio - GOTOP */

window.onscroll=function(){
  if(document.documentElement.scrollTop > 100){
      document.querySelector('.go-top-container')
      .classList.add('showGoTop');
  }
  else{
      document.querySelector('.go-top-container')
      .classList.remove('showGoTop');
  }
}

document.querySelector('.go-top-container').addEventListener('click', () =>{
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
});

/* CONECTATO */

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        Swal.fire(
			'EXCELENTE',
			'Pronto me estare contactando contigo.',
			'success'
		  )
        form.reset()
      }).catch(error => {
        status.innerHTML = "Lo siento, hay un erro al enviar tus datos"
      });
    }
    form.addEventListener("submit", handleSubmit)

/* Carrito de Compras */
const carrito = document.getElementById("carrito");
const platillos = document.getElementById("lista-platillos");
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  platillos.addEventListener("click", comprarPlatillo);
  carrito.addEventListener("click", eliminarPlatillo);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(platillo);
    }
}

function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContent,
        precio: platillo.querySelector('.precio span').textContent,
        id: platillo.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoPlatillo);
}

function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100> 
       </td> 
       <td>${platillo.titulo}</td>
       <td>${platillo.precio}</td>
       <td>
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPlatillo(e) {
    e.preventDefault();

    let platillo,
        platilloId;
    
    if(e.target.classList.contains('borrar-platillo')) {
        e.target.parentElement.parentElement.remove();
        platillo = e.target.parentElement.parentElement;
        platilloId = platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}

function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatillosLocalStorage() {
    let platillosLS;

    if(localStorage.getItem('platillos') === null) {
        platillosLS = [];
    }else {
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}

function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
        listaPlatillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(platillo) {
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platilloLS, index){
        if(platilloLS.id === platillo) {
            platillosLS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}