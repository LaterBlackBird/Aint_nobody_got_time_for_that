import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTags } from '../../store/recipe';
import { loadIngredients } from '../../store/ingredient';
import './recipeRead.css'
import { clearSearchResultsState } from '../../store/recipe';
import { Modal } from '../../context/modals';
import CreateRecipe from '../CreateRecipeModal';



function RecipeRead({ recipe, showRecipeModal, setSearchText }) {
    const dispatch = useDispatch();
    const ingredientState = useSelector(state => state.ingredients);
    const assignedTags = useSelector(state => state.recipes.tags);
    const tagsArray = Object.values(assignedTags);
    const userId = useSelector(state => state.session.user.id);
    const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false);


    let ingredientArray = [];
    if (ingredientState) {
        ingredientArray = Object.values(ingredientState);
    }

    useEffect(() => {
        dispatch(loadIngredients(recipe.id));
        dispatch(getRecipeTags(recipe.id))
    }, [dispatch, recipe])



    const deleteRecipe = async (e) => {
        e.stopPropagation();
        let recipeId = recipe.id
        const response = await fetch(`/api/recipes/${recipeId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(clearSearchResultsState());
            setSearchText('');
            showRecipeModal(false);
        }
    }


    const editRecipe = async (e) => {
        e.stopPropagation();
        setShowCreateRecipeModal(true);
    }



    return (
        <>
            <div className="recipe_container flex_col_center">
                <span id='recipe_header'>
                    <h2>{recipe.name}</h2>
                </span>
                {userId === recipe.author &&
                    <span>
                        <span className='recipe_edit_button' onClick={(e) => editRecipe(e)}>
                            Edit Recipe
                        </span>
                        <span className='recipe_delete_button' onClick={(e) => deleteRecipe(e)}>
                            Delete Recipe
                        </span>
                    </span>
                }
                <div className="recipe_info flex_col_center">
                    <div id="recipe_modal_pic_ing">
                        <div className="img_src flex_col_center">
                            <img id='food_image' src={recipe.picture} alt={recipe.name} />
                            {recipe.source &&
                                <Link to={{ pathname: recipe.source }} target='_blank'>Source</Link>
                            }
                        </div>
                        <div className="modal_ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredientArray &&
                                    ingredientArray.map(ingredient => (
                                        <li key={ingredient.id}>
                                            {ingredient.amount} &nbsp;
                                            {ingredient.measurement} &nbsp;
                                            {ingredient.name} &nbsp;
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="instruct_tags">
                        <h2>Instructions</h2>

                        <div className="instruct_block">
                            {recipe.instructions}
                        </div>

                        <div className="tag_list">
                            {tagsArray &&
                                tagsArray.map(tag => (
                                    <div className='button' key={tag}>{tag}</div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {
                showCreateRecipeModal && (
                    <Modal onClose={() => setShowCreateRecipeModal(false)}>
                        <CreateRecipe showModal={setShowCreateRecipeModal} recipe={recipe}/>
                    </Modal>
                )
            }
        </>
    );
}

export default RecipeRead;
