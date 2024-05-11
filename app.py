from flask import Flask, make_response, request, jsonify
from backend.RecipeManager import RecipeManager
from backend.RecipeRecommender import RecipeRecommender

app = Flask(__name__)
recipe_manager = RecipeManager()
recipe_recommender = RecipeRecommender()

## RECIPE RECOMMENDATION

# get submitted recipes for recommendation
@app.route('/api/submitRecommendationSearch', methods=['POST'])
def submit_recommendation_search():
    data = request.get_json()
    print("Received JSON data:", request.get_json())
    selected_ingredients = data.get('ingredients')
    print("Received selected ingredients:", selected_ingredients)
    recommendationIDs = recipe_recommender.recommend_recipe(selected_ingredients)
    print("Recommended Recipe IDs:", recommendationIDs)
    best_recipes = recipe_manager.get_specific_recipe_data(recommendationIDs)
    print(best_recipes)
    return jsonify({'recipes': best_recipes})

# get ingredients based on food groups for ingredients table
@app.route('/api/getFoodGroups', methods=['GET'])
def get_food_groups():
    food_groups = recipe_manager.get_food_groups()
    return jsonify(food_groups)

# get all available recipes based on search and filter categories
@app.route('/api/getAllRecipes', methods=['GET'])
def get_all_recipes():
    filters = request.args.get('filters')
    keywords = request.args.get('keywords')
    print("filters recieved:", filters)
    print("keywords recieved:", keywords)
    filters = filters.split(',') if filters else []
    keywords = keywords.split(',') if keywords else []
    all_recipes = recipe_manager.get_all_recipes()
    if keywords:
        all_recipes = recipe_manager.filter_recipes_by_keywords(all_recipes, keywords)
        if not all_recipes:
            error_response = {
                "error" : "No recipes found for the entered keyword"
            }
            return make_response(jsonify(error_response), 404)  
    if filters:
        all_recipes = recipe_manager.filter_recipes_by_time(all_recipes, filters)
    return jsonify(all_recipes)

# get specific requested recipes from fetched id arguement
@app.route('/api/getRecipe', methods=['GET'])
def get_recipe():
    recipe_id = request.args.get('recipe_id')
    specific_recipe = recipe_manager.get_specific_recipe_data([recipe_id])
    print(specific_recipe)
    return jsonify(specific_recipe) if specific_recipe else jsonify({})

if __name__ == '__main__':
    app.run(debug=True)
