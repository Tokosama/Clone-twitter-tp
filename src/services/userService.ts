// services/userService.ts
import {User} from "../types";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Récupère tous les utilisateurs depuis la collection "users"
export const getUsers = async (): Promise<User[]> => {
  const usersCollectionRef = collection(db, "users");
  const querySnapshot = await getDocs(usersCollectionRef);
  const users: User[] = querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id, // l'ID du document est une chaîne de caractères
      ...docSnapshot.data(),
    } as unknown as User;
  });
  return users;
};

// Bascule le suivi d'un utilisateur et retourne la liste mise à jour
export const toggleFollow = async (id: string): Promise<User[]> => {
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    // Bascule la valeur de isFollowing pour cet utilisateur
    const newIsFollowing = !userData.isFollowing;
    await updateDoc(userDocRef, { isFollowing: newIsFollowing });
  }
  // Retourne la liste mise à jour des utilisateurs
  return getUsers();
};
