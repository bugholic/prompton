import Feed from "../components/Feed"

export default function Home() {
  return (
    <section className="w-full flex flex-center flex-col">
      <h1 className="text-4xl font-bold m-5">
      Discover & Share <br className="md:hidden"/> <span className="orange_gradient">Powerfull AI prompts</span>
      </h1>
      <p className="desc text-center">
        Prompton is on open source platform designed to provide you preused and share usefull prompts for others.
      </p>
      <Feed />
    </section>
  )
}
