import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError("Email atau password salah.");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="bg-red-900/40 text-red-300 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <label className="block text-sm text-zinc-300 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm text-zinc-300 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded-md bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
