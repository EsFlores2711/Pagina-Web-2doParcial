document.querySelector('#btnIngresar').addEventListener('click',iniciarSesion);

function iniciarSesion(){
    var sUsuario = '';
    var sContraseña ='';
    var bAcceso = false;

    sUsuario = document.querySelector('#Usuario').value;
    sContraseña = document.querySelector('#Contraseña').value;

    bAcceso = validaCredenciales(sUsuario,sContraseña);

    if(bAcceso == true ){
        ingresar();
    }
}

function ingresar(){
    var rol = sessionStorage.getItem('rolUsuarioActivo');
    switch(rol){
        case '1':
            window.location.href = '../index.html';
            break;
    }
}