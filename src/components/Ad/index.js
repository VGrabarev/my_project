import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { adFindById } from "../../store/promiseReducer.js";
import { BACKEND_URL } from "../../constants/index.js";
import LANGUAGE from "../../language/index.js";
import Slider from "./Slider/index.js";

let Ad = function() {
    let adById = useSelector((state) => state.promise.adFindById);
    let lang = useSelector((state) => state.siteSettings.language);
    let {_id} = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(adFindById({_id}));
    }, [_id])

    return (
        <section className="ad">
            <h2 className="ad__title">{LANGUAGE[lang].advertisement}</h2>
            <div className="ad__slider-wrapper">
                <Slider>
                    {adById.images.map((imag, index) => 
                        <img key={index}
                             src={`${BACKEND_URL}/${imag.url}`} />
                    )}
                </Slider>
            </div>
            <div className="ad__owner-wrapper">
                <h3 className="ad__owner-title">{LANGUAGE[lang].owner}</h3>
                <Link className="ad__owner-link"
                      to={`/profile/${adById.owner?._id}`}>
                    <img className="ad__owner-img"
                         src={adById.owner?.avatar ? `${BACKEND_URL}/${adById.owner.avatar.url}` : `${BACKEND_URL}`}/>
                    <span>{adById.owner?.login}</span>
                </Link>
            </div>
            <div className="ad__ad-info-wrapper">
                <h3 className="ad__info-title">{adById.title}</h3>
                <p className="ad__info-price">{LANGUAGE[lang].price}: {adById.price}</p>
                <ul className="ad__info-list">
                    {adById.tags.map((tag, index) => <li className="ad__info-item" key={index}>{tag}</li>)}
                </ul>
                <p className="ad__info-text">{adById.description}</p>
            </div>
            <div className="ad__comment-wrapper">
                <h3 className="ad__comment-title">{LANGUAGE[lang].comments}</h3>
                <ul className="ad__comment-list">
                    {!adById.comments ? LANGUAGE[lang].noComments : 
                    adById.comments.map((comment, index) => 
                        <li className="ad__comment-item"
                            key={index}>
                            <Link className="ad__comment-link"
                                  to={`/profile/${comment.owner._id}`}>
                                <img className="ad__comment-img"
                                     src={comment.owner.avatar ? `${BACKEND_URL}/${comment.owner.avatar.url}` : `${BACKEND_URL}/`}/>
                                <span className="ad__comment-login">{comment.owner.login}</span>
                            </Link>
                            <p className="ad__comment-text">{comment.text}</p>
                            <span className="ad__comment-createAt">{(new Date(+comment.createdAt)).toLocaleString()}</span>
                        </li>
                    )}
                </ul>
                <div className="ad__textarea-wrapper">
                    <textarea className="ad__textarea"
                            placeholder={LANGUAGE[lang].enterComment} />
                    <button className="ad__textarea-submit">{LANGUAGE[lang].send}</button>
                </div>
            </div>
        </section>
    );
};

export default Ad;