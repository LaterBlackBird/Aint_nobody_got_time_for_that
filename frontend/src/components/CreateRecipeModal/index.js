import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './createRecipe.css'



function CreateRecipe({ showModal }) {
    // const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);

    const [newRecipeName, setNewRecipeName] = useState('');
    const [newRecipeId, setNewRecipeId] = useState();
    const [createRecipeFormVisibility, setCreateRecipeFormVisibility] = useState(true)

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIng, setSelectedIng] = useState({});

    const [selectedMeasurement, setSelectedMeasurement] = useState(1);

    const [showIngredientAdd, setShowIngredientAdd] = useState(false);
    const [ingAmount, setIngAmount] = useState(0);
    const [allMeasurements, setAllMeasurements] = useState([]);


    //search available ingredients to choose from
    useEffect(() => {
        //this effectively debounces the search action
        const delaySearch = setTimeout(() => {
            if (searchText) searchIngredients(searchText)
        }, 400);

        const searchIngredients = async (searchText) => {
            const response = await fetch(`/api/ingredients/${searchText}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.searchResults);
            }
        }

        return () => clearTimeout(delaySearch);
    }, [searchText]);


    //set the list of available measurements to select from
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


    //get the list of ingredients associated with the recipe as they are added by the user
    useEffect(() => {
        const getCurrentListOfIngredients = async () => {
            if (newRecipeId) {
                const ingredients = await fetch(`/api/recipes/${newRecipeId}/ingredients`)
                if (ingredients.ok) {
                    const data = await ingredients.json();
                    setIngredientsList(data.ingredients)
                }
            }
        }
        if (!showIngredientAdd) getCurrentListOfIngredients();
    }, [newRecipeId, showIngredientAdd])



    //When a name is entered, create the new recipe in the DB by name and author
    //Then set the other fields as viewable
    //All functions after this step are essentially editing the new recipe
    //as the user enters new data
    const createNewRecipe = async (e) => {
        e.preventDefault();
        if (newRecipeName.length < 7) {
            setNewRecipeName('');
            setErrors(['Use A Descriptive Name']);
        } else {
            setErrors([])
            const response = await fetch(`/api/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newRecipeName, userId })
            });
            if (response.ok) {
                const data = await response.json();
                setNewRecipeId(data.id);
                setCreateRecipeFormVisibility(false);
            }
        }
    }
    //form for adding a new recipe by name
    let newRecipeNameForm;
    if (createRecipeFormVisibility) {
        newRecipeNameForm =
            <form
                onSubmit={createNewRecipe}
                id='new_recipe_form'
                className='flex_col_center'
            >
                <input
                    name='newRecipeName'
                    type='text'
                    placeholder={errors.length ? errors[0] : 'New Recipe Name'}
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    id="recipe_header"
                    maxLength={100}
                    required
                />
            </form>
    }



    //Set a few states from selecing an ingredient from the search results
    const selectIng = (ingredient) => {
        setShowIngredientAdd(true)
        setSelectedIng(ingredient)
    }


    const addIng = async (e) => {
        e.stopPropagation();
        let added = { recipe_id: newRecipeId, ingredient_id: selectedIng.id, name: selectedIng.name, ingAmount: ingAmount, ingMeasurement: selectedMeasurement }
        if (ingAmount < 0) {
            setErrors(['Amount Cannot Be Less Than 0']);
        } else {
            setErrors([])
            const response = await fetch(`/api/recipes/${newRecipeId}/ingredients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(added)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShowIngredientAdd(false)
            }
        }
    }


    return (
        <div className="recipe_container flex_col_center">
            {createRecipeFormVisibility && newRecipeNameForm}
            {!createRecipeFormVisibility &&
                <>
                    <div id="recipe_header">{newRecipeName}</div>

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
                    {ingredientsList.length > 0 &&
                        ingredientsList.map(ingredient => (
                            <li key={ingredient.id}>
                                {ingredient.amount} &nbsp;
                                {ingredient.measurement} &nbsp;
                                {ingredient.name} &nbsp;
                            </li>
                        ))
                    }
                    {showIngredientAdd &&
                        <div className='ingredient_add_line'>
                            <input type="number"
                                name='ingAmount'
                                value={ingAmount}
                                onChange={(e) => setIngAmount(Math.abs(e.target.value))}
                                ref={(input) => { input && input.focus() }}
                                min={0}
                            />
                            <select
                                name="ingMeasurement"
                                value={selectedMeasurement}
                                onChange={(e) => setSelectedMeasurement(e.target.value)}>
                                {allMeasurements.map(measurement => (
                                    <option
                                        value={measurement.id} key={measurement.id+(Math.random()*100)}>{measurement.name}
                                    </option>
                                ))
                                }
                            </select>
                            <p>{selectedIng.name}</p>
                            <button onClick={(e) => addIng(e)}>Add</button>
                        </div>
                    }
                </>
            }



            <button onClick={() => showModal(false)}>Close</button>
        </div >
    );
}

export default CreateRecipe;
