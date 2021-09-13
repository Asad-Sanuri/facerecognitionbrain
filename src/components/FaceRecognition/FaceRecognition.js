import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, i} ) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol}}></div>                               
            </div>
        </div>
    );
}

export default FaceRecognition;
