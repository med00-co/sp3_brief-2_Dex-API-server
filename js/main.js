// imports -----------------------------------------------
import { getCreatures } from "./api.js"
import { renderGrid, showLoading , updateCount, showStatus, hideStatus , updateFilterDesign,  } from "./ui.js";
// ----------------------------------------------------
// -----------------------VARIABLES-------------------------------

const grid = document.getElementById('grid')

let params = {
    attribute : "" , 
    q : "" ,
    _sort : "" ,
    _order : "",
}
const filters = document.getElementById('filters')
// ----------------------------------------loadCreatures()
export const loadCreatures = async () => {
     showLoading(grid)

     try{
        const creatures = await getCreatures(params)
        grid.innerHTML = ""
        if (!creatures || creatures.length === 0) showStatus("Aucune créature .") 
        else {
            renderGrid(creatures)
            updateCount(creatures)
        }
     }catch (error){
        showStatus(`Erreur ${error.status}`) 
     }
}
// -----------------------------------------------Filter

filters.addEventListener('click', (e)=>{
    const filtre = e.target.closest('button')
    if(!filtre) return
    filtre.id !== 'tous' ? params.attribute = filtre.dataset.attribute : params.attribute = ""
      
    updateFilterDesign(params.attribute)
    loadCreatures()

})
// --------------------------------------------------------------final thing
loadCreatures()
   