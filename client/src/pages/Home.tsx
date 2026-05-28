import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import HealthStatus from "@/components/HealthStatus";
import DevelopmentBadge from "@/components/DevelopmentBadge";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/services/authService";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-zinc-950">
      <div className="absolute top-6 right-6 z-50">
        {isAuthenticated && (
          <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full shadow-2xl backdrop-blur-xl transition-all hover:bg-zinc-800">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-300 text-sm font-semibold tracking-wide flex items-center gap-1">
              Hi, <span className="text-white">{user?.firstName || user?.username || "Friend"}</span>
            </span>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 rounded-full hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <HealthStatus />

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
            Job Tracker <span className="text-indigo-500">AI</span>
          </h1>
          <p className="text-zinc-400">Streamline your career journey with AI.</p>
        </div>

        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full flex-col items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 backdrop-blur-sm shadow-2xl">
            <span className="text-zinc-500 font-medium mb-4">
              Dashboard Preview
            </span>
            <Link to="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-full shadow-lg shadow-indigo-500/20 transform transition hover:scale-105 active:scale-95">
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </AspectRatio>
      </div>

      <DevelopmentBadge />
    </div>
  );
}

export default Home;