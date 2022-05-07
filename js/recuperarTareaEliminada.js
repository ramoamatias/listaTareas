import {buscarTarea} from "./funciones.js";
import {marcarTareaComoCompletaDOM} from "./completarTarea.js";
import {marcarTareaComoIncompletaDOM} from "./desmarcarTareaCompleta.js";
import {editarTareaIncompletaDOM} from "./editarTareaIncompleta.js";
import {marcarComoEliminadaTareaDOM} from "./marcarComoEliminadaTarea.js";


export const recuperarTareaEliminadaDOM = (e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas,$listaCompleta,$listaIncompleta) => {
    if (e.target.matches("img")){ 
    let identificadorTarea = e.target.getAttribute("data-id"),
    $tareaRecuperar = document.getElementById(identificadorTarea),
    tarea = buscarTarea(identificadorTarea,tareas);
    $tareaRecuperar.remove();
   
    
    if (cantidadTareasEliminadas === 0) {
        $contadorTareasEliminadas.setAttribute("hidden",true);                
        document.querySelector(".cestoBasura").setAttribute("hidden",true);
    }else if(cantidadTareasEliminadas<9) {
        $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
    }
    
    
    
    //HAcemos qyue vuelvan a tener el escuchador ya que son nuevos elementos.
    //marcar como incompleta una tarea.
    $tareaRecuperar.querySelector(".desMarcar").addEventListener("click", (e) => {
        marcarTareaComoIncompletaDOM(e,$listaIncompleta,tareas);
    });
    
    //marcar como completa una tarea
    $tareaRecuperar.querySelector(".completa").addEventListener("click", (e) => {
        marcarTareaComoCompletaDOM(e,$listaCompleta,tareas);
    });
    

    //marcamos como eliminada una tarea
    $tareaRecuperar.querySelector(".eliminar").addEventListener("click", (e) => {
        cantidadTareasEliminadas = parseInt(localStorage.getItem("cantidadTareasEliminadas")) +1 ;
        marcarComoEliminadaTareaDOM(e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas);
        localStorage.setItem("cantidadTareasEliminadas",cantidadTareasEliminadas);  
    });
    

    //Editamos una tarea incompleta
    $tareaRecuperar.querySelector(".editar").addEventListener("click", (e) => {
        editarTareaIncompletaDOM(e,tareas);
    });
    
    
    if (tarea.getEstadoAnterior() === "completa") {
        
            tarea.marcarComoCompleta();
            $tareaRecuperar.querySelector(".completa").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".desMarcar").classList.remove("noMostrar");
            $tareaRecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $tareaRecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".descartar").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".editar").classList.add("noMostrar");
            $tareaRecuperar.classList.remove("tareaEliminada"); 
            $tareaRecuperar.classList.add("tareaCompleta"); 
            $listaCompleta.appendChild($tareaRecuperar);
    
        }else if (tarea.getEstadoAnterior() === "incompleta") {
    
            tarea.marcarComoIncompleta();
            $tareaRecuperar.querySelector(".completa").classList.remove("noMostrar");
            $tareaRecuperar.querySelector(".desMarcar").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $tareaRecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".descartar").classList.add("noMostrar");
            $tareaRecuperar.querySelector(".editar").classList.remove("noMostrar");
            $tareaRecuperar.classList.remove("tareaEliminada"); 
            $tareaRecuperar.classList.add("tareaIncompleta"); 
            $listaIncompleta.appendChild($tareaRecuperar);
            
        }
        localStorage.setItem("tareas",JSON.stringify(tareas));
    }
}

// Esta funcion se encarga de pasar una tarea en estado eliminada denuevo a su estado correspondiente a incompleta o completa
// Esta funcion debe de volver a definir los eventos de los botones ya que se crea cuando se muestra la lista de eliminados.

//Parametros que necesita la funcion:
//
// *-> e = es el evento que activa la acción, mediante el cual obtenemos el identificador de la tarea.
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.
// *-> cantidadTareasEliminadas = es el contador de tareas eliminadas  que nos indicara como mostrar el cartel de cantidad eliminadas.
// *-> $contadorTareasEliminadas = es el elemento Html en el cuando plasmamos el valor del contador de tareas eliminadas.
// *-> $listaCompleta = es el elemento html donde se insertara la tarea dependiendo del estado que tenia la tarea, en ese caso se insertara en la lista de tareas completas si el estado anterior era completa
// *-> $listaIncompletas = es el elemento html donde se insertara la tarea dependiendo del estado que tenia la tarea, en ese caso se insertara en la lista de tareas incompletas si el estado anterior era incompleta
