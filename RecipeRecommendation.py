from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from backend.DatabaseManager import DatabaseManager

class RecipeRecommendation:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.db = DatabaseManager()
        
    def process_text(self, text):
        if isinstance(text, list):
            tokens = [word.lower() for word in text if word.isalnum()]
        else:
            tokens = word_tokenize(text.lower())
            tokens = [word for word in tokens if word.isalnum()]
        tokens = [self.lemmatizer.lemmatize(word) for word in tokens]
        tokens = [word for word in tokens if word not in self.stop_words]
        #print("Processed tokens:", tokens)
        return ' '.join(tokens)

    def recommend_recipe(self, ingredient_string):
        # Process the text
        processed_ingredients = self.process_text(ingredient_string)
        # Get recipes from the database
        recipes = self.db.get_all_recipe_for_recommendation()
        # Process text of recipes stored in the database (ingredients)
        recipe_text = {recipe: self.process_text(", ".join(ingredients)) for recipe, ingredients in recipes.items()}
        # Create TF-IDF vectorizer
        X = self.vectorizer.fit_transform([processed_ingredients] + list(recipe_text.values()))
        # Calculate cosine similarity
        similarities = cosine_similarity(X[0:1], X[1:])[0]
        # Find indices of the top 10 similar recipes
        top_10_indices = similarities.argsort()[-10:][::-1]  # Indices of the top 10 most similar recipes
        top_10_recipes = [list(recipe_text.keys())[i] for i in top_10_indices]

        return top_10_recipes