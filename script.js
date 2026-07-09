const btn = document.querySelector("#buscar")

const adicionatipos = () =>{
const select = document.querySelector("#poke-tipo");
const trq = new XMLHttpRequest();
trq.open("GET", "https://pokeapi.co/api/v2/type/");
trq.send();
trq.onreadystatechange = ()=>{
    console.log(trq.status);
    if(trq.status == 200){
        const types = JSON.parse(trq.responseText).results;
        console.log(types);
        types.forEach(e => {
            if(!(e.name =="stellar" || e.name == "unknown")) select.innerHTML += `<option value ="${e.name}">${e.name}</option>`
        });
        trq.abort();
    }
}
}
const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const resetaroutput = () =>
{
    document.querySelector(".poke-result").innerHTML = "";
}
const pesquisapornome = (url)=>{
    const obj = new XMLHttpRequest()
    obj.open("GET", url)
    obj.send()  
    obj.onreadystatechange = function(){
        console.log(obj.readyState)
        if(obj.readyState == 4) {
            //carregar a resposta
            console.log("xablau")
            console.log("codigo de status" + obj.status)

            if(obj.status == 200) {
                const pokemon = JSON.parse(obj.responseText);
                console.log(pokemon)
                let types = pokemon.types.reduce((ac, el) => 
                    ac + `<li>${el.type.name}</li>`, "")
                let card = `<div class="poke">
            <h3 class="poke-name">${capitalizeFirstLetter(pokemon.name)}</h3>
            <ul class="poke-types">${types}</ul>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="poke-photo">
            </div>` 
                document.querySelector(".poke-result").innerHTML +=card;
            }
            else if(obj.status = 404) alert("O pokemon não existe!");
        }
    }
}
const pesquisaportipo = () =>{
    const select = document.querySelector("#poke-tipo").value;
    if(select == 0) alert("Selecione um tipo!");
    else{
        const trq = new XMLHttpRequest();
        const url = `https://pokeapi.co/api/v2/type/${select}`;
        trq.open("GET", url);
        trq.send();
        trq.onreadystatechange = function(){
        console.log(trq.readyState)
        if(trq.readyState == 4) {
            console.log("codigo de status" + trq.status)

            if(trq.status == 200) {
                const pokemons = JSON.parse(trq.responseText).pokemon;
                console.log(pokemons)
                pokemons.forEach(poke =>{
                    pesquisapornome(poke.pokemon.url);
                })
            }
            else if(obj.status = 404) alert("O tipo não existe!");
        }
    }

    }

}
btn.addEventListener("click", ()=> {
    const choice = document.getElementById("choice").value;
    console.log(choice);
    if(choice==1){ 
        const name = document.querySelector("#poke").value.toLowerCase();            
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        resetaroutput();
        pesquisapornome(url);
    }
    else if(choice == 2){
        resetaroutput();
        pesquisaportipo();
    };
})
adicionatipos();
