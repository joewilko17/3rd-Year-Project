import base64
import os
import sqlite3

class ProfileManager:
    def __init__(self, profile_db='profileStorage.db'):
        self.profile_db = profile_db
        self.default_profile_image = os.path.join('front', 'public', 'user.png')
    
     # Add a new user to profile database
    def add_user(self, username, password, profile_image=None):
        try:
            con = sqlite3.connect(self.profile_db)
            cur = con.cursor()

            if profile_image and os.path.exists(profile_image):
                with open(profile_image, 'rb') as f:
                    profile_image_data = f.read()
            else:
                with open(self.default_profile_image, 'rb') as f:
                    profile_image_data = f.read()

            cur.execute("INSERT INTO Profiles (Username, Password, ProfileImage) VALUES (?, ?, ?)", (username, password, sqlite3.Binary(profile_image_data)))
            con.commit()
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return {"error": str(e)}
        finally:
            con.close()

        return {"message": "User added successfully"}

    # get the requested user from the profile database
    def get_user(self, username):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("SELECT * FROM Profiles WHERE Username=?", (username,))
        user = cur.fetchone()
        con.close()
        return user
    
    def get_all_users(self):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("SELECT * FROM Profiles")
        users = cur.fetchall()  # Changed from fetchone to fetchall
        con.close()
        return users
    
    # delete a user from the profile database
    def delete_user(self, username):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("DELETE FROM Profiles WHERE Username=?", (username,))
        con.commit()
        con.close()
        
    def get_profiles_favourites(self, profile_id):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("SELECT FavouriteRecipes FROM Profiles WHERE ProfileID = ?", (profile_id,))
        favorite_recipes = cur.fetchone()
        con.close()
        if favorite_recipes:
            favorite_recipes = favorite_recipes[0]
            if favorite_recipes:
                favorite_recipes = favorite_recipes.strip().split(',')  # Strip whitespace and split the comma-separated string into a list
            else:
                favorite_recipes = []  # If no favorite recipes found, return an empty list
        else:
            favorite_recipes = []  # If no favorite recipes found, return an empty list
        return favorite_recipes
        
    def save_changes(self, profile_data):
        try:
            conn = sqlite3.connect(self.profile_db)
            cursor = conn.cursor()
            id = profile_data['id']
            username = profile_data['username']
            profileImage = profile_data['avatar']  # Base64 string
            allergies = profile_data['allergies']
            preferences = profile_data['preferences']
            favourites = profile_data['favourites']
            
            if profileImage is not None:  # Check if avatar is not None
                # Check if profileImage contains a comma
                if ',' in profileImage:
                    # Convert Base64 string to binary data
                    profileImage = base64.b64decode(profileImage.split(",")[1])
                else:
                    # Convert Base64 string to binary data
                    profileImage = base64.b64decode(profileImage)
            else:
                profileImage = None
            
            # Update all profile data
            update_query = "UPDATE Profiles SET Username = ?, Allergies = ?, Preferences = ?, FavouriteRecipes = ?, ProfileImage = ? WHERE ProfileID = ?"
            values = (username, allergies, preferences, favourites, sqlite3.Binary(profileImage), id)
            cursor.execute(update_query, values)
            
            conn.commit()
            conn.close()

            return {"message": "Changes saved successfully"}
        except Exception as e:
            # Log the exception for debugging
            print(f"An error occurred: {str(e)}")
            return {"error": str(e)}
        
    def add_favourite_recipe(self, recipe_id, profile_id):
        try:
            con = sqlite3.connect(self.profile_db)
            cur = con.cursor()

            # Check if the recipe is already in the favorite recipes of the profile
            cur.execute("SELECT * FROM Profiles WHERE ProfileID = ? AND FavouriteRecipes LIKE ?", (profile_id, f"%{recipe_id}%",))
            profile = cur.fetchone()

            if profile:
                # Recipe already in favorites
                return "Recipe already in favorites"

            # Add the recipe to the favorite recipes of the profile
            cur.execute("UPDATE Profiles SET FavouriteRecipes = IFNULL(FavouriteRecipes,'') || ? WHERE ProfileID = ?", (f",{recipe_id}", profile_id))
            con.commit()
            return "Recipe added to favorites successfully"
        except Exception as e:
            print("Error adding recipe to favorites:", e)
            return "Error adding recipe to favorites"
        finally:
            con.close()



