import React from "react";
import { useGlobalContext } from "./Components/Context";
import SetupForm from "./Components/SetupForm";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";
import "./index.css";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  //const answers =[...incorrect_answers,correct_answer]
  let answeres = [...incorrect_answers];

  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answeres.push(correct_answer);
  } else {
    answeres.push(answeres[tempIndex]);
    answeres[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answeres.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
