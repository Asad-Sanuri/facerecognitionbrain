import React from 'react';
import './ImageLinkForm.css';


/* const onClickChooseFile = (event) => {
    this.setState({ showFileChooser: true });
} */

const ImageLinkForm = ({ onInputChange, onButtonSubmit, input}) => {
    return (
        <div>
            <p className='f3'> 
                {'Upload an image or put an image url-address to detect faces.'} 
            </p>
            <div className='center'>
                {/* <div id="uploadComputer" className="mb2">
                                    <label className="f3 white">Choose a file </label>
                                    <input type="file" id="image" name="image" accept="image/*" onChange={onInputChange} />
                                </div> */}
                                 
                                {/* <div>
                                    <input className="f4 pa2 w-100 center mb2" type="text" 
                                        value={input}
                                        onChange={onInputChange}
                                        onCut={onInputChange}
                                        onPaste={onInputChange}
                                        onInput={onInputChange} 
                                        placeholder="http://" />
                                </div> */} 
                <div className='form center pa4 br3 shadow-5'>
                    <label className="f3 white">Choose a file </label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={onInputChange} />
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} /> 
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-purple' disabled={!input} onClick = {onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;