import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/User";
import quizData from "../quiz/quizData";
import { Question } from "../types/quiz";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router";

type SelectedAnswer = {
  questionIndex: number;
  answerIndex: number;
};

const Questions: React.FC = () => {
  const history = useHistory();
  const { userCity } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const questions = quizData.find((data) => data.city === userCity)?.questions;

  useEffect(() => {
    console.log("scoore", score);
  }, [score]);
  const handleAnswerClick = (selectedAnswerIndex: number) => {
    if (!questions) return;
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = {
      questionIndex: currentQuestionIndex,
      answerIndex: selectedAnswerIndex,
    };
    const answerIndexInSelectedAnswers = selectedAnswers.findIndex(
      (item) => item.questionIndex === currentQuestionIndex
    );
    if (answerIndexInSelectedAnswers === -1) {
      // add the selected answer to the selectedAnswers array
      setSelectedAnswers([...selectedAnswers, selectedAnswer]);
    } else {
      // update the selected answer in the selectedAnswers array
      const updatedSelectedAnswers = [...selectedAnswers];
      updatedSelectedAnswers[answerIndexInSelectedAnswers] = selectedAnswer;
      setSelectedAnswers(updatedSelectedAnswers);
    }
    if (currentQuestion?.correctAnswerIndex === selectedAnswerIndex) {
      console.log("correct answer");

      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // calculate the score percentage
      const scorePercentage = Math.round((score / questions.length) * 100);

      // navigate to the results page
      history.push("/quiz/results", {
        score,
        scorePercentage,
      });
    }
  };

  const goBackToPrevQuestion = () => {
    setCurrentQuestionIndex((idx) => idx - 1);
  };
  const renderQuestion = (question: Question, index: number) => {
    const selectedAnswerIndex = selectedAnswers.find(
      (item) => item.questionIndex === index
    )?.answerIndex;
    return (
      <>
        <IonCard key={index}>
          <IonCardContent>
            <h2>{question.question}</h2>
            <IonGrid>
              {question.answers.map((answer, answerIndex) => (
                <IonRow key={answerIndex}>
                  <IonCol size="6">
                    <IonButton
                      color={
                        selectedAnswerIndex === answerIndex
                          ? "primary"
                          : "medium"
                      }
                      size="small"
                      onClick={() => handleAnswerClick(answerIndex)}
                    >
                      {answer}
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {currentQuestionIndex !== 0 && (
          <IonButton
            onClick={goBackToPrevQuestion}
            className="ion-margin"
            size="small"
            fill="outline"
          >
            <IonIcon icon={chevronBack}></IonIcon>précédent
          </IonButton>
        )}
      </>
    );
  };

  return (
    <>
      {questions ? (
        <>
          {renderQuestion(
            questions[currentQuestionIndex],
            currentQuestionIndex
          )}
        </>
      ) : (
        <div>No questions found for {userCity}</div>
      )}
    </>
  );
};

export default Questions;