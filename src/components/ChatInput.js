import React, {  useState } from 'react';
import styled from 'styled-components'
import { Button } from '@mui/material';
import { auth, db } from '../firebase';
import { addDoc, serverTimestamp, doc, collection  } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName, channelId, chatRef}) {

    const [user] = useAuthState(auth);

    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if ( !channelId ){
            return false;
        }
        const docRef = doc(db, 'rooms', channelId); // get the current document (based on the channelId)
        const colRef = collection(docRef,"messages"); // subcollection 'messages'
        // add a document in the subcollection message
        addDoc(colRef, {
            message: input,
             timestamp: serverTimestamp(),
             user: user.displayName,
             userImage: user.photoURL,
        })  
        chatRef.current.scrollIntoView({
            behavior:"smooth",
        })
        setInput(''); 
    }
  return (
    <ChatInputContainer>
        <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
            <Button hidden type='submit' onClick={sendMessage}>
                Send
            </Button>
        </form>
    </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center
    }

    > form > input  {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1 px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`