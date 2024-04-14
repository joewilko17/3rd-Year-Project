from flask import Flask, request, jsonify

app = Flask(__name__)



@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Get the JSON data sent in the request body
    data = request.get_json()
    print("Received JSON data:", request.get_json())

    # Extract the selected card and ingredients from the JSON data
    selected_ingredients = data.get('ingredients')

    # Process the data as needed
    # Example: Print the received data
    print("Received selected ingredients:", selected_ingredients)

    # Optionally, you can perform additional processing or save the data to a database

    # Respond to the client
    return jsonify({'message': 'Data received successfully'})


if __name__ == '__main__':
    app.run(debug=True)
