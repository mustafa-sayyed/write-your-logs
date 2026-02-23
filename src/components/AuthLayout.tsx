import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}

function Protected({ children, authentication = true }: ProtectedProps) {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    // agar app auth chahte ho and app ke authStatus false hai to = /login
    // agar app auth nahi chahte ho and app ka autStatus true hai to = /
    if (authentication && !authStatus) {
      navigate("/login");
    }
  }, [authStatus, authentication, navigate]);

  return loading ? (
    <div className="flex flex-col justify-center items-center min-h-screen text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-700 border-b-gray-900"></div>
      <div className="mt-4 text-lg">Loding......</div>
    </div>
  ) : (
    <>{children}</>
  );
}

export default Protected;
