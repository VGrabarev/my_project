import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { adFind, clearAd } from "../../store/promiseReducer.js";
import { BACKEND_URL } from "../../constants/index.js";
import LANGUAGE from "../../language/index.js";

let AdList = function() {
    const LIST_ITEM_WIDTH = 290;
    const LIST_ITEM_HEIGHT = 330;
    const SPACE_BETWEEN = 20;

    let auth = useSelector((state) => state.auth?.payload?.sub?.acl[1] || "anon");
    let lang = useSelector((state) => state.siteSettings.language);
    let adArr = useSelector((state) => state.promise.adArr);
    let pending = useSelector((state) => state.promise.adFindPending);
    let dispatch = useDispatch();
    let [listSize, setListSize] = useState({width: 0, height: 0});
    let list = useRef(null);
    let myRef = useRef(false);

    let numberItemsPerLine = Math.trunc(window.innerWidth / (LIST_ITEM_WIDTH + SPACE_BETWEEN));

    let resizeList = function() {
        setListSize({width: numberItemsPerLine * LIST_ITEM_WIDTH + SPACE_BETWEEN,
                     height: Math.ceil(adArr.length / numberItemsPerLine) * (LIST_ITEM_HEIGHT + SPACE_BETWEEN) - SPACE_BETWEEN});
    };

    let checkScrollBottom = function() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !pending) {
            dispatch(adFind({}));
        };
    };

    useEffect(() => {
        window.addEventListener("resize", resizeList);
        setListSize({width: numberItemsPerLine * LIST_ITEM_WIDTH + SPACE_BETWEEN,
                     height: Math.ceil(adArr.length / numberItemsPerLine) * (LIST_ITEM_HEIGHT + SPACE_BETWEEN) - SPACE_BETWEEN});
        return () => {
            window.removeEventListener("resize", resizeList);
        };
    }, [adArr, numberItemsPerLine]);

    useEffect(() => {
        window.addEventListener("scroll", checkScrollBottom);
        return () => {
            window.removeEventListener("scroll", checkScrollBottom);
        };
    });

    useEffect(() => {
        if(auth === "user" && !myRef.current) {
            myRef.current = true;
            dispatch(adFind({}));
        };
        return () => {
            if(auth === "user") {
                dispatch(clearAd());
            };
        };
    }, []);

    return (
        <section className="ad">
            <div className="ad__search-container">
                <input className="ad__search"
                       type="text"
                       placeholder={LANGUAGE[lang].search} />
                <button className="ad__button-search">
                    <span className="visually-hidden">Search</span>
                </button>
            </div>
            <h2 className="ad__title">{LANGUAGE[lang].advertisement}</h2>
            {auth === "anon" ? <div>{LANGUAGE[lang].adListAnonHidden}</div> : 
            <ul className="ad__list"
                ref={list}
                style={{
                    width: listSize.width || 0,
                    height: listSize.height || 0
                }}>
                {adArr.map((item, index) => 
                    <li className="ad__item"
                        key={item._id}
                        style={{
                            top: Math.floor((index) / numberItemsPerLine) * (LIST_ITEM_HEIGHT + SPACE_BETWEEN),
                            left: (index % numberItemsPerLine) * (LIST_ITEM_WIDTH + SPACE_BETWEEN)
                        }}>
                        <Link className="ad__link"
                              to={`/ad/${item._id}`}>
                            <img className="ad__img"
                                 src={item.images.length ? 
                                      `${BACKEND_URL}/${item.images[0].url}` :
                                      `${BACKEND_URL}/`}/>
                            <div className="ad__item-title">{item.title}</div>
                            <div className="ad__price">{LANGUAGE[lang].price}: {item.price}</div>
                            <div className="ad__time">{(new Date(+item.createdAt)).toLocaleString()}</div>
                        </Link>
                    </li>    
                )}
            </ul>}
        </section>
    );
};

export default AdList;