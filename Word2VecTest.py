from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from backend.DatabaseManager import DatabaseManager
import numpy as np

class RecipeRecommendation:
    def __init__(self, model_path='recipe_model.w2v'):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.model_path = model_path
        self.model = None
        self.db = DatabaseManager()

    def process_text(self, text):
        if isinstance(text, list):
            text = ' '.join(text)
        tokens = word_tokenize(text.lower())
        tokens = [self.lemmatizer.lemmatize(word) for word in tokens if word.isalnum()]
        tokens = [word for word in tokens if word not in self.stop_words]
        return tokens

    def train_word2vec(self, recipes):
        data = [self.process_text(ingredient_string) for ingredient_string in recipes.values()]
        self.model = Word2Vec(data, min_count=1)
        self.model.save(self.model_path)
        
    def calculate_similarity(self, input_ingredients, recipe_ingredients):
        input_vector = self.calculate_vector(input_ingredients)
        recipe_vector = self.calculate_vector(recipe_ingredients)
        similarity = cosine_similarity([input_vector], [recipe_vector])[0][0]
        return similarity

    def calculate_vector(self, words):
        vectors = []
        for word in words:
            if word in self.model.wv:
                vectors.append(self.model.wv[word])
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            # Return zero vector if no matching words are found
            return np.zeros((self.model.vector_size,))

    def recommend_recipe(self, ingredient_string):
        # Get recipes from the database
        recipes = self.db.get_all_recipe_for_recommendation()
        if not self.model:
            self.train_word2vec(recipes)
        input_ingredients = self.process_text(ingredient_string)
        similarity_scores = {}
        for recipe_name, ingredients in recipes.items():
            # Process recipe ingredients
            recipe_ingredients = self.process_text(ingredients)
            # Calculate cosine similarity
            similarity = self.calculate_similarity(input_ingredients, recipe_ingredients)
            similarity_scores[recipe_name] = similarity
        sorted_recipes = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)
        return sorted_recipes



# # Example usage
# DatabaseManag = DatabaseManager()
# recommendation = RecipeRecommendation()
# similar_recipes = recommendation.recommend_recipe("{beef, tomato}")
# for recipe, similarity in similar_recipes[:10]:
#     print(f"{recipe}: Cosine similarity: {similarity}")
