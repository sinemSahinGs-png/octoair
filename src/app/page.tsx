import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { Fleet } from "@/components/sections/Fleet";
import { Global } from "@/components/sections/Global";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="page-shell">
      <Hero />
      <About />
      <Fleet />
      <Advantages />
      <Global />
      <Contact />
    </main>
  );
}
