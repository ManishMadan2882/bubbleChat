
// The url implies to the backend APIs
const url = 'http://localhost:8000';

export const searchUsers = async (searchedString: string) => {
    try {
        const response = await fetch(`${url}/api/search/?username=${searchedString}`)
        const responseData = await response.json()
        return responseData
    }
    catch (err) {
        console.log('something went wrong')
        return []
    }
}
export const loadConversations = async (token: string) => {
    try {
        const res = await fetch(`${url}/api/message`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const chats = await res.json();
        console.log('chats',chats)
        return chats;
    }
    catch (err) {
        console.log(err)
        return []
    }
}
