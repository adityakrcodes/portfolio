import { text, logo } from "../styles/fonts";

export default function Footer(){
    return(
        <footer className="w-full shadow-md mt-auto">
            <div className="text-center py-2 text-xl">
                <span className={`${text.className}`}>Developed by<span className={`${logo.className} text-2xl`}> AdityaKrCodes</span></span>
            </div>
        </footer>
    )
}