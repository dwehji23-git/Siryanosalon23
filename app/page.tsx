import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeServices from "@/components/HomeServices";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <HomeServices />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
