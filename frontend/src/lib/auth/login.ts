import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function loginWithEmail(email: string, password: string) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
}
