import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import LinkForm from "../components/LinkForm"
import Footer from "../components/Footer"


export default function Home({dark,setDark}){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br 
     from-gray-100 via-blue-100 to-indigo-200 dark:from-gray-600 
     dark:via-grey-700 dark:to-black ">

      <Navbar dark={dark} setDark={setDark} />
      <Announcement/>

      <main className="flex-grow flex items-center justify-center">
        <Hero />
          
      </main>
       
            <LinkForm/>

       <Footer/>
    </div>
  )
}