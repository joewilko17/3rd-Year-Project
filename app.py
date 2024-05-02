from flask import Flask, request, jsonify
from backend.DatabaseManager import DatabaseManager
from backend.ProfileManager import ProfileManager
from backend.RecipeRecommendation import RecipeRecommendation
import jwt
from middleware import token_required
import secrets

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(24)
DatabaseManager = DatabaseManager()
ProfileManager = ProfileManager()

## RECIPE RECOMMENDATION

@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Get the JSON data sent in the request body
    data = request.get_json()
    print("Received JSON data:", request.get_json())

    # Extract the selected card and ingredients from the JSON data
    selected_ingredients = data.get('ingredients')

    # Process the data as needed
    print("Received selected ingredients:", selected_ingredients)

    recommender = RecipeRecommendation()
    recommendationIDs = recommender.recommend_recipe(selected_ingredients)
    print("Recommendation IDs:", recommendationIDs)
    best_recipes = DatabaseManager.get_recipe_data(recommendationIDs)
    
    # Respond to the client
    print(best_recipes)
    return jsonify({'recipes': best_recipes})

@app.route('/api/getFoodGroups', methods=['GET'])
def get_food_groups_api():
    food_groups = DatabaseManager.get_food_groups()
    return jsonify(food_groups)

@app.route('/api/getAllRecipes', methods=['GET'])
def get_all_recipes_api():
    all_recipes = DatabaseManager.get_all_recipes()
    return jsonify(all_recipes)


## USER LOGIN & AUTHENTICATION

@app.route('/profile')
@token_required
def profile(current_user):
    return jsonify({'message': f'Welcome, {current_user}!'})

@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return jsonify({'message': 'Could not verify'}), 401

    user = ProfileManager.get_user(auth.username)
    if user and user[2] == auth.password:
        token = jwt.encode({'username': auth.username}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return jsonify({'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
