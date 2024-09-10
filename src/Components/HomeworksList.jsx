import React, { useState, useCallback } from "react";
import HomeworkItem from "./HomeworksItem"; 

const HomeworksList = () => {
    const [inputValue, setInputValue] = useState('');
    const [homeworks, setHomeworks] = useState([]);
    const [submittedHomeworks, setSubmittedHomeworks] = useState([]);

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

    const submitHomework = useCallback((id) => {
        setHomeworks(prevHomeworks => {
            
            const homeworkToSubmit = prevHomeworks.find(homework => homework.id === id);

            setSubmittedHomeworks(prevSubmitted => [...prevSubmitted, homeworkToSubmit]);

            return prevHomeworks.filter(homework => homework.id !== id);
        });
    }, []);

    const removeSubmittedHomework = useCallback((id) => {
        setSubmittedHomeworks(prevSubmitted => prevSubmitted.filter(homework => homework.id !== id));
    }, []);

    const unsubmitHomework = useCallback((id) => {
        setSubmittedHomeworks(prevSubmitted => {
            const homeworkToUnsubmit = prevSubmitted.find(homework => homework.id === id);
            setHomeworks(prevHomeworks => [...prevHomeworks, homeworkToUnsubmit]);
            return prevSubmitted.filter(homework => homework.id !== id);
        });
    }, []);

    const handleAlert = useCallback((message) => {
        alert(message);
    }, []);

    return (
        <div className="homeworks">
            <h3>Create and solve homework</h3>

            <form onSubmit={addHomework}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={onChange}
                />
                <button type="submit" className="firstBtn">Add homework</button>
            </form>

            <div className="homework-list">
                <h4>Unsubmitted Homeworks</h4>

                {homeworks.map(homework => (
                    <HomeworkItem
                        key={homework.id}
                        id={homework.id}
                        name={homework.name}
                        actionRemove={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                        actionSubmit={submitHomework}
                        unsubHW={() => handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`)}
                    />
                ))}
                <br />
                <hr />
                <br />
            </div>

            <div className="submitted-homeworks">
                <h4>Submitted Homeworks</h4>

                {submittedHomeworks.map(homework => (
                    <HomeworkItem
                        key={homework.id}
                        id={homework.id}
                        name={homework.name}
                        actionSubmit={() => handleAlert(`Unsubmit this homework first: ${homework.name} id: ${homework.id}`)}
                        actionRemove={removeSubmittedHomework}
                        unsubHW={unsubmitHomework}
                    />
                ))}
                <br />
                <hr />
                <br />
            </div>
        </div>
    );
};

export default HomeworksList;
