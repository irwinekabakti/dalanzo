import { FC } from "react";
import "./App.css";
import { useRoutes } from "react-router";
import Routes from "./routes/Routes";

const App: FC = () => {
  const appRoutes = useRoutes(Routes());

  return <>{appRoutes}</>;
};

export default App;
