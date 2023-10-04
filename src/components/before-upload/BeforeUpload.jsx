import React from 'react';
import './BeforeUpload.css'

const BeforeUpload = ({handleDrop}) => {
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);

    const onButtonClick = () => {
        if (inputRef.current != null) {
            inputRef.current.click()
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (<section className="upload">
        <p className="upload__title">Upload your image</p>
        <p className="upload__subtitle">File should be Jpeg, Png,...</p>
        <form className="upload__form"
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}>
            <input type="file"
                   ref={inputRef}
                   className="upload__input"
                   id="upload-input"
                   multiple={true}
                   onChange={handleDrop}
                   accept="image/jpeg, image/jpg, image/png"/>
            <label className={dragActive ? `upload__label drag-active` : "upload__label"} htmlFor="upload-input">
                <div>
                    <div className="area-upload">
                        <img src="/upload-bg.svg" width="114px" height="88px" alt="background-icon"/>
                        <p className="area-upload__title">Drag & Drop your image here</p>
                    </div>
                </div>
            </label>
            {dragActive && <div className="upload__fileElement"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}></div>}
        </form>
        <p className="area-upload__title area-upload__or">or</p>
        <button className="upload__button" onClick={onButtonClick}>Choose a file</button>
    </section>)

};

export default BeforeUpload;