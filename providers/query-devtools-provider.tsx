"use client"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const QueryDevToolsProvider = () => {
  return <ReactQueryDevtools initialIsOpen={false} />
}