import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center max-w-md animate-fadeUp">
        <div className="w-24 h-24 rounded-[2rem] bg-sky-50 flex items-center justify-center text-sky-500 mx-auto mb-10 shadow-lg border border-sky-100">
           <AlertCircle size={48} />
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">404</h1>
        <p className="text-xl font-bold text-slate-900 mb-2">Requested Module Unavailable</p>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
          The project or system page you are trying to access has been moved or does not exist in the current architecture.
        </p>
        <Link to="/">
          <Button className="btn-primary h-14 px-10">
            <ArrowLeft size={18} className="mr-2" /> Return to Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
