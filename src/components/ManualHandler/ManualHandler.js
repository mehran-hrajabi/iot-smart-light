import React, {Component} from 'react';
import axios from 'axios';
import './_manualHandler.scss';

class ManualHandler extends Component{
    state = {
        manualHandle: false
    }

    manualLightHandler = () => {
        this.setState(state => ({
            manualHandle: !state.manualHandle
        }));
    }

    componentDidUpdate(){
        //Cause side effects here
        //console.log(this.state.manualHandle);
        axios.get('http://192.168.1.4:5000/manual')
        .then(response => {
            console.log(response);
        });
    }

    render(){
        return(
            <div className="manualHandler">
                <h1>Manual handler</h1>
                <p>Press the button to turn on/off the light.</p>
                <button onClick={this.manualLightHandler}>On / Off</button>
            </div>
        );
    }
}

export default ManualHandler;