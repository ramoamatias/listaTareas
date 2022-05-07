import {eliminarTarea} from "./funciones.js";

export const eliminarDefinitivamenteTareaDOM = (e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas) => {
    let identificadorTarea = e.target.getAttribute("data-id"),
        $tareaEliminar = document.getElementById(identificadorTarea);

    $tareaEliminar.remove();    

    eliminarTarea(identificadorTarea,tareas);

    if (cantidadTareasEliminadas === 0) {
        $contadorTareasEliminadas.setAttribute("hidden",true);
        document.querySelector(".cestoBasura").setAttribute("hidden",true);
    }else if(cantidadTareasEliminadas<9) {
        $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
    }
    localStorage.setItem("tareas",JSON.stringify(tareas));  
}

// Esta funcion hace que se elimine definitivamente la tarea del array.

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion ya que obtenemos el id para obtener mi tarea.
// *-> tareas = array en donde se buscara los elementos y se eliminara la tarea y ademas se almacenará el array en el localstorage por su modificacion.
// *-> cantidadTareasEliminadas = indica la cantidad de tareas eliminadas, para poder manipular el contador de tareas eliminadas.
// *-> $contadorTareasEliminadas = es el elemento html donde se pondra la cantidad de tareas eliminadas.



