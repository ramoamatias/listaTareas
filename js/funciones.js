
export const buscarTarea = (id, arrayTareas) => {
    return arrayTareas.find( el => el.id == id);
}

//Nos devuelve la tarea que buscamos por Id.

export const eliminarTarea = (id,arrayTareas) => {
    let posicion = arrayTareas.findIndex( el => el.id == id);
    arrayTareas.splice(posicion,1);
}

//Nos elimina la tarea del array que buscamos por Id.


export const marcarComoEliminadaTareaDOM = (e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas) => {
  
  if (e.target.matches("img")){
    let identificadorTarea = e.target.getAttribute("data-id"),
       $liAEliminar = document.getElementById(identificadorTarea);
  
    let tarea = buscarTarea(identificadorTarea,tareas);
    tarea.marcarComoEliminada();
    $liAEliminar.remove();
  
    $liAEliminar.querySelector(".completa").classList.add("noMostrar");
    $liAEliminar.querySelector(".desMarcar").classList.add("noMostrar");
    $liAEliminar.querySelector(".eliminar").classList.add("noMostrar");
    $liAEliminar.querySelector(".descartar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".recuperar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".descartar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".editar").classList.add("noMostrar");
    $liAEliminar.classList.remove("tareaCompleta") || $liAEliminar.classList.remove("tareaIncompleta"); 
    $liAEliminar.classList.add("tareaEliminada"); 
    
    if (cantidadTareasEliminadas ===1){
        $contadorTareasEliminadas.removeAttribute("hidden");
        document.querySelector(".cestoBasura").removeAttribute("hidden");
    }

    (cantidadTareasEliminadas > 9) 
        ? $contadorTareasEliminadas.innerHTML = `9+`
        : $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;

  localStorage.setItem("tareas",JSON.stringify(tareas));
  }
}

// Esta funcion se encarga de pasar una tarea completa/incompleta al estado eliminada

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la acción, mediante el cual obtenemos el identificador de la tarea.
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.
// *-> cantidadTareasEliminadas = es el contador de tareas eliminadas  que nos indicara como mostrar el cartel de cantidad eliminadas.
// *-> $contadorTareasEliminadas = es el elemento Html en el cuando plasmamos el valor del contador de tareas eliminadas.


export const marcarTareaComoCompletaDOM = (e,$listaCompleta,tareas) => {
    let identificadorTarea = e.target.getAttribute("data-id"),
        $liACompletar = document.getElementById(identificadorTarea),
        tarea = buscarTarea(identificadorTarea,tareas);

    tarea.marcarComoCompleta();
    
    $liACompletar.remove();
    $liACompletar.querySelector(".completa").classList.add("noMostrar");
    $liACompletar.querySelector(".recuperar").classList.add("noMostrar");
    $liACompletar.querySelector(".desMarcar").classList.remove("noMostrar");
    $liACompletar.querySelector(".descartar").classList.add("noMostrar");
    $liACompletar.querySelector(".editar").classList.add("noMostrar");
    $liACompletar.classList.add("tareaCompleta"); 
    
    $listaCompleta.appendChild($liACompletar); 
    localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

// Esta funcion hace que se marque una tarea como completa

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion.
// *-> $listaCompleta = elemento en el DOM en donde debo de agregar la tarea. Reprenseta lugar de la listaCompleta
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.


export const marcarTareaComoIncompletaDOM = (e,$listaIncompleta,tareas) => {           
    let identificadorTarea = e.target.getAttribute("data-id"),
       $liADesmarcar = document.getElementById(identificadorTarea),
       tarea = buscarTarea(identificadorTarea,tareas);

    tarea.marcarComoIncompleta();

    $liADesmarcar.remove();
    $liADesmarcar.querySelector(".completa").classList.remove("noMostrar");
    $liADesmarcar.querySelector(".desMarcar").classList.add("noMostrar");
    $liADesmarcar.querySelector(".descartar").classList.add("noMostrar");
    $liADesmarcar.querySelector(".editar").classList.remove("noMostrar");
    $liADesmarcar.classList.remove("tareaCompleta"); 
    $liADesmarcar.classList.add("tareaIncompleta"); 

    $listaIncompleta.appendChild($liADesmarcar); 
    localStorage.setItem("tareas",JSON.stringify(tareas));
} 

// Esta funcion se encarga de pasar una tarea completa al estado incompleta.

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion.
// *-> $listaIncompleta = elemento en el DOM en donde debo de agregar la tarea. Reprenseta lugar de la listaIncompleta
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.



export const editarTareaIncompletaDOM = (e,tareas) => {           
    let identificadorTarea = e.target.getAttribute("data-id"),
            $liARecuperar = document.getElementById(identificadorTarea),
            $texto = $liARecuperar.querySelector(".text"),
            textAEditar = $texto.innerText,
            $contenedorOpciones = $liARecuperar.querySelector(".contenedorOpciones"),
            $inputEditor = $contenedorOpciones.querySelector("[type='text']"),
            $btnOk = $contenedorOpciones.querySelector(".aceptarEdicion "),
            $btnCancel = $contenedorOpciones.querySelector(".cancelarEdicion");

        $contenedorOpciones.classList.remove("noMostrar");

        $liARecuperar.querySelector(".completa").classList.add("noMostrar");
        $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
        $liARecuperar.querySelector(".eliminar").classList.add("noMostrar");
        $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
        $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
        $liARecuperar.querySelector(".editar").classList.add("noMostrar");

        $texto.classList.add("noMostrar");
        $inputEditor.removeAttribute("hidden");
        $inputEditor.classList.remove("noMostrar");
        $inputEditor.value = textAEditar;
        $btnOk.removeAttribute("hidden");
        $btnOk.classList.remove("noMostrar") ;
        $btnCancel.removeAttribute("hidden");
        $btnCancel.classList.remove("noMostrar");


        $btnOk.addEventListener("click",()=>{
            let tarea = buscarTarea(identificadorTarea,tareas);
            
            if ($inputEditor.value.trim() !==""){
                tarea.setTarea($inputEditor.value);
                $texto.innerHTML = $inputEditor.value;
            }

            $liARecuperar.querySelector(".completa").classList.remove("noMostrar");
            $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
            $liARecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
            $liARecuperar.querySelector(".editar").classList.remove("noMostrar");
            $inputEditor.classList.add("noMostrar");
            $btnOk.classList.add("noMostrar") ;
            $btnCancel.classList.add("noMostrar");
            $texto.classList.remove("noMostrar");
            
            $contenedorOpciones.classList.add("noMostrar");
            localStorage.setItem("tareas",JSON.stringify(tareas));
        });

        $btnCancel.addEventListener("click",()=>{
            $liARecuperar.querySelector(".completa").classList.remove("noMostrar");
            $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
            $liARecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
            $liARecuperar.querySelector(".editar").classList.remove("noMostrar");
            $inputEditor.classList.add("noMostrar");
            $btnOk.classList.add("noMostrar") ;
            $btnCancel.classList.add("noMostrar");
            $texto.classList.remove("noMostrar");
            $contenedorOpciones.classList.add("noMostrar");
        });
}

//Nos permitira poder editar una tarea 

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion. Para obtener el id de la tarea.
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.

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


