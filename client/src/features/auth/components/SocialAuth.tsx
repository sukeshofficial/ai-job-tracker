import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialAuth = () => {
  const handleSocialLogin = (provider: string) => {
    // Redirect to the backend OAuth2 initiation endpoint (Port 5000 to match tamil-developer)
    window.location.href = `http://localhost:5000/oauth2/authorization/${provider}`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("google")}
          className="h-11 rounded-full border-white/5 bg-white/5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
        >
          <Globe className="mr-2 h-4 w-4" /> Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          className="h-11 rounded-full border-white/5 bg-white/5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
        >
          <Globe className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-zinc-500 font-bold tracking-widest">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;
