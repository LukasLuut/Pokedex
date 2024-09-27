const pokemonName=document.querySelector('.pokemon__name');
const pokemonNumber=document.querySelector('.pokemon__number');
const pokemonImage=document.querySelector('.pokemon__image');
const form=document.querySelector('.form')
const input=document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');
let searchPokemon=9;

const fetchPokemon= async (pokemon)=>{
const APIResponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
if(APIResponse.status===200){
const data=await APIResponse.json()
return data
}}

const renderPokemon= async (pokemon)=>{
     pokemonName.innerHTML='Buscando...'
    const data= await fetchPokemon(pokemon);
    if(data){
    pokemonImage.style.display='block'
    pokemonName.innerHTML=data.name;
    pokemonNumber.innerHTML=data.id;
    pokemonImage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value='';
    searchPokemon=data.id
    }else{
        pokemonImage.style.display='none'
        pokemonName.innerHTML='Não encontrado'
        pokemonNumber.innerHTML=''
    }
}


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    if(input.value>648){
        pokemonImage.style.display='none'
        pokemonName.innerHTML='Não encontrado'
        pokemonNumber.innerHTML=''
    }
    else{
    renderPokemon(input.value.toLowerCase())
    }
})



buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon>1){
    searchPokemon-=1
    renderPokemon(searchPokemon)}
});

buttonNext.addEventListener('click', ()=>{
    if(searchPokemon>=1&&searchPokemon<=648){searchPokemon+=1}
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)