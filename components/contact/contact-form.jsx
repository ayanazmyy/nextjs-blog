import classes from './contact-form.module.css';
import { useState, useRef , useEffect} from 'react';
import Notification from '../ui/notification';

function ContactForm() {
    const [emailInput, setEmailInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [requestStatus, setRequestStatus] = useState({status: 'not set'});


    useEffect(()=> {
        if(requestStatus.status === 'success' || requestStatus.status === 'error') {
            const timer = setTimeout(()=>{
                setRequestStatus({status: 'not set'});
            }, 2000);

            return () => {
                clearTimeout(timer);
            }
        }
    } , [requestStatus.status])
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const messageInputRef = useRef();

    function sendMessageHandler(e) {
        setRequestStatus({
            title: 'Pending',
            message: 'Sending your message...',
            status: 'pending'
        });
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredMessage = messageInputRef.current.value;

        const messageData = {
            email: enteredEmail,
            name: enteredName,
            message: enteredMessage
        }

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(async response => {
            if(response.ok) {
                return response.json();
            }

            const data = await response.json();
            throw new Error('Some thing went wrong');
            
        })
        .then(data => {
            setRequestStatus({
                title: 'Success',
                message: 'Your message was sent successfully.',
                status: 'success'
            });
            console.log(data)
        })
        .catch(error => {
            setRequestStatus({
                title: 'Error',
                message: 'Something went wrong!',
                status: 'error'
            });

            console.log(error)
        })

        setEmailInput("");
        setNameInput("");
        setMessageInput("");
    }

    

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input required type="email" id="email" ref={emailInputRef} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input required type="text" id="name" ref={nameInputRef} value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea required id="message" rows="5" ref={messageInputRef} value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {requestStatus.status !== 'not set' && <Notification title={requestStatus.title} status={requestStatus.status} message={requestStatus.message}/>}
        </section>
    )
}

export default ContactForm;