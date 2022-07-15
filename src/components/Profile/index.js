import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/authenticationReducer.js";

let Profile = function() {
    let dispatch = useDispatch();

    return (
        <section>
            <h2>Profile</h2>
            <button onClick={() => dispatch(userLogout())}>logout</button>
        </section>
    );
};

export default Profile;