import Image from "next/image";

export default function Home() {
  return (
<>
      <header className="p-8">
        <Image
          className=""
          src="/as.svg"
          alt="aboutsource logo"
          width={100}
          height={20}
          priority
        />
      </header>
<main className="p-8">
<h1>GitHub Dashboard</h1>
</main>
<footer>Made by: Zsuzsa Lukacs {new Date().getFullYear()}</footer>
</>
  
  );
}
