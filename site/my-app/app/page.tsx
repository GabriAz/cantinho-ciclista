import FloatingMenu from "@/components/FloatingMenu";
import Hero from "@/components/Hero";
import Experiencia from "@/components/Experiencia";
import WeatherWidget from "@/components/WeatherWidget";
import Itinerario from "@/components/Itinerario";
import Galeria from "@/components/Galeria";
import Testimonials from "@/components/Testimonials";
import Filosofia from "@/components/Filosofia";
import ChamadaFinal from "@/components/ChamadaFinal";
import Footer from "@/components/Footer";
import NatureAudio from "@/components/NatureAudio";
import NatureParticles from "@/components/NatureParticles";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Efeitos globais e flutuantes */}
      <NatureParticles />
      <FloatingMenu />
      <NatureAudio />
      <WeatherWidget />
      
      {/* Seções principais */}
      <Hero />
      <Experiencia />
      <Itinerario />
      <Galeria />
      <Testimonials />
      <Filosofia />
      <ChamadaFinal />
      <Footer />
    </main>
  );
}
