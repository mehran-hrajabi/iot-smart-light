import React, {Component} from 'react';
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
        console.log(this.state.manualHandle);
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