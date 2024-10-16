import { type DefaultOptions, QueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Promisable } from "type-fest";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ExtractFnReturnType<FnType extends (...args: any) => any> = Promisable<ReturnType<FnType>>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
