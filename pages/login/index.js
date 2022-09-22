import { Button, FormControl, InputLabel, Input } from "@mui/material";
import styles from "../../styles/Form.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebaseApp";
import { base64Encode } from "@firebase/util";

export default function adminLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h4 style={{ margin: 3 }}>Loading... Please wait...</h4>;
  }

  if (user) {
    router.push("/admin/test");
    return <h4 style={{ margin: 3 }}>Loading... Please wait...</h4>;
  }

  const signIn = async (e) => {
    e.preventDefault();

    fetch("/api/login/", {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64Encode(email + ":" + password),
      },
    }).then((res) => {
      if (res.status === 401) {
        toast.error("Your email or password was incorrect. Please try again!", {
          autoClose: 2000,
        });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            toast.success("Successfully signed in. Welcome admin!", {
              autoClose: 2000,
            });
            router.push("/admin/test");
            return res;
          })
          .catch((error) => {
            console.log(error);
            toast.error("There was an error logging in", { autoClose: 2000 });
          });
      }
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
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          aria-describedby="email"
          onChange={(e) => setEmail(e.target.value)}
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
