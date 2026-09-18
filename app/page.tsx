import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollRibbon } from "@/components/scene/scroll-ribbon";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:text-[#141714]"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <div className="relative">
          <ScrollRibbon />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
