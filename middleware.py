import jwt
from functools import wraps
from flask import request, jsonify

def token_required(secret_key):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None

            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split()[1]
                #print(token)

            if not token:
                return jsonify({'message': 'Token is missing!'}), 401

            try:
                data = jwt.decode(token, secret_key, algorithms=['HS256'])
                print("Decoded token data:", data)
                current_user = data['username']
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token is expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Token is invalid!'}), 401

            return f(current_user, *args, **kwargs)

        return decorated
    return decorator
