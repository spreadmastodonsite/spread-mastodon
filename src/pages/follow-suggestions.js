import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FollowSuggestions() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);

  // Suggested users to follow on signup success. Add more if you want!
  const suggestedUsers = [
    { id: "13179", username: "Mastodon", url: "https://mastodon.social/@Mastodon" },
    { id: "1", username: "Gargron", url: "https://mastodon.social/@Gargron" },
    { id: "109373774912342849", username: "wonderofscience", url: "https://mastodon.social/@wonderofscience" },
  ];

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

  const followUser = async (targetAccountId, username) => {
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      await axios.post("/api/follow", {
        accessToken,
        targetAccountId,
      });

      // @TODO: This message is still displaying success even if the user isn't
      // authenticated and follow fails. The user needs to be authenticated for
      // the follow to work.
      alert(`You are now following ${username}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <div>
      <h1>Follow Suggestions</h1>
      <p>
        Please check your email and click the confirmation link. Once
        confirmed, click the button below and log in to authenticate and view suggested users to follow.
      </p>
      <button onClick={() => setValidatedEmail(true)}>I have validated my email, proceed</button>
      {validatedEmail && (
        <>
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
            <button type="submit">Log in &amp; Authenticate</button>
          </form>
          {validationMessage && <div>{validationMessage}</div>}
          {/* Render the suggested users list */}
          <div>
            <h2>Suggested Users</h2>
            <ul>
              {suggestedUsers.map((user) => (
                <li key={user.id}>
                  <a href={user.url} target="_blank" rel="noopener noreferrer">{user.username}</a>{" "}
                  <button onClick={() => followUser(user.id, user.username)}>Follow</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <button onClick={() => router.push("/")}>Back to Signup</button>
    </div>
  );
}
