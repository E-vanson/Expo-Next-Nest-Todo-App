import { createTRPCReact, CreateTRPCReact, httpBatchLink } from "@trpc/react-query";
import {AppRouter} from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";

export const trpc:CreateTRPCReact<AppRouter, object>  = createTRPCReact<AppRouter,object>()  //represents the actual trpc connection to our backend

export const queryClient = new QueryClient()  // single query client shared across the entire application, we'll obtain our local cache data from this query

export const trpcClient = trpc.createClient({
    links: [//configure connections to actual trpc server over http | supply an array of batch links
        httpBatchLink({// batch our trpc request over http and send 
            url: process.env.NEXT_PUBLIC_TRPC_URL!
        })
    ]
})