import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./Landing.module.css";

export default function Landing() {
  const { login, register, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup | forgot | reset
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setInfo("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Shared email validation for flows that use email
    if (
      (mode === "login" || mode === "signup" || mode === "forgot") &&
      !form.email
    ) {
      setErr("Please enter your email address");
      return;
    }
    if (
      (mode === "login" || mode === "signup" || mode === "forgot") &&
      form.email &&
      !emailRegex.test(form.email)
    ) {
      setErr("Please enter a valid email address");
      return;
    }

    try {
      if (mode === "signup") {
        if (
          !form.password ||
          !form.first_name ||
          !form.last_name ||
          !form.username
        ) {
          setErr("Please fill all fields");
          return;
        }
        if (form.password.length < 8) {
          setErr("Password must be at least 8 characters");
          return;
        }

        await register({
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          username: form.username,
        });

        setMode("login");
        setInfo("Account created. Please sign in.");
        return;
      }

      if (mode === "forgot") {
        const response = await forgotPassword(form.email);
        // In development, if token is returned, switch to reset mode
        if (response.data.resetToken) {
          setResetToken(response.data.resetToken);
          setMode("reset");
          setInfo("Please enter your new password below.");
        } else {
          setInfo(response.data.message);
        }
        return;
      }

      if (mode === "reset") {
        if (!resetToken || !form.password) {
          setErr("Please enter reset token and new password");
          return;
        }
        if (form.password.length < 8) {
          setErr("Password must be at least 8 characters");
          return;
        }

        await resetPassword(resetToken, form.password);
        setInfo("Password reset successfully. Please sign in.");
        setMode("login");
        setResetToken("");
        setForm({ ...form, password: "" });
        return;
      }

      await login(form.email, form.password);
      navigate("/home");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            {mode === "login"
              ? "Login to your account"
              : mode === "signup"
              ? "Join the network"
              : mode === "forgot"
              ? "Reset your password"
              : "Enter reset token"}
          </h2>

          <p className={styles.switchText}>
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  className={styles.linkBtn}
                  onClick={() => setMode("signup")}
                >
                  Create a new account
                </button>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  className={styles.linkBtn}
                  onClick={() => setMode("login")}
                >
                  Sign in
                </button>
              </>
            ) : mode === "forgot" ? (
              <>
                Remember your password?{" "}
                <button
                  className={styles.linkBtn}
                  onClick={() => {
                    setMode("login");
                    setErr("");
                    setInfo("");
                  }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.linkBtn}
                  onClick={() => {
                    setMode("login");
                    setErr("");
                    setInfo("");
                    setResetToken("");
                  }}
                >
                  Back to login
                </button>
              </>
            )}
          </p>

          {err && <div className={styles.alert}>{err}</div>}
          {info && <div className={styles.info}>{info}</div>}

          <form className={styles.form} onSubmit={onSubmit}>
            {mode === "forgot" ? (
              <>
                <input
                  className={styles.input}
                  placeholder="Your Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
                <button className={styles.submit} type="submit">
                  SEND RESET LINK
                </button>
              </>
            ) : mode === "reset" ? (
              <>
                <input
                  className={styles.input}
                  placeholder="Reset Token"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                />
                <div className={styles.passwordWrapper}>
                  <input
                    className={styles.input}
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button className={styles.submit} type="submit">
                  RESET PASSWORD
                </button>
              </>
            ) : (
              <>
                <input
                  className={styles.input}
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />

                {mode === "signup" && (
                  <>
                    <div className={styles.row}>
                      <input
                        className={styles.input}
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={(e) => update("first_name", e.target.value)}
                      />
                      <input
                        className={styles.input}
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={(e) => update("last_name", e.target.value)}
                      />
                    </div>

                    <input
                      className={styles.input}
                      placeholder="User Name"
                      value={form.username}
                      onChange={(e) => update("username", e.target.value)}
                    />
                  </>
                )}

                <div className={styles.passwordWrapper}>
                  <input
                    className={styles.input}
                    placeholder="Your Password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {mode === "login" && (
                  <button
                    type="button"
                    className={styles.forgotLink}
                    onClick={() => {
                      setMode("forgot");
                      setErr("");
                      setInfo("");
                    }}
                  >
                    Forgot Password?
                  </button>
                )}

                <button
                  className={mode === "login" ? styles.submit : styles.join}
                  type="submit"
                >
                  {mode === "login" ? "SIGN IN" : "AGREE AND JOIN"}
                </button>

                {mode === "signup" && (
                  <p className={styles.smallMuted}>
                    I agree to the{" "}
                    <span className={styles.orange}>privacy policy</span> and{" "}
                    <span className={styles.orange}>terms of service</span>.
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.about}> About </p>
        <h1 className={styles.heroTitle}>Evangadi Networks Q&amp;A</h1>
        <p className={styles.heroText}>
          Welcome to Evangadi Forum, a tech community for global networking and
          learning. Join us to connect with peers, collaborate on projects, and
          enhance your professional growth. Explore the features that can
          elevate your tech journey today. Ask programming questions, get help
          from the community, and help others by answering.
        </p>
        <button
          className={styles.howBtn}
          onClick={() => navigate("/how-it-works")}
        >
          HOW IT WORKS
        </button>
      </div>
    </div>
  );
}
