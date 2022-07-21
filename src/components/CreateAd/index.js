import React, { useState, useEffect } from "react";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import Select from 'react-select';
import Dropzone from "./Dropzone.js";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveAdState } from "../../store/promiseReducer.js";
import { BACKEND_URL } from "../../constants/index.js";
import LANGUAGE from "../../language/index.js";
 
const SortableContainer = sortableContainer(({children}) => {
    return (
        <ul className="new-ad__sort-list">{children}</ul>
    );
});

const SortableItem = sortableElement(({url}) => {
    return (
        <li>
            <img className="new-ad__sort-img" src={`${BACKEND_URL}/${url}`} />
        </li>
    );
});

let CreateAd = function() {
    let [state, setState] = useState({images: []});
    let ad = useSelector((state) => state.promise.adFindById);
    let uploadFiles = useSelector((state) => state.promise.uploadFiles);
    let lang = useSelector((state) => state.siteSettings.language);
    let {_id} = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        if(_id != "new") {
            setState({...state, _id: ad._id, images: ad.images, title: ad.title, description: ad.description, tags: ad.tags, address: ad.address, price: ad.price})
        };
        if(uploadFiles.length) {
            setState({...state, images: [...state.images, ...uploadFiles]});
        };
    }, [uploadFiles, _id]);

    let onSortEnd = ({oldIndex, newIndex}) => {
        setState(({images}) => {
            return {...state, images: arrayMoveImmutable(images, oldIndex, newIndex)}
        });
    };

    const selectTags = [
        { value: `${LANGUAGE[lang].selectTags.childWorld}`, label: `${LANGUAGE[lang].selectTags.childWorld}` },
        { value: `${LANGUAGE[lang].selectTags.realEstate}`, label: `${LANGUAGE[lang].selectTags.realEstate}` },
        { value: `${LANGUAGE[lang].selectTags.car}`, label: `${LANGUAGE[lang].selectTags.car}` },
        { value: `${LANGUAGE[lang].selectTags.spare}`, label: `${LANGUAGE[lang].selectTags.spare}` },
        { value: `${LANGUAGE[lang].selectTags.work}`, label: `${LANGUAGE[lang].selectTags.work}` },
        { value: `${LANGUAGE[lang].selectTags.animal}`, label: `${LANGUAGE[lang].selectTags.animal}` },
        { value: `${LANGUAGE[lang].selectTags.houseAndGarden}`, label: `${LANGUAGE[lang].selectTags.houseAndGarden}` },
        { value: `${LANGUAGE[lang].selectTags.electronics}`, label: `${LANGUAGE[lang].selectTags.electronics}` },
        { value: `${LANGUAGE[lang].selectTags.hobbies}`, label: `${LANGUAGE[lang].selectTags.hobbies}` },
        { value: `${LANGUAGE[lang].selectTags.exchange}`, label: `${LANGUAGE[lang].selectTags.exchange}` },
        { value: `${LANGUAGE[lang].selectTags.medicine}`, label: `${LANGUAGE[lang].selectTags.medicine}` }
    ]

    return (
        <section className="new-ad">
            <h2 className="new-ad__title">{LANGUAGE[lang].createAd}</h2>
            <div className="new-ad__container">
                <div className="new-ad__dropzone-container">
                    <Dropzone/>
                    <SortableContainer onSortEnd={onSortEnd}>
                        {state.images.map((item, index) => <SortableItem key={index} index={index} url={item.url} />)}
                    </SortableContainer>
                </div>
                <div className="new-ad__ad-info-container">
                    <label className="new-ad__label">{LANGUAGE[lang].title}<br/>
                        <input type="text"
                               placeholder={LANGUAGE[lang].enterTitle}
                               value={state.title}
                               onChange={(evt) => setState({...state, title: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">{LANGUAGE[lang].description}<br/>
                        <textarea placeholder={LANGUAGE[lang].enterDescription}
                                  value={state.description}
                                  onChange={(evt) => setState({...state, description: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">{LANGUAGE[lang].select}<br/>
                        <Select isMulti
                                name="tags"
                                options={selectTags}
                                onChange={(tags) => setState({...state, tags: tags.map(tag => tag.label)})} />
                    </label>
                    <label className="new-ad__label">{LANGUAGE[lang].yourAddres}<br/>
                        <input type="text"
                               placeholder={LANGUAGE[lang].enterAddres}
                               value={state.address}
                               onChange={(evt) => setState({...state, address: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">{LANGUAGE[lang].price}:<br/>
                        <input type="number"
                               value={state.price}
                               onChange={(evt) => setState({...state, price: +evt.target.value})} />
                    </label>
                    <button onClick={() => {
                        dispatch(saveAdState({state: state}));
                    }}>
                        {LANGUAGE[lang].createAd}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateAd;