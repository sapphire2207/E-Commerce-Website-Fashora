import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAIResult } from "../store/slices/aiSlice";

const useAI = () => {
  const dispatch = useDispatch();
  const { jobId, status, result } = useSelector((state) => state.ai);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(() => {
      if (status === "completed" || status === "failed") {
        clearInterval(interval);
        return;
      }

      dispatch(fetchAIResult(jobId));
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, status, dispatch]);

  return { status, result };
};

export default useAI;
