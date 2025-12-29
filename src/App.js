import './App.css';
import { useState } from "react";
import SignupForm from "./front-end/SignupForm";
import LoginForm from "./front-end/LoginForm";
import LandingPage from "./LandingPage";
import loginVideo from "./assets/snatch.mp4";
import chalkVideo from "./assets/chalk.mp4";

    {/*Main App function*/}

function App() {
    const [screen, setScreen] = useState("home"); 
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <div className="App">

            {screen === "home" && (
                <div className="bg-video-page">

    {/* Fullscreen background video */}

                    <video
                        className="bg-video"
                        src={loginVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

    {/* Centered welcome content */}

                    <div className="bg-overlay">
                        <div className="home-box">
                            <h1>Welcome</h1>

                            <button 
                                className="button"
                                onClick={() => setScreen("signup")}
                            >
                                Register
                            </button>

                            <button 
                                className="button"
                                onClick={() => setScreen("login")}
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {screen === "login" && (
                <div className="login-bg">
                    <video
                        className="login-bg-video"
                        src={chalkVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

    {/* login form */}

                    <div className="login-overlay">
                        <LoginForm 
                            onBack={() => setScreen("home")}
                            onLogin={(username) => {
                                setCurrentUser(username);
                                setScreen("landing");
                            }}
                        />
                    </div>
                </div>
            )}

            {screen === "signup" && (
                <div className="auth-layout">
                    
    {/* Signup form */}

                    <div className="auth-panel">
                        <SignupForm 
                            onBack={() => setScreen("home")}
                            onSignup={(username) => {
                                setCurrentUser(username);
                                setScreen("landing");
                            }}
                        />
                    </div>

    {/* Promo video (side video of crossfit snatches) */}

                    <div className="video-panel">
                        <video
                            src={loginVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </div>
            )}

            {screen === "landing" && (
                <LandingPage 
                    username={currentUser} 
                    onLogout={() => {
                        setCurrentUser(null);
                        setScreen("home");
                    }} 
                />
            )}
        </div>
    );
}

export default App;
