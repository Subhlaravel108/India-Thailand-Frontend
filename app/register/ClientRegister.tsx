import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

export default function ClientRegister() {
    return (
        <>
         <Header/>
            <div className="py-10 lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Register & Start Your Journey
                        </h1>
                        <p className="text-gray-600">
                            Create your account and explore the best Jaipur to Thailand tour packages, exclusive deals, and personalized travel plans.
                        </p>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        <Footer/>
        </>
    );
}
