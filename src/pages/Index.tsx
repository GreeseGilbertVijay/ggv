import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Sample from "./Sample";


const Index = () => {
  return (
    <>
      <section id="Home"><Home /></section>
      <section id="About"><About /></section>
      <section id="Projects"><Projects /></section>
      <section id="Services"><Services /></section>
      <section id="Sample"><Sample /></section>
    </>
  );
};

export default Index;
