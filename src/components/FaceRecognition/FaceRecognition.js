import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, jer}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{top: box[1].topRow, right: box[1].rightCol, bottom: box[1].bottomRow, left: box[1].leftCol}}></div>                               
            </div>
        </div>
    );
}

export default FaceRecognition;
