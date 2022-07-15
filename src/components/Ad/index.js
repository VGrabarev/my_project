import { useParams } from "react-router-dom";

let Ad = function() {
    let {_id} = useParams();

    return (
        <section>
            <h2>Ad</h2>
        </section>
    );
};

export default Ad;