"use client";
import Reposatories from "@/components/Reposatories";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("/api/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

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
        <Reposatories repos={repos} />
      </main>
      <footer>Made by: Zsuzsa Lukacs {new Date().getFullYear()}</footer>
    </>
  );
}
