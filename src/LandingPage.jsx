import { useEffect, useState } from "react";
import ConnectionModal from "./ConnectionModal";
import RandomWorkoutGen from "./components/RandomWorkoutGen";
import Movements from "./components/Movements";

function LandingPage({ username, onLogout }) {
    const [showConnectionModal, setShowConnectionModal] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    const [dbStatus, setDbStatus] = useState({
        connected: false,
        name: null
    });

    const [checking, setChecking] = useState(false);

    {/* Checks SQL connectivity */}

    const checkConnection = async () => {
        setChecking(true);

        try {
            const res = await fetch("http://127.0.0.1:5000/api/test-connection");
            const data = await res.json();

            if (data.status === "success") {
                setDbStatus({
                    connected: true,
                    name: data.message.replace("Connected to database: ", "")
                });
            } else {
                setDbStatus({ connected: false, name: null });
            }
        } catch {
            setDbStatus({ connected: false, name: null });
        } finally {
            setChecking(false);
        }
    };

    {/* Runs once on page load: */}

    useEffect(() => {
        checkConnection();
    }, []);

    {/* Render active content */}

    const renderSection = () => {
        if (activeSection === "workout") {
            return <RandomWorkoutGen onClose={() => setActiveSection(null)} />;
        }

        if (activeSection === "movements") {
            return <Movements onClose={() => setActiveSection(null)} />;
        }

        return null;
    };

    return (
        <div className="auth-box db-container" style={{ width: "420px" }}>

    {/* DB STATUS BADGE */}

            <div
                className={`db-status ${
                    dbStatus.connected ? "connected" : "disconnected"
                }`}
            >
                {checking
                    ? "checking..."
                    : dbStatus.connected
                        ? `mysql: ${dbStatus.name}`
                        : "db disconnected"}
            </div>

            <h2>{username}'s main menu</h2>

            {!dbStatus.connected && (
                <p style={{ fontSize: "0.85rem", color: "#aaa", textAlign: "center" }}>
                    If your credentials are correct but the database is unreachable,
                    you may need to reboot your test environment or restart the backend
                    before the connection activates.
                </p>
            )}

    {/* MAIN MENU BUTTONS */}

            <div className="button-group">
                <button
                    className="button-outline"
                    onClick={() => setShowConnectionModal(true)}
                >
                    Connection Settings
                </button>

                <button
                    className="button-outline"
                    disabled={!dbStatus.connected}
                    onClick={() => setActiveSection("workout")}
                >
                    Workout Generator
                </button>

                <button
                    className="button-outline"
                    disabled={!dbStatus.connected}
                    onClick={() => setActiveSection("movements")}
                >
                    View All Movements
                </button>

                <button className="button-outline" onClick={onLogout}>
                    Log Out
                </button>
            </div>

    {/* ACTIVE CONTENT */}

            {renderSection()}

    {/*CONNECTION MODAL*/}

            {showConnectionModal && (
                <ConnectionModal
                    isConnected={dbStatus.connected}
                    dbName={dbStatus.name}
                    onSuccess={checkConnection}
                    onClose={() => setShowConnectionModal(false)}
                />
            )}
        </div>
    );
}

export default LandingPage;
