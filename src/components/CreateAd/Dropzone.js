import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { uploadFiles } from "../../store/promiseReducer.js";
import LANGUAGE from '../../language/index.js';

function Dropzone() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    let lang = useSelector((state) => state.siteSettings.language);
    let dispatch = useDispatch();

    useEffect(() => {
        if(acceptedFiles.length) {
            dispatch(uploadFiles({files: acceptedFiles}))
        }
    }, [acceptedFiles])

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input name="photo" {...getInputProps()} />
                <div>{LANGUAGE[lang].dropzone}</div>
            </div>
        </section>
    );
};

export default Dropzone;