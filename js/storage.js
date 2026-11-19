// VARIABLES--------------------------------------------------------
const LAST_FILTER_KEY = 'lastFilter'

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