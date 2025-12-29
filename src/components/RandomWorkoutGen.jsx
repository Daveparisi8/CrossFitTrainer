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
        <div className="auth-box" style={{ width: "600px" }}>
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
                <p style={{ color: "#ff7777", marginTop: "10px" }}>
                    {error}
                </p>
            )}

            {workout.length > 0 && (
                <ul style={{ marginTop: "20px", paddingLeft: "0" }}>
                    {workout.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                listStyle: "none",
                                marginBottom: "14px",
                                padding: "14px",
                                border: "1px solid #333",
                                borderRadius: "8px",
                                background: "#111"
                            }}
                        >
                            <strong>{item.category_name}</strong><br />

                            {item.movement_name}<br />

                            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                Equipment: {item.equipment_name}
                            </span>

                            {item.recommended_reps > 0 && (
                                <>
                                    <br />
                                    <span style={{ fontSize: "0.85rem" }}>
                                        Reps: {item.recommended_reps}
                                    </span>
                                </>
                            )}

                            {item.recommended_weight > 0 && (
                                <>
                                    <br />
                                    <span style={{ fontSize: "0.85rem" }}>
                                        Weight: {Number(item.recommended_weight).toFixed(2)} lbs
                                    </span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ marginTop: "20px" }}>
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
