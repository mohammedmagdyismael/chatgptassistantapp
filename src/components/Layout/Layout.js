import React, { useState } from 'react';
import Vlogo from '../assets/images/Vlogo.png';
import OpenAILogo from '../assets/images/openaiLogo.png';

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
                            <a className={`link ${window.location.pathname === '/chatassistant' && 'selected-link' }`} href='/chatassistant'>OpenAI Chat Assistant</a>
                            <a className={`link ${window.location.pathname === '/vezeetacallCenter' && 'selected-link' }`} href='/vezeetacallCenter'>OpenAI Chat Assistant (Vezeeta Call Center)</a>
                            <a className={`link ${window.location.pathname === '/vezeetaCallCentercontextflow' && 'selected-link' }`} href='/vezeetaCallCentercontextflow'>OpenAI Chat Assistant (Vezeeta Call Center Context Flow)</a>
                            <a className={`link ${window.location.pathname === '/contentwriter' && 'selected-link' }`} href='/contentwriter'>OpenAI Chat Assistant (Content Writer)</a>
                            <a className={`link ${window.location.pathname === '/reviewsclassification' && 'selected-link' }`} href='/reviewsclassification'>OpenAI Chat Assistant (Reviews Classification)</a>
                            <a className={`link ${window.location.pathname === '/keywordextraction' && 'selected-link' }`} href='/keywordextraction'>OpenAI Chat Assistant (Key Word Extraction)</a>
                            <a className={`link ${window.location.pathname === '/imagegeneration' && 'selected-link' }`} href='/imagegeneration'>Image Generation</a>
                            <a className={`link ${window.location.pathname === '/chattochattalk' && 'selected-link' }`} href='/chattochattalk'>Bot to Bot Chat</a>
                            <a className={`link ${window.location.pathname === '/pharmaciesfiles' && 'selected-link' }`} href='/pharmaciesfiles'>Pharmacies Files</a>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

export default Layout;