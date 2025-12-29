import { useState } from "react";
import "./logon.css"; 


//Form for login function

function LoginForm({ onBack, onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username);
    };

    return (
        <div className="auth-box">
            <h2>Log In</h2>

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

                <div className="button-group">
                    <button className="button" type="submit">
                        Log In
                    </button>

                    <button 
                        type="button" 
                        className="button-outline"
                        onClick={onBack}
                    >
                        Cancel
                    </button>
                    
                </div>

            </form>
        </div>
    );
}

export default LoginForm;
