import React, { useState, useEffect } from "react";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import Select from 'react-select';
import Dropzone from "./Dropzone.js";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveAdState } from "../../store/promiseReducer.js";
import { BACKEND_URL } from "../../constants/index.js";
 
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
        { value: 'Детский мир', label: 'Детский мир' },
        { value: 'Недвижимость', label: 'Недвижимость' },
        { value: 'Авто', label: 'Авто' },
        { value: 'Запчасти для транспорта', label: 'Запчасти для транспорта' },
        { value: 'Работа', label: 'Работа' },
        { value: 'Животные', label: 'Животные' },
        { value: 'Дом и сад', label: 'Дом и сад' },
        { value: 'Электроника', label: 'Электроника' },
        { value: 'Хобби, отдых и спорт', label: 'Хобби, отдых и спорт' },
        { value: 'Обмен', label: 'Обмен' },
        { value: 'Медицина', label: 'Медицина' }
    ]

    return (
        <section className="new-ad">
            <h2 className="new-ad__title">Создать объявление</h2>
            <div className="new-ad__container">
                <div className="new-ad__dropzone-container">
                    <Dropzone/>
                    <SortableContainer onSortEnd={onSortEnd}>
                        {state.images.map((item, index) => <SortableItem key={index} index={index} url={item.url} />)}
                    </SortableContainer>
                </div>
                <div className="new-ad__ad-info-container">
                    <label className="new-ad__label">Оглавление<br/>
                        <input type="text"
                               placeholder="Введите оглавление"
                               value={state.title}
                               onChange={(evt) => setState({...state, title: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">Описание<br/>
                        <textarea placeholder="Введите описание"
                                  value={state.description}
                                  onChange={(evt) => setState({...state, description: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">Выберите один или несколько категорий которые больше всего подходят вашему объявлению<br/>
                        <Select isMulti
                                name="tags"
                                options={selectTags}
                                onChange={(tags) => setState({...state, tags: tags.map(tag => tag.label)})} />
                    </label>
                    <label className="new-ad__label">Введите ваш адрес<br/>
                        <input type="text"
                               placeholder="Введите ваш адрес"
                               value={state.address}
                               onChange={(evt) => setState({...state, address: evt.target.value})} />
                    </label>
                    <label className="new-ad__label">Цена:<br/>
                        <input type="number"
                               value={state.price}
                               onChange={(evt) => setState({...state, price: +evt.target.value})} />
                    </label>
                    <button onClick={() => {
                        dispatch(saveAdState({state: state}));
                    }}>
                        Создать
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateAd;