import sqlite3

class DatabaseManager:
    def __init__(self, ingredient_db='ingredientStorage.db', recipe_db='recipeStorage.db'):
        self.ingredient_db = ingredient_db
        self.recipe_db = recipe_db

    # get data from the ingredientStorage database for the frontend
    def get_food_groups(self):
        try:
            # Connect to the database
            con = sqlite3.connect(self.ingredient_db)
            cur = con.cursor()

            # Fetch table names from the database
            cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = cur.fetchall()

            # Filter out the table named 'sqlite_sequence'
            table_names = [table[0] for table in tables if table[0] != 'sqlite_sequence']

            # Initialize a list to store food groups
            food_groups = []

            # Fetch ingredients for each category
            for table_name in table_names:
                category_name = table_name.replace('_', ' ')
                cur.execute(f"SELECT Name FROM {table_name}")
                ingredients = [row[0] for row in cur.fetchall()]
                food_groups.append({"id": table_name, "name": category_name, "ingredients": ingredients})

            return food_groups

        except Exception as e:
            print("Error:", e)
            return []

        finally:
            # Close the connection
            con.close()

    # get recipe data specific to the recommendation algorithm
    def get_all_recipe_for_recommendation(self):
        try:
            con = sqlite3.connect(self.recipe_db)
            cur = con.cursor()
            
            cur.execute('''
            SELECT Recipes.RecipeID AS RecipeID, Recipes.Name AS RecipeName, GROUP_CONCAT(Ingredients.Name) AS Ingredients
            FROM Recipes
            INNER JOIN RecipeIngredients ON Recipes.RecipeID = RecipeIngredients.RecipeID
            INNER JOIN Ingredients ON RecipeIngredients.IngredientID = Ingredients.IngredientID
            GROUP BY Recipes.Name
            ''')
            rows = cur.fetchall()
            recipes = {}
            for row in rows:
                recipe_name = row[0]
                ingredients = row[1].split(',')
                recipes[recipe_name] = ingredients
            return recipes
        except Exception as e:
            print("Error:", e)
            return []
        finally:
            con.close()

    # get a specific range of recipes from the database
    def get_recipe_data(self, recipe_ids):
        try:
            # connect to the database
            con = sqlite3.connect(self.recipe_db)
            cur = con.cursor()
            recipes = []
            # iterate through recipe IDs and fetch recipes from the database
            recipe_ids = [int(recipe_id) for recipe_id in recipe_ids]
            for recipe_id in recipe_ids:
                cur.execute('''SELECT Recipes.RecipeID,Recipes.Name AS Name,Recipes.TimeToMake AS TimeToMake,GROUP_CONCAT(DISTINCT Ingredients.Name) AS Ingredients,
                                GROUP_CONCAT(DISTINCT Instructions.Instruction) AS Instructions
                                FROM Recipes
                                INNER JOIN RecipeIngredients ON Recipes.RecipeID = RecipeIngredients.RecipeID
                                INNER JOIN Ingredients ON RecipeIngredients.IngredientID = Ingredients.IngredientID
                                INNER JOIN RecipeInstructions ON Recipes.RecipeID = RecipeInstructions.RecipeID
                                INNER JOIN Instructions ON RecipeInstructions.InstructionID = Instructions.InstructionID
                                WHERE Recipes.RecipeID = ?
                                GROUP BY  Recipes.Name''', (recipe_id,))
                recipe_data = cur.fetchone()
                if recipe_data:
                    recipe = {
                        "RecipeID": recipe_data[0],
                        "Name": recipe_data[1],
                        "TimeToMake": recipe_data[2],
                        "Ingredients": recipe_data[3],
                        "Instructions": recipe_data[4]
                    }
                    recipes.append(recipe)
            return recipes
        except Exception as e:
            print("Error:", e)
            return []
        finally:
            # close connection
            con.close()
            
    # get all the recipes within the recipeStorage database
    def get_all_recipes(self):
        try:
            # connect to the database
            con = sqlite3.connect(self.recipe_db)
            cur = con.cursor()
            recipes = []
            
            cur.execute('''SELECT Recipes.RecipeID,Recipes.Name AS Name,Recipes.TimeToMake AS TimeToMake,GROUP_CONCAT(DISTINCT Ingredients.Name) AS Ingredients,
                            GROUP_CONCAT(DISTINCT Instructions.Instruction) AS Instructions
                            FROM Recipes
                            INNER JOIN RecipeIngredients ON Recipes.RecipeID = RecipeIngredients.RecipeID
                            INNER JOIN Ingredients ON RecipeIngredients.IngredientID = Ingredients.IngredientID
                            INNER JOIN RecipeInstructions ON Recipes.RecipeID = RecipeInstructions.RecipeID
                            INNER JOIN Instructions ON RecipeInstructions.InstructionID = Instructions.InstructionID
                            GROUP BY  Recipes.Name''')
            recipe_data = cur.fetchall()
            for recipe_row in recipe_data:
                recipe = {
                    "RecipeID": recipe_row[0],
                    "Name": recipe_row[1],
                    "TimeToMake": recipe_row[2],
                    "Ingredients": recipe_row[3],
                    "Instructions": recipe_row[4]
                }
                recipes.append(recipe)
            return recipes
        except Exception as e:
            print("Error:", e)
            return []
        finally:
            # close connection
            con.close()

