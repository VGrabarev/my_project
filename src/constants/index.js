const BACKEND_URL = "http://marketplace.node.ed.asmer.org.ua";

const GET_GQL = function(url) {
    return async function(query, variables) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(localStorage.authToken ? { "Authorization": "Bearer " + localStorage.authToken } : {})
            },
            body: JSON.stringify({ query, variables })
        });

        const data = await res.json();

        if (data.data) {
            return Object.values(data.data)[0];
        }
        else {
            throw new Error(JSON.stringify(data.errors));
        };
    };
};

const GQL = GET_GQL(BACKEND_URL + '/graphql');

let jwtDecode = function(token) {
    let payloadInBase64;
    let payloadInJson;
    let payload;

    try {
        payloadInBase64 = token.split(".")[1];
        payloadInJson = atob(payloadInBase64);
        payload = JSON.parse(payloadInJson);

        return payload;
    }
    catch(err) {

    }
};

export { GQL, jwtDecode, BACKEND_URL };