import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { contactInfo } from "@/lib/global_variables";

export default function ClientLogin() {
    return(
      <>
      
        <Header/>  
        <div className="py-5  lg:min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to your {contactInfo.websiteName} account</p>
        </div>
        <LoginForm />
      </div>
    </div>
      <Footer/>
      </>
    )
}