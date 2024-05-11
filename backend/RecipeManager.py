import sqlite3

class RecipeManager:
    def __init__(self, ingredient_db='ingredientStorage.db', recipe_db='recipeStorage.db'):
        self.ingredient_db = ingredient_db
        self.recipe_db = recipe_db
    
    # get data from the ingredient storage database for find-recipes page
    def get_food_groups(self):
        try:
            con = sqlite3.connect(self.ingredient_db)
            cur = con.cursor()
            cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = cur.fetchall()
            table_names = [table[0] for table in tables if table[0] != 'sqlite_sequence']
            food_groups = []
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
            con.close()
            
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
    
     # get all the recipes within the recipe storage database
    def get_all_recipes(self):
        try:
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
            
     # get a specific recipes from the database
    def get_specific_recipe_data(self, recipe_ids):
        try:
            con = sqlite3.connect(self.recipe_db)
            cur = con.cursor()
            recipes = []
            
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
           
    # filter recipes by inputted keywords   
    def filter_recipes_by_keywords(self, all_recipes, keywords):
        keyword_recipes = []
        for recipe in all_recipes:
            if any(keyword.lower() in recipe['Name'].lower() or
                keyword.lower() in recipe['TimeToMake'].lower() or keyword.lower() in recipe['Ingredients'] for keyword in keywords):
                keyword_recipes.append(recipe)
        return keyword_recipes
    
    # filter recipes by selected time category
    def filter_recipes_by_time(self, all_recipes, filters):
        filtered_recipes = []

        for recipe in all_recipes:
            time_str = recipe["TimeToMake"].lower()

            if 'hrs' in time_str and 'mins' in time_str:
                time_parts = time_str.split()
                hours = time_parts[0].replace('hrs', '')
                minutes = time_parts[1].replace('mins', '')
                hours = int(hours)
                minutes = int(minutes)
                
            elif 'hr' in time_str and 'mins' in time_str:
                time_parts = time_str.split()
                hours = time_parts[0].replace('hr', '')
                minutes = time_parts[1].replace('mins', '')
                hours = int(hours)
                minutes = int(minutes)
            elif 'hrs' in time_str:
                hours = time_str.replace('hrs', '')
                hours = int(hours)
                minutes = 0
            elif 'mins' in time_str:
                hours = 0
                minutes = time_str.replace('mins', '')
                minutes = int(minutes)
            else:
                continue
            
            total_minutes = hours * 60 + minutes

            for time_filter in filters:
                if time_filter == "0-30mins" and total_minutes <= 30:
                    filtered_recipes.append(recipe)
                elif time_filter == "30mins-1hr" and 30 < total_minutes <= 60:
                    filtered_recipes.append(recipe)
                elif time_filter == "1hr-2hr" and 60 < total_minutes <= 119:
                    filtered_recipes.append(recipe)
                elif time_filter == "2hrs " and total_minutes >= 120:
                    filtered_recipes.append(recipe)
        return filtered_recipes


