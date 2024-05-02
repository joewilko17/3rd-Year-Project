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
    
    # delete a user from the profile database
    def delete_user(self, username):
        con = sqlite3.connect(self.profile_db)
        cur = con.cursor()
        cur.execute("DELETE FROM Profiles WHERE Username=?", (username,))
        con.commit()
        con.close()