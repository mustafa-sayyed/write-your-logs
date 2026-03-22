import { SignupForm } from "../components/index";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md surface-panel rounded-2xl p-6 sm:p-8">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
