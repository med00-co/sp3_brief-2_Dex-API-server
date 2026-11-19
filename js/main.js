// imports -----------------------------------------------
import { getCreatures } from "./api.js"
import { renderGrid, showLoading , updateCount, showStatus, hideStatus , updateFilterDesign,  } from "./ui.js";
import { getSavedFilter, saveFilter } from "./storage.js";

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
const searchForm =  document.getElementById('search-form')
// ----------------------------------------loadCreatures()
const loadCreatures = async () => {
     showLoading(grid)
     hideStatus()

     try{
        const creatures = await getCreatures(params)
        grid.innerHTML = ""
        if (!creatures || creatures.length === 0){
           showStatus("Aucune créature.")   
           updateCount([])
        }
        else {
            renderGrid(creatures)
            updateCount(creatures)
        }
     }catch (error){
        
        grid.innerHTML = ""
        showStatus(`Erreur ${error.status ? `du serveur (${error.status})` : ": Impossible de joindre l’API. Vérifie que json-server est lancé."}`)
        updateCount([]) 
     }
}
// -----------------------------------------------Filter

filters.addEventListener('click', (e)=>{
    const filtre = e.target.closest('button')
    if(!filtre) return
    filtre.id !== 'tous' ? params.attribute = filtre.dataset.attribute : params.attribute = ""
      
    updateFilterDesign(params.attribute)
    saveFilter(params.attribute)

    loadCreatures()

})

// ----------------------------------------------Recherche
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const searchValue = document.getElementById('search').value.trim()
    params.q = searchValue
    loadCreatures()
 
})
document.getElementById("effacer-cherche").addEventListener('click', () =>{
        searchForm.reset()
        params.q = ""
        
        loadCreatures()
})

// -------------------------------get the last filter selected ----------------
let currentFilter = getSavedFilter()
params.attribute = currentFilter
updateFilterDesign(currentFilter)
// --------------------------------------------------------------final thing

loadCreatures()
   