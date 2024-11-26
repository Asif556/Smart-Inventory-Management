from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newdata.db'
db = SQLAlchemy(app)


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

@app.route('/Add', methods=['POST'])
def additems():
    data = request.get_json()
    newobj = Item(
        name=data['name'],
        quantity=data['quantity'],
        description=data['description']
    )
    db.session.add(newobj)
    db.session.commit()
    return jsonify({
        "id": newobj.id,
        "name": newobj.name,
        "quantity": newobj.quantity,
        "description": newobj.description
    })

@app.route('/display', methods=['GET'])
def display():
    items = Item.query.all()
    return jsonify([{
        "id": item.id,
        "name": item.name,
        "quantity": item.quantity,
        "description": item.description
    } for item in items])

@app.route('/update-quantity', methods=['POST'])
def update_quantity():
    data = request.get_json()
    item_id = data['id']
    quantity_to_remove = data['quantity']

    item = Item.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    if item.quantity < quantity_to_remove:
        return jsonify({"error": "Insufficient quantity available"}), 400

    item.quantity -= quantity_to_remove
    db.session.commit()

    return jsonify({
        "id": item.id,
        "name": item.name,
        "remaining_quantity": item.quantity,
        "description": item.description
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
