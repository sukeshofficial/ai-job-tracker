import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "./OTPInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VerifyOTPCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const { email } = location.state || {};

  const handleVerify = async () => {
    if (otp.length !== 6) return toast.error("Please enter 6-digit code");
    setIsVerifying(true);
    try {
      // In a real app, call verifyOtp API
      toast.success("Email verified successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="border-none bg-zinc-900/50 backdrop-blur-xl text-white">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="h-6 w-6 text-indigo-400" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription className="text-zinc-400">
          We sent a code to <span className="text-white font-semibold">{email || "your email"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OTPInput value={otp} onChange={setOtp} disabled={isVerifying} />
        <Button
          onClick={handleVerify}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold"
          disabled={isVerifying || otp.length !== 6}
        >
          {isVerifying ? <Loader2 className="animate-spin" /> : "Verify OTP"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyOTPCard;
