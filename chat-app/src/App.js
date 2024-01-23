import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import { app } from "./firebase";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function App() {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  const [user, setUser] = useState(false);
  const [mess, setMess] = useState("");
  const [message, setMessage] = useState([]);

  const divForScroll = useRef(null);

  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logoutHandler = () => signOut(auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data);
    });
    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessage(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);
  // console.log(message);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("hi");
    try {
      await addDoc(collection(db, "messages"), {
        text: mess,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setMess("");
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} paddingY={"4"}>
            <Button onClick={logoutHandler} colorScheme="red" w={"full"}>
              LogOut
            </Button>
            <VStack
              h={"full"}
              w={"full"}
              overflowX="auto"
              css={{ "&::-webkit-scrollbar": { display: "none" } }}
            >
              {message.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}
              <div ref={divForScroll}></div>
            </VStack>

            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <Input
                  value={mess}
                  onChange={(e) => setMess(e.target.value)}
                  placeholder="Enter a Messages..."
                />
                <Button colorScheme={"purple"} type="submit">
                  send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack
          bg={"white"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100vh"}
        >
          <Button onClick={loginHandler} colorScheme={"purple"}>
            {" "}
            SignIn with google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
