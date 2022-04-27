// Realizare un simulador interactivos de listas de tareas.
class Tarea {

    constructor(tarea) {
        this.tarea = tarea;
        this.estado = 'incompleta';
        this.fechaCreacion = new Date();
        this.fechaEliminada = null;
        this.fechaCompletado = null;
    }

    getTarea(){
        return this.tarea;
    }

    setTarea(nuevaTarea){
        this.tarea = nuevaTarea;
    }

    getEstado(){
        return this.estado;
    }

    setEstado(nuevoEstado){
        this.estado = nuevoEstado;
    }

    getFechaCreacion(){
        return this.fechaCreacion;
    }

    getFechaCompletado(){
        return this.fechaCompletado;
    }

    setFechaCompletado(nuevaFecha){
         this.fechaCompletado = nuevaFecha;
    }

    getFechaEliminada(){
        return this.fechaEliminada;
    }

    setFechaEliminada(nuevaFecha){
        this.fechaEliminada = nuevaFecha;
    }
}

const fechaCadena = (fecha) => {
    let dia = fecha.getDate(),    
        anio = fecha.getFullYear(),
        mes = fecha.getMonth(),
        hora = fecha.getHours().toString(),
        minutos = fecha.getMinutes().toString(),
        segundos = fecha.getSeconds().toString();

    switch (mes) {
        case 0:
            mes = 'Enero';
            break;
    
        case 1:
            mes = 'Febrero';
            break;   
       
       
        case 2:
            mes = 'Marzo';
            break;   
    
        
        case 3:
            mes = 'Abril';
            break;   
        
        
        case 4:
            mes = 'Mayo';
            break;   


        case 5:
            mes = 'Junio';
            break;

        case 6:
            mes = 'Julio';
            break;
                  
        case 7:
            mes = 'Agosto';
            break;
        
        case 8:
            mes = 'Septiembre';
            break;
            
        case 9:
            mes = 'Octubre';
            break;

        case 10:
            mes = 'Noviembre';
            break;  

        case 11:
            mes = 'Diciembre';
            break;
    }

    if (minutos.length === 1) {
        minutos = `0${minutos}`
    }

    if (hora.length === 1) {
        hora = `0${hora}`
    }

    if (segundos.length === 1) {
        segundos = `0${segundos}`
    }

    return `${dia} ${mes} ${anio}, ${hora}:${minutos}:${segundos}`
}


const listaTareasIncompletas = [],
      listaTareasCompletas = [],
      listaTareasEliminadas = [];

const listarTareas = (lista,estado) =>{
    let resultado = '';
    if (lista.length === 0) {
        resultado = "Lista Vacia"
    } else {
        if (estado === 'incompleta') { 
            lista.forEach((el,index) => {
                resultado +=`${index + 1})  ${el.getTarea()}.    [Fecha: ${fechaCadena(el.getFechaCreacion())}]\n`
            });
        } else if (estado === 'completa') {
            lista.forEach((el,index) => {
                resultado +=`${index + 1})  ${el.getTarea()}.    [Fecha: ${fechaCadena(el.getFechaCompletado())}]\n`
            });
        } else if (estado === 'eliminada') {
            lista.forEach((el,index) => {
                resultado +=`${index + 1})  ${el.getTarea()}.    [Fecha: ${fechaCadena(el.getFechaEliminada())}]\n`
            });
        } else {
            lista.forEach((el,index) => {
                resultado +=`${index + 1})  ${el.getTarea()}.\n`
            });
        }
        
    }

    return resultado;
}

const ingresarTarea = (tarea) =>{
    let nuevaTarea = new Tarea(tarea.trim());
    listaTareasIncompletas.push(nuevaTarea);
}

const eliminarTarea = (posicion) =>{
    let tareaEliminada = listaTareasIncompletas.splice(posicion,1);
    tareaEliminada[0].setEstado('eliminada');
    tareaEliminada[0].setFechaEliminada(new Date());
    listaTareasEliminadas.push(tareaEliminada[0]);
}

const marcarTareaComoCompletada = (posicion) => {
    let tareaCompleta = listaTareasIncompletas.splice(posicion,1);
    tareaCompleta[0].setEstado('completada');
    tareaCompleta[0].setFechaCompletado(new Date());
    listaTareasCompletas.push(tareaCompleta[0]);
}

const desmarcarTareaCompletada = (posicion) => {
    let tareaCompleta = listaTareasCompletas.splice(posicion,1);
    tareaCompleta[0].setEstado("incompleta");
    tareaCompleta[0].setFechaCompletado(null);
    listaTareasIncompletas.push(tareaCompleta[0]);
}



const modificarTareaIncompleta = (posicion,nuevoValor) => {
    let tareaModificar = listaTareasIncompletas[posicion].setTarea(nuevoValor);
}

const recuperarTareaEliminada = (posicion) => {
    let tareaRecuperada = listaTareasEliminadas.splice(posicion,1);
    tareaRecuperada[0].setEstado('incompleta');
    tareaRecuperada[0].setFechaEliminada(null);
    listaTareasIncompletas.push(tareaRecuperada[0]);
}

const validarLongitud = (posicion,lista) => {
    return ((posicion - 1) >= 0 ) && ((posicion -1) < lista.length)
}

const mostrarDatos = (datos) => {alert(datos)} ;

const menu = `1. Mostrar Lista de Tareas.
2. Ver tareas completadas.
3. Ver tareas eliminadas.
4. Insertar una tarea.
5. Eliminar una tarea.
6. Marcar tarea como completa.
7. Desmarcar tarea como completa.
8. Modificar una tarea.
9. Recuperar tarea eliminada.
0. Para Salir.`;

const mensajeError = "El numero es menor a 0 o mayor que la cantidad de elementos de la lista o una letra"; 

//Menu Principal
let opcion= prompt(menu);

let errorDatos = false;

while (opcion != 0 && opcion !=null) {


    switch (opcion) {
        case "1": //Listar Tareas Incompletas
            mostrarDatos(listarTareas(listaTareasIncompletas,"incompleta"));
            break;

        case "2": //Mostrar tareas Completas
            mostrarDatos(listarTareas(listaTareasCompletas,'completa'));

        break;

        case "3": //Mostrar tareas eliminadas
            mostrarDatos(listarTareas(listaTareasEliminadas,'eliminada'));
            break;

        case "4": //Insertar una nueva Tarea a Lista de Tareas Incompletas.
            let tarea = prompt("Ingrese su Tarea");
            console.log()
            if (tarea != null) {
                tarea.trim() != ''
                    ? ingresarTarea(tarea)
                    : alert("Debe de Ingresar almenos un caracter.");
            }

            break;
    
        case "5": //Eliminar una tarea
            
            if (listaTareasIncompletas.length === 0) {
                alert("Lista sin Tareas, no se puede eliminar ninguna tarea.");
            } else {           
                let posicionTareaAEliminar = prompt(`Seleccione Tarea a eliminar : \n${listarTareas(listaTareasIncompletas)}`);
               
                if (posicionTareaAEliminar != null) {

                    if (validarLongitud(posicionTareaAEliminar,listaTareasIncompletas)) {
                        let tareaAEliminar = listaTareasIncompletas[posicionTareaAEliminar - 1].getTarea();
                        let eliminar = confirm(`Desea eliminar la tarea:
                        ${posicionTareaAEliminar})  ${tareaAEliminar}`);
                        
                        if (eliminar) {
                            eliminarTarea(posicionTareaAEliminar - 1);
                            console.log(listaTareasIncompletas[posicionTareaAEliminar - 1]);
                        }

                    } else {
                    alert(mensajeError); 
                    }
                }
            }

            break;

        case "6": //Marcar una tarea como completa
            
            if (listaTareasIncompletas.length === 0) {
                alert("Lista sin Tareas, no se puede marcar ninguna tarea como Completa.");
            } else {
                let posicionTareaCompleta =  prompt(`Seleccione Tarea Completa : \n${listarTareas(listaTareasIncompletas)}`);
                
                if (posicionTareaCompleta != null) {

                    if (validarLongitud(posicionTareaCompleta,listaTareasIncompletas)) {
                        let tareaCompleta = listaTareasIncompletas[posicionTareaCompleta - 1].getTarea();
            
                        let completa = confirm(`Desea marcar como completa la tarea:
                               ${posicionTareaCompleta})  ${tareaCompleta}`);
                     
                        if (completa) {
                            marcarTareaComoCompletada(posicionTareaCompleta - 1);
                        }
                    } else {
                        alert(mensajeError); 
                    }
                }
            }
   
            break;
            
        case "7": //Desmarcar una tarea como Completa.
            if (listaTareasCompletas.length === 0) {
                alert("Lista sin Tareas, no se puede desmarcar ninguna tarea Completa.");
            } else { 
                let posicionDesmarcarTareaCompleta =  prompt(`Seleccione Tarea a desmarcar como completa : \n${listarTareas(listaTareasCompletas)}`);
                
                if (posicionDesmarcarTareaCompleta != null) {
                    if (validarLongitud(posicionDesmarcarTareaCompleta,listaTareasCompletas)) {
                        let tareaADesmarcarCompleta = listaTareasCompletas[posicionDesmarcarTareaCompleta - 1].getTarea();
            
                        let desmarcar = confirm(`Desea desmarcar como completa la tarea:
                            ${posicionDesmarcarTareaCompleta})  ${tareaADesmarcarCompleta}`);
                    
                        if (desmarcar) {
                            desmarcarTareaCompletada(posicionDesmarcarTareaCompleta - 1);
                        }
                    } else {
                        alert(mensajeError); 
                    }
                }
            }


            break;

        case "8": //moificar tarea incompleta
            if (listaTareasIncompletas.length === 0) {
                alert("Lista sin Tareas, no se puede modificar ninguna tarea.");
            } else {
                let posicionTareaAModificar =  prompt(`Seleccione Tarea a Modificar: \n${listarTareas(listaTareasIncompletas)}`);
                
                if (posicionTareaAModificar != null) {

                    if (validarLongitud(posicionTareaAModificar,listaTareasIncompletas)) {
                        let tareaAModificar = listaTareasIncompletas[posicionTareaAModificar - 1].getTarea();
                        let nuevoValor = prompt(`Ingrese el nuevo Texto para la tarea:`);
                        if (nuevoValor != null) {8
                            let modificar = confirm(`Desea modificar la tarea:
                                    ${posicionTareaAModificar})  ${tareaAModificar} por "${nuevoValor}"`);
                            
                            if (modificar) {
                                modificarTareaIncompleta(posicionTareaAModificar - 1,nuevoValor);
                            }
                        }
                    } else {
                        alert(mensajeError); 
                    }
                }
            } 
            break;
    
        case "9": //Recuperar Tarea eliminada
            
            if (listaTareasEliminadas.length === 0) {
                alert("Lista sin Tareas, no se puede recupera ninguna tarea eliminada.");
            } else {

                let posicionRecuperarTareaIncompleta =  prompt(`Seleccione Tarea a desmarcar como completa : \n${listarTareas(listaTareasEliminadas)}`);
                
                if (posicionRecuperarTareaIncompleta != null) {

                    if (validarLongitud(posicionRecuperarTareaIncompleta,listaTareasEliminadas)) {
                        let tareaIncompletaRecuperada = listaTareasEliminadas[posicionRecuperarTareaIncompleta - 1].getTarea();
            
                        let recuperar = confirm(`Desea recuperar la tarea :
                            ${posicionRecuperarTareaIncompleta})  ${tareaIncompletaRecuperada}`);
                    
                        if (recuperar) {
                            recuperarTareaEliminada(posicionRecuperarTareaIncompleta - 1);
                        }
                    } else {
                        alert(mensajeError);
                    }   
                }
            }

            break;

        default:
            errorDatos = true;
            break;
    }

    if (errorDatos) {
        opcion= prompt(`OPCION ${opcion} INCORRECTA, SELECCIONE LA CORRECTA

${menu}`);

        errorDatos = false;
    } else {
        opcion= prompt(menu);
    }

}

/*
    Ejercicio para Interactuar con el DOM
    Tengo las listas creadas en el html sin elementos. La idea seria poder a medida que ingresa las tareas ir listandolas en el html
    pero el problema es que el prompt no me permite listarlos hasta que se cancela.
    Entonces como solución se me ocurrio que se pueda manipular mediante el prompt ingresar, eliminar y marcar como completa las tareas
    pero solamente mostrar el resultado de las listas cuando se cierre el prompt.

*/
const $listaIncompleta = document.getElementById("tareasIncompletas"),
        $listaCompleta = document.getElementById("tareasCompletas"),
        $listaEliminadas = document.getElementById("tareasEliminadas");

const mostrarListaDOM = (lista,$elementHtml,tipolista) => {
    lista.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.tarea}[${fechaCadena(el.fechaCreacion)}]`;

        (tipolista === 'incompleta')  
            ?$li.innerHTML = `${el.tarea}.....Fecha Creada -[${fechaCadena(el.fechaCreacion)}]`
            :(tipolista === 'completa')
                ?$li.innerHTML = `${el.tarea}.....Fecha Completada -[${fechaCadena(el.fechaCompletado)}]`
                :(tipolista === 'eliminada')
                    ?$li.innerHTML = `${el.tarea}.....Fecha Eliminada -[${fechaCadena(el.fechaEliminada)}]`
                    :$li.innerHTML = `${el.tarea}`;

        $elementHtml.appendChild($li);
    });
};

mostrarListaDOM(listaTareasIncompletas,$listaIncompleta,"incompleta");
mostrarListaDOM(listaTareasCompletas,$listaCompleta,"completa");
mostrarListaDOM(listaTareasEliminadas,$listaEliminadas,"eliminada");






