SELECT Recipes.RecipeID, Recipes.Name, Ingredients.Name
        FROM Recipes
        INNER JOIN RecipeIngredients ON Recipes.RecipeID = RecipeIngredients.RecipeID
        INNER JOIN Ingredients ON RecipeIngredients.IngredientID = Ingredients.IngredientID