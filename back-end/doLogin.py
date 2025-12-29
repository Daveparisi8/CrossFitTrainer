from flask import Flask, jsonify, request
from flask_cors import CORS
from bll import FITNESS_BLL_MOVEMENTS, FITNESS_BLL_WORKOUTS
import mysql.connector
from config import config

#Test DB connection, retrieve all movements in table, update values, generate random workout module, 

app = Flask(__name__)
CORS(app)

@app.route("/api/test-connection")
def test_connection():
    try:
        db = mysql.connector.connect(**config)
        cursor = db.cursor()
        cursor.execute("SELECT DATABASE()")
        name = cursor.fetchone()[0]
        cursor.close()
        db.close()

        return jsonify({
            "status": "success",
            "message": f"Connected to database: {name}"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/movements", methods=["GET"])
def get_movements():
    movements = FITNESS_BLL_MOVEMENTS.get_all_movements()
    return jsonify({
        "status": "success",
        "movements": movements
    })

@app.route("/api/movements/<int:movement_id>", methods=["PUT"])
def update_movement(movement_id):
    data = request.json

    FITNESS_BLL_MOVEMENTS.update_movement(
        movement_id,
        data.get("recommended_reps"),
        data.get("recommended_weight")
    )

    return jsonify({"status": "success"})

@app.route("/api/my-workout", methods=["GET"])
def random_workout():
    workout = FITNESS_BLL_WORKOUTS.generate_random_workout()
    return jsonify({
        "status": "success",
        "workout": workout
    })

if __name__ == "__main__":
    app.run(debug=True)
