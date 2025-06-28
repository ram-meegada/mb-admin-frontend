import React, { useState } from "react";
import "../../styles/Auth/loginPage.css";
import { LOGIN_ENDPOINT } from "../../utils/endpoints";

type payloadProps = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [payload, setPayload] = useState<payloadProps>({'username': '', 'password': ''});

  async function handleLogin() {
		try {
			const callAPI = await fetch(LOGIN_ENDPOINT, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
			});

			const json_response = await callAPI.json();

			
		}
		catch (err) {

		}
  }
  return (
    <div className="login-root">
      <div className="login-card">
        <h2 style={{ color: "white" }}>Login</h2>
        <input
          type="text"
          className="login-input"
          name="username"
          placeholder="Enter username"
          onChange={(e) => setPayload({ ...payload, username: e.target.value })}
        />
        <input
          type="text"
          className="login-input"
          name="password"
          placeholder="Enter password"
          onChange={(e) => setPayload({ ...payload, password: e.target.value })}
        />
        <button className="login-submit" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
