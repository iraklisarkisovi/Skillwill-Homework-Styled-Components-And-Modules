import React from "react";

const Items = React.memo(({id, name, actionRemove, actionVerify}) => {
    return(
        <div className="homeworks-item">
            <p>id: {id}</p>
            <p>Name: {name}</p>
            <div className="btncontainer">
                <button onClick={() => actionRemove(id)}>Remove</button>
                <button onClick={() => actionVerify(id)}>Verify</button>
                <button onClick={() => actionVerify(id)}>unverify</button>
            </div>
        </div>
    )
})

export default Items