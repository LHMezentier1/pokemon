import {realizarpesquisa, adicionatipos} from "./fun.js";
const btn = document.querySelector("#buscar")
btn.addEventListener("click", realizarpesquisa);
document.addEventListener("keydown", (e)=>{
    if((document.querySelector("#poke-tipo").value != 0 || document.querySelector("#poke").value != "") && e.key == "Enter"){
        realizarpesquisa()
        console.log("pesquisa por enter!")
        };
})
adicionatipos();