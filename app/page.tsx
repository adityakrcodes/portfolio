import Navbar from "./components/Navbar";
import { text } from "./styles/fonts";

export default function Home() {
  return (
    <div className={`${text.className}`}>
        <Navbar />
    </div>
  );
}