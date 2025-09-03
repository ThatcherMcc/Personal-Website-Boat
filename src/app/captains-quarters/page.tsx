// app/painted-world/undead-settlement/page.tsx
import Image from "next/image";
import Link from "next/link";
import AllowScroll from "./components/AllowScroll";
import FavoritesSection from "./components/FavoritesSection";

export default function CaptainsQuartersPage() {
  return (
    <>
      <AllowScroll />
      {/* This is the new container for the background image and blur.
        It sits behind everything else.
      */}
      <div
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/captains-quarters/painted-world-bg.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        {/* This is the dedicated blur layer. 
          It sits directly on top of the background image. 
        */}
        <div className="absolute inset-0 w-full h-full backdrop-blur-md"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-screen text-white">
        {/* Room Title */}
        <h1 className="text-5xl font-bold font-serif text-stone-200 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] mb-4">
          About Me
        </h1>

        {/* Section 1: Introduction */}
        <section className="max-w-9/10 flex flex-row gap-8 text-center bg-stone-900 bg-opacity-70 p-8 rounded-lg shadow-2xl mb-10">
          <Image
            src="/thatcher-pics/thatch-woods.jpeg"
            alt="Thatcher McClure Headshot"
            width={400}
            height={400}
            className="rounded-full border-8 border-stone-600"
          />
          <div>
            <h1 className="font-semibold font-serif text-4xl text-stone-300 mb-4 border-b-2 border-stone-400 pb-2">
              Who I am
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-lg text-left font-serif leading-relaxed">
                Hi, I'm <strong className="text-green-600">Thatcher</strong>, a
                creator at heart who finds his fulfillment and escape from
                overconsumption in the act of building for myself and others. I
                think creation has many forms, whether it's a solution to a
                problem, providing a new experience that leads to a fresh
                perspective, or even an impactful thought (pick your poison),
                each can be equally valuable. <br />
                I'm pretty big on creation if you couldn't tell.
              </p>
              <div className="flex flex-col space-y-6 md:flex-row md:space-x-12 md:space-y-0">
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-semibold font-serif mb-2">
                    Free Time Spending
                  </h2>
                  <ul className="list-disc list-inside text-lg font-serif">
                    <li>Girlfriend of almost 5 years now 💗</li>
                    <li>Siblings and Parents 👨‍👩‍👧‍👦</li>
                    <li>Watching and Ranking Movies 🎥</li>
                    <li>Playing Games with Friends 🎮</li>
                    <li>Finding New Music 🎵</li>
                  </ul>
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-semibold font-serif mb-2">
                    New Things I'm Learning
                  </h2>
                  <ul className="list-disc list-inside text-lg font-serif">
                    <li>How to Play the Guitar 🎸</li>
                    <li>Speaking Chinese (mandarin) 🗣️</li>
                    <li>Altering Clothes 🪡</li>
                    <li>Holding a Handstand 🤸</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Skills/Attributes */}
        <FavoritesSection />

        {/* Interactive Element: Bonfire to return to the gallery */}
        <Link href="/?boatState=interior" className="fixed left-8 top-12">
          <div className="relative w-24 h-24 cursor-pointer group">
            <Image
              src="/captains-quarters/bonfire.png"
              alt="A lit bonfire, a place of rest"
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 scale-125 group-hover:scale-150"
            />
            <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-stone-200 px-3 py-1 rounded-full text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
              Return to Firelink
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
