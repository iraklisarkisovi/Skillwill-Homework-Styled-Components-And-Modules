import React, { Component } from "react";
import HomeworkItem from "./HomeworksItem"; 

class HomeworksList extends Component {
    state = {
        inputValue: '',
        homeworks: [], 
        submittedHomeworks: [] 
    }

    onChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    addHomework = (event) => {
        event.preventDefault();

        if (this.state.inputValue.trim() === '') return; 

        const newHomework = {
            id: this.state.homeworks.length + 1,  
            name: this.state.inputValue
        };

        this.setState((prevState) => ({
            homeworks: [...prevState.homeworks, newHomework],
            inputValue: ''
        }));
    }

    // removeHomework = (id) => {
    //     this.setState((prevState) => ({
    //         homeworks: prevState.homeworks.filter(homework => homework.id !== id)
    //     }));
    // }

    submitHomework = (id) => {
        this.setState((prevState) => {

            const homeworkToSubmit = prevState.homeworks.find(homework => homework.id === id);

            return {
                homeworks: prevState.homeworks.filter(homework => homework.id !== id),
                submittedHomeworks: [...prevState.submittedHomeworks, homeworkToSubmit]
            };
        });
    }

    removeSubmittedHomework = (id) => {
        this.setState((prevState) => {

            return {
                submittedHomeworks: prevState.submittedHomeworks.filter(homework => homework.id !== id),
            };
        });
    }

    unsubmitHomework = (id) => {
        this.setState((prevState) => {
            const homeworkToUnsubmit = prevState.submittedHomeworks.find(homework => homework.id === id);

            return {
                submittedHomeworks: prevState.submittedHomeworks.filter(homework => homework.id !== id),
                homeworks: [...prevState.homeworks, homeworkToUnsubmit]
            };
        });

    }

    handleAlert = (Callback) => {
        alert(Callback);
    }

    render() {
        return (
            <div className="homeworks">
                <h3>Create and solve homework</h3>

                <br />
                <form onSubmit={this.addHomework}>
                    <input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                    <button type="submit" className="firstBtn">Add homework</button>
                </form>
                <br />

                <div className="homework-list">
                    <h4>Unsubmitted Homeworks</h4>
                    {this.state.homeworks.map(homework => (
                        <HomeworkItem
                            key={homework.id}
                            id={homework.id}
                            name={homework.name}
                            actionRemove={() => {
                                this.handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`);
                            }}
                            actionSubmit={this.submitHomework}
                            unsubHW={() => {
                                this.handleAlert(`Submit this homework first: ${homework.name} id: ${homework.id}`);
                            }}
                        />
                    ))}
                </div>

                <div className="submitted-homeworks">
                    <h4>Submitted Homeworks</h4>
                    {this.state.submittedHomeworks.map(homework => (
                        <HomeworkItem
                            key={homework.id}
                            id={homework.id}
                            name={homework.name}
                            actionSubmit={() => {this.handleAlert(`Unsubmit this homework first: ${homework.name} id: ${homework.id}`)}}
                            actionRemove={this.removeSubmittedHomework}
                            unsubHW={this.unsubmitHomework}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default HomeworksList;
