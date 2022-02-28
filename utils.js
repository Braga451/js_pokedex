function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function elementsInfo(tags = {}, data = {}){
    tags.loading_element.style.display = "none";
    tags.pokemon_basic_info_element.id = "pokemon-basic-info";
    tags.pokemon_name_element.id = "pokemon-name";
    tags.pokemon_name_element.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    tags.pokemon_sprite_element.src = data.sprites.front_default;
    tags.pokemon_sprite_element.id = "pokemon-sprite-element";
    tags.buttons_area_element.id = "buttons-area";
    tags.habilidades_area_element.id = "habilidades-area";
    tags.status_area_element.id = "status-area";
    tags.habilidades_area_element.innerText = "Habilidades";
    tags.status_area_element.innerText = "Status";
    tags.central_area_info_element.id = "central-area-info";
    return;
}

function appendElements(tags = {}){
    tags.pokemon_basic_info_element.appendChild(tags.pokemon_name_element);
    tags.pokemon_basic_info_element.appendChild(tags.pokemon_sprite_element);
    tags.buttons_area_element.appendChild(tags.habilidades_area_element);
    tags.buttons_area_element.appendChild(tags.status_area_element);
    tags.pokemon_basic_info_element.appendChild(tags.buttons_area_element);
    tags.central_area_info_element.appendChild(tags.pokemon_basic_info_element);
    tags.internal_gameboy_element.appendChild(tags.central_area_info_element);
    return;
}

function addEvents(tags = {}, data = {}){
    tags.habilidades_area_element.addEventListener("click", createAbilities);
    tags.habilidades_area_element.data = data.abilities;
    tags.status_area_element.addEventListener("click", createStatus);
    tags.status_area_element.data = data.stats;
    return;
}

function createPokemonInfoLayout(data = {}){
    const elements = {loading_element : document.getElementById("loading"), pokemon_basic_info_element : document.createElement("div"), 
    pokemon_name_element : document.createElement("div"), pokemon_sprite_element : document.createElement("img"), 
    buttons_area_element : document.createElement("div"), habilidades_area_element : document.createElement("button"), 
    status_area_element : document.createElement("button"), central_area_info_element : document.createElement("div"), 
    internal_gameboy_element : document.getElementById("internal-gameboy")};
    elementsInfo(elements, data);
    appendElements(elements);
    addEvents(elements, data);
    return;
}

async function getPokeInfo(pokemon_name = ""){
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`, response = await fetch(url), data = await response.json();
        createPokemonInfoLayout(data);
    }
    catch(e){
        alert(`Erro: ${e}`);
    }
    return;
}

function createStatus(event = PointerEvent){
    //console.log(event.currentTarget.data);
    const central_area_info_element = document.getElementById("central-area-info"), data = event.currentTarget.data;
    central_area_info_element.style.display = "none";
    createStatusElement(data);
    return;
}

function setStatusInfo(tags = {}, data = {}){
    tags.status_name_element.innerText = data.stat.name.charAt(0).toUpperCase() + data.stat.name.slice(1) + ": ",
    tags.base_stats_element.innerText = data.base_stat,
    tags.status_name_element.className = "status-name",
    tags.base_stats_element.className = "base-stats",
    tags.status_tag_element.className = "status"
    return;
}

function appendStatusElemnt(tags = {}, status_area_info_element = Element){
    tags.status_tag_element.appendChild(tags.status_name_element);
    tags.status_tag_element.appendChild(tags.base_stats_element);
    status_area_info_element.appendChild(tags.status_tag_element);
    return;
}

function createStatusElement(data = {}){
    const status_area_info_element = document.createElement("div"), back_element = document.createElement("button"),
    internal_gameboy_element = document.getElementById("internal-gameboy");
    let tags = {};
    status_area_info_element.id = "status-area-info";
    data.forEach((value) =>{
        tags = {
            status_tag_element : document.createElement("div"),
            status_name_element : document.createElement("div"),
            base_stats_element : document.createElement("div"),
        };
        setStatusInfo(tags, value);
        appendStatusElemnt(tags, status_area_info_element);
    })
    back_element.id = "back";
    back_element.innerText = "Voltar";
    back_element.addEventListener("click", () =>{
        const central_area_info_element = document.getElementById("central-area-info");
        internal_gameboy_element.removeChild(status_area_info_element);
        central_area_info_element.style.display = "";
    })
    status_area_info_element.appendChild(back_element);
    internal_gameboy_element.appendChild(status_area_info_element);
    return;
}

function createAbilities(event = PointerEvent){
    //console.log(event.currentTarget.data)
    const abilities_area_info_element = document.createElement("div"), back_element = document.createElement("button"), data = event.currentTarget.data,
    internal_gameboy_element = document.getElementById("internal-gameboy"), central_area_info_element = document.getElementById("central-area-info");
    let abilites_element, abilites_name_element;
    central_area_info_element.style.display = "none";
    abilities_area_info_element.id = "abilites-area-info";
    data.forEach((value) =>{
        abilites_element = document.createElement("div");
        abilites_name_element = document.createElement("div");
        abilites_element.className = "abilites";
        abilites_name_element.className = "abilites-name";
        abilites_name_element.innerText = value.ability.name.charAt(0).toUpperCase() + value.ability.name.slice(1);
        abilites_element.appendChild(abilites_name_element);
        abilities_area_info_element.appendChild(abilites_element);
    })
    back_element.id = "back";
    back_element.innerText = "Voltar";
    abilities_area_info_element.appendChild(back_element);
    back_element.addEventListener("click", () =>{
        internal_gameboy_element.removeChild(document.getElementById("abilites-area-info"));
        central_area_info_element.style.display = "";
    })
    internal_gameboy_element.appendChild(abilities_area_info_element);
    return;
}


async function loading(){
    const loading_element = document.getElementById("loading");
    while(loading_element.style.display != "none"){
        if(loading_element.textContent == "Carregando..."){
            loading_element.textContent = "Carregando";
        }
        else{
            loading_element.textContent += ".";
        }
        await sleep(500);
    }
    return;
}

function returnInitialScreen(){
    try{
        const internal_gameboy_element = document.getElementById("internal-gameboy"), elements_to_remove = {
            central_area_info_element : document.getElementById("central-area-info"),
            status_area_info_element : document.getElementById("status-area-info"),
            abilities_area_info_element : document.getElementById("abilites-area-info")
        };
        Object.keys(elements_to_remove).forEach((value) =>{
            if(elements_to_remove[value] != undefined){
                internal_gameboy_element.removeChild(elements_to_remove[value]);
            }
        })
    }
    catch(e){
        alert(e);
    }
    finally{
        const loading_element = document.getElementById("loading");
        loading_element.style.display = "";
        loading();
        return;
    }
}

(() =>{
    const search_button = document.getElementById("search");   
    search_button.addEventListener("click", () =>{
        const input_pokemon_name_text_element = document.getElementById("input-pokemon-name-text"), 
        pokemon_basic_info_element = document.getElementById("pokemon-basic-info");
        const pokemon_name = input_pokemon_name_text_element.value;
        input_pokemon_name_text_element.value = "";
        if(pokemon_basic_info_element != null){
            returnInitialScreen();
        }
        if(pokemon_name.length == 0){
            return;
        }
        getPokeInfo(pokemon_name);
    })
    loading();
    return;
})(); // Main