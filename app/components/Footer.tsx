import { text, logo } from "../styles/fonts";

export default function Footer(){
    return(
        <footer className="fixed bottom-0 left-0 w-full shadow-md">
            <div className="text-center py-2 text-xl">
                <span className={`${text.className}`}>Developed by<span className={`${logo.className} text-2xl`}> AdityaKrCodes</span></span>
            </div>
        </footer>
    )
}