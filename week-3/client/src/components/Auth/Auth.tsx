// Auth.tsx
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2, AlertCircle } from "lucide-react";
import React from "react";

interface UserInputs {
  email?: string;
  username: string;
  password: string;
}

interface LabelledInputProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserInputs>({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};

    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
    } else if (inputs.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (type === "signup") {
      if (!inputs.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs() || loading) return;

    setLoading(true);
    try {
      // Add your API call here
      setLoading(false);
      navigate(type === "signin" ? "/" : "/signin");
    } catch (error) {
      setLoading(false);
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred. Please try again.",
      }));
    }
  };
return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-xl lg:max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12"
    >
      <div className="space-y-8 lg:space-y-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700">
            {type === "signin" ? "Welcome Back" : "Create Account"}
          </h1>
          {errors.general && (
            <div className="mt-4 flex items-center justify-center text-red-500">
              <AlertCircle className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
              <span className="text-sm lg:text-base">{errors.general}</span>
            </div>
          )}
        </div>

        <div className="space-y-6 lg:space-y-8">
          <LabelledInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={inputs.username}
            onChange={handleInputChange}
            error={errors.username}
          />

          {type === "signup" && (
            <LabelledInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={inputs.email ?? ""}
              onChange={handleInputChange}
              error={errors.email}
            />
          )}

          <LabelledInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={inputs.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 lg:py-5 px-4 bg-emerald-600 text-white rounded-lg font-medium
              hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500
              focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              text-base lg:text-lg"
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto h-5 w-5 lg:h-6 lg:w-6" />
            ) : (
              type === "signin" ? "Sign In" : "Sign Up"
            )}
          </button>
        </div>

        <div className="text-center space-y-3">
          <p className="text-gray-600 text-base lg:text-lg">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-base lg:text-lg"
          >
            {type === "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </div>
    </form>
  );
};

const LabelledInput = ({
  type,
  label,
  name,
  placeholder,
  onChange,
  value,
  error,
}: LabelledInputProps) => (
  <div className="space-y-2">
    <label className="block text-base lg:text-lg font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 lg:py-4 text-base lg:text-lg
        border rounded-lg transition-colors
        focus:outline-none focus:ring-2
        ${
          error
            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
        }
      `}
    />
    {error && (
      <p className="text-red-500 text-sm lg:text-base flex items-center">
        <AlertCircle className="mr-1 h-4 w-4 lg:h-5 lg:w-5" />
        {error}
      </p>
    )}
  </div>
);

export default Auth;