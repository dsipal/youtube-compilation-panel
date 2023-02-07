import { createTRPCRouter } from './trpc'
import { redditSourceRouter } from './routers/reddit-source'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  redditSource: redditSourceRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
