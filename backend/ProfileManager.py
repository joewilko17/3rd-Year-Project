import base64
import sqlite3

class ProfileManager:
    def __init__(self, profile_db='profileStorage.db'):
        self.profile_db = profile_db
    
    # add a new user to profile database
    def add_user(self, username, password):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("INSERT INTO Profiles (Username, Password) VALUES (?, ?)", (username, password))
        con.commit()
        con.close()

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
            
            # Check if profileImage contains a comma
            if ',' in profileImage:
                # Convert Base64 string to binary data
                profileImage = base64.b64decode(profileImage.split(",")[1])
            else:
                # Convert Base64 string to binary data
                profileImage = base64.b64decode(profileImage)
            
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


