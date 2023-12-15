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
        <div>
            <div>
                <h2>Pokemon List</h2>
            </div>
            <div>
                <ul>
                    {pokemonList.map((pokemon) => (
                        <li key={pokemon.name}>{pokemon.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Displaying {pokemonList.length} of {jumlahPokemon} results</p>
            </div>
            <div>
                {pokemonList.length < jumlahPokemon && (
                <button onClick={() => setOffset(offset+5)}>
                    Load more
                </button>
                    )}
            </div>
        </div>
    );
};


export default PokemonList;
