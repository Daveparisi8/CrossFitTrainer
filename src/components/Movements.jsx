import { useEffect, useState } from "react";

function Movements({ onClose }) {
    const [movements, setMovements] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [newWeight, setNewWeight] = useState("");
    const [newReps, setNewReps] = useState("");

    // Filters
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [equipmentFilter, setEquipmentFilter] = useState("All");

    // Load movements
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/movements")
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setMovements(data.movements);
                }
            })
            .catch(err => console.error("Failed to load movements:", err));
    }, []);

    // Start editing a movement
    const startEdit = (movement) => {
        setEditingId(movement.movement_id);
        setNewWeight(
            movement.recommended_weight !== null
                ? movement.recommended_weight
                : ""
        );
        setNewReps(
            movement.recommended_reps !== null
                ? movement.recommended_reps
                : ""
        );
    };

    // Save changes
    const saveChanges = async (movement_id) => {
        const weightValue =
            newWeight === "" ? 0 : parseFloat(newWeight);
        const repsValue =
            newReps === "" ? 0 : parseInt(newReps, 10);

        await fetch(`http://127.0.0.1:5000/api/movements/${movement_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recommended_weight: weightValue,
                recommended_reps: repsValue
            })
        });

        setMovements(prev =>
            prev.map(m =>
                m.movement_id === movement_id
                    ? {
                        ...m,
                        recommended_weight: weightValue,
                        recommended_reps: repsValue
                    }
                    : m
            )
        );

        setEditingId(null);
        setNewWeight("");
        setNewReps("");
    };

    // Filters
    const categories = ["All", ...new Set(movements.map(m => m.category_name))];
    const equipment = ["All", ...new Set(movements.map(m => m.equipment_name))];

    const filteredMovements = movements.filter(m =>
        (categoryFilter === "All" || m.category_name === categoryFilter) &&
        (equipmentFilter === "All" || m.equipment_name === equipmentFilter)
    );

    return (
        <div
            className="auth-box movements-box"
            style={{ width: "1200px", maxWidth: "95vw" }}
        >
            <h2>All CrossFit Movements</h2>
            <p>
                Browse movements, filter by category or equipment,
                and customize recommended reps and weights.
            </p>

            {/* Filters */}
            <div className="filter-row">
                <div className="filter-group">
                    <label>Movement Category</label>
                    <select
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Available Equipment</label>
                    <select
                        value={equipmentFilter}
                        onChange={e => setEquipmentFilter(e.target.value)}
                    >
                        {equipment.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Equipment</th>
                            <th>Recommended Reps</th>
                            <th>Recommended Weight (lbs)</th>
                            <th>Scale (modify) Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovements.map(m => (
                            <tr
                                key={m.movement_id}
                                style={{
                                    background:
                                        editingId === m.movement_id
                                            ? "#1b2a1f"
                                            : "transparent"
                                }}
                            >
                                <td>{m.movement_name}</td>
                                <td>{m.category_name}</td>
                                <td>{m.equipment_name}</td>

                                <td>
                                    {editingId === m.movement_id ? (
                                        <input
                                            type="number"
                                            step="1"
                                            value={newReps}
                                            onChange={e => setNewReps(e.target.value)}
                                            style={{ width: "80px" }}
                                        />
                                    ) : m.recommended_reps > 0 ? (
                                        m.recommended_reps
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td>
                                    {editingId === m.movement_id ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={newWeight}
                                            onChange={e => setNewWeight(e.target.value)}
                                            style={{ width: "100px" }}
                                        />
                                    ) : m.recommended_weight > 0 ? (
                                        Number(m.recommended_weight).toFixed(2)
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td>
                                    {editingId === m.movement_id ? (
                                        <button
                                            className="button"
                                            onClick={() => saveChanges(m.movement_id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="button-outline"
                                            onClick={() => startEdit(m)}
                                        >
                                            Scale
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {filteredMovements.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                    No movements match the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                className="button-outline"
                style={{ marginTop: "20px" }}
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
}

export default Movements;
