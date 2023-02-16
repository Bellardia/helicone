import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const {} = props;
  const [authError, setAuthError] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  return (
    <div className="sm:max-w-2xl flex flex-col space-y-0 w-full min-w-[300px] sm:min-w-[450px]">
      <div className="w-full border-b border-gray-300 pb-2 justify-between flex flex-row items-center">
        <p className="text-lg font-medium w-full">{"Welcome to Helicone"}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="h-full flex flex-col w-full pt-2">
          <div className="pt-2 w-full flex-auto">
            {" "}
            <div className="flex min-h-full items-center justify-center">
              <div className="w-full max-w-md space-y-8">
                <form className="space-y-4" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 text-md sm:text-lg p-2 sm:p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 text-md sm:text-lg p-2 sm:p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  {authError && (
                    <div className="mt-4 text-sm text-red-600 w-full">
                      <p>{authError}</p>
                    </div>
                  )}
                </form>
                <button
                  onClick={() => {
                    if (email === "") {
                      setAuthError("Email is required");
                      return;
                    }
                    if (password === "") {
                      setAuthError("Password is required");
                      return;
                    }
                    setLoading(true);
                    supabaseClient.auth
                      .signInWithPassword({
                        email,
                        password,
                      })
                      .then((res) => {
                        if (res.error) {
                          setAuthError(res.error.message);
                        } else {
                          router.push("/dashboard");
                        }
                        setLoading(false);
                      });
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <div className="flex flex-row items-center">
                      <ArrowPathIcon className="w-4 h-4 mr-1.5 animate-spin" />
                      Logging in...
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">Sign In</div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
