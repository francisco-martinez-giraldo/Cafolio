import { JSX } from "react";
import { LoginForm } from "./components/LoginForm";

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-background p-8">
      <LoginForm />
    </div>
  );
}

export default App;
