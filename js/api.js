// VARIABLES------------------------------------------------------------------
export const BASE_URL = 'http://localhost:3000'

// ------------------------------------------------------------request(method, route, body)
export const request = async (method, route, body) => {
    const options = {
        method : method ,
    }

    if(body){
        options.headers = {
            "Content-Type": "application/json",
        }
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${route}`, options)

    if(!response.ok){
        const error = new Error(`Erreur ${response.status}: ${response.statusText}`)
        error.status = response.status ;
        throw error
    }
    
    return await response.json()
}

// --------------------------------------------------------------------getCreatures(params)
export const getCreatures = (params ={}) => {

    const realParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== "" && value != null)
    )

    const searchParams = new URLSearchParams(realParams)
    const query = searchParams.toString()
    const route = `/creatures${query ? `?${query}` : ""}`
    
    return request('GET', route)
}


// -------------------------------------------------------------------------getCreature(id)
export const getCreature = (id) =>{
    const route = `/creatures/${id}`
    return request('GET', route)
}
// --------------------------------------------------------------------createCreature(data)
export const createCreature = (data) => {
    const route = `/creatures`
    return request('POST', route, data)

}
// ----------------------------------------------------------------updateCreature(id, data)
export const updateCreature = (id, data) => {
    const route = `/creatures/${id}`
    return request('PUT', route, data)
}

// ----------------------------------------------------------------------deleteCreature(id)
export const deleteCreature = (id) => {
    const route = `/creatures/${id}`
    return request('DELETE', route)
}