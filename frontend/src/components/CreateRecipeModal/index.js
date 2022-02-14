import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './createRecipe.css'



function CreateRecipe({ showModal }) {
    // const dispatch = useDispatch();
    // const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id)
    const [newRecipeName, setNewRecipeName] = useState('')
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [ingredientsObject, setIngredientsObject] = useState({})
    const [lastAddedIng, setLastAddedIng] = useState({})
    const [showIngredientAdd, setShowIngredientAdd] = useState(false)
    const [ingAmount, setIngAmount] = useState(0)
    const [ingMeasurement, setIngMeasurement] = useState()
    const [allMeasurements, setAllMeasurements] = useState([])

    console.log(userId)

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchText) searchIngredients(searchText)
        }, 400);


        const searchIngredients = async (searchText) => {
            console.log('hit the server')
            const response = await fetch(`/api/ingredients/${searchText}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.searchResults);
            }
        }

        return () => clearTimeout(delaySearch);
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


    const createNewRecipe = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newRecipeName, userId})
        });
        if (response.ok) {
            console.log(response);
        }
    }

    const selectIng = (ingredient) => {
        setShowIngredientAdd(true)
        setLastAddedIng(ingredient)
    }

    const addIng = (e) => {
        e.stopPropagation();
        let added = { ...ingredientsObject }
        added[lastAddedIng.id] = { id: lastAddedIng.id, name: lastAddedIng.name, 'amount': ingAmount, 'measurement': ingMeasurement }
        setIngredientsObject(added)
        setShowIngredientAdd(false)
    }

    return (
        <div className="recipe_container flex_col_center">
            <form
                onSubmit={createNewRecipe}
                id='new_recipe_form'
                className='flex_col_center'
            >
                <input
                    name='newRecipeName'
                    // ref={(input) => { input && input.focus() }}
                    type='text'
                    placeholder='New Recipe Name'
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    id="recipe_header"
                    maxLength={100}
                />
            </form>
            {/* <input
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
            } */}



            <button onClick={() => showModal(false)}>Close</button>
        </div >
    );
}

export default CreateRecipe;
