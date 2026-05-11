import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { LatestPosts } from "./components/latest-posts";
import { Contact } from "./components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <LatestPosts />
      <Contact />
    </>
  );
}
