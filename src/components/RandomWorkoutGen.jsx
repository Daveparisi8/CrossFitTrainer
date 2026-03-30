import { useState } from "react";

function RandomWorkoutGen({ onClose }) {
    const [workout, setWorkout] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const generateWorkout = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:5000/api/my-workout");
            const data = await res.json();

            if (data.status === "success") {
                setWorkout(data.workout);
            } else {
                setError(data.message || "Failed to generate workout");
            }
        } catch {
            setError("Backend unreachable");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setWorkout([]);
        setError("");
        if (onClose) onClose();
    };

    return (
        <div className="auth-box workout-panel">
            <h2>Random Workout Generator</h2>
            <p>
                Generates one movement per category using recommended reps and weights.
            </p>

            <button
                className="button"
                onClick={generateWorkout}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Workout"}
            </button>

            {error && (
                <p className="status-text error">
                    {error}
                </p>
            )}

            {workout.length > 0 && (
                <ul className="workout-list">
                    {workout.map((item, index) => (
                        <li key={index} className="workout-item">
                            <strong>{item.category_name}</strong><br />

                            {item.movement_name}<br />

                            <span className="muted">
                                Equipment: {item.equipment_name}
                            </span>

                            {item.recommended_reps > 0 && (
                                <>
                                    <br />
                                    <span className="muted">
                                        Reps: {item.recommended_reps}
                                    </span>
                                </>
                            )}

                            {item.recommended_weight > 0 && (
                                <>
                                    <br />
                                    <span className="muted">
                                        Weight: {Number(item.recommended_weight).toFixed(2)} lbs
                                    </span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <div className="panel-actions">
                <button
                    className="button-outline"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default RandomWorkoutGen;
