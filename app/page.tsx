import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import HowIWork from "@/components/HowIWork";
import Journey from "@/components/Journey";
import LatestWriting from "@/components/LatestWriting";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <HowIWork />
      <Journey />
      <LatestWriting />
      <Contact />
    </>
  );
}
