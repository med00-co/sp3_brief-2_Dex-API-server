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
  <div class="relative flex items-center justify-center rounded-xl bg-brand-light">
    <img src="${card.image}" alt="carte Yu-gi-Oh!" loading="lazy" class="h-full w-full">
    <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.numero).padStart(3, "0")}</span>

    <!-- Edit and  Delete Icon Buttons (Top Right) -->
    <div class="absolute right-2 top-2 flex items-center gap-1.5">
      <button 
        type="button" 
        data-id="${card.id}" 
        aria-label="Modifier" 
        title="Modifier"
        class="hidden edit-btn flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/50 bg-stone-950/85 text-amber-400 shadow-md backdrop-blur-sm transition hover:border-amber-300 hover:bg-amber-500 hover:text-stone-950">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </button>

      <button 
        type="button" 
        data-id="${card.id}" 
        aria-label="Supprimer" 
        title="Supprimer"
        class="hidden delete-btn flex h-8 w-8 items-center justify-center rounded-full border border-red-500/50 bg-stone-950/85 text-red-400 shadow-md backdrop-blur-sm transition hover:border-red-400 hover:bg-red-600 hover:text-white">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  </div>

  
`;
//   div of name and attribute
  const divNameAttribute = document.createElement('div')
  divNameAttribute.className = "ml-2 flex items-center justify-between gap-2"

  const nameCard = document.createElement('h3')
  nameCard.className = "font-display text-xl font-semibold text-white"
  nameCard.textContent = card.name
  divNameAttribute.appendChild(nameCard)

  const spanAttr = document.createElement('span')
  spanAttr.className = `rounded-full ${attributeClass} px-3 py-1 text-sm font-bold text-white`
  spanAttr.textContent = card.attribute
  divNameAttribute.appendChild(spanAttr) 
  
  article.appendChild(divNameAttribute)

//   div of atk and def 
const divAtkDef  = document.createElement('div')
divAtkDef.className = "mb-1 ml-2 flex items-center justify-between"

const pA_D = document.createElement('p')
pA_D.className = "text-sm font-semibold text-white"
pA_D.textContent = `ATK ${card.atk} / DEF ${card.def}`
divAtkDef.appendChild(pA_D)

article.appendChild(divAtkDef)

// button of add to team 
const addToTeamBtn = document.createElement('button')
addToTeamBtn.setAttribute('type', 'button')
addToTeamBtn.setAttribute('data-id', card.id)
addToTeamBtn.className  = "hidden add-to-team mt-auto w-full rounded-lg border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md shadow-amber-950/40 transition hover:from-amber-400 hover:to-yellow-300"
addToTeamBtn.textContent = "+ Ajouter à l'équipe"

article.appendChild(addToTeamBtn)
          

     

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

// --------------------------------------------------------------updateFilterDesign()
export const updateFilterDesign = (activeAttribute = "")=>{
   const filters = document.getElementById('filters') 
    if(!filters) return

    filters.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove('active')
    })

    if (activeAttribute === "") {
    filters.querySelector("#tous")?.classList.add("active");
  } else {
    filters
      .querySelector(`[data-attribute="${activeAttribute}"]`)
      ?.classList.add("active");
  }
}