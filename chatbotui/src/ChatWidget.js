import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './assets/css/demo.css';
import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css';
import './assets/vendor/css/pages/app-chat.css';
import './assets/vendor/fonts/flag-icons.css';
import './assets/vendor/fonts/remixicon/remixicon.css';
import './assets/vendor/libs/node-waves/node-waves.css';
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import './assets/vendor/libs/typeahead-js/typeahead.css';
import './assets/vendor/libs/bootstrap-maxlength/bootstrap-maxlength.css';

const ChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const chatBodyRef = useRef(null);
    const [isSending, setIsSending] = useState(false); // To handle loading state
    const [image, setImage] = useState(null); // To handle image upload

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() === '') return;

        const newMessage = { role: 'user', content: userMessage };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setUserMessage('');
        setIsSending(true); // Set loading state to true

        try {
            const response = await axios.post('http://localhost:5000/recipe', {
                ingredients: userMessage,
            });

            const botMessage = response.data.response
                ? { role: 'assistant', content: response.data.response }
                : { role: 'assistant', content: 'Sorry, I did not understand your request.' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'assistant', content: 'An error occurred while processing your request.'+error };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsSending(false); // Set loading state to false after response
        }
        setImage(null); // Clear the uploaded image after sending

    };
    const getMessage = (msg, index) => {
        var response = msg.content.split('\n');
        return (
            <>
                {
                    msg.role == "user" ?
                        <li key={index} className="chat-message chat-message-right">
                            <div className="d-flex overflow-hidden">
                                <div className="chat-message-wrapper flex-grow-1">
                                    <div className="chat-message-text">
                                        {response.map((responseItem, i) => (
                                            <p key={i}>{responseItem}</p>
                                        ))}
                                        {/* <p className="mb-0">How can we help? We're here for you! 😄</p> */}
                                    </div>
                                    <div className="text-end text-muted mt-1">
                                        <i className="ri-check-double-line ri-14px text-success me-1"></i>
                                        <small>10:00 AM</small>
                                    </div>
                                </div>
                                <div className="user-avatar flex-shrink-0 ms-4">
                                    <div className="avatar avatar-sm">
                                        <img src="../../assets/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                                    </div>
                                </div>
                            </div>
                        </li>
                        :
                        <li key={index} class="chat-message">
                            <div class="d-flex overflow-hidden">
                                <div class="user-avatar flex-shrink-0 me-4">
                                    <div class="avatar avatar-sm">
                                        <img src="../../assets/img/avatars/4.png" alt="Avatar" class="rounded-circle" />
                                    </div>
                                </div>
                                <div class="chat-message-wrapper flex-grow-1">
                                    <div class="chat-message-text">
                                        {response.map((responseItem, i) => (
                                            <p key={i}>{responseItem}</p>
                                        ))}
                                        {/* <p class="mb-0">Hey John, I am looking for the best admin template.</p>
                                        <p class="mb-0">Could you please help me to find it out? 🤔</p> */}
                                    </div>
                                    <div class="text-muted mt-1">
                                        <small>10:02 AM</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                }
            </>
            // <div key={index} className={`message ${msg.role}`}>
            //     {response.map((responseItem, i) => (
            //         <p key={i}>{responseItem}</p>
            //     ))}
            // </div>
        );
    };
    // const getMessage = (msg, index) => {
    //     var response = msg.content.split('\n');
    //     return (
    //         <div key={index} className={`message ${msg.role}`}>
    //             {response.map((responseItem, i) => (
    //                 <p key={i}>{responseItem}</p>
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <span>
            <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
                <div class="layout-container">
                    {/* <Topbar /> */}
                    <div class="layout-page">
                        <div class="content-wrapper">
                            {/* <Webmenu /> */}
                            <div class="container-xxl flex-grow-1 container-p-y">
                                <div class="app-chat card overflow-hidden">
                                    <div class="">
                                        <div class="app-chat-history">
                                            <div class="chat-history-wrapper chat-background">
                                                <div class="chat-history-header pb-0">
                                                    <div className='chat-header rounded-3 px-5 py-3'>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div class="d-flex overflow-hidden align-items-center">
                                                                <div class="flex-shrink-0 avatar">
                                                                    <img
                                                                        src="../../assets/img/image.jpg"
                                                                        alt="Avatar"
                                                                        class="rounded-circle"
                                                                        data-bs-toggle="sidebar"
                                                                        data-overlay
                                                                        data-target="#app-chat-sidebar-right" />
                                                                </div>
                                                                <div class="chat-contact-info flex-grow-1 ms-4">
                                                                    <h4 class="m-0 fw-medium">National Foods</h4>
                                                                    {/* <small class="user-status text-body">NextJS developer</small> */}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex align-items-center">
                                                                {/* <i
                                                                class="ri-phone-line ri-20px cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary btn-icon rounded-pill"></i>
                                                            <i
                                                                class="ri-video-add-line ri-20px cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary btn-icon rounded-pill"></i> */}
                                                                <i
                                                                    class="ri-search-line ri-20px cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary btn-icon rounded-pill"></i>
                                                                <div class="dropdown">
                                                                    <button
                                                                        class="btn btn-sm btn-icon btn-text-secondary rounded-pill dropdown-toggle hide-arrow"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="true"
                                                                        id="chat-header-actions">
                                                                        <i class="ri-more-2-line ri-20px"></i>
                                                                    </button>
                                                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                                                                        <a class="dropdown-item" href="javascript:void(0);">View Contact</a>
                                                                        <a class="dropdown-item" href="javascript:void(0);">Mute Notifications</a>
                                                                        <a class="dropdown-item" href="javascript:void(0);">Block Contact</a>
                                                                        <a class="dropdown-item" href="javascript:void(0);">Clear Chat</a>
                                                                        <a class="dropdown-item" href="javascript:void(0);">Report</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="chat-history-body">
                                                    <ul class="list-unstyled chat-history">
                                                        {messages.map(getMessage)}
                                                    </ul>
                                                </div>
                                                <div class="chat-history-footer pt-0 mt-0">
                                                    <div class="form-send-message d-flex justify-content-between align-items-center">
                                                        <input
                                                            class="form-control message-input me-4 shadow-none"
                                                            placeholder="Type your message here..."
                                                            value={userMessage}
                                                            onChange={(e) => setUserMessage(e.target.value)}
                                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                                                        <div class="message-actions d-flex align-items-center">
                                                            <i
                                                                class="btn btn-sm btn-text-secondary btn-icon rounded-pill speech-to-text ri-mic-line ri-20px cursor-pointer text-heading"></i>
                                                            <label for="attach-doc" class="form-label mb-0">
                                                                <i
                                                                    class="ri-attachment-2 ri-20px cursor-pointer btn btn-sm btn-text-secondary btn-icon rounded-pill me-2 ms-1 text-heading"></i>
                                                                <input type="file" onChange={handleImageUpload} id="attach-doc" hidden />
                                                            </label>
                                                            <button onClick={handleSendMessage} class="btn btn-primary d-flex send-msg-btn" disabled={isSending}>
                                                                <span class="align-middle">Send</span>
                                                                {isSending && <div class="spinner-border spinner-border-sm ms-2" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div>}
                                                                <i class="ri-send-plane-line ri-16px ms-md-2 ms-0"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="app-chat-sidebar-right app-sidebar overflow-hidden" id="app-chat-sidebar-right">
                                            <div
                                                class="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-5 pt-12">
                                                <div class="avatar avatar-xl avatar-online chat-sidebar-avatar">
                                                    <img src="../../assets/img/avatars/4.png" alt="Avatar" class="rounded-circle" />
                                                </div>
                                                <h5 class="mt-4 mb-0">Felecia Rower</h5>
                                                <span>NextJS Developer</span>
                                                <i
                                                    class="ri-close-line ri-24px cursor-pointer close-sidebar d-block"
                                                    data-bs-toggle="sidebar"
                                                    data-overlay
                                                    data-target="#app-chat-sidebar-right"></i>
                                            </div>
                                            <div class="sidebar-body px-6">
                                                <div class="my-6">
                                                    <p class="text-uppercase mb-1 text-muted">About</p>
                                                    <p class="mb-0">
                                                        A Next. js developer is a software developer who uses the Next. js framework alongside ReactJS
                                                        to build web applications.
                                                    </p>
                                                </div>
                                                <div class="my-6">
                                                    <p class="text-uppercase mb-1 text-muted">Personal Information</p>
                                                    <ul class="list-unstyled d-grid gap-3 mb-0 ms-2 py-2 text-heading">
                                                        <li class="d-flex align-items-center">
                                                            <i class="ri-mail-line ri-22px"></i>
                                                            <span class="align-middle ms-2">josephGreen@email.com</span>
                                                        </li>
                                                        <li class="d-flex align-items-center">
                                                            <i class="ri-phone-line ri-22px"></i>
                                                            <span class="align-middle ms-2">+1(123) 456 - 7890</span>
                                                        </li>
                                                        <li class="d-flex align-items-center">
                                                            <i class="ri-time-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Mon - Fri 10AM - 8PM</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="my-6">
                                                    <p class="text-uppercase text-muted mb-1">Options</p>
                                                    <ul class="list-unstyled d-grid gap-3 ms-2 py-2 text-heading">
                                                        <li class="cursor-pointer d-flex align-items-center">
                                                            <i class="ri-bookmark-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Add Tag</span>
                                                        </li>
                                                        <li class="cursor-pointer d-flex align-items-center">
                                                            <i class="ri-user-star-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Important Contact</span>
                                                        </li>
                                                        <li class="cursor-pointer d-flex align-items-center">
                                                            <i class="ri-image-2-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Shared Media</span>
                                                        </li>
                                                        <li class="cursor-pointer d-flex align-items-center">
                                                            <i class="ri-delete-bin-7-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Delete Contact</span>
                                                        </li>
                                                        <li class="cursor-pointer d-flex align-items-center">
                                                            <i class="ri-forbid-2-line ri-22px"></i>
                                                            <span class="align-middle ms-2">Block Contact</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex mt-6">
                                                    <button
                                                        class="btn btn-danger w-100"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay
                                                        data-target="#app-chat-sidebar-right">
                                                        Delete Contact<i class="ri-delete-bin-7-line ri-16px ms-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="app-overlay"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default ChatWidget;