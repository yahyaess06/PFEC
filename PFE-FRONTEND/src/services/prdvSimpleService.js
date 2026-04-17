import api from "./api";


export function prdvsimple(prdvdto){
    console.log("hh",prdvdto)
    return api.post("/Rendezvous/prendreRdvSimple",prdvdto)
}