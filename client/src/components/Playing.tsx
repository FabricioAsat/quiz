import { useEffect, useState } from "react";
import heroImage from "../assets/svg/question.svg";
import { postNextQuestion } from "../api/challengeReq";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ISelectedAnwser {
  selected: string;
  isCorrect: boolean;
}

export const Playing = ({
  versusUser,
  currentUser,
  allQuestions,
  gameId,
  currentOpponentProgress,
  handleReset,
}: {
  versusUser: TUser;
  currentUser: TUser;
  allQuestions: TQuestion[];
  gameId: string;
  currentOpponentProgress: number;
  handleReset: () => void;
}) => {
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ISelectedAnwser>();
  const [finish, setFinish] = useState({ you: false, versus: false });
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState({ corrects: 0, wrongs: 0, time: 0 });

  const navigateTo = useNavigate();

  function handleQuestions(answer: string) {
    if (selectedAnswer) return;
    if (answer === allQuestions[currentQuestionPosition].Answer) {
      setSelectedAnswer({ selected: answer, isCorrect: true });
      return;
    }
    setSelectedAnswer({ selected: answer, isCorrect: false });
  }

  function handleNextQuestion() {
    if (!selectedAnswer) return;

    if (selectedAnswer?.isCorrect) {
      setResults({ ...results, corrects: results.corrects + 1 });
    } else {
      setResults({ ...results, wrongs: results.wrongs + 1 });
    }

    if (currentQuestionPosition === allQuestions.length - 1) {
      setCurrentQuestionPosition(currentQuestionPosition + 1);
      setFinish({ ...finish, you: true });
      setResults({ ...results, time: timer });
      clearInterval(timer);
      return;
    }

    async function request() {
      const response = await postNextQuestion(gameId, currentUser.ID, currentQuestionPosition + 1);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
    }
    request();
    setCurrentQuestionPosition(currentQuestionPosition + 1);
    setSelectedAnswer(undefined);
  }

  function handleResetPlaying() {
    setCurrentQuestionPosition(0);
    setSelectedAnswer(undefined);
    setFinish({ ...finish, you: false, versus: false });
    setResults({ corrects: 0, wrongs: 0, time: 0 });
    setTimer(0);
    navigateTo("/");
    handleReset();
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

  useEffect(() => {
    if (currentOpponentProgress === allQuestions.length - 1) {
      setFinish({ ...finish, versus: true });
    }
  }, [currentOpponentProgress]);

  if (!finish.you && !finish.versus)
    return (
      <section className="flex flex-col items-center justify-center w-full h-full pt-20 overflow-y-auto gap-x-10 bg-b-primary/40 gap-y-3">
        <div className="flex flex-col items-center justify-center w-full gap-10 lg:flex-row gap-y-3">
          <article className="flex flex-col items-center justify-start w-full max-w-md py-10 bg-green-500/10">
            <h2 className="text-5xl font-extrabold text-sky-500">⭐ Victoria ⭐</h2>
            <h4 className="w-full text-3xl font-bold text-center">{currentUser.Username}</h4>
            <p className="text-2xl font-bold">Corrects: {results.corrects}</p>
            <p className="text-2xl font-bold">Wrongs: {results.wrongs}</p>
            <p className="text-2xl font-bold">Time: {timer} seg.</p>
          </article>

          <article className="flex flex-col items-center justify-start w-full max-w-md py-10 bg-red-400/10">
            <h2 className="text-5xl font-extrabold text-red-500">💀 Derrota 💀</h2>
            <h4 className="w-full text-3xl font-bold text-center">{versusUser.Username}</h4>
            <p className="text-2xl font-bold">Corrects: {results.corrects}</p>
            <p className="text-2xl font-bold">Wrongs: {results.wrongs}</p>
            <p className="text-2xl font-bold">Time: {timer} seg.</p>
          </article>
        </div>

        <button
          onClick={handleResetPlaying}
          className="px-10 py-2 mt-10 text-3xl font-bold text-center rounded-md bg-sky-400"
        >
          Go back
        </button>
      </section>
    );

  if (finish.you)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-b-primary/40 gap-y-3">
        <div className="w-10 h-10 mt-10 border-2 border-transparent rounded-full border-b-green-500 animate-spin"></div>
        <p className="italic">Waiting your opponent...</p>
      </div>
    );

  if (!allQuestions.length)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-b-primary/40 gap-y-3">
        <div className="w-10 h-10 mt-10 border-2 border-transparent rounded-full border-b-green-500 animate-spin"></div>
        <p className="italic">Waiting questions...</p>
      </div>
    );

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
              style={{ width: `${(currentQuestionPosition / allQuestions.length) * 100}%` }}
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
                width: `${((allQuestions.length - currentOpponentProgress) / allQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <aside className="flex flex-col items-center justify-start w-full h-full px-5 mt-5 overflow-y-auto">
        <div className="w-full max-w-3xl py-5 rounded-md">
          <p className="mb-4 text-xl italic font-semibold text-t-primary/75">
            Question {currentQuestionPosition + 1} of {allQuestions.length}
          </p>
          <h3 className="w-full text-3xl font-bold text-center text-t-primary">
            {allQuestions[currentQuestionPosition].Question}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-start w-full gap-y-6">
          {allQuestions[currentQuestionPosition].Options.map((answer) => (
            <button
              onClick={() => handleQuestions(answer)}
              disabled={!!selectedAnswer}
              key={answer}
              className={`w-full max-w-xl py-3 font-bold rounded-xl text-b-primary transition-colors duration-200 ${
                selectedAnswer?.isCorrect && selectedAnswer?.selected === answer
                  ? "bg-green-500"
                  : !selectedAnswer?.isCorrect && selectedAnswer?.selected === answer
                  ? "bg-red-500"
                  : !!selectedAnswer && allQuestions[currentQuestionPosition].Answer === answer
                  ? "bg-green-500"
                  : "bg-t-primary hover:bg-gray-300 disabled:hover:bg-t-primary"
              } `}
            >
              {answer}
            </button>
          ))}

          <div className="flex items-center justify-end w-full max-w-2xl mt-10">
            <button
              disabled={!selectedAnswer}
              onClick={handleNextQuestion}
              className="px-10 py-3 font-bold bg-blue-500 text-t-primary rounded-xl"
            >
              Next{" >"}
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};
