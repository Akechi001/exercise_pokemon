import React, { useState, useEffect } from 'react';
import pokemonsResultPage1 from "./__tests__/pokemon-result-limit-5-offset-0.json";


const PokemonList = () => {
    // State to store the list of Pokemon
    const [pokemonList, setPokemonList] = useState([]);
    const [jumlahPokemon, setJumlahPokemon] = useState();
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        // Function to fetch Pokemon data
        const fetchPokemonData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokemon data');
                }

                const data = await response.json();
                setJumlahPokemon(data.count)

                setPokemonList([...pokemonList, ...data.results]);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            } finally {
                setIsLoading(false)
            }
        };

        // Call the function to fetch Pokemon data
        fetchPokemonData();
    }, [offset]); // Empty dependency array ensures the effect runs once when the component mounts

    // Move the return statement inside the functional component
    return (
        <div className="flex-col">
            <div className="w-full mt-10 mb-10">
                <h2 className="text-4xl font-bold mt-3 text-center">Pokemon List</h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center list-none"> {/* Updated here */}
                {pokemonList && pokemonList.map((pokemon, i) => (
                    <div key={i} className="w-60 h-80 border m-2 p-2 rounded-md text-center border border-black" key={pokemon.name}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${i+1}.png`} alt={pokemonList.name}  className="w-60 h-120"/>
                        <p>#000{i+1}</p>
                        <li className=" font-bold">{pokemon.name}</li>


                    </div>
                ))}
            </div>

            <div className="w-full">
                <p className="text-xl mt-3 text-center">
                    Displaying {pokemonList.length} of {jumlahPokemon} results
                </p>
            </div>

            {pokemonList.length < jumlahPokemon && (
                <div className="w-full mb-10 flex justify-center">
                    <button
                        className="bg-slate-200 w-28 h-10 rounded-xl font-bold mt-5"
                        onClick={() => setOffset(offset + 5)}
                    >
                        Load more
                    </button>
                </div>
            )}
        </div>

    );
};


export default PokemonList;
