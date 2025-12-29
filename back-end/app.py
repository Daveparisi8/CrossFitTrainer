from flask import jsonify
from RandomWorkoutGen import RandomWorkoutGenerator


@app.route("/api/my-workout", methods=["GET"])
def my_workout():
    try:
        workout = RandomWorkoutGenerator.generate()
        return jsonify({
            "status": "success",
            "workout": workout
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

