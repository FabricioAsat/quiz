import bgImage from "../assets/bg.webp";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`w-screen h-screen max-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {children}
    </div>
  );
};
