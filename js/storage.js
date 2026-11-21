// VARIABLES--------------------------------------------------------
const LAST_FILTER_KEY = 'lastFilter'

const DRAFT_KEY = 'creatureDraft'

// ----------------------------------------------------saveFilter(attribute)
export const saveFilter = (attribute) => {
    localStorage.setItem(LAST_FILTER_KEY, attribute)
}

// -----------------------------------------------------getSavedFilter()
export const getSavedFilter = () => {
    const filterGoted = localStorage.getItem(LAST_FILTER_KEY)
    if(!filterGoted) return ""

    return filterGoted
}

// ---------------------------------------------------saveDraft(data)
export const saveDraft = (data) => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data))
}

// --------------------------------------------------------getDraft()
export const getDraft = () => {
    try {
        const raw = sessionStorage.getItem(DRAFT_KEY)
        return raw ? JSON.parse(raw) : null
    } catch (error) {
        return null
    }
}

// -------------------------------------------------------clearDraft()
export const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY)
}