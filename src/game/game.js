import React from 'react';
import { Board } from '../board/board';
import { Timer } from '../timer/timer';
import { shuffleArray } from '../utils/shuffleArray';

const terms = ['Woche', 'Stunde', 'Uhr', 'benutzen'];


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStart: new Date(),
            terms: this.getTerms(),
            gameId: 1,
            isGameInProgress: true,
        }
    }

    getTerms() {
        return shuffleArray([...terms, ...terms]);          
    }

    start() {
        this.setState({
            timeStart: new Date(),
            terms: this.getTerms(),
            gameId: this.state.gameId + 1,
            isGameInProgress: true,
        })
    }

    stop() {
        this.setState({
            isGameInProgress: false,
        })
    }

    render() {
        return (
            <div>
                <div>Game {this.state.gameId} {this.state.isGameInProgress ? 'is in progress' : 'finished'}</div>
                <Timer 
                    timeStart={this.state.timeStart} 
                    reset={this.start.bind(this)}
                    isGameInProgress={this.state.isGameInProgress}></Timer>
                <Board 
                    key={this.state.gameId}
                    terms={this.state.terms}
                    stop={this.stop.bind(this)}></Board>
            </div>
        )
    }
}