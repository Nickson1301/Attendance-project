import { useState } from "react";
import API from "../../api";
import "./ForgotPassword.css";

function ForgotPassword({ userType = "student", onClose }) {
  const [step, setStep] = useState("verify"); // verify, code, reset
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendCode = async () => {
    if (!uid || !uid.trim()) {
      setError("UID is required");
      return;
    }
    if (!email || !email.trim()) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const endpoint = userType === "teacher" ? "/teachers" : "/users";
      const res = await API.get(`${endpoint}`);
      
      if (!res.data || res.data.length === 0) {
        setError("Unable to fetch user data");
        setLoading(false);
        return;
      }

      // Find user by both UID and email
      const user = res.data.find(u => u.uid === uid && u.email === email);
      
      if (!user) {
        setError("UID and email combination not found");
        setLoading(false);
        return;
      }
      
      // In a real app, backend sends code to email
      const simulatedCode = Math.random().toString().slice(2, 8);
      localStorage.setItem("forgotPasswordCode", simulatedCode);
      localStorage.setItem("forgotPasswordEmail", email);
      localStorage.setItem("forgotPasswordUid", uid);
      localStorage.setItem("forgotPasswordType", userType);
      localStorage.setItem("forgotPasswordUserId", user.id);
      
      setMessage(`✓ Code sent to ${email}. (Test code: ${simulatedCode})`);
      setStep("code");
    } catch (err) {
      console.error(err);
      setError("Failed to process request");
    }
    setLoading(false);
  }

  const verifyCode = async () => {
    if (!code || !code.trim()) {
      setError("Verification code is required");
      return;
    }
    const storedCode = localStorage.getItem("forgotPasswordCode");
    if (code !== storedCode) {
      setError("Invalid verification code");
      return;
    }
    setError("");
    setMessage("");
    setStep("reset");
  }

  const resetPassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem("forgotPasswordUserId");
      const endpoint = userType === "teacher" ? "/teachers" : "/users";
      
      await API.patch(`${endpoint}/${userId}`, { password: newPassword });
      setMessage("✓ Password reset successfully! You can now login.");
      // Clear localStorage
      localStorage.removeItem("forgotPasswordCode");
      localStorage.removeItem("forgotPasswordEmail");
      localStorage.removeItem("forgotPasswordUid");
      localStorage.removeItem("forgotPasswordType");
      localStorage.removeItem("forgotPasswordUserId");
      
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  const goBack = () => {
    if (step === "code") {
      setStep("verify");
      setUid("");
      setEmail("");
      setCode("");
    }
    if (step === "reset") setStep("code");
    setError("");
    setMessage("");
  }

  return (
    <div className="forgot-password-overlay" onClick={onClose}>
      <div className="forgot-password-modal" onClick={e => e.stopPropagation()}>
        <button className="forgot-close" onClick={onClose}>×</button>
        
        <h2>Reset Password</h2>

        {step === "verify" && (
          <div className="forgot-step">
            <p>Enter your UID and email to verify your account</p>
            <input
              type="text"
              placeholder="UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="forgot-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-input"
            />
            <button onClick={sendCode} disabled={loading} className="forgot-btn">
              {loading ? "Verifying..." : "Send Code"}
            </button>
          </div>
        )}

        {step === "code" && (
          <div className="forgot-step">
            <p>Enter the verification code sent to {email}</p>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="forgot-input"
            />
            <button onClick={verifyCode} className="forgot-btn">Verify Code</button>
            <button onClick={goBack} className="forgot-btn-secondary">Back</button>
          </div>
        )}

        {step === "reset" && (
          <div className="forgot-step">
            <p>Create a new password</p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="forgot-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="forgot-input"
            />
            <button onClick={resetPassword} disabled={loading} className="forgot-btn">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button onClick={goBack} className="forgot-btn-secondary">Back</button>
          </div>
        )}

        {error && <div className="forgot-error">{error}</div>}
        {message && <div className="forgot-message">{message}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
