import React from 'react';
import { Card } from '../card/card';
import './board.css';

export class Board extends React.Component {
    constructor(props) {
        super(props);

        const cardsData = this.props.terms.reduce((acc, term, ind) => {
            acc[ind] = {
                id: ind,
                term,
                isFaceOn: false,
                isMatched: false,
            };
            return acc;
        }, {});

        this.state = {
            previouslyOpenedCardData: null,
            cardsData
        };

        console.log('Board constructor', {...this.state.cardsData})
    }

    isGameOver() {
        const notMatchedCards = Object
            .keys(this.state.cardsData)
            .map(Number)
            .filter(id => !this.state.cardsData[id].isMatched);
        if(!notMatchedCards.length)  {
            this.props.stop();
        }  
    }

    matchOrDismiss(flippedCardData) {
        const isPreviouslyOpenedCardMatchToTheNewlyFlipped =
            this.state.previouslyOpenedCardData.term === flippedCardData.term;
        // match
        if (isPreviouslyOpenedCardMatchToTheNewlyFlipped) {
            console.log(`Match detected: ${flippedCardData.term}`);
            this.setState({
                previouslyOpenedCardData: null,
                cardsData: {
                    ...this.state.cardsData,
                    [this.state.previouslyOpenedCardData.id]: {
                        ...this.state.previouslyOpenedCardData,
                        isFaceOn: true,
                        isMatched: true,
                    },
                    [flippedCardData.id]: {
                        ...flippedCardData,
                        isFaceOn: true,
                        isMatched: true,
                    }
                }
            }, this.isGameOver);
            
        } else { //dismiss
            setTimeout(() => {
                console.log(`No match: new - ${flippedCardData.term} vs old - ${this.state.previouslyOpenedCardData.term}`);

                this.setState({
                    previouslyOpenedCardData: null,
                    cardsData: {
                        ...this.state.cardsData,
                        [this.state.previouslyOpenedCardData.id]: {
                            ...this.state.previouslyOpenedCardData,
                            isFaceOn: false,
                            isMatched: false,
                        },
                        [flippedCardData.id]: {
                            ...flippedCardData,
                            isFaceOn: false,
                            isMatched: false,
                        }
                    }
                });
            }, 500);
        }
    }

    checkForMatch(flippedCardData) {
        const isAllCardsFaceDown = this.state.previouslyOpenedCardData === null;
        if (isAllCardsFaceDown) {
            console.log(`All cards are face down, memorizing ${flippedCardData.id}`);
            this.setState({
                previouslyOpenedCardData: flippedCardData,
            })
        } else {
            console.log(`There is a face up card, going to check match with ${flippedCardData.id}`);
            this.matchOrDismiss(flippedCardData);
        }
    }

    onCardFlip(flippedCardData) {
        console.log(`flipped is ${flippedCardData.id}`);
        this.setState({
            cardsData: {
                ...this.state.cardsData,
                [flippedCardData.id]: {
                    ...flippedCardData,
                    isFaceOn: true,
                }
            }
        }, () => this.checkForMatch(flippedCardData));
    }

    render() {
        return (
            <div className="Board">
                {Object.keys(this.state.cardsData).map(id =>
                    <Card
                        key={id}
                        data={this.state.cardsData[id]}
                        onCardFlip={this.onCardFlip.bind(this)}>
                    </Card>)}
            </div>
        )
    }

}