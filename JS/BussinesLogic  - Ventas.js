var salidaList = [];


function addSalidaToSystem(pcliente, pfecha, ptipo, pcodigo, pproducto, pcantidad, pprecio, ptotal){
    var newSalida = {
        client : pcliente,
        date : pfecha,
        type : ptipo,
        id : pcodigo,
        product : pproducto,
        cant : pcantidad,
        price : pprecio,
        total : ptotal
    };
    console.log(newSalida);
    salidaList.push(newSalida);
    localStorageList(salidaList);
}

function getSalidas(){
    var storedlist = localStorage.getItem('localslist');
    if (storedlist == null) {
        salidaList = [];
    }else{
        salidaList = JSON.parse(storedlist);
    }
    return salidaList;
}

function localStorageList(slist){
    localStorage.setItem('localslist', JSON.stringify(slist));

}