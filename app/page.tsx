import Reposatories from "@/components/Reposatories";
import Image from "next/image";

export default function Home() {
  return (
<>
      <header>
        <Image
          className=""
          src="/as.svg"
          alt="aboutsource logo"
          width={100}
          height={20}
          priority
        />
      </header>
<main>
<h1>GitHub Dashboard</h1>
<Reposatories/>
</main>
<footer>Made by: Zsuzsa Lukacs {new Date().getFullYear()}</footer>
</>
  
  );
}
