import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import styles from "../../styles/Form.module.css";

export default function adminLogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const user = await axios.post("/api/auth/login", credentials);
      if (user.status == 200) {
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Unable to log in", { autoClose: 3000 });
    }
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button sx={{ m: 4 }} type="submit" variant="contained">
        Log In
      </Button>
    </form>
  );
}
