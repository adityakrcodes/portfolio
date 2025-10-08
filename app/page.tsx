import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { logo, text } from "./styles/fonts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
        <Navbar />
        <div className="flex-1 flex md:flex-row flex-col-reverse justify-center items-center gap-10 md:px-10 min-h-[80vh]">
            <div className="md:w-5/12 w-10/12 text-xl md:text-2xl">
                <h1 className={`${logo.className} text-4xl md:text-6xl`}>Yo 👋🏻</h1>
                <p className={`${logo.className} text-4xl md:text-5xl`}>I am Aditya</p>
                <p className={`${text.className} text-xl md:text-2xl`}>
                    I am a MERN Stack Developer and I love to build websites and web applications.
                </p>
            </div>
            <div className="md:w-1/2 w-10/12 flex justify-center items-center">
                <img src="/images/pfp.png" alt="profile" className="md:w-7/12 h-full object-cover rounded-full shadow-[0_0_40px_rgba(79,196,255,0.25)]" />
            </div>
        </div>
        <Footer />
    </div>
  );
}