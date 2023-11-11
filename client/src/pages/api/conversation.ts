const url = 'http://localhost:8000';
export const getConversationById = async(token:string,anotherUser:string)=>{
    try {
        const res = await fetch(`${url}/api/message/${anotherUser}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const chats = await res.json();
      
        if(chats === null){
            return []
        }
        console.log('chat via ID',chats)
        return chats;
    }
    catch (err) {
        console.log(err)
        return []
    }
}

export const sendMessage = async (token:string,text:string,receiverId:string)=>{
    console.log(
    {
        token,
        receiverId,
        text
    }
    )
    const response = await fetch(`${url}/api/message/add`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body:JSON.stringify({
            receiverId,
            text
        })
    })
    const responseJson = await response.json();
    console.log(responseJson)
    return responseJson.status
}