import { useState } from "react";
import "./logon.css";

// Register form (does not fully function yet)

function SignupForm({ onBack, onSignup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(username);
    };

    return (
        <div className="auth-box">
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>

                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="button" type="submit">
                    Create Account
                </button>

                <button 
                    type="button" 
                    className="button-outline"
                    onClick={onBack}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
