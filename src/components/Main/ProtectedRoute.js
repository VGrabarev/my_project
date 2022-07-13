import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

let ProtectedRoute = function({roles=[], fallback, component}) {
    let auth = useSelector((state) => state.auth?.payload?.sub?.acl[1] || "anon");

    if(!roles.filter(item => item.includes([auth])).length) {
        return <Navigate to={fallback} replace/>;
    };

    return component;
};

export default ProtectedRoute;