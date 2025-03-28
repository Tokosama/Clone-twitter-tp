import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.ts";
import {
  Eye,
  EyeOff,
  Loader2Icon,
  Lock,
  Mail,
  Twitter,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [isSigninup, setIsSigninup] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigninup(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: formData.email,
          fullname: formData.fullName,
          username: formData.userName,
        });
      }
      toast.success("Account created successfully");
    } catch (error) {
      const e = error as Error;
      toast.error(e.message);
      console.log(e);
    } finally {
      setIsSigninup(false);
    }
  };

  return (
    <div className="min-h-screen grid ">
      {/*left side */}

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Twitter className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2"> Create Account</h1>
              <p className=" text-base-content/60">
                Get Started with your free account
              </p>
            </div>
          </div>

          {/* FORMM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">User Name</span>
              </label>
              <div className="relative">
                <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Mr Crab"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigninup}
            >
              {isSigninup ? (
                <>
                  <Loader2Icon className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account "
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
