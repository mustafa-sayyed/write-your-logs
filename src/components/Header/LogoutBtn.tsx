import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((error) => {
        console.log("Logout Error", error);
      });
  };

  return (
    <Button variant="outline" className="cursor-pointer flex items-center gap-2" onClick={handleLogout}>
      <LogOut size={16} />
      Logout
    </Button>
  );
}

export default LogoutBtn;
