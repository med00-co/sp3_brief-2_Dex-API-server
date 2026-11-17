// imports -----------------------------------------------
import { BASE_URL, getCreature , getCreatures } from "./api.js"
import { renderGrid, showLoading , updateCount,   } from "./ui.js";
// ----------------------------------------------------
// -----------------------VARIABLES-------------------------------
let currentSearch = ""
let currentFilter = ""
const grid = document.getElementById('grid')

let params = {
    attribute : "" , 
    q : "" ,
    _sort : "" ,
    _order : "",
}

// ----------------------------------------loadCreatures()
export const loadCreatures = async () => {
     showLoading(grid)

     try{
        const creatures = await getCreatures(params)
        grid.innerHTML = ""
        if (!creatures) grid.innerHTML = "Aucune créature ."
        else {
            renderGrid(creatures)
            updateCount(creatures)
        }
     }catch (error){
        grid.innerHTML= `Erreur ${error.message}`
     }
}


loadCreatures()