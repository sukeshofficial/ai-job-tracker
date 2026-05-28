import AuthLayout from "../../features/auth/components/AuthLayout";
import VerifyOTPCard from "../../features/auth/components/VerifyOTPCard";

const VerifyOTPPage = () => {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-[440px]">
        <VerifyOTPCard />
      </div>
    </AuthLayout>
  );
};

export default VerifyOTPPage;
