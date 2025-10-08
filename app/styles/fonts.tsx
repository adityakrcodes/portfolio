import localFont from 'next/font/local'

const logo = localFont(
    {
        src: '../../public/fonts/Jerseay10/Jersey10-Regular.ttf'
    }
)

const text = localFont(
    {
        src: "../../public/fonts/League_Spartan/LeagueSpartan-VariableFont.ttf"
    }
)

export { logo, text }