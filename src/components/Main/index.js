import { Routes, Route } from "react-router-dom";
import AdList from "../AdList/index.js";
import MyProfile from "../MyProfile/index.js";
import CreateAd from "../CreateAd/index.js";
import Login from "../Login/index.js";
import Registration from "../Registration/index.js";
import PasswordChange from "../PasswordChange/index.js";


let Main = function() {
    return (
        <main className="main">
            <h1 className="visually-hidden">Головна сторінка біржи</h1>
            <Routes>
                <Route path="/" element={<AdList/>}/>
                <Route path="/my-profile" element={<MyProfile/>}/>
                <Route path="/create-ad" element={<CreateAd/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/password-change" element={<PasswordChange/>}/>
            </Routes>
        </main>
    );
};

export default Main;