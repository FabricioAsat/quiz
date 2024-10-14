import heroImage from "../assets/svg/question.svg";

export const NotPlaying = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full select-none bg-b-primary/40">
      <picture className="flex flex-col items-center justify-center">
        <img src={heroImage} alt="Hero image" className="w-48" />
        <h2 className="text-4xl font-bold text-center">Quiz Time</h2>
      </picture>
    </section>
  );
};
