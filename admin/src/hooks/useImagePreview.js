import { useEffect, useState } from "react";

function useImagePreview(file) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file || !(file instanceof Blob)) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return preview;
}

export default useImagePreview;