import React from "react";
import { Btncontainer, Button, Button1, Button2, Button3, DivForP, StyledItem } from "./Styled";
import styles from "./styles.module.css";
                    
const HomeworkItem = React.memo(({id, name, actionRemove, actionSubmit, unsubHW}) => {
    return(
        <>
            <div className={styles.div2}>
                <StyledItem>
                    <DivForP>
                        <p>Id: {id} </p>
                        <p>Name: {name} </p>
                    </DivForP>
                    <Btncontainer>
                        <Button1 onClick={() => actionRemove(id)}>Remove</Button1> 
                        <Button2 onClick={() => actionSubmit(id)}>Submit</Button2>
                        <Button3 onClick={() => unsubHW(id)}>Unsubmit</Button3>
                    </Btncontainer>  
                </StyledItem>
            </div>
            <br />
            <hr className={styles.hrHW}/>
            <br />
        </>
    )
    
})

export default HomeworkItem