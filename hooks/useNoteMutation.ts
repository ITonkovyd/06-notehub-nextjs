import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";



import { BaseNoteParams } from "@/types/note";





interface UseNoteMutationOptions {
  mutationFn: (variables: BaseNoteParams) => Promise<BaseNoteParams>;
  queryKey: string[];
  successMsg?: string;
  errorMsg?: string;
  successAction?: () => void;
}

export function useNoteMutation({
  mutationFn,
  queryKey,
  successMsg,
  errorMsg,
  successAction,
}: UseNoteMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (successMsg) toast.success(successMsg);
      if (successAction) successAction();
    },
    onError: () => {
      if (errorMsg) toast.error(errorMsg);
    },
  });
}