import React, { useState } from 'react';
import Vlogo from '../assets/images/Vlogo.png';
import OpenAILogo from '../assets/images/openaiLogo.png';
import './Layout.css';

const Layout = ({ children }) => {
    const [showSideBar, toggleSideBar] = useState(false);
    return(
        <div className='container'>
            <div className='wrapper'>
                <div className='logoContainer'>
                    <img src={Vlogo} alt="Vlogo" className='vlogo' />
                    <img onClick={() => toggleSideBar(true)} src={OpenAILogo} alt="OpenAILogo" className='openailogo' />
                </div>
                {showSideBar && (
                    <div className='sidebar-container'>
                        <div>
                            <p onClick={() => toggleSideBar(false)} className='close-link'>Close</p>
                        </div>
                        <div className='links-container'>
                            <a className='link' href='/chatassistant'>OpenAI Chat Assistant</a>
                            <a className='link' href='/vezeetareservation'>OpenAI Chat Assistant (Vezeeta Reservation)</a>
                            <a className='link' href='/contentwriter'>OpenAI Chat Assistant (Content Writer)</a>
                            <a className='link' href='/reviewsclassification'>OpenAI Chat Assistant (Reviews Classification)</a>
                            <a className='link' href='/templatefillin'>OpenAI Chat Assistant (Template Fill-in)</a>
                            <a className='link' href='/itemsselection'>OpenAI Chat Assistant (Items Selection)</a>
                            <a className='link' href='/keywordextraction'>OpenAI Chat Assistant (Key Word Extraction)</a>
                            <a className='link' href='/imagegeneration'>Image Generation</a>
                            <a className='link' href='/chattochattalk'>Bot to Bot Chat</a>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

export default Layout;