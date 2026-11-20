// imports -----------------------------------------------
import { getCreatures , getCreature , } from "./api.js"
import { renderGrid, showLoading , updateCount, showStatus,
     hideStatus , updateFilterDesign, showDetailLoading,
     renderDetail,
     showDetailError, clearDetail } from "./ui.js";
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
const sortPlace = document.getElementById('sort')
const detail = document.getElementById('detail')
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

// ---------------------------------------- SORT ---- Part2----------------------------
sortPlace.addEventListener('change', () => {
    const sortValue = sortPlace.value
    if(sortValue.length === 0){
        params._sort = ""
        params._order = ""
    } else {
        let values = sortValue.split("-")
        params._sort = values[0]
        params._order = values[1]
    }
    loadCreatures()
})

// ----------------------------------------loadDetail(id)
const loadDetail = async (id) => {
    showDetailLoading()
    try {
        const card = await getCreature(id)
        renderDetail(card)
    }catch (error) {
        if(error.status === 404){
            showDetailError('Créature Introuvable')
        } else if (!error.status) {
            showDetailError('Erreur de connexion avec le Serveur')
        } else {
            showDetailError(`Erreur ${error.status}`)
        }
    }
}

//----------------show detail of cards clicked--------------------
grid.addEventListener('click', (e) =>{
    const cardClicked = e.target.closest('article')
    if (!cardClicked) return
    loadDetail(cardClicked.dataset.id)

})
detail.addEventListener('click', (e) => {
    const fermeBtn = e.target.closest('#ferme')
    if(!fermeBtn) return
    
    clearDetail()
})

// -------------------------------get the last filter selected ----------------
let currentFilter = getSavedFilter()
params.attribute = currentFilter
updateFilterDesign(currentFilter)
// --------------------------------------------------------------final thing

loadCreatures()
   