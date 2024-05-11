import base64
from flask import Flask, make_response, request, jsonify
from backend.ProfileManager import ProfileManager
from backend.RecipeManager import RecipeManager
from backend.RecipeRecommender import RecipeRecommender
from middleware import token_required
import secrets
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(24)
recipe_manager = RecipeManager()
recipe_recommender = RecipeRecommender()
profile_manager = ProfileManager()

## RECIPE RECOMMENDATION

# get submitted recipes for recommendation
@app.route('/api/submitRecommendationSearch', methods=['POST'])
def submit_recommendation_search():
    data = request.get_json()
    print("Received JSON data:", data)
    
    requestData = data.get('requestData', {})
    selected_ingredients = requestData.get('ingredients', [])
    profile_id = requestData.get('profileID')
    
    print("Received selected ingredients:", selected_ingredients)
    print("Received profile ID:", profile_id)
    
    allergies = ['butter']  # You can fetch allergies based on profileID
    preferences = ['potatoes']  # You can fetch preferences based on profileID
    
    recommendationIDs = recipe_recommender.recommend_recipe(selected_ingredients, allergies, preferences)
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

@app.route('/api/getRecipes/<int:profile_id>', methods=['GET'])
def get_recipes(profile_id):
    print("profile id:  ", profile_id)
    all_recipe_ids = profile_manager.get_profiles_favourites(profile_id)
    all_recipes = recipe_manager.get_specific_recipe_data(all_recipe_ids)
    print("favourites:  ", all_recipes)
    return jsonify(all_recipes)

# get specific requested recipes from fetched id arguement
@app.route('/request/getRecipe', methods=['GET'])
def get_recipe():
    recipe_id = request.args.get('recipe_id')
    specific_recipe = recipe_manager.get_specific_recipe_data([recipe_id])
    print(specific_recipe)
    return jsonify(specific_recipe) if specific_recipe else jsonify({})


## USER LOGIN & AUTHENTICATION

@app.route('/profile')
@token_required(app.config['SECRET_KEY'])
def profile(current_user):
    user = profile_manager.get_user(current_user)
    if not user:
        return jsonify({'message': 'User not found!'}), 404
    avatar_base64 = None
    if user[3]:  # Check if avatar is not None
        avatar_base64 = base64.b64encode(user[3]).decode('utf-8')
    user_data = {
        'id': user[0],  # Assuming the first column is the user ID
        'username': user[1],  # Assuming the second column is the username
        'avatar': avatar_base64,  # Convert bytes to base64 string
        'favourites': user[4],
        'allergies': user[5],
        'preferences': user[6]
        # Assuming the third column is the password
        # Add other user details here
    }
    return jsonify(user_data), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print("Received username:", username)
    print("Received password:", password)
    if not username or not password:
        return jsonify({'message': 'Could not verify'}), 401
    
    user = profile_manager.get_user(username)
    print(user)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    print("Password from database:", user[2])
    print("Retrieved user from database:", user)
    if user[2] == password:
        token = jwt.encode({'username': username}, app.config['SECRET_KEY'], algorithm='HS256')
        print(token)
        return jsonify({'user': {'username': username, 'email': user[1]}, 'token': token})
    return jsonify({'message': 'Invalid password'}), 401

@app.route('/register', methods=['POST'])
def register():
    # get data and add to database
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    image_file = request.files.get('image')

    if not (username and password):
        return jsonify({'message': 'Missing username or password!'}), 400
    
    profile_manager.add_user(username, password)
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/add-to-favourites', methods=['POST'])
def add_to_favourites():
    recipe_id = request.args.get('recipeID')
    profile_id = request.args.get('profileID')

    # Check if recipeID exists in profile's FavouriteRecipes
    # If not, add it to FavouriteRecipes

    # Assuming you have a function to add a recipe to favorites in your profile_manager
    try:
        profile_manager.add_favourite_recipe(recipe_id, profile_id)
        return jsonify({'message': 'Recipe added to favorites successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Error adding recipe to favorites'}), 500
    
## VALIDATION

@app.route('/validate/check_username', methods=['POST'])
def check_username():
    data = request.get_json()
    username = data.get('username')
    users = profile_manager.get_all_users()
    if any(user[1] == username for user in users):
        return jsonify({'isUnique': False}), 400
    else:
        return jsonify({'isUnique': True}), 200
    
@app.route('/save-changes', methods=['POST'])
def save_changes():
    try:
        data = request.get_json()
        print(data)

        profile_manager.save_changes(data)
        response = {"message": "Changes saved successfully"}
        
        return jsonify(response)
    except KeyError as e:
        return jsonify({"error": f"KeyError: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"ValueError: {str(e)}"}), 400
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "An error occurred while saving changes"}), 500

if __name__ == "__main__":
    app.run(debug=True)
