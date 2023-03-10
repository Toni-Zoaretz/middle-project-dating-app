import { questions } from "../questions";
import { useGlobalContext } from "../context/context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Quiz() {
  const userStuff = useCurrentUser();
  const navigate = useNavigate();

  const { jazzMusicHobby, moviesHobby, foodieHobby, booksHobby } =
    useGlobalContext();

  const [quizAnswers, setQuizAnswers] = useState(() => new Map());
  const [correctAnswers, setCorrectAnswers] = useState(() => new Set());

  const handleChange = (questionIndex, answerIndex) => {
    const theQuestion = questions[questionIndex];
    setCorrectAnswers((set) => {
      if (theQuestion.correctAnswer === theQuestion.answers[answerIndex]) {
        set.add(theQuestion.id);
      } else {
        set.delete(theQuestion.id);
      }

      return new Set(set);
    });

    setQuizAnswers((prev) => {
      prev.set(questionIndex, answerIndex);

      return new Map(prev);
    });
  };

  const handleSendBtn = async () => {
    await userStuff.updateUser(
      {
        trivia: Array.from(correctAnswers),
      },
      { merge: true }
    );

    navigate("/allUsers");
  };
  return (
    <div className="page quiz-page">
      <div className="hobbies-title-div">
        <h2 className="quiz-title">ANSWER THE QUIZ</h2>
      </div>
      {jazzMusicHobby ? (
        <div key={questions[0].id} className="quiz-div">
          <h2 className="ques-titles">{questions[0].title}</h2>
          {[0, 1, 2, 3].map((answerIndex) => {
            return (
              <div className="answer-div">
                <input
                  type="radio"
                  name="JazzMusic"
                  value={questions[0].answers[answerIndex]}
                  checked={quizAnswers.get(0) === answerIndex}
                  onChange={() => handleChange(0, answerIndex)}
                />
                <span className="quiz-answer">
                  {questions[0].answers[answerIndex]}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
      {moviesHobby ? (
        <div key={questions[1].id} className="quiz-div">
          <h2 className="ques-titles">{questions[1].title}</h2>
          {[0, 1, 2, 3].map((answerIndex) => {
            return (
              <div className="answer-div">
                <input
                  type="radio"
                  name="Movies"
                  value={questions[1].answers[answerIndex]}
                  checked={quizAnswers.get(1) === answerIndex}
                  onChange={() => handleChange(1, answerIndex)}
                />
                <span className="quiz-answer">
                  {questions[1].answers[answerIndex]}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
      {foodieHobby ? (
        <div key={questions[2].id} className="quiz-div">
          <h2 className="ques-titles">{questions[2].title}</h2>
          {[0, 1, 2, 3].map((answerIndex) => {
            return (
              <div className="answer-div">
                <input
                  type="radio"
                  name="foodie"
                  value={questions[2].answers[answerIndex]}
                  checked={quizAnswers.get(2) === answerIndex}
                  onChange={() => handleChange(2, answerIndex)}
                />
                <span className="quiz-answer">
                  {questions[2].answers[answerIndex]}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
      {booksHobby ? (
        <div key={questions[3].id} className="quiz-div">
          <h2 className="ques-titles">{questions[3].title}</h2>
          {[0, 1, 2, 3].map((answerIndex) => {
            return (
              <div className="answer-div">
                <input
                  type="radio"
                  name="books"
                  value={questions[3].answers[answerIndex]}
                  checked={quizAnswers.get(3) === answerIndex}
                  onChange={() => handleChange(3, answerIndex)}
                />
                <span className="quiz-answer">
                  {questions[3].answers[answerIndex]}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="send-btn-container">
        <button className="btn btn-quiz " onClick={handleSendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Quiz;
