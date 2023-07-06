from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, create_access_token,verify_jwt_in_request,jwt_required
from api.models import db, User
from api.models import User
from flask_cors import CORS
from flask import jsonify


app = Flask(__name__)
CORS(app)



api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route("/sign-up", methods=["POST"])
def sign_up():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify("Email and password are required"), 400
    
    check_user = User.query.filter_by(email=email).first()

    if check_user:
        return jsonify({
            'msg': 'The email address is already in use. Please login to your account to continue, or choose a different email.'
        }), 409

    user = User(
        email=email,
        password=password
    )

    if user is None:
        return jsonify("Failed to create user"), 400
    
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify(user.serialize()), 201
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify(error), 400

@api.route('/user-by-token', methods=['GET'])
def get_user_by_token():
    try:
        verify_jwt_in_request()
    except Exception as e:
        return jsonify({"error": str(e)}), 401

    current_user_id = get_jwt_identity()

    if current_user_id is None:
        return jsonify({"error": "No JWT provided"}), 401

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200

@api.route("/log-in", methods=["POST"])
def log_in():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify("Email and password are required"), 400
    
    user = User.query.filter_by(email=body.get("email")).one_or_none()
    if user is None or not user.check_password(body.get("password")):
        return jsonify("Invalid credentials"), 401
    else:
        token = create_access_token(identity=user.serialize())  # Create an access token using the serialized user data
        return jsonify({
        "user": user.serialize(),
        "token": token
    }), 200

@api.route("/logout", methods=["POST"])
def logout():
    return jsonify("Logout successful"), 200

# Register the API blueprint with the app
app.register_blueprint(api)

if __name__ == "__main__":
    app.run()



