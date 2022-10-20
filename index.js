let pokemonDefault = 1

const pokemon_name = document.querySelector('.pokemon_name');

const pokemon_traco = document.querySelector('.pokemon_traco')

const pokemon_number = document.querySelector('.pokemon_number');

const image_pokemon = document.querySelector('#image_pokemon');

const form_search = document.querySelector('.form_search');

const search = document.querySelector('.search');

const avancar = document.querySelector('.button-avancar');

const voltar = document.querySelector('.button-voltar');

const catchpokemon = async (pokemon) => {

    const APIRETURN = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIRETURN.status === 200){

        const data = await APIRETURN.json();
    
        return data;
    }
}

const searchpokemon = async (pokemon) => {

    pokemon_name.innerHTML = 'Carregando..'
    
    const data = await catchpokemon(pokemon);

    if (data){
        image_pokemon.style.display = 'block'
        pokemon_name.innerHTML = data.name;
        pokemon_traco.style.display = ''
        pokemon_number.innerHTML = data.id;
        image_pokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value = ''
        pokemonDefault = data.id
    } else {
        image_pokemon.style.display = 'none'
        pokemon_name.innerHTML = 'Não Existe!'
        pokemon_traco.style.display = 'none'
        pokemon_number.innerHTML = ''
    }

}

form_search.addEventListener('submit', (event) => {

    event.preventDefault()

    searchpokemon(search.value.toLowerCase());

});

avancar.addEventListener('click', (event) => {

    pokemonDefault += 1
    searchpokemon(pokemonDefault)

});

voltar.addEventListener('click', (event) => {
    
    if (pokemonDefault > 1) {
        
        pokemonDefault -= 1
        searchpokemon(pokemonDefault)
    }

});


searchpokemon(pokemonDefault)

