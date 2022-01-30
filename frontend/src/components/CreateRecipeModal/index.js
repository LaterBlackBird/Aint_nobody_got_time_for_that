import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './createRecipe.css'



function CreateRecipe({ showModal }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [newRecipeName, setNewRecipeName] = useState('')
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [ingredientsObject, setIngredientsObject] = useState({})
    const [lastAddedIng, setLastAddedIng] = useState({})
    const [showIngredientAdd, setShowIngredientAdd] = useState(false)
    const [ingAmount, setIngAmount] = useState(0)
    const [ingMeasurement, setIngMeasurement] = useState()
    const [allMeasurements, setAllMeasurements] = useState([])
    const createNewRecipe = async (e) => {
        e.preventDefault();
        console.log('submit')
    }

    useEffect(() => {
        const searchIngredients = async (searchText) => {
            const response = await fetch(`/api/ingredients/${searchText}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.searchResults);
            }
        }
        if (searchText) searchIngredients(searchText)
    }, [searchText]);


    useEffect(() => {
        const getMeasurements = async () => {
            const measurements = await fetch(`/api/measurements`)
            if (measurements.ok) {
                const data = await measurements.json();
                setAllMeasurements(Object.values(data.measurements))
            }
        }
        getMeasurements();
    }, [])

    const selectIng = (ingredient) => {
        setShowIngredientAdd(true)
        setLastAddedIng(ingredient)
    }

    const addIng = (e) => {
        e.stopPropagation();
        let added = { ...ingredientsObject }
        added[lastAddedIng.id] = {id:lastAddedIng.id, name:lastAddedIng.name, 'amount': ingAmount, 'measurement': ingMeasurement}
        setIngredientsObject(added)
        setShowIngredientAdd(false)
    }

    console.log(ingredientsObject)

    return (
        <div className="recipe_container flex_col_center">
            <form
                onSubmit={createNewRecipe}
                id='new_recipe_form'
                className='flex_col_center'
            >
                <input
                    name='newRecipeName'
                    ref={(input) => { input && input.focus() }}
                    type='text'
                    placeholder='New Recipe Name'
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    id="recipe_header"
                    maxLength={100}
                />
                <input
                    name='searchIngredients'
                    type='search'
                    placeholder='Search for an ingredient'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    id='ingredient_search'
                    className="search_input"
                />
                <div className="ingredient_search_results">
                    {searchResults &&
                        searchResults.map(result => (
                            <div
                                className='flex_col_center'
                                key={result.name}
                                onClick={() => selectIng(result)}
                            >
                                {result.name}
                            </div>
                        ))
                    }
                </div>
                {showIngredientAdd &&
                    <div className='ingredient_add_line'>
                        <input type="number"
                            value={ingAmount}
                            onChange={(e) => setIngAmount(Math.abs(e.target.value))}
                            ref={(input) => { input && input.focus() }}
                            min={0}
                        />
                        <select
                            name="ingMeasurement"
                            value={ingMeasurement}
                            onChange={(e) => setIngMeasurement(e.target.value)}>
                            {allMeasurements.map(measurement => (
                                <option
                                    value={measurement.name} key={measurement.id}>{measurement.name}</option>
                            ))
                            }
                        </select>
                        <p>{lastAddedIng.name}</p>
                        <button onClick={(e) => addIng(e)}>Add</button>
                    </div>
                }



            </form>
                <button onClick={() => showModal(false)}>Close</button>
        </div>
    );
}

export default CreateRecipe;
