import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTags } from '../../store/recipe';
import { loadIngredients } from '../../store/ingredient';
import './recipeRead.css'



function RecipeRead({ recipe }) {
    const dispatch = useDispatch();
    const ingredientState = useSelector(state => state.ingredients)
    const tagsArray = useSelector(state => state.recipes.tags)

    let ingredientArray = [];
    if (ingredientState) {
        ingredientArray = Object.values(ingredientState);
    }

    useEffect(() => {
        dispatch(loadIngredients(recipe.id));
        dispatch(getRecipeTags(recipe.id))
    }, [dispatch, recipe])



    return (
        <div className="recipe_container flex_col_center">
            <span id='recipe_header'>
                <h2>{recipe.name}</h2>
                <span id='recipe_modal_edit_options'>
                    {/* <i className="far fa-edit workspace_name_icon"></i> */}
                    {/* <i className="far fa-trash-alt workspace_name_icon"></i> */}
                </span>
            </span>
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
                                <p className='tag button'>{tag}</p>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeRead;
