import { loginRequest, reportConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function getMsGraph(endPoint, accessToken) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });
        accessToken = response.accessToken;
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(endPoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function postMsGraph(endPoint, jsonData, accessToken) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });
        accessToken = response.accessToken;
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(jsonData),
    };

    return fetch(endPoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
