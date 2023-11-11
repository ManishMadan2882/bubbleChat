import { responsiveFontSizes } from "@mui/material";
import { useState } from "react";

// The url implies to the backend APIs
const url = 'http://localhost:8000';


interface AuthPayload {
    email: string,
    password: string
}
const loginAPI = async (payload: Object) => {

    const response = await fetch(`${url}/api/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    const responseData = await response.json();
    return responseData;
}
const signupAPI = async (payload: Object) => {

    const response = await fetch(`${url}/api/auth/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    const responseData = await response.json();
    console.log(responseData)
    return responseData;
}
const getAuthenticatedUser = async (token: string) => {
    try {
        const response = await fetch(`${url}/api/auth/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.status !== 200)
            return null;
        const responseData = await response.json()
        return responseData; //contains the token
    }
    catch (error) {
        console.log(error)
        return null
    }
}

export default { loginAPI, signupAPI, getAuthenticatedUser }

