"use client";
import React from "react";

import { useState} from "react";
import {login} from "@/app/(site)/services/auth.service";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        const callbackUrl: string = new URL(window.location.href).searchParams.get('callbackUrl') || "/";
        await login({username, password}, callbackUrl)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-600">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-gray-900 text-3xl font-semibold mb-2">Welcome Back</h2>
                    <p className="text-gray-600">
                        Don't have an account?
                        <a href="#" className="text-blue-500 ml-2 hover:underline">
                            Create today!
                        </a>
                    </p>
                </div>

                <div>
                    <label htmlFor="username" className="block text-gray-900 font-medium mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <label htmlFor="password" className="block text-gray-900 font-medium mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                id="rememberme"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberme" className="text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-blue-500 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 border-none text-white font-medium rounded-md py-3 hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );

};

export default LoginPage;
