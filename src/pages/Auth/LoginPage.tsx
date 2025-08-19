import React, { useState } from "react";
import "../../styles/Auth/loginPage.css";
import { LOGIN_ENDPOINT } from "../../utils/endpoints";
import ToastComponent from "../../components/ToastComponent";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import LoaderModal from "../../components/Loader";


type payloadProps = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth()
  const [ loading, setLoading ] = useState(false)

  const [payload, setPayload] = useState<payloadProps>({'username': '', 'password': ''});

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
		try {
      setLoading(true)
			const callAPI = await fetch(LOGIN_ENDPOINT, {
				method: "POST",
        credentials: "include",
				body: JSON.stringify(payload),
				headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
			});

			const json_response = await callAPI.json();

      if (callAPI.ok) {
        if (json_response.data.role === 1) {
          setAccessToken(json_response.data.access_token)
          navigate('/home', {replace: true})
         return
        }
        toast.error("You do not have access to login")
        return
      }
      else {
        toast.error(json_response.message || "Something went wrong")
        return
      }
		}
		catch (err) {
      setLoading(false)
      console.log(err, '----err------')
		}
  setLoading(false)  
  }
  return (
    <div className="login-root">
      {loading && <LoaderModal />}
      <form onSubmit={handleLogin}>
        <div className="login-card">
          <h2 style={{ color: "white" }}>Login</h2>
          <input
            type="text"
            className="login-input"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setPayload({ ...payload, username: e.target.value })}
            required
          />
          <input
            type="text"
            className="login-input"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPayload({ ...payload, password: e.target.value })}
            required
          />
          <button className="login-submit">
            Submit
          </button>
        </div>
       </form> 
      <ToastComponent />
    </div>
  );
};

export default LoginPage;
