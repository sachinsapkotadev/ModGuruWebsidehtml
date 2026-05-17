import { db } from './firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

const APPS_COLLECTION = 'apps';
const GAMES_COLLECTION = 'games';
const COLLECTIONS_COLLECTION = 'collections';

// Apps CRUD operations
export const addApp = async (appData) => {
  try {
    const docRef = await addDoc(collection(db, APPS_COLLECTION), {
      ...appData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getApps = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, APPS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getAppById = async (id) => {
  try {
    const docRef = doc(db, APPS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateApp = async (id, appData) => {
  try {
    const docRef = doc(db, APPS_COLLECTION, id);
    await updateDoc(docRef, {
      ...appData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteApp = async (id) => {
  try {
    const docRef = doc(db, APPS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// Games CRUD operations
export const addGame = async (gameData) => {
  try {
    const docRef = await addDoc(collection(db, GAMES_COLLECTION), {
      ...gameData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getGames = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, GAMES_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const docRef = doc(db, GAMES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateGame = async (id, gameData) => {
  try {
    const docRef = doc(db, GAMES_COLLECTION, id);
    await updateDoc(docRef, {
      ...gameData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteGame = async (id) => {
  try {
    const docRef = doc(db, GAMES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

// Collections CRUD operations
export const addCollection = async (collectionData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS_COLLECTION), {
      ...collectionData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getCollections = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getCollectionById = async (id) => {
  try {
    const docRef = doc(db, COLLECTIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (id, collectionData) => {
  try {
    const docRef = doc(db, COLLECTIONS_COLLECTION, id);
    await updateDoc(docRef, {
      ...collectionData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (id) => {
  try {
    const docRef = doc(db, COLLECTIONS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};
