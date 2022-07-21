import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { aboutUserById, adFindOnlyTitle, clearAdFindTitleOnly } from "../../store/promiseReducer.js";
import { userLogout } from "../../store/authenticationReducer.js";
import { BACKEND_URL, DEFAULT_IMG } from "../../constants/index.js";
import Dropzone from "./Dropzone.js";
import LANGUAGE from "../../language/index.js";

let Profile = function() {
    const [show, setShow] = useState({info: true, ad: false, message: false});
    let user = useSelector((state) => state.promise.userFindById);
    let userAd = useSelector((state) => state.promise.adFindTitleOnlyArr);
    let owner = useSelector((state) => state.auth.payload);
    let lang = useSelector((state) => state.siteSettings.language);
    let {_id} = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(aboutUserById({_id: _id}));
        dispatch(adFindOnlyTitle({_id: _id}));
        return () => {
            dispatch(clearAdFindTitleOnly());
        }
    }, [_id]);

    return (
        <section className="profile">
            <h2 className="profile__title">{owner.sub.id == _id ? `${LANGUAGE[lang].myProfile}` : `${LANGUAGE[lang].userProfile} ${user?.login}`}</h2>
            <div className="profile__head">
                <img className="profile__avatar"
                     src={user?.avatar ?
                        `${BACKEND_URL}/${user?.avatar?.url}` :
                        DEFAULT_IMG} />
                <ul className="profile__head-container">
                    <li className="profile__head-item">
                        {owner.sub.id == _id && <Dropzone className="profile__head-button"/>}
                    </li>
                    <li className="profile__head-item">
                        {owner.sub.id == _id && <Link className="profile__head-button"
                                                      to="/password-change">
                                                    {LANGUAGE[lang].passwordChange}
                                                </Link>}
                    </li>
                    <li className="profile__head-item">
                        {owner.sub.id == _id && <button className="profile__head-button"
                                                        onClick={() => dispatch(userLogout())}>
                                                    {LANGUAGE[lang].logout}
                                                </button>}
                    </li>
                </ul>
            </div>
            <ul className="profile__list">
                <li>
                    <button className="profile__button"
                            style={{
                               backgroundColor: `${show.info ? "rgba(182, 182, 182, 0.2)" : "rgb(160, 160, 160)"}` 
                            }}
                            onClick={() => setShow({info: true, ad: false, message: false})}>{LANGUAGE[lang].generalInfo}</button>
                </li>
                <li>
                    <button className="profile__button"
                            style={{
                                backgroundColor: `${show.ad ? "rgba(182, 182, 182, 0.2)" : "rgb(160, 160, 160)"}` 
                             }}
                            onClick={() => setShow({info: false, ad: true, message: false})}>{owner.sub.id == _id ? LANGUAGE[lang].myAd : LANGUAGE[lang].advertisement}</button>
                </li>
                {owner.sub.id == _id && 
                    <li>
                        <button className="profile__button"
                                style={{
                                    backgroundColor: `${show.message ? "rgba(182, 182, 182, 0.2)" : "rgb(160, 160, 160)"}` 
                                 }}
                                onClick={() => setShow({info: false, ad: false, message: true})}>{LANGUAGE[lang].myMessage}</button>
                    </li>}
            </ul>
            {show.info && 
            <div className="profile__info">
                <h3 className="profile__info-title">{LANGUAGE[lang].information}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td>{LANGUAGE[lang].login}:</td>
                        <td>{user.login}</td>
                    </tr>
                    <tr>
                        <td>{LANGUAGE[lang].nickname}:</td>
                        <td>{user.nick || LANGUAGE[lang].notAvailable}</td>
                    </tr>
                    <tr>
                        <td>{LANGUAGE[lang].phone}:</td>
                        <td>{user.phones || LANGUAGE[lang].notAvailable}</td>
                    </tr>
                    <tr>
                        <td>{LANGUAGE[lang].address}:</td>
                        <td>{user.addresses || LANGUAGE[lang].notAvailable}</td>
                    </tr>
                    <tr>
                        <td>{LANGUAGE[lang].registered}:</td>
                        <td>{(new Date(+user.createdAt)).toLocaleString()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>}
            {show.ad && 
            <ul className="profile__info">
                {userAd.length ?
                 userAd.map((ad, index) => 
                 <li key={index}>
                    {index + 1}: <Link to={`/ad/${ad._id}`}>{ad.title}</Link>
                 </li>) :
                 <li>{LANGUAGE[lang].noAds}</li>}
            </ul>}
            {show.message && 
            <div className="profile__info">
                <h3 className="profile__info-title">Сообщения</h3>
            </div>}
        </section>
    );
};

export default Profile;