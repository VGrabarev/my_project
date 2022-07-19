import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { uploadFiles } from "../../store/promiseReducer.js";

function Dropzone() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
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
                <div>Перетащите несколько файлов сюда или нажмите, чтобы выбрать файлы</div>
            </div>
        </section>
    );
};

export default Dropzone;