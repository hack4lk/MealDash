import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signUpWithEmail(email: string, password: string) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
}
