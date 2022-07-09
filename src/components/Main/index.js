import { Routes, Route } from "react-router-dom";
import AdList from "../AdList/index.js";
import MyProfile from "../MyProfile/index.js";
import CreateAd from "../CreateAd/index.js";


let Main = function() {
    return (
        <main>
            <h1>Main</h1>
            <Routes>
                <Route path="/" element={<AdList/>}/>
                <Route path="/my-profile" element={<MyProfile/>}/>
                <Route path="/create-ad" element={<CreateAd/>}/>
            </Routes>
        </main>
    );
};

export default Main;