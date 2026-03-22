import { LoginForm } from "../components/index";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md surface-panel rounded-2xl p-6 sm:p-8">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
