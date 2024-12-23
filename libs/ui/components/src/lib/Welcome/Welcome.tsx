interface WelcomeProps {
  project: string;
}

export function Welcome({ project }: WelcomeProps) {
  return (
    <div id="welcome">
      <h1>
        <span>Hello there, </span>
        Welcome to {project}
      </h1>
    </div>
  );
}
