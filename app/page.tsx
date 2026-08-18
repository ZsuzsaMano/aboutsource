import Image from "next/image";

export default function Home() {
  return (
<>
      <header className="">
        <Image
          className=""
          src="/as.svg"
          alt="about source logo"
          width={100}
          height={20}
          priority
        />

      </header>
</>
  
  );
}
