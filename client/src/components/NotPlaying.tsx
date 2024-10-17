import { toast } from "sonner";
import { postChallengeToResponse } from "../api/challengeReq";
import heroImage from "../assets/svg/question.svg";

export const NotPlaying = ({
  currentUser,
  versusUser,
  incomingChallenge,
  setIncomingChallenge,
}: {
  currentUser: TUser;
  versusUser: TUser;
  incomingChallenge: boolean;
  setIncomingChallenge: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function handleChallengeResp(accept: boolean) {
    if (!currentUser.ID || !versusUser.ID) return;
    async function request() {
      const response = await postChallengeToResponse(currentUser.ID, versusUser.ID, accept);

      if (!response.status) {
        toast.error(response.message);
        return;
      }
      setIncomingChallenge(false);
    }
    request();
  }

  return (
    <section className="relative z-10 flex flex-col items-center justify-center w-full select-none bg-b-primary/40 animate-fadeIn">
      <picture className="flex flex-col items-center justify-center">
        <img src={heroImage} alt="Hero image" className="w-48" />
        <h2 className="text-4xl font-bold text-center">Quiz Time</h2>
      </picture>

      {incomingChallenge && (
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-b-primary/50 animate-fadeIn">
          <div className="flex flex-col items-center justify-center px-10 py-10 bg-t-primary text-b-primary gap-y-5 rounded-xl">
            <p className="text-xl font-bold text-center">Someone has challenged you!</p>

            <span className="flex items-center justify-center gap-x-5">
              <button
                className="px-6 py-2 font-bold bg-green-400 rounded-md text-b-primary"
                onClick={() => handleChallengeResp(true)}
              >
                Aceptar
              </button>
              <button
                className="px-6 py-2 font-bold bg-red-400 rounded-md text-b-primary"
                onClick={() => handleChallengeResp(false)}
              >
                Rechazar
              </button>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
