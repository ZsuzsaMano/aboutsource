import Reposatories from "@/components/Reposatories";
import { getRepositories } from "@/lib/github";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  const reposPromise = getRepositories();

  return (
    <>
      <header>
        <Image src="/as.svg" alt="aboutsource logo" width={100} height={20} />
      </header>
      <main>
        <h1>GitHub Dashboard</h1>
        <section className="max-w-2xl m-auto">
          <h2> Reposatories </h2>
          <Suspense
            fallback={
              <>
                <p className="animate-spin inline-block my-8 mx-2">↻</p>{" "}
                <span>Loading list of repos</span>
              </>
            }
          >
            <Reposatories reposPromise={reposPromise} />
          </Suspense>
        </section>
      </main>
      <footer>Made by: Zsuzsa Lukacs {new Date().getFullYear()}</footer>
    </>
  );
}
