import { Button, FormControl, InputLabel, Input } from "@mui/material";
import styles from "../../styles/Form.module.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebaseApp";

export default function adminLogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h4 style={{ margin: 3 }}>Loading... Please wait...</h4>;
  }

  if (user) {
    router.push("/test");
    return <h4 style={{ margin: 3 }}>Loading... Please wait...</h4>;
  }

  const signIn = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, provider).catch((error) => {
      toast.error("There was an error logging in", { autoClose: 2000 });
      router.push("/login");
    });
  };

  return (
    <form
      style={{
        justifyContent: "center",
        height: "100vh",
      }}
      className={styles.formpage}
      onSubmit={signIn}
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
