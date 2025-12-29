import { useState } from "react";

// Hardcoded Defaults function for connection to DB

function ConnectionModal({ onClose, onSuccess, isConnected, dbName }) {
    const [form, setForm] = useState({
        host: "127.0.0.1",
        port: "3306",
        database: "",
        user: "",
        password: ""
    });

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError("");
        setStatus("Testing connection...");

        for (const key in form) {
            if (!form[key]) {
                setStatus("");
                setError("All fields are required.");
                return;
            }
        }

        try {
            const res = await fetch("http://127.0.0.1:5000/api/update-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.status === "success") {
                setStatus("✅ Connected successfully");

                if (onSuccess) onSuccess();

                setTimeout(() => {
                    onClose();
                }, 800);
            } else {
                setStatus("");
                setError(data.message || "Connection failed");
            }
        } catch {
            setStatus("");
            setError(
                "Connection error. Please relog and try again."
            );
        }
    };

    return (
        <div className="modal-overlay">
            <div className="auth-box" style={{ width: "420px" }}>
                <h2>Database Connection Settings</h2>

                {isConnected && (
                    <p style={{ fontSize: "0.8rem", color: "#ffcc66" }}>
                        ⚠ You are currently connected to <strong>{dbName}</strong>.
                        Updating credentials disrupt the active connection.
                    </p>
                )}

                <input name="host" placeholder="Host" value={form.host} onChange={handleChange} />
                <input name="port" placeholder="Port" value={form.port} onChange={handleChange} />
                <input name="database" placeholder="Database" value={form.database} onChange={handleChange} />
                <input name="user" placeholder="Username" value={form.user} onChange={handleChange} />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                {status && <p style={{ color: "#6affb0" }}>{status}</p>}
                {error && <p style={{ color: "#ff7777" }}>{error}</p>}

                <button className="button" onClick={handleSave}>
                    Save & Test
                </button>

                <button className="button-outline" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default ConnectionModal;
