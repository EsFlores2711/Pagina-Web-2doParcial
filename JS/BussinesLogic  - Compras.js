var entradaList = [];


function addEntradaToSystem(pcliente, pfecha, ptipo, pcodigo, pproducto, pcantidad, pprecio, ptotal){
    var newEntrada = {
        client : pcliente,
        date : pfecha,
        type : ptipo,
        id : pcodigo,
        product : pproducto,
        cant : pcantidad,
        price : pprecio,
        total : ptotal
    };
    console.log(newEntrada);
    entradaList.push(newEntrada);
    localStorageList(entradaList);
}

function getEntradas(){
    var storedlist = localStorage.getItem('localelist');
    if (storedlist == null) {
        entradaList = [];
    }else{
        entradaList = JSON.parse(storedlist);
    }
    return entradaList;
}

function localStorageList(slist){
    localStorage.setItem('localelist', JSON.stringify(slist));
}