import { useState } from "react";
import axios from "axios";

export const useUploadForm = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData, method: "post" | "put") => {
    try {
      const { data } = await axios(url, {
        method: method,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress: (progressEvent) => {
          const progress =
            (progressEvent.loaded / (progressEvent.total || 1)) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress =
            50 + (progressEvent.loaded / (progressEvent.total || 1)) * 50;
          console.log(progress);
          setProgress(progress);
        },
      });

      setIsSuccess(true);
      return data;
    } catch (error) {
      setIsSuccess(false);
    }
  };

  return { uploadForm, isSuccess, progress };
};
