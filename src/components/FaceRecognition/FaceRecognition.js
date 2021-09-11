import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, j, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{top: box[j].topRow, right: box[j].rightCol, bottom: box[j].bottomRow, left: box[j].leftCol}}></div>                               
            </div>
        </div>
    );
}

export default FaceRecognition;
