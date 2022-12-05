import { useEffect, useState } from "react";
import { PokemonContex } from "./PokemonContext";
import {useForm} from '../hook/useForm'


export const PokeonProvider = ({ children }) => {

    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

//Ultilizar CutommHook -useForm
const {valueSearch, onInputChange, onResetForm} = useForm({
    valueSearch: '',
})

    // Estados para la aplicacion simple
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    // Llamar 50 pokemons a la API
const getAllPokemons = async(limit = 50) =>{
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`
    )
    const data = await res.json()
    
    const promises = data.results.map(async(pokemon) =>{
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
    })

    const results = await Promise.all(promises)
    setAllPokemons([...allPokemons, ...results])
    setLoading(false)
}

//Llamar todos los pokemon
const getGlobalPokemons = async()=>{
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
    const data = await res.json()
    
    const promises = data.results.map(async(pokemon) =>{
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
        
    })

    const results = await Promise.all(promises)
    setGlobalPokemons(results)
    setLoading(false)

}

	// Llamar a un pokemon por ID
	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};


useEffect(()=>{

    getAllPokemons()

}, [])


useEffect(()=>{

    getGlobalPokemons()

}, [])


  return(
        <PokemonContex.Provider value={{
            valueSearch, 
            onInputChange, 
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonByID
        }} >
         {children}
        </PokemonContex.Provider>
  );

}
