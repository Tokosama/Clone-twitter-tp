// src/services/userService.ts
import { User } from "../types";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Récupère tous les utilisateurs depuis la collection "Users"
export const getUsers = async (): Promise<User[]> => {
  // On utilise "Users" avec un U majuscule, conformément à ta configuration Firestore
  const usersCollectionRef = collection(db, "Users");
  const querySnapshot = await getDocs(usersCollectionRef);
  const users: User[] = querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
  })) as User[];
  return users;
};

// Basculer le statut de follow et renvoyer la liste mise à jour
export const toggleFollow = async (id: string): Promise<User[]> => {
  const userDocRef = doc(db, "Users", id);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const newIsFollowing = !userData.isFollowing;
    await updateDoc(userDocRef, { isFollowing: newIsFollowing });
  }
  return getUsers();
};
