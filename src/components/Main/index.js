import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdList from "../AdList/index.js";
import Profile from "../Profile/index.js";
import CreateAd from "../CreateAd/index.js";
import Login from "../Login/index.js";
import Registration from "../Registration/index.js";
import PasswordChange from "../PasswordChange/index.js";
import Ad from "../Ad/index.js";
import ProtectedRoute from "./ProtectedRoute.js";

let Main = function() {
    let ownerId = useSelector((state) => state.auth.payload?.sub?.id);

    return (
        <main className="main">
            <h1 className="visually-hidden">Головна сторінка біржи</h1>
            <Routes>
                <Route path="/" element={<AdList/>}/>
                <Route path="/profile/:_id" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<Profile/>}/>
                }/>
                <Route path="/login" element={
                    <ProtectedRoute roles={["anon"]} fallback={`/profile/${ownerId}`} component={<Login/>}/>
                }/>
                <Route path="/registration" element={
                    <ProtectedRoute roles={["anon"]} fallback={`/profile/${ownerId}`} component={<Registration/>}/>
                }/>
                <Route path="/password-change" element={<PasswordChange/>}/>
                <Route path="/ad/:_id" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<Ad/>}/>
                }/>
                <Route path="/create-ad/:_id" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<CreateAd/>}/>
                }/>
            </Routes>
        </main>
    );
};

export default Main;