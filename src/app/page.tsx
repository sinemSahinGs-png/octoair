import Hero from "@/components/sections/Hero";
import Global from "@/components/sections/Global";
import Fleet from "@/components/sections/Fleet";
import About from "@/components/sections/About";
import Advantages from "@/components/sections/Advantages";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="page-shell">
      <Hero />
      <Global />
      <Fleet />
      <About />
      <Advantages />
      <Contact />
    </main>
  );
}
