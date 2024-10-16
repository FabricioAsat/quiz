import { useEffect, useState } from "react";
import heroImage from "../assets/svg/question.svg";

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
  {
    question: "What is the smallest country in the world?",
    answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
    correctAnswer: "Vatican City",
  },
  {
    question: "Which of the following planets is known for being the hottest?",
    answers: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Venus",
  },
  {
    question: "What is the largest living species of lizard?",
    answers: ["Komodo dragon", "Saltwater crocodile", "Black mamba", "Green anaconda"],
    correctAnswer: "Komodo dragon",
  },
  {
    question: "What is the highest mountain peak in the solar system?",
    answers: ["Mount Everest", "Olympus Mons", "Mauna Kea", "Denali"],
    correctAnswer: "Olympus Mons",
  },
  {
    question: "Which of the following elements is the lightest?",
    answers: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"],
    correctAnswer: "Hydrogen",
  },
  {
    question: "What is the process by which water moves through a plant?",
    answers: ["Respiration", "Photosynthesis", "Transpiration", "Evaporation"],
    correctAnswer: "Transpiration",
  },
];

interface ISelectedAnwser {
  selected: string;
  isCorrect: boolean;
}

export const Playing = ({ versusUser, currentUser }: { versusUser: TUser; currentUser: TUser }) => {
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ISelectedAnwser>();
  const [timer, setTimer] = useState(0);

  function handleQuestions(answer: string) {
    if (selectedAnswer) return;
    if (answer === examplesQuestions[currentQuestionPosition].correctAnswer) {
      setSelectedAnswer({ selected: answer, isCorrect: true });
      return;
    }
    setSelectedAnswer({ selected: answer, isCorrect: false });
  }

  function handleNextQuestion() {
    if (currentQuestionPosition === examplesQuestions.length - 1) {
      return;
    }
    setCurrentQuestionPosition(currentQuestionPosition + 1);
    setSelectedAnswer(undefined);
  }

  //*: Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-start w-full select-none bg-b-primary/40 animate-fadeIn">
      <picture className="flex items-center justify-center py-2 ">
        <img src={heroImage} alt="Hero image" className="w-16" />
        <h2 className="text-2xl font-bold text-center">Quiz Time</h2>
      </picture>

      <section className="grid w-full max-w-4xl grid-cols-2 px-5 mt-5 gap-x-2 gap-y-4 md:flex-row">
        <div className="flex flex-col w-full max-w-xl">
          <small className="italic font-bold text-left text-green-300">{currentUser.Username || "Unknown"}</small>
          <div className="h-1 bg-gray-300 rounded">
            <div
              className="h-1 bg-green-500 rounded"
              style={{ width: `${(currentQuestionPosition / examplesQuestions.length) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-sm italic">
            Timer: <b className="text-green-300">{timer}</b> seg.
          </p>
        </div>
        <div className="flex flex-col w-full max-w-xl">
          <small className="italic font-bold text-right text-red-300">{versusUser.Username || "Unknown"}</small>
          <div className="h-1 bg-red-500 rounded">
            <div
              className="h-1 bg-gray-300 rounded"
              style={{
                width: `${((examplesQuestions.length - currentQuestionPosition) / examplesQuestions.length) * 100}%`,
              }}
            />
          </div>
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
