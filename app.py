# backend/app.py
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://testuser:testuser@cluster0.qtyebgh.mongodb.net/?retryWrites=true&w=majority'  # Replace with your MongoDB URI
mongo = PyMongo(app)

# Overlay routes
@app.route('/overlays', methods=['POST'])
def create_overlay():
    try:
        data = request.json
        mongo.db.overlays.insert_one(data)
        return jsonify({'message': 'Overlay created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/overlays', methods=['GET'])
def get_overlays():
    try:
        overlays = list(mongo.db.overlays.find())
        return jsonify(overlays)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    try:
        data = request.json
        mongo.db.overlays.update_one({'_id': ObjectId(overlay_id)}, {'$set': data})
        return jsonify({'message': 'Overlay updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    try:
        mongo.db.overlays.delete_one({'_id': ObjectId(overlay_id)})
        return jsonify({'message': 'Overlay deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
