// imports -----------------------------------------------
import { getCreatures, getCreature, createCreature } from "./api.js"
import { validateCreature } from "./rules.js"
import { getSavedFilter, saveFilter, saveDraft, getDraft, clearDraft } from "./storage.js"

import { renderGrid, showLoading , updateCount, showStatus,
     hideStatus , updateFilterDesign, showDetailLoading,
     renderDetail,
     showDetailError, clearDetail , clearFieldErrors, showFieldErrors,
     showFormMessage, setFormLoading, fillForm, } from "./ui.js";



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

// ---------------------------------------- FORM (Part 2)
const form = document.getElementById('creature-form')

const toPayload = (raw) => ({
    numero: Number(raw.numero),
    name: raw.name.trim(),
    attribute: raw.attribute,
    level: Number(raw.level),
    atk: Number(raw.atk),
    def: Number(raw.def),
    image: raw.image.trim(),
    description: raw.description.trim(),
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    clearFieldErrors()
    showFormMessage("")

    const raw = Object.fromEntries(new FormData(form))
    const errors = validateCreature(raw)
    if (Object.keys(errors).length > 0) {
        showFieldErrors(errors)
        showFormMessage("Corrige les champs signalés.", true)
        return
    }

    setFormLoading(true)
    try {
        await createCreature(toPayload(raw))
        showFormMessage("Créature ajoutée avec succès.")
        form.reset()
        clearDraft()
        await loadCreatures()
    } catch (error) {
        showFormMessage(
            error.status
                ? `Erreur du serveur (${error.status}).`
                : "Impossible de joindre l’API. Vérifie que json-server est lancé.",
            true
        )
    } finally {
        setFormLoading(false)
    }
})

// ---------------------------------------- DRAFT (SessionStorage)
form.addEventListener('input', () => {
    saveDraft(Object.fromEntries(new FormData(form)))
})

form.addEventListener('reset', () => {
    clearDraft()
    clearFieldErrors()
})

const draft = getDraft()
if (draft) fillForm(draft)

// Firefox kayhafd 3la lvaleur dyal select hta mn b3d refresh F5
sortPlace.value = ""
// --------------------------------------------------------------final thing

loadCreatures()
   