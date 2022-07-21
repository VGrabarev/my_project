import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { aboutUserById } from "../../store/promiseReducer.js";
import { userLogout } from "../../store/authenticationReducer.js";
import { BACKEND_URL, DEFAULT_IMG } from "../../constants/index.js";
import Dropzone from "./Dropzone.js";
import LANGUAGE from "../../language/index.js";

let Profile = function() {
    const [show, setShow] = useState({info: true, ad: false, message: false});
    let user = useSelector((state) => state.promise.userFindById);
    let owner = useSelector((state) => state.auth.payload);
    let lang = useSelector((state) => state.siteSettings.language);
    let {_id} = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(aboutUserById({_id: _id}));
    }, [_id])

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
                            onClick={() => setShow({info: false, ad: true, message: false})}>{LANGUAGE[lang].advertisement}</button>
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
            <div className="profile__info">
                <h3 className="profile__info-title">Объявления</h3>
            </div>}
            {show.message && 
            <div className="profile__info">
                <h3 className="profile__info-title">Сообщения</h3>
            </div>}
        </section>
    );
};

export default Profile;