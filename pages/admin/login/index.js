import axios from "axios";
import { useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import styles from "../../../styles/Form.module.css";

export default function adminLogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username.value,
      password: password.value,
    };

    const user = await axios.post("/api/auth/login", credentials);
    console.log(user);
    console.log(credentials);
  };

  return (
    <form
      style={{
        justifyContent: "center",
        height: "100vh",
      }}
      className={styles.formpage}
      onSubmit={handleSubmit}
    >
      <h1>Log In</h1>
      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          aria-describedby="username"
          onChange={(e) => setUsername(e.target)}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="password"
          type="password"
          onChange={(e) => setPassword(e.target)}
        />
      </FormControl>

      <Button sx={{ m: 4 }} type="submit" variant="contained">
        Log In
      </Button>
    </form>
  );
}
