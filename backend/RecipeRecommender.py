from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from backend.RecipeManager import RecipeManager
import numpy as np

class RecipeRecommender:
    def __init__(self, model_path='recipe_model.w2v'):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.model_path = model_path
        self.model = None
        self.db = RecipeManager()
    
    # process ingredient text to form into valid tokens for algorithmn
    def process_text(self, text):
        if isinstance(text, list):
            text = ' '.join(text)
        tokens = word_tokenize(text.lower())
        tokens = [self.lemmatizer.lemmatize(word) for word in tokens if word.isalnum()]
        tokens = [word for word in tokens if word not in self.stop_words]
        return tokens

    # pass data from the algorithm into the model allowing for persistent learning
    def train_word2vec(self, recipes):
        data = [self.process_text(ingredient_string) for ingredient_string in recipes.values()]
        self.model = Word2Vec(data, min_count=1)
        self.model.save(self.model_path)
    
    # calculate the cosine similarity between two inputted string tokens
    def calculate_similarity(self, input_ingredients, recipe_ingredients, preferences=[]):
        input_vector = self.calculate_vector(input_ingredients)
        recipe_vector = self.calculate_vector(recipe_ingredients)
        
        preference_weight = 2  # adjust this value to set preference weight
        
        weighted_input_vector = input_vector.copy()
        for pref in preferences:
            if pref in self.model.wv:
                weighted_input_vector += preference_weight * self.model.wv[pref]
        
        similarity = cosine_similarity([weighted_input_vector], [recipe_vector])[0][0]
        return similarity

    # form a vector for words passed into the model
    def calculate_vector(self, words):
        vectors = []
        for word in words:
            if word in self.model.wv:
                vectors.append(self.model.wv[word])
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            return np.zeros((self.model.vector_size,))
    
    # recommend recipes based on inputted ingredient string
    def recommend_recipe(self, ingredient_string, allergies=[], preferences=[]):
        recipes = self.db.get_all_recipe_for_recommendation()
        if not self.model:
            self.train_word2vec(recipes)
        
        input_ingredients = self.process_text(ingredient_string)
        
        # filter recipes based on restrictions
        filtered_recipes = {}
        for recipe_name, ingredients in recipes.items():
            recipe_ingredients = self.process_text(ingredients)
            if not any(restriction in recipe_ingredients for restriction in allergies):
                filtered_recipes[recipe_name] = ingredients
        
        similarity_scores = {}
        for recipe_name, ingredients in filtered_recipes.items():
            recipe_ingredients = self.process_text(ingredients)
            similarity = self.calculate_similarity(input_ingredients, recipe_ingredients, preferences)
            similarity_scores[recipe_name] = similarity
        
        sorted_recipes = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)[:10]
        return [recipe_id for recipe_id, _ in sorted_recipes]
