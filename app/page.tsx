import { logo, text } from "./styles/fonts";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
        <div className="mt-10  flex md:flex-row md:justify-center items-center gap-10 md:w-7/12 w-10/12 mx-auto">
            <div className="md:w-1/2 w-10/12 text-xl md:text-2xl">
                <div className="flex justify-between items-center mb-5 md:mb-0">
                    <div>
                        <h1 className={`${logo.className} text-4xl md:text-6xl`}>Yo 👋🏻</h1>
                        <p className={`${logo.className} text-4xl md:text-5xl`}>I am Aditya</p>
                    </div>
                    <div className="w-2/6 md:hidden">
                        <img src="/images/pfp.png" alt="profile" className="aspect-square h-full object-cover rounded-full shadow-[0_0_40px_rgba(79,196,255,0.25)]" />
                    </div>
                </div>
                <p className={`${text.className} text-xl md:text-2xl`}>
                    I am a MERN Stack Developer and I love to build websites and web applications.
                </p>
            </div>
            <div className="md:w-1/2 justify-center items-center hidden md:flex">
                <img src="/images/pfp.png" alt="profile" className="md:w-7/12 h-full object-cover rounded-full shadow-[0_0_40px_rgba(79,196,255,0.25)]" />
            </div>
        </div>
    </div>
  );
}