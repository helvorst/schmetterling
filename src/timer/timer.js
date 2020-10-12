import React from 'react';
import './timer.css';

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passed: 0,
            intervalId: null,
        }    
    }

    componentDidMount() {
        const intervalId = setInterval(() => {
            if(!this.props.isGameInProgress) return;
            let seconds = Math.round((new Date() - this.props.timeStart)/1000);
            let minutes = 0;
            let passed = `${seconds} sec`;
            if(seconds > 60) {
                minutes = Math.floor(seconds/60);
                seconds = seconds % 60;
                passed = `${minutes} min ${seconds} sec`;
            }
            
            this.setState({passed})
        }, 1000);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        if(this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }
    

    render() {
        return (
            <div className="Timer">
                <span>{this.state.passed}</span>
                <button onClick={this.props.reset}>Reset</button>
            </div>            
        )
    }
}