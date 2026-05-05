import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML
  coverImage?: string;
  createdAt?: any;
  updatedAt?: any;
}

const ARTICLES_COLLECTION = 'articles';

// Error Handler for Firestore Rules
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const articleService = {
  async getArticles() {
    try {
      const q = query(collection(db, ARTICLES_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, ARTICLES_COLLECTION);
      return [];
    }
  },

  async getArticleById(id: string) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Article;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${ARTICLES_COLLECTION}/${id}`);
      return null;
    }
  },

  async getArticleBySlug(slug: string) {
    // For simplicity, fetch all and find logic, or we can use a query with where
     try {
      const q = query(collection(db, ARTICLES_COLLECTION));
      const snapshot = await getDocs(q);
      const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      return articles.find(a => a.slug === slug);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, ARTICLES_COLLECTION);
      return null;
    }
  },

  async createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, ARTICLES_COLLECTION);
      throw error;
    }
  },

  async updateArticle(id: string, data: Partial<Article>) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${ARTICLES_COLLECTION}/${id}`);
      throw error;
    }
  },

  async deleteArticle(id: string) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${ARTICLES_COLLECTION}/${id}`);
      throw error;
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      // We wrap the upload in a Promise that rejects if it takes too long
      // as sometimes Firebase Storage hangs if it's not enabled in the console
      const uploadTask = uploadBytes(storageRef, file);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('TIMEOUT')), 15000);
      });
      
      await Promise.race([uploadTask, timeoutPromise]);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error: any) {
      console.error("Errore durante l'upload dell'immagine:", error);
      if (error.message === 'TIMEOUT' || error.code === 'storage/unauthorized' || error.code === 'storage/unknown') {
        throw new Error('Assicurati di aver abilitato Firebase Storage nel tuo progetto Firebase e che le regole consentano la scrittura.');
      }
      throw error;
    }
  }
};
