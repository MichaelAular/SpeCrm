import { storage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadFile = async (file, folder) => {
    try {
      const filename = file.name;
      const storageRef = ref(
        storage,
        `${folder}${filename}`
      );
      const res = await uploadBytes(storageRef, file);
  
      return res.metadata.fullPath;
    } catch (error) {
      throw error;
    }
};
  
export const getFile = async (path) => {
    try {
      const fileRef = ref(storage, path);
      return getDownloadURL(fileRef);
    } catch (error) {
      throw error;
    }
};