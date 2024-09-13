import React, { useState, useCallback } from "react";
import HomeworkItem from "./HomeworksItem"; 
import { INput, InProgres, Main, MainButton, MainContainer, MainForm, SubmittedHomework } from "./Styled";
import styles from "./styles.module.css";


const HomeworksList = () => {
    const [inputValue, setInputValue] = useState('');
    const [homeworks, setHomeworks] = useState([]);
    const [submittedHomeworks, setSubmittedHomeworks] = useState([]);
    const [inProgress, setInProgress] = useState([]);  
    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const addHomework = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') return;

        const newHomework = {
            id: homeworks.length + 1,
            name: inputValue
        };

        setHomeworks(prevHomeworks => [...prevHomeworks, newHomework]);
        setInputValue('');
    };

    const InProgressStart = useCallback((id) => {
        setHomeworks(prevHomeworks => {
            const homeworkToStart = prevHomeworks.find(homework => homework.id === id);

            if (!homeworkToStart) return prevHomeworks;

            setInProgress(prevInProgress => [...prevInProgress, homeworkToStart]);
            return prevHomeworks.filter(homework => homework.id !== id);
        });
    }, []);

    const InProgressSubmition = useCallback((id) => {
        setInProgress(prevInProgress => {
            const homeworkToSubmit = prevInProgress.find(homework => homework.id === id);

            if (!homeworkToSubmit) return prevInProgress;

            setTimeout(() => {
                setInProgress(prevInProgress => prevInProgress.filter(homework => homework.id !== id));
                setSubmittedHomeworks(prevSubmitted => [...prevSubmitted, homeworkToSubmit]);
            }, 900);

            return prevInProgress;
        });
    }, []);

    const unsubmitHomework = useCallback((id) => {
        setSubmittedHomeworks(prevSubmitted => {
            const homeworkToUnsubmit = prevSubmitted.find(homework => homework.id === id);
            setHomeworks(prevHomeworks => [...prevHomeworks, homeworkToUnsubmit]);
            return prevSubmitted.filter(homework => homework.id !== id);
        });
    }, [])

    const handleAlert = useCallback((message) => {
        alert(message);
    }, []);

    return (
        <>
        <Main>
            <MainContainer>
                <h3>Create and solve homework</h3>
                <br />
                <MainForm onSubmit={addHomework}>
                    <INput
                        type="text"
                        value={inputValue}
                        onChange={onChange}
                    />
                    <MainButton type="submit">Add homework</MainButton>
                </MainForm>
                <br />
                <div className="homework-list">
                    <h4>Unsubmitted Homeworks</h4>
                    <br />
                    <hr className={styles.hr1}/>
                    <br />
                    {homeworks.map(homework => (
                        <HomeworkItem
                            key={homework.id}
                            id={homework.id}
                            name={homework.name}
                            actionRemove={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                            actionSubmit={() => InProgressStart(homework.id)}  
                            unsubHW={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                        />
                    ))}
                </div>
            </MainContainer>
           
            <InProgres> 
                <h4>In Progress Homeworks</h4>
                <br />
                <hr className={styles.hr2}/>
                <br />
                {inProgress.map((homework) => (
                    <HomeworkItem 
                        key={homework.id}
                        id={homework.id}
                        name={homework.name}
                        actionRemove={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                        actionSubmit={() => InProgressSubmition(homework.id)}
                        unsubHW={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                    />
                ))}

            </InProgres>
            
            <SubmittedHomework>
                <h4>Submitted Homeworks</h4>
                <br />
                <hr className={styles.hr3}/>
                <br />    
                {submittedHomeworks.map(homework => (
                    <HomeworkItem
                        key={homework.id}
                        id={homework.id}
                        name={homework.name}
                        actionSubmit={() => handleAlert(`Unsubmit this homework first: ${homework.name} id: ${homework.id}`)}
                        actionRemove={() => setSubmittedHomeworks(prev => prev.filter(hw => hw.id !== homework.id))}
                        unsubHW={unsubmitHomework}
                    />
                ))}
               
            </SubmittedHomework>
        </Main>
        </>
    );
};

export default HomeworksList;
