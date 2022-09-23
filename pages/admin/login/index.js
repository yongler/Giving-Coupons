import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebaseApp";
import { base64Encode } from "@firebase/util";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [user] = useAuthState(auth);

  if (user) {
    router.push("/admin/campaigns");
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
            router.push("/admin/campaigns");
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <SupervisorAccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Sign in
        </Typography>
        <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
