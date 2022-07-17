import { Routes, Route } from "react-router-dom";
import AdList from "../AdList/index.js";
import Profile from "../Profile/index.js";
import CreateAd from "../CreateAd/index.js";
import Login from "../Login/index.js";
import Registration from "../Registration/index.js";
import PasswordChange from "../PasswordChange/index.js";
import Ad from "../Ad/index.js";
import ProtectedRoute from "./ProtectedRoute.js";

let Main = function() {
    return (
        <main className="main">
            <h1 className="visually-hidden">Головна сторінка біржи</h1>
            <Routes>
                <Route path="/" element={<AdList/>}/>
                <Route path="/profile/:id" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<Profile/>}/>
                }/>
                <Route path="/create-ad" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<CreateAd/>}/>
                }/>
                <Route path="/login" element={
                    <ProtectedRoute roles={["anon"]} fallback="/profile" component={<Login/>}/>
                }/>
                <Route path="/registration" element={
                    <ProtectedRoute roles={["anon"]} fallback="/profile" component={<Registration/>}/>
                }/>
                <Route path="/password-change" element={<PasswordChange/>}/>
                <Route path="/ad/:_id" element={
                    <ProtectedRoute roles={["user"]} fallback="/login" component={<Ad/>}/>
                }/>
            </Routes>
        </main>
    );
};

export default Main;