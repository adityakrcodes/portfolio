import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { logo, text } from "./styles/fonts";

export default function Home() {
  return (
    <div>
        <Navbar />
        <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-10 md:px-10 md:pt-36 pt-32">
            <div className="md:w-5/12 w-10/12 text-xl md:text-2xl">
                <h1 className={`${logo.className} text-4xl md:text-6xl`}>Yo 👋🏻</h1>
                <p className={`${logo.className} text-4xl md:text-5xl`}>I am Aditya</p>
                <p className={`${text.className} text-xl md:text-2xl`}>
                    I am a MERN Stack Developer and I love to build websites and web applications.
                </p>
            </div>
            <div className="md:w-1/2 w-10/12 ">
                <img src="/images/pfp.png" alt="profile" className="w-10/12 h-full object-cover rounded-full inset-shadow-sm inset-shadow-red-500" />
            </div>
        </div>
        <Footer />
    </div>
  );
}