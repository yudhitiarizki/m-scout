import { useState } from "react";
import { Lock, User as UserIcon } from "lucide-react";
import { User } from "../App";
import { mockUsers } from "../data/mockData";

type LoginProps = {
  onLogin: (user: User) => void;
};

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple mock authentication
    const user = mockUsers.find((u) => u.email === email);

    if (user && password === "password123") {
      onLogin(user);
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">M-Scout</h1>
          <p className="text-sm text-gray-500 mt-2">
            Mandiri Smart Credit Outreach Unit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">
            Demo Accounts:
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-semibold">Manager:</p>
              <p>Email: manager@bank.com</p>
              <p>Password: password123</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-semibold">User (Andi):</p>
              <p>Email: andi@bank.com</p>
              <p>Password: password123</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-semibold">User (Budi):</p>
              <p>Email: budi@bank.com</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
