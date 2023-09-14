async function request(endpoint, method, data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        let response = null

        if(method === 'DELETE'){
            response = await fetch(url, {
                method: 'DELETE',
            });
        }else{
            response = await fetch(url, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
            });    
            if (!response.ok) {
                if (response.status === 400) {
                    const responseData = await response.json();
                    return { error: `Bad Request: ${responseData}` };
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }

    
            return await response.json();
        }

    } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
    }
}


