import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt scale='1.15' className='Tilt br2 shadow-2' style={{ height: 150, width: 150}}>
                <div className='Tilt-inner pa3'>
                    <img style={{ paddingTop:'5px' }} alt='logo-brain' src={brain}/>
                </div>                       
            </Tilt>
        </div>
    );
}

export default Logo;