
export const buscarTarea = (id, arrayTareas) => {
    return arrayTareas.find( el => el.id == id);
}

//Nos devuelve la tarea que buscamos por Id.

export const eliminarTarea = (id,arrayTareas) => {
    let posicion = arrayTareas.findIndex( el => el.id == id);
    arrayTareas.splice(posicion,1);
}

//Nos elimina la tarea del array que buscamos por Id.