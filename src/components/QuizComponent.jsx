import React, { useState } from "react";
import question from '../questions.json';
import Question from "./question";
import Answers from "./answers";
import Results from "./results";
import Actions from "./actions";

const QuizComponent = (props) => {
    
    //Utworzenie niezbędnych hooków
    
    const [currentIndex, setCurrentIndex] = useState(0); // index w tablicy z pytaniami
    const [currentQuestion, setCurrentQuestion] = useState(question[currentIndex]); // aktualne pytanie
    const [currentPoints, setCurrentPoints] = useState(0); // aktualne punkty
    const [allowToChoose, changePremission] = useState(true); // czy można wybrać odpowiedź 
    const [markedAnswer, markAnswer] = useState ({key: -1, variant: ''}); // zaznaczona odpowiedź

    const styles = { //style jako CSSProperties należy zapisywać camelCase-em np backgroundColor: 'red' 
        display: 'flex',
        justifyContent: 'center'
    };

    const handleNextQuestion = () => { // słowo handle oznaczna z reguły, że funkcja jest wywoływana przez użytkownika
        //funkcja zwiększa index o 1 w tablicy z pytaniami
        const nextValue = currentIndex + 1;
        if (nextValue > question.length - 1) { 
            // jeśli index jest większy od długości tablicy z pytaniami to wyświetlaj ostatnie pytanie
            setCurrentIndex(question.length - 1);
            return;
        }
        //ustawianie indexu na zwiększony 
        setCurrentIndex(nextValue);
        //ustawianie aktualnego pytania na następne pytanie
        setCurrentQuestion(question[nextValue]);
        changePremission(true);
        markAnswer({key: -1, variant: ''});
    };

    const handlePreviousQuestion = () => {
        //funkcja bliźniacza do wyższej tylko zmniejszająca index o 1 + sprawdzająca czy index nie jest mniejszy od 0
        const prevValue = currentIndex - 1;
        if (prevValue < 0) {
            setCurrentIndex(0);
            return;
        }
        setCurrentIndex(prevValue);
        setCurrentQuestion(question[prevValue]);
        changePremission(true);
        markAnswer({key: -1, variant: ''});
    };
    //sprawdzanie czy odpowiedź jest poprawna
    const handleCheckAnswer = (chosenOption, key) => {
        //jeśli nie jest wybrana 
        if (!allowToChoose) {
            return;
        }
        //jeśli odpowiedź jest poprawna to dodaj punkt i zmnień na zielony, jeśli nie to na czerwony
        if (currentQuestion.correct_answer === chosenOption) {
            const points = currentPoints + 1;
            setCurrentPoints(points);
            changePremission(false);
            markAnswer({key, variant: 'bg-success'})
        } else {
            changePremission(false);
            markAnswer({key, variant: 'bg-danger'})
        }
    };
    //wyświetlanie componentu z pytaniami
    return (
        <div style={styles}>
        <div className="containter">
            <Question 
                className="col-12"
                currentQuestion={currentQuestion.question}
                currentIndex={currentIndex + 1}
                allQuestions={question.length}
            />
            <Answers 
                className="col-12"
                checkAnswer={handleCheckAnswer}
                currentAnswers={currentQuestion.answers}
                markedAnswer={markedAnswer}/>
            <Results points={currentPoints}/>
            <Actions 
                disablePrev={currentIndex > 0}
                disableNext={currentIndex !== question.length - 1}
                prev={handlePreviousQuestion}
                next={handleNextQuestion}/>
        </div>
        </div>
    )
};

export default QuizComponent;