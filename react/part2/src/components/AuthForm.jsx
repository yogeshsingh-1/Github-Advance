import { useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && !form.name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!isLogin && form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    // Connect your backend API here.
    setMessage(isLogin ? "Login form submitted!" : "Signup form submitted!");
  };

  const switchMode = (login) => {
    setIsLogin(login);
    setShowPassword(false);
    setMessage("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-9">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
            A
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            AuthFlow
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {isLogin
              ? "Enter your details to sign in."
              : "Fill in your details to get started."}
          </p>
        </div>

        {/* Login / Signup Toggle */}
        <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => switchMode(true)}
            className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => switchMode(false)}
            className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              {isLogin && (
                <button
                  type="button"
                  onClick={() =>
                    setMessage("Connect your forgot-password API here.")
                  }
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={isLogin ? undefined : 8}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-xs font-semibold text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <p className="text-xs leading-5 text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99]"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={() => setMessage("Connect Google OAuth to enable sign-in.")}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="text-lg font-bold text-blue-500">G</span>
          Google
        </button>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(!isLogin)}
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
