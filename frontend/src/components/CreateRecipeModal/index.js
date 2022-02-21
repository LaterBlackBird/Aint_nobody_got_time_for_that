import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './createRecipe.css'



function CreateRecipe({ showModal }) {
    const [errors, setErrors] = useState([]);
    const [tagError, setTagError] = useState([]);
    const userId = useSelector(state => state.session.user.id);

    const [newRecipeName, setNewRecipeName] = useState('');
    const [newRecipeId, setNewRecipeId] = useState();
    const [createRecipeFormVisibility, setCreateRecipeFormVisibility] = useState(true);
    const [editRecipeNameFormVisibility, setEditRecipeNameFormVisibility] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIng, setSelectedIng] = useState({});
    const [showIngredientAdd, setShowIngredientAdd] = useState(false);
    const [ingAmount, setIngAmount] = useState('');
    const [removedIng, setRemoveIng] = useState(false);

    const [selectedMeasurement, setSelectedMeasurement] = useState(1);
    const [allMeasurements, setAllMeasurements] = useState([]);

    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipePhotoURL, setRecipePhotoURL] = useState('');
    const [recipeSourceURL, setRecipeSourceURL] = useState('');
    const [recipeServingSize, setRecipeServingSize] = useState('');

    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState({});


    //search available ingredients to choose from
    useEffect(() => {
        //this effectively debounces the search
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
        setRemoveIng(false);
    }, [newRecipeId, showIngredientAdd, removedIng])


    // Get all available tags when modal is loaded
    useEffect(() => {
        const getTags = async () => {
            const response = await fetch(`/api/tags`, {
            });
            if (response.ok) {
                const data = await response.json();
                setAllTags(data.tags);
            }
        }
        getTags();
    }, [])


    //When a name is entered, create the new recipe in the DB by name and author
    //Then set the other fields as viewable
    //All functions after this step are essentially editing the new recipe as the user enters new data
    const createNewRecipe = async (e) => {
        e.preventDefault();
        let recipePhotoURL = 'https://res.cloudinary.com/dd1ndszow/image/upload/v1645476091/Aint%20Nobody%20Got%20Time%20For%20That/undraw_hamburger_-8-ge6_uliark.png'
        if (newRecipeName.length < 7) {
            setNewRecipeName('');
            setErrors(['Recipe Name Must Be More Than 7 Characters']);
        } else {
            setErrors([])
            const response = await fetch(`/api/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newRecipeName, userId, recipePhotoURL })
            });
            if (response.ok) {
                const data = await response.json();
                setNewRecipeId(data.id);
                setCreateRecipeFormVisibility(false);
            }
        }
    }

    //Edit the recipe name
    const editRecipe = async (e) => {
        e.preventDefault();

        if (newRecipeName.length < 7) {
            setNewRecipeName('');
            setErrors(['Name must be at least 7 characters']);
        } else {
            setErrors([])
            const response = await fetch(`/api/recipes/${newRecipeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newRecipeName })
            });
            if (response.ok) {
                const data = await response.json();
                setNewRecipeName(data.name)
                setEditRecipeNameFormVisibility(false);
            }
        }
    }

    //input used for naming a recipe (used in create and edit forms)
    const recipeNameInput =
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

    //form for creating a new recipe by name
    let newRecipeNameForm;
    if (createRecipeFormVisibility) {
        newRecipeNameForm =
            <form
                onSubmit={createNewRecipe}
                id='new_recipe_form'
                className='flex_col_center'
            >
                {recipeNameInput}
            </form>
    }

    //form for editing a new recipe by name
    let editNameForm;
    if (editRecipeNameFormVisibility) {
        editNameForm =
            <form
                onSubmit={editRecipe}
                id='new_recipe_form'
                className='flex_col_center'
            >
                {recipeNameInput}
            </form>
    }


    //Open the form for editing the recipe name
    const openEditRecipeNameForm = () => {
        setCreateRecipeFormVisibility(false);
        setEditRecipeNameFormVisibility(true);
    }


    //Set a few states from selecting an ingredient from the search results
    const selectIng = (ingredient) => {
        setShowIngredientAdd(true)
        setSelectedIng(ingredient)
    }

    /******************** INGREDIENTS ******************/
    //Add an ingredient to a recipe
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
                setShowIngredientAdd(false)
            }
        }
        setIngAmount('');
    }

    // Cancel the add ingredient action
    const cancelIng = e => {
        e.stopPropagation();
        setIngAmount('');
        setShowIngredientAdd(false)
    }

    // Remove an ingredient from a recipe
    const removeIng = async (e, ingId) => {
        e.stopPropagation();

        const response = await fetch(`/api/recipes/${newRecipeId}/ingredients/${ingId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setRemoveIng(true);
        }
    }




    /******************** TAGS ******************/
    // Toggle if a tag has been selected or not
    const tagToggle = (e) => {
        if (selectedTags[e.target.id]) removeTagToRecipe(e);
        else addTagToRecipe(e);
    }

    // Add tag if not already selected
    const addTagToRecipe = async (e) => {
        e.stopPropagation();
        const tagId = e.target.id

        const response = await fetch(`/api/recipes/${newRecipeId}/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tagId })
        });
        if (response.ok) {
            setSelectedTags(prevState => ({ ...prevState, [tagId]: 1 }))
        }
    }

    // Remove tag if it has been selected
    const removeTagToRecipe = async (e) => {
        const tagId = e.target.id

        const response = await fetch(`/api/recipes/${newRecipeId}/tags/${tagId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            let copyOfSelectedTags = { ...selectedTags };
            delete copyOfSelectedTags[e.target.id];
            setSelectedTags(copyOfSelectedTags);
        }
    };



    /******************** RECIPE UPDATE OR DELETION ******************/
    //Update or Add Recipe Attributes
    const updateRecipeDetails = async (e) => {
        e.preventDefault();

        if (Object.keys(selectedTags).length === 0) {
            setTagError(['Please select at least 1 tag'])
        }

        if (Object.keys(selectedTags).length !== 0) {
            const responce = await fetch(`/api/recipes/${newRecipeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipeInstructions, recipePhotoURL, recipeSourceURL, recipeServingSize })
            });
            if (responce.ok) {
                showModal(false)
            }
        }
    }

    // Cancel the create recipe workflow (Deletes recipe from database)
    const deleteRecipe = async (e) => {
        e.stopPropagation();
        const response = await fetch(`/api/recipes/${newRecipeId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            showModal(false);
        }
    }


    return (
        <div className="recipe_container flex_col_center">
            {createRecipeFormVisibility && newRecipeNameForm}
            {editRecipeNameFormVisibility && editNameForm}
            {!createRecipeFormVisibility && !editRecipeNameFormVisibility &&
                <div
                    id="recipe_header"
                    onClick={() => openEditRecipeNameForm()}>{newRecipeName}
                </div>
            }
            {!createRecipeFormVisibility &&
                <>
                    <input
                        name='searchIngredients'
                        type='search'
                        placeholder='To add an ingredient, search for it here'
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
                            <div
                                className='ingredient_list_element'
                                key={ingredient.id}
                            >
                                <i
                                    className="fas fa-times hide"
                                    onClick={(e) => removeIng(e, ingredient.id)}
                                >
                                </i>
                                <li>
                                    {ingredient.amount} &nbsp;
                                    {ingredient.measurement} &nbsp;
                                    {ingredient.name} &nbsp;
                                </li>
                            </div>
                        ))
                    }

                    {showIngredientAdd &&
                        <div className='ingredient_add_line'>
                            <input type="number"
                                id='ingAmount'
                                name='ingAmount'
                                value={ingAmount}
                                onChange={(e) => setIngAmount(Math.abs(e.target.value))}
                                placeholder='0'
                                min={0}
                            />
                            <select
                                name="ingMeasurement"
                                value={selectedMeasurement}
                                onChange={(e) => setSelectedMeasurement(e.target.value)}>
                                {allMeasurements.map(measurement => (
                                    <option
                                        value={measurement.id} key={Math.random() * 100}>{measurement.name}
                                    </option>
                                ))
                                }
                            </select>

                            <p id='ingName'>{selectedIng.name}</p>

                            <div>
                                <button onClick={(e) => addIng(e)}>Add</button>
                                <button onClick={(e) => cancelIng(e)}>Cancel</button>
                            </div>
                        </div>
                    }

                    <form id='additional_recipe_details'>
                        <textarea
                            id='instructionsTextField'
                            placeholder='Write instructions here'
                            name='recipe_instructions'
                            value={recipeInstructions}
                            onChange={(e) => setRecipeInstructions(e.target.value)}>
                        </textarea>

                        <input
                            type="text"
                            placeholder='URL for Recipe Photo Here'
                            id='recipePhotoInput'
                            name='recipe_picture'
                            required
                            value={recipePhotoURL}
                            onChange={(e) => setRecipePhotoURL(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Recipe Source URL'
                            name='recipe_source'
                            value={recipeSourceURL}
                            onChange={(e) => setRecipeSourceURL(e.target.value)}
                        />

                        <div id='servings_div'>
                            <label htmlFor="recipe_servings">Servings</label>
                            <input
                                type="number"
                                name='recipe_servings'
                                value={recipeServingSize}
                                onChange={(e) => setRecipeServingSize(e.target.value)}
                            />
                        </div>

                    </form>

                    <div id='tags_container'>
                        <h4>Tags (Select All That Apply)</h4>
                        <div id='tags_list'>
                            {allTags.map(tag => (
                                <div
                                    id={tag.id}
                                    className={`${selectedTags[tag.id] ? 'button' : 'tag'} flex_col_center`}
                                    key={tag.id}
                                    name={tag.name}
                                    onClick={(e) => tagToggle(e)}
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    {tagError &&
                        <div id='tag_error'>{tagError[0]}</div>
                    }
                </>
            }


            {!createRecipeFormVisibility &&
                <div id='action_buttons'>
                    <button onClick={(e) => updateRecipeDetails(e)}>Add</button>
                    <button className='cancel_button' onClick={(e) => deleteRecipe(e)}>Cancel</button>
                </div>
            }

        </div >
    );
}

export default CreateRecipe;
