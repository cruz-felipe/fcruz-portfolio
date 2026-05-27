import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { getHomepage } from "@/lib/content";

export default function Home() {
  const homepage = getHomepage();
  return (
    <main id="main-content">
      <Nav />
      <Hero data={homepage} />
      <Work data={homepage} />
      <About data={homepage} />
      <Footer data={homepage} />
    </main>
  );
}
