import React from "react";
 
const HomeworkItem = ({id, name, actionRemove, actionSubmit, unsubHW}) => {
    return(
        <div className="homeworks-item">
        <p>Id: {id} </p>
        <p>Name: {name} </p>
        <div className="btncontainer">
            <button onClick={() => actionRemove(id)}>Remove homework</button> 
            <button onClick={() => actionSubmit(id)}>Submit</button>
            <button onClick={() => unsubHW(id)}>Unsubmit</button>
        </div>  
    </div>
    )
}

export default HomeworkItem