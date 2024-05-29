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
                            <a className={`link ${window.location.pathname === '/gpts' && 'selected-link' }`} href='/gpts'>GPT Models</a>
                            <a className={`link ${window.location.pathname === '/assistants' && 'selected-link' }`} href='/assistants'>Assistants</a>
                            <a className={`link ${window.location.pathname === '/imagetotext' && 'selected-link' }`} href='/imagetotext'>Image to Text</a>
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