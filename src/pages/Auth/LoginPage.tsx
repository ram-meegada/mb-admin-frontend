import React, { useState } from "react";
import "../../styles/Auth/loginPage.css";
import { LOGIN_ENDPOINT } from "../../utils/endpoints";
import ToastComponent from "../../components/ToastComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoaderModal from "../../components/Loader";
import { Button, Stack, TextField, Typography } from "@mui/material";

type payloadProps = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState<payloadProps>({
    username: "",
    password: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const callAPI = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const json_response = await callAPI.json();

      if (callAPI.ok) {
        if (json_response.data.role === 1) {
          setAccessToken(json_response.data.access_token);
          navigate("/home", { replace: true });
          return;
        }
        toast.error("You do not have access to login");
        return;
      } else {
        toast.error(json_response.message || "Something went wrong");
        return;
      }
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <div className="login-root">
      {loading && <LoaderModal />}
      <Stack
        component="form"
        spacing={2}
        sx={{ alignSelf: "center", mt: 2, mb: 5, p: 6, border: '1px solid var(--dark-grey-border)' }}
        onSubmit={handleLogin}
      >
        <Typography variant="h4" component='div' sx={{ color: 'white', alignSelf: 'center' }}>Login</Typography>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 300 }}
          required
          onChange={(e) => setPayload({ ...payload, username: e.target.value })}
          autoComplete="off"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          sx={{ width: 300 }}
          required
          onChange={(e) => setPayload({ ...payload, password: e.target.value })}
        />
        <Button variant="contained" sx={{ fontWeight: "bold" }} type="submit">
          Submit
        </Button>
      </Stack>
      <ToastComponent />
    </div>
  );
};

export default LoginPage;
