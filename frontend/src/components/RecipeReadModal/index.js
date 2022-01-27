import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadIngredients } from '../../store/ingredient';
import './recipeRead.css'



function RecipeRead({ recipe }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients(recipe.id));
    }, [dispatch])

    return (
        <div className="recipe_container">
            <div className="recipe_info">
                <span id='recipe_header'>
                    <h2>{recipe.name}</h2>
                    <span id='recipe_modal_edit_options'>
                        <i className="far fa-edit workspace_name_icon"></i>
                        <i className="far fa-trash-alt workspace_name_icon"></i>
                    </span>
                </span>
                <div id="recipe_modal_pic_ing">
                    <img id='food_image' src={recipe.picture} alt={recipe.name} />
                    <div className="modal_ingredients">
                        <h2>Ingredients</h2>
                        <ul>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeRead;
