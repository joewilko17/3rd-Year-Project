import base64
import json
from flask import Flask, request, jsonify
from backend.DatabaseManager import DatabaseManager
from backend.ProfileManager import ProfileManager
from backend.RecipeRecommendation import RecipeRecommendation
from middleware import token_required
from werkzeug.utils import secure_filename
import secrets
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(24)
DatabaseManager = DatabaseManager()
profile_manager = ProfileManager()

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
    best_recipes = DatabaseManager.get_recipe_data(recommendationIDs[0])
    
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
@token_required(app.config['SECRET_KEY'])
def profile(current_user):
    user = profile_manager.get_user(current_user)
    if not user:
        return jsonify({'message': 'User not found!'}), 404

    user_data = {
        'id': user[0],  # Assuming the first column is the user ID
        'username': user[1],  # Assuming the second column is the username
        'avatar': base64.b64encode(user[3]).decode('utf-8'),  # Convert bytes to base64 string
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
    if username and password:
        profile_manager.add_user(username,password)
        return jsonify({'message': 'User registered successfully!'}), 201
    return jsonify({'message': 'Missing username or password!'}), 400

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
