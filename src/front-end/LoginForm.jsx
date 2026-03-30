import { useState } from "react";
import "./logon.css"; 


//Form for login function

function LoginForm({ onBack, onLogin }) {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username);
    };

    return (
        <div className="auth-box">
            <h2>Log In</h2>

            <form onSubmit={handleSubmit}>

                <label>What is your name?</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />


                <div className="button-group">
                    <button className="button" type="submit">
                        Start!
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
