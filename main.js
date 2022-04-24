// Realizare un simulador interactivos de listas de tareas.
const listaTareasIncompletas = [],
      listaTareasCompletas = [],
      listaTareasEliminadas = [];

const listarTareas = (lista) =>{
    let resultado = '';
    if (lista.length === 0) {
        resultado = "Lista Vacia"
    } else {
        lista.forEach((el,index) => {
            resultado +=`${index + 1})  ${el}.\n`
        });
    }
    
    return resultado;
}



const ingresarTarea = (tarea) =>{
    let nuevaTarea = new Tarea(tarea);
    listaTareasIncompletas.push(tarea.trim());
}

const eliminarTarea = (posicion) =>{
    let tareaEliminada = listaTareasIncompletas.splice(posicion,1);
    listaTareasEliminadas.push(tareaEliminada[0]);
    return tareaEliminada;
}

const marcarTareaComoCompletada = (posicion) => {
    let tareaCompleta = listaTareasIncompletas.splice(posicion,1);
    listaTareasCompletas.push(tareaCompleta[0]);
}

const desmarcarTareaCompletada = (posicion) => {
    let tareaCompleta = listaTareasCompletas.splice(posicion,1);
    listaTareasIncompletas.push(tareaCompleta[0]);
}



const modificarTareaIncompleta = (posicion,nuevoValor) => {
    listaTareasIncompletas.splice(posicion,1,nuevoValor);
}

const recuperarTareaEliminada = (posicion) => {
    let tareaRecuperada = listaTareasEliminadas.splice(posicion,1);
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
            mostrarDatos(listarTareas(listaTareasIncompletas));
            break;

        case "2": //Mostrar tareas Completas
            mostrarDatos(listarTareas(listaTareasCompletas));

        break;

        case "3": //Mostrar tareas eliminadas
            mostrarDatos(listarTareas(listaTareasEliminadas));
            break;

        case "4": //Insertar una nueva Tarea a Lista de Tareas Incompletas.
            tarea = prompt("Ingrese su Tarea");
            
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
                        let tareaAEliminar = listaTareasIncompletas[posicionTareaAEliminar - 1];
                
                        let eliminar = confirm(`Desea eliminar la tarea:
                        ${posicionTareaAEliminar})  ${tareaAEliminar}`);
                    
                        if (eliminar) {
                            eliminarTarea(posicionTareaAEliminar - 1);
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
                        let tareaCompleta = listaTareasIncompletas[posicionTareaCompleta - 1];
            
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
                        let tareaADesmarcarCompleta = listaTareasCompletas[posicionDesmarcarTareaCompleta - 1];
            
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
                        let tareaAModificar = listaTareasIncompletas[posicionTareaAModificar - 1];
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
                        let tareaIncompletaRecuperada = listaTareasEliminadas[posicionRecuperarTareaIncompleta - 1];
            
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
