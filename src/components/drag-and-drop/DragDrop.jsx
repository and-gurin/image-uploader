import React from 'react';
import './DragDrop.css'
import axios from 'axios';
import {ProgressBar} from '@adobe/react-spectrum'
import BeforeUpload from '../before-upload/BeforeUpload';
import UploadComplete from '../upload-complete/UploadComplete';

const DragDrop = () => {
    const [image, setImage] = React.useState(null);
    const [serverImage, setServerImage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleDrop = (e) => {
        e.preventDefault();

        let file;

        if (e.dataTransfer) {
            file = e.dataTransfer.files[0];
        } else if (e.target.files) {
            file = e.target.files[0];
        }


        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                setImage(file);
            } else {
                alert('The file must be in PNG or JPEG format.');
            }
        }
    };
    console.log(image)
    const onDropHandler = React.useCallback(async () => {
        try {
            const data = new FormData();
            data.append('serverImage', image);

            setIsLoading(true);

            await axios
                .post('https://image-uploader-hij7.onrender.com/api/upload', data, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                .then((res) => setServerImage(`https://image-uploader-hij7.onrender.com/${res.data.path}`))
                .then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, [image]);
    React.useEffect(() => {
        if (image) {
            onDropHandler();
        }
    }, [image, onDropHandler]);

    const onClickCopyLink = (link) => {
        const clipBoard = navigator.clipboard;
        clipBoard.writeText(link)
        setServerImage(false)
    }


    return (<>
        {serverImage ? <UploadComplete link={serverImage} onClickCopyLink={onClickCopyLink}/>
            : isLoading ? <ProgressBar label="Loading…" isIndeterminate />
                : <BeforeUpload handleDrop={handleDrop}/>
        }
        </>
    )
};

export default DragDrop;