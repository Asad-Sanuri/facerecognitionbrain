import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />    
                <div className='bounding-box' style={{top[i]: box.topRow, right[i]: box.rightCol, bottom[i]: box.bottomRow, left[i]: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;
