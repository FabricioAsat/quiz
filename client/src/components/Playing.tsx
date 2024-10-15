import { useState } from "react";
import heroImage from "../assets/svg/question.svg";
import incognitoImage from "../assets/svg/incognito.svg";

const examplesQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    answers: ["Japan", "China", "India", "USA"],
    correctAnswer: "Japan",
  },
];

interface ISelectedAnwser {
  selected: string;
  isCorrect: boolean;
}

export const Playing = ({ versusUser }: { versusUser: TUser }) => {
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ISelectedAnwser>();

  function handleQuestions(answer: string) {
    if (selectedAnswer) return;
    if (answer === examplesQuestions[currentQuestionPosition].correctAnswer) {
      setSelectedAnswer({ selected: answer, isCorrect: true });
      return;
    }
    setSelectedAnswer({ selected: answer, isCorrect: false });
  }

  function handleNextQuestion() {
    if (currentQuestionPosition === examplesQuestions.length - 1) return;
    setCurrentQuestionPosition(currentQuestionPosition + 1);
    setSelectedAnswer(undefined);
  }

  return (
    <section className="flex flex-col items-center justify-start w-full select-none bg-b-primary/40 animate-fadeIn">
      <picture className="flex items-center justify-center py-2 ">
        <img src={heroImage} alt="Hero image" className="w-16" />
        <h2 className="text-2xl font-bold text-center">Quiz Time</h2>
      </picture>

      <section className="flex flex-col items-center justify-center w-full px-5 mt-5 gap-y-4 md:flex-row">
        <div className="flex items-center w-full">
          <img src={incognitoImage} alt="User image" className="w-8 h-8" />
          <span className="flex flex-col items-start justify-center w-full h-full pl-3">
            <h3 className="font-bold truncate">You: {versusUser.Username || "Anonymous"}</h3>
            <div className="w-full max-w-xs bg-gray-200 rounded-full">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${((currentQuestionPosition + 0) / examplesQuestions.length) * 100}%` }}
              />
            </div>
          </span>
        </div>
        <div className="flex items-center w-full">
          <span className="flex flex-col items-end justify-center w-full h-full pr-3">
            <h3 className="font-bold truncate">Versus: {versusUser.Username || "Anonymous"}</h3>
            <div className="w-full max-w-xs bg-gray-200 rounded-full">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${((currentQuestionPosition + 0) / examplesQuestions.length) * 100}%` }}
              />
            </div>
          </span>
          <img src={incognitoImage} alt="User image" className="w-8 h-8" />
        </div>
      </section>

      <aside className="flex flex-col items-center justify-start w-full h-full px-5 mt-5 overflow-y-auto">
        <div className="w-full max-w-3xl py-5 rounded-md">
          <p className="mb-4 text-xl italic font-semibold text-t-primary/75">
            Question {currentQuestionPosition + 1} of {examplesQuestions.length}
          </p>
          <h3 className="w-full text-3xl font-bold text-center text-t-primary">
            {examplesQuestions[currentQuestionPosition].question}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-start w-full gap-y-6">
          {examplesQuestions[currentQuestionPosition].answers.map((answer) => (
            <button
              onClick={() => handleQuestions(answer)}
              disabled={!!selectedAnswer}
              key={answer}
              className={`w-full max-w-xl py-3 font-bold rounded-xl text-b-primary transition-colors duration-200 ${
                selectedAnswer?.isCorrect && selectedAnswer?.selected === answer
                  ? "bg-green-500"
                  : !selectedAnswer?.isCorrect && selectedAnswer?.selected === answer
                  ? "bg-red-500"
                  : !!selectedAnswer && examplesQuestions[currentQuestionPosition].correctAnswer === answer
                  ? "bg-green-500"
                  : "bg-t-primary hover:bg-gray-300 disabled:hover:bg-t-primary"
              } `}
            >
              {answer}
            </button>
          ))}

          {!!selectedAnswer && (
            <div className="flex items-center justify-end w-full max-w-2xl mt-10">
              <button
                onClick={handleNextQuestion}
                className="px-10 py-3 font-bold bg-blue-500 text-t-primary rounded-xl"
              >
                Next{" >"}
              </button>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};
