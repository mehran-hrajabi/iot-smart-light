import React, {Component} from 'react';
import './_autoHandler.scss';

class AutoHandler extends Component {
    state = {
        onTime: "",
        offTime: ""
    }

    inputChangedHandler = (event) => {
        let inputID = event.target.getAttribute('id');
        let timeValue = event.target.value;

        this.setState(state => {
            if(inputID === "on"){
                return{
                    onTime: timeValue
                };
            }
            else if(inputID === "off"){
                return{
                    offTime: timeValue
                };
            }
        });
    }

    submitButtonHandler = () => {
        //Cause side effects here
        if(this.state.onTime === "" || this.state.offTime === ""){
            window.alert("Both inputs are required!");
        } else{
            window.alert("Done!");
            console.log(this.state);
        }
    }

    render(){
        return(
            <div className="autoHandler">
                <h1>Auto handler</h1>
                <div>
                    <label>Time to turn on:</label>
                    <input type="time" id="on" onChange={(event) => {this.inputChangedHandler(event)}} />
                </div>
                <div>
                    <label>Time to turn off:</label>
                    <input type="time" id="off" onChange={(event) => {this.inputChangedHandler(event)}} />
                </div>
                <button onClick={this.submitButtonHandler}>Submit</button>
            </div>
        );
    }
}

export default AutoHandler;