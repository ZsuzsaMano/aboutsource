import RepositoriesErrorBoundary from "@/components/ErrorBoundary";
import Reposatories from "@/components/Reposatories";
import { getRepositories } from "@/lib/getRepositories";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  const reposPromise = getRepositories();

  return (
    <>
      <header>
        <Image
          src="/as.svg"
          alt="aboutsource logo"
          width={100}
          height={20}
          loading="eager"
        />
      </header>
      <main>
        <h1>GitHub Dashboard</h1>
        <section className="max-w-2xl m-auto">
          <h2> Repositories </h2>
          <RepositoriesErrorBoundary>
            <Suspense
              fallback={
                <>
                  <p className="animate-spin inline-block my-8 mx-2">↻</p>
                  <span>Loading list of repos</span>
                </>
              }
            >
              <Reposatories reposPromise={reposPromise} />
            </Suspense>
          </RepositoriesErrorBoundary>
        </section>
      </main>
      <footer>Made by: Zsuzsa Lukacs</footer>
    </>
  );
}
