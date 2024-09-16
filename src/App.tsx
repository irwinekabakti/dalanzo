import { FC } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default App;
