import localFont from 'next/font/local'

const logo = localFont(
    {
        src: '../../public/fonts/VT323/VT323-Regular.ttf'
    }
)

const text = localFont(
    {
        src: "../../public/fonts/League_Spartan/LeagueSpartan-VariableFont.ttf"
    }
)

export { logo, text }