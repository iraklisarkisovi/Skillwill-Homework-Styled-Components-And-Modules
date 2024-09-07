import React from "react";
import { Component } from "react";
import Items from "./RegistrationItems";

class Reg extends Component {
    state = {
        inputTracker: '',
        registrations: [],
        verificated: []
    }

    OnChange = (event) => {
        this.setState({
            inputTracker: event.target.value
        })
    }

    OnSubmit = (event) => {
        event.preventDefault()

        if (this.state.inputTracker.trim() === '') return;

        const regs = {
            id: this.state.registrations.length + 1,
            name: this.state.inputTracker
        }

        this.setState((prevState) => ({
            registrations: [...prevState.registrations, regs],
            inputTracker: ''
        }))
        
    }

    RemoveReg = (id) => {
        this.setState((prevState) => {
            const remove = prevState.registrations.filter(register => register.id !== id)

            return{
                registrations: remove
            }
        })
    }

    RemoveVerified = (id) => {
        this.setState((prevState) => {
            const remove = prevState.verificated.filter(verify => verify.id !== id)

            return{
                verificated: remove
            }
        })
    }
    
    actionRemoveverified = (id) => {
        this.setState((prevState) => {

            const add = prevState.registrations.find(reg => reg.id === id)

            return{
                registrations: prevState.registrations.filter(reg => reg.id !== id),
                verificated: [...prevState.verificated, add]
            }
        })
    }

    Unverify = (id) => {
        this.setState((prevState) => {
            const remove = prevState.verificated.filter(ver => ver.id !== id)
            const unverify = prevState.verificated.find(ver => ver.id === id)

            return{
                verificated: remove,
                registrations: [...prevState.registrations, unverify]
            }
        })
    }

    NameCheck = () => {
        const isDuplicate = this.state.registrations.find(reg => reg.name === this.inputTracker);
        
        if (isDuplicate) {
            alert("This name is already registered.");
            return true;
        }
        return false;
    }

    // onClick = (id) => {
    //     this.setState((prevState) => {
    //         const find = prevState.registrations.find(registrate => registrate.id === id)

    //         return{
    //             // verifiedregistrations: [...prevState.registrate.filter(register => register.id !== id)]
    //             registrations: [...prevState.registrations,]
    //         }
    //     })
    // }

    render(){
        return(
            <div className="RegistrationContainer">
                <h3>Submit your registraton </h3>

                <br />
                <form onSubmit={this.OnSubmit}>
                    <input type="text" onChange={this.OnChange} value={this.state.inputTracker}/>
                    <button type="submit" className="firstBtn" onClick={this.NameCheck}>Register</button>
                </form>
                <br />
                <h4>Registrated users</h4>
                <br />
                <hr />
                <br />
                {this.state.registrations.map(register => (
                    <Items key={register.id} id={register.id} name={register.name} actionRemove={this.RemoveReg} actionVerify={this.actionRemoveverified}/>
                ))}
                <br />
                <h4>Registrated users</h4>
                <br />
                <hr />
                <br />
                {this.state.verificated.map(register => (
                    <Items key={register.id} id={register.id} name={register.name} actionRemove={this.RemoveVerified} actionVerify={this.Unverify}/>
                ))}
            </div>
        )
    }
}


export default Reg