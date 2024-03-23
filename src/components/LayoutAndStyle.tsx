import React, { useState } from 'react';

const LayoutAndStyle = () => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
    const [swapPosition, setSwapPosition] = useState<boolean>(false)

    const moveLeft = () => {
        setNumbers(prevNumbers => {
            const newNumbers = [...prevNumbers];
            const firstNumber = newNumbers.shift();
            if (firstNumber !== undefined) {
                newNumbers.push(firstNumber);
            }
            return newNumbers;
        });
    }

    const moveRight = () => {
        setNumbers(prevNumbers => {
            const newNumbers = [...prevNumbers];
            const lastNumber = newNumbers.pop();
            if (lastNumber !== undefined) {
                newNumbers.unshift(lastNumber);
            }
            return newNumbers;
        });
    }


    const shuffle = () => {
        setNumbers(prevNumbers => {
            const newNumbers = [...prevNumbers];
            for (let i = newNumbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newNumbers[i], newNumbers[j]] = [newNumbers[j], newNumbers[i]];
            }
            return newNumbers;
        });
    }

    return (
        <div className='content'>
            <div className='containerContent'>
                <div className='sectionButton mt-10 line'>
                    <div className='cardBlock' onClick={() => moveLeft()}>
                        <div className='triangleLeft'></div>
                        <div className='subText'>Move shape</div>
                    </div>
                    <div className='flexCardBlock' onClick={() => setSwapPosition(!swapPosition)}>
                        <div className='triangle'></div>
                        <div className='triangleBottom'></div>
                        <div className='subText'>Move position</div>
                    </div>
                    <div className='cardBlock' onClick={() => moveRight()}>
                        <div className='triangleRight'></div>
                        <div className='subText'>Move shape</div>
                    </div>
                </div>
                <div className={`flex-container mt-6 ${swapPosition ? 'justify-center' : 'justify-end'}`}>
                    {numbers.slice(0, 3).map((option, index) => (
                        <div className='cardItem' key={index} onClick={() => shuffle()} >
                            {option === 1 ? (<div className='square'></div>)
                                : option === 2 ? (<div className='circle'></div>)
                                    : option === 3 ? (<div className='oval'></div>)
                                        : option === 4 ? (<div className='trapezoid'></div>)
                                            : option === 5 ? (<div className='rectangle'></div>)
                                                : option === 6 ? (<div className='rhombus'></div>)
                                                    : null}
                        </div>
                    ))}
                </div>
                <div className={`flex-container mt-4 ${swapPosition ? 'justify-end' : 'justify-center'}`}>
                    {numbers.slice(3, 6).map((option, index) => (
                        <div className='cardItem' key={index} onClick={() => shuffle()} >
                            {option === 1 ? (<div className='square'></div>)
                                : option === 2 ? (<div className='circle'></div>)
                                    : option === 3 ? (<div className='oval'></div>)
                                        : option === 4 ? (<div className='trapezoid'></div>)
                                            : option === 5 ? (<div className='rectangle'></div>)
                                                : option === 6 ? (<div className='rhombus'></div>)
                                                    : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LayoutAndStyle; 