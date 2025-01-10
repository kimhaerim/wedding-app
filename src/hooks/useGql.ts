import { DocumentNode, MutationHookOptions, OperationVariables, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { showToast } from "../common/util";

interface IMutationHookOptions<T, F> extends MutationHookOptions<T, F> {
  isLoading?: boolean;
  errorMessage?: string;
  openEventHandler?: () => void;
  closeEventHandler?: () => void;
}

const useMutationHook = <T, F>(gql: DocumentNode, options: IMutationHookOptions<T, F>) => {
  const [mutate, { data, loading, error, called }] = useMutation<T, F>(gql, options);

  const checkError = (error: any) => {
    if (error) {
      showToast(error?.message || options?.errorMessage || "An error occurred", "error");
      options.openEventHandler && options.openEventHandler();
    }
  };

  useEffect(() => {
    checkError(error);
  }, [error, checkError]);

  return { mutate, data, loading, error };
};

export const useApiMutation = <T, F extends OperationVariables = OperationVariables>(
  gql: DocumentNode,
  options?: IMutationHookOptions<T, F>
) => {
  const apiMutateOptions = {
    isLoading: true, // 기본값 설정
    errorMessage: "API 호출 중 오류가 발생했습니다.",
    ...options,
  };

  return useMutationHook<T, F>(gql, apiMutateOptions);
};
