import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FollowSuggestions() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/authenticate", {
        email,
        password,
      });

      // Store the access token for future authenticated requests
      sessionStorage.setItem("accessToken", response.data.data.access_token);

      setValidationMessage("Authenticated successfully");
    } catch (error) {
      setValidationMessage(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  const refreshPage = () => {
    router.reload();
  };

  const showLoginFormHandler = () => {
    setShowLoginForm(true);
  };

  return (
    <div>
      <h1>Follow Suggestions</h1>
      <p>
        Please check your email and click the confirmation link. Once
        confirmed, click the button below to proceed.
      </p>

      {showLoginForm ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Log in & Authenticate</button>
        </form>
      ) : (
        <button onClick={showLoginFormHandler}>
          I have validated my email, proceed
        </button>
      )}
      {validationMessage && <div>{validationMessage}</div>}
      {/* Render the suggested users list */}
      <div>
        <h2>Suggested Users</h2>
        <ul>
          <li>User 1 <a href="">Follow</a></li>
          <li>User 2 <a href="">Follow</a></li>
          <li>User 3 <a href="">Follow</a></li>
        </ul>
      </div>
      <button onClick={() => router.push("/")}>Back to Signup</button>
    </div>
  );
}
