import { useDropzone } from 'react-dropzone';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar } from "../../store/promiseReducer.js";
import LANGUAGE from '../../language/index.js';

function Dropzone() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    let lang = useSelector((state) => state.siteSettings.language);
    let id = useSelector((state) => state.auth.payload.sub.id);
    let dispatch = useDispatch();

    useEffect(() => {
        if(acceptedFiles.length) {
            dispatch(changeAvatar({file: acceptedFiles[0], id: id}));
        }
    }, [acceptedFiles]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input name="photo" {...getInputProps()} />
                <button>{LANGUAGE[lang].avatarChange}</button>
            </div>
        </section>
    );
};

export default Dropzone;