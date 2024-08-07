const content = document.getElementById("content");
const pokedex = document.getElementById("pokedex");
const info = document.getElementById("info");
const pokeball = document.getElementById("generar");
const apiurl = "https://pokeapi.co/api/v2/pokemon/";

function getPokemonId() {
    return Math.floor(Math.random() * 1025) + 1; 
}

async function requestPokemon() {
    const id = getPokemonId();
    const response = await fetch(`${apiurl}${id}`);
    if (!response.ok) {
        throw new Error("no hubo suerte");
    }
    const data = response.json();
    return data;
}

pokeball.addEventListener('click', async () => {
    try {
        const pokemondata = await requestPokemon();
        showInfoPokemon(pokemondata);
    } catch (error) {
        alert("hubo un problema");
    }
});

function showInfoPokemon(pokemon) {
    const pokedexHtml = `
        <div class="text-center mt-2">
            <img src='assets/pokedex2.png' class="img-fluid mb-3" />
            <img src='${pokemon.sprites.front_default}' alt='${pokemon.name}' class='img-top' style='position:relative !important; top:-180px !important;'>
        </div>`;

    const abilitiesHtml = pokemon.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('');
    const typesHtml = pokemon.types.map(type => `<span class="badge bg-primary me-1">${type.type.name}</span>`).join('');
    const statsHtml = pokemon.stats.map(stat => `<li class="list-group-item"><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join('');

    const infoHtml = `
        <div class="card mt-2 shadow-sm">
            <div class="card-body">
                <h5 class="card-title text-center text-capitalize">${pokemon.name}</h5>
                <div class="text-center">
                    ${typesHtml}
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="card-text"><strong>Abilities</strong></p>
                         <div class="row">
                            ${abilitiesHtml}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p class="card-text"><strong>Base Stats</strong></p>
                        <div class="row">
                            ${statsHtml}
                        <div>
                    </div>
                </div>
            </div> 
        </div>`;
    pokedex.innerHTML = pokedexHtml;
    info.innerHTML = infoHtml;
}


