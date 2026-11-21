// imports -----------------------------------------------
import { getCreatures, getCreature, createCreature, deleteCreature , updateCreature ,  } from "./api.js"
import { validateCreature } from "./rules.js"
import { getSavedFilter, saveFilter, saveDraft, getDraft, clearDraft } from "./storage.js"

import { renderGrid, showLoading , updateCount, showStatus,
     hideStatus , updateFilterDesign, showDetailLoading,
     renderDetail,
     showDetailError, clearDetail , clearFieldErrors, showFieldErrors,
     showFormMessage, setFormLoading, fillForm, setFormMode , showToast ,} from "./ui.js";



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
grid.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-btn')
    if (editBtn) { startEdit(editBtn.dataset.id); return }

    const deleteBtn = e.target.closest('.delete-btn')
    if (deleteBtn) { removeCreature(deleteBtn.dataset.id, deleteBtn); return }

    const cardClicked = e.target.closest('article')
    if (!cardClicked) return
    loadDetail(cardClicked.dataset.id)
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
        if (editingId) {
            const id = editingId
            await updateCreature(id, toPayload(raw))
            showFormMessage("Créature modifiée avec succès.")
            exitEditMode()
            if (detail.dataset.id === String(id)) loadDetail(id)
        } else {
            await createCreature(toPayload(raw))
            showFormMessage("Créature ajoutée avec succès.")
            form.reset()
            clearDraft()
        }
        await loadCreatures()
    } catch (error) {
        showFormMessage(apiErrorMessage(error), true)
    } finally {
        setFormLoading(false)
    }
})

// ---------------------------------------- DRAFT (SessionStorage)
form.addEventListener('input', () => {
    if (editingId) return            // fach kanmodifiew pas de brouillon
    saveDraft(Object.fromEntries(new FormData(form)))
})

form.addEventListener('reset', () => {
    if (!editingId) clearDraft()
    clearFieldErrors()
})

form.querySelector('button[type="reset"]').addEventListener('click', (e) => {
    if (!editingId) return
    e.preventDefault()               
    exitEditMode()
})

const draft = getDraft()
if (draft) fillForm(draft)

// Firefox kayhafd 3la lvaleur dyal select hta mn b3d refresh F5
sortPlace.value = ""



// ---------------------------------------- EDIT / DELETE (Part 3)
let editingId = null

const apiErrorMessage = (error) => {
    if (error.status === 404) return "Créature introuvable."
    if (error.status) return `Erreur du serveur (${error.status}).`
    return "Impossible de joindre l’API. Vérifie que json-server est lancé."
}

const exitEditMode = () => {
    form.reset()            // editingId yallah 3rftha donc lbrouillon ghatkon mzl matmshatch  
    editingId = null
    setFormMode(false)
    clearFieldErrors()
    const saved = getDraft()
    if (saved) fillForm(saved)
}

const startEdit = async (id) => {
    showFormMessage("")
    clearFieldErrors()
    try {
        const creature = await getCreature(id)
        editingId = String(id)
        fillForm(creature)
        setFormMode(true)
        document.getElementById('create').scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
        showToast(apiErrorMessage(error), true)
        if (error.status === 404) await loadCreatures()
    }
}

const removeCreature = async (id, btn) => {
    if (!confirm("Supprimer cette créature définitivement ?")) return
    btn.disabled = true
    try {
        await deleteCreature(id)
        showToast("Créature supprimée.")
        if (detail.dataset.id === String(id)) clearDetail()
        if (editingId === String(id)) exitEditMode()
        await loadCreatures()
    } catch (error) {
        showToast(apiErrorMessage(error), true)
        if (error.status === 404) await loadCreatures()
    } finally {
        btn.disabled = false
    }
}
// --------------------------------------------------------------final thing

loadCreatures()
   