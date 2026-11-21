// CONSTANTES-----------------------------------------------------------
const STAT_MIN = 0
const STAT_MAX = 4000
const DESC_MIN = 10
const DESC_MAX = 200
// --------------------------------------------------------------------
// -------------------------------------------------------------validateCreature(data)
export const validateCreature = (data) => {
    const errors = {}

    // name
    if (!data.name || data.name.trim() === ""){
        errors.name = "Le nom est obligatoire."
    }

    // attribute 
    if(!data.attribute || data.attribute.trim() === ""){
        errors.attribute = "Veuillez choisir un attribut."
    }

    //  level
    const level = Number(data.level)
    if(!data.level || isNaN(level) || level < 1 || level > 12) {
        errors.level = "Veuillez choisir un niveau entre 1 et 12"
    }

    // numero
    const numero = Number(data.numero)
    if(!data.numero || isNaN(numero) || numero <= 0 || !Number.isInteger(numero)) {
        errors.numero = "Le numéro doit être un entier positif."
    }

    // atk 
    const atk = Number(data.atk)
    if (data.atk === "" || data.atk === undefined || isNaN(atk)  || atk < STAT_MIN || atk > STAT_MAX){
        errors.atk = `L'ATK doit être un nombre entre ${STAT_MIN} et ${STAT_MAX}`
    }

    // def 
    const def = Number(data.def)
    if(data.def === "" || data.def === undefined || isNaN(def)  || def < STAT_MIN || def > STAT_MAX){
       errors.def =  `La DEF doit être un nombre entre ${STAT_MIN} et ${STAT_MAX}` 
    }

    // description 
    const desc = data.description ? data.description.trim() : ""
    if(desc.length < DESC_MIN || desc.length > DESC_MAX) {
        errors.description  = `La description doit contenir entre ${DESC_MIN} et ${DESC_MAX} caractères.`;
    }

    // image
    const imageRegex = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i
    if (!data.image || data.image.trim() === "") {
        errors.image = "Le lien de l'image est obligatoire.";
    }else if (!imageRegex.test(data.image)) {
        errors.image = "Le lien de l'image doit commencer par https et fini par .png/jpg/jpeg ."
    }
    
    return errors ;
}

// --------bonus;------------------------------------ canAddCreature(team, creatureId)