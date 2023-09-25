
const SET_MESSAGES = 'messages/SET_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGES'


export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

export const createMessage = (messages) => ({
    type: CREATE_MESSAGE,
    payload: messages
})


export const getMessages = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/${serverId}/${channelId}/messages`);
    console.log('RESPONSE', response)
    if (response) {
        const getChannelMessages = await response.json();
        console.log('MADE THROUGH RESPONSE.OK')
        const channelMessages = getChannelMessages.messages
        dispatch(setMessages(channelMessages))
    }
    // console.log('BAD RESPONSE')
}

export const postMessage = (serverId, channelId, message_text) => async (dispatch)=> {
    console.log('MESSAGE TEXT', message_text)
    const response = await fetch(`/api/${serverId}/${channelId}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message_text)})
        console.log('POST MESSAGE RESPONSE', response)
    if (response){
        const newMessage = await response.json()
        console.log(newMessage)
        // server id in response?
        dispatch(getMessages(serverId, channelId))
    }
}



const initialState = {
    channelMessages: {}
};


export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGES:
            return { ...state, channelMessages: action.payload };
        default:
            return state;
    }
};
