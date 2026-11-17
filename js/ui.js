// -----------------------------------------------glowClasses
export const glowClasses = {
  Fire:   "shadow-attr-fire/60",
  Water:  "shadow-attr-water/60",
  Dark:   "shadow-attr-dark/60",
  Earth:  "shadow-attr-earth/60",
  Wind:   "shadow-attr-wind/60",
  Light:  "shadow-attr-light/60",
  Divine: "shadow-attr-divine/60",
  Spell_Trap : "shadow-card-spell/70",
}

// ----------------------------------------------attrClasses
export const attrClasses = {
  Fire: "bg-attr-fire",
  Water: "bg-attr-water", 
  Dark: "bg-attr-dark",
  Earth: "bg-attr-earth",
  Wind: "bg-attr-wind", 
  Light: "bg-attr-light", 
  Divine: "bg-attr-divine",
  Spell_Trap : "bg-card-spell/60"
}


// ----------------------------------------------createCard()
const cardClass = "flex flex-col gap-3 border-2 border-ink  bg-[url('../image/cover.jpg')] p-3 pb-4  rounded-[24px] overflow-hidden bg-cover bg-center bg-no-repeat  h-full w-full    shadow-[0_0_20px_3px]    cursor-pointer transition-[transform,translate,scale,rotate,opacity,box-shadow] duration-300 group-hover:opacity-35 group-hover:scale-95 hover:opacity-100! hover:scale-100 hover:-translate-y-2.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)]  focus-visible:opacity-100! focus-visible:-translate-y-2.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-thv18-green motion-reduce:transition-none "

function createCard(card){
   const article = document.createElement("article")
    
   const attrNameForEffect = card.attribute != "Spell/Trap" ? card.attribute : "Spell_Trap"
    article.className = cardClass
    article.classList.add(glowClasses[attrNameForEffect])
    article.setAttribute("data-attribute", `${card.attribute}`)
    article.dataset.id = card.id
    const attributeClass = attrClasses[attrNameForEffect]

    article.innerHTML = `
           <div class="relative flex  items-center justify-center rounded-xl bg-brand-light ">
              <img src="${card.image}" alt="carte Yu-gi-Oh!" loading="lazy" class="h-full w-full" >
             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")}</span>
           </div>
           <div class="flex items-center justify-between gap-2 ml-2">
             <h3 class="font-display text-xl text-white font-semibold">${card.name}</h3>
             <span class="rounded-full ${attributeClass} px-3 py-1 text-sm font-bold text-white" >${card.attribute}</span>
           </div>
           <div class="flex items-center justify-between ml-2 mb-1">
             <p class="text-sm font-semibold text-white">ATK ${card.atk} / DEF ${card.def}</p>
             
           </div>
           <button 
               type="button" 
               data-id="${card.id}" 
               class="team-btn w-full rounded-lg border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md shadow-amber-950/40 transition hover:from-amber-400 hover:to-yellow-300">
              + Ajouter à l'équipe
            </button>
           `;
          

     

    return article ;
}

// ----------------------------------------------renderGrid()
export const renderGrid = (list) => {
    const grid = document.getElementById("grid")
    grid.innerHTML = ""
    list.forEach((creature) => {
        grid.appendChild(createCard(creature))
    })
}

// ----------------------------------------------updateCount()
export const updateCount =  (cards) => {

    document.getElementById('creature-count').textContent = cards.length
}

// --------------------------------------------showStatus()
const statusMessage = document.getElementById('status-message')
export const showStatus = (message) => {
    
    statusMessage.textContent = message
    statusMessage.classList.remove('hidden')
}

// ------------------------------------------hideStatus()
export const hideStatus = () => {
    statusMessage.classList.add('hidden')
}

// --------------------------------------------showLoading(container)
export const showLoading = (container) => {
    container.innerHTML = ""
    const loadingPhase = document.createElement('div')
    loadingPhase.className = "flex gap-2 col-span-full w-full min-h-[40vh] items-center justify-center"
    loadingPhase.setAttribute('role', 'status')
    loadingPhase.setAttribute('aria-label', 'Loading')
    loadingPhase.innerHTML = `
    
  <span
    class="size-8 animate-ping rounded-full bg-gold/80 dark:bg-indigo-300"
    aria-hidden="true"
  ></span>
  <span
    class="size-8 animate-ping rounded-full bg-gold/80 [animation-delay:0.2s] dark:bg-indigo-300"
    aria-hidden="true"
  ></span>
  <span
    class="size-8 animate-ping rounded-full bg-gold/80 [animation-delay:0.4s] dark:bg-indigo-300"
    aria-hidden="true"
  ></span>


    `
    container.appendChild(loadingPhase)
}