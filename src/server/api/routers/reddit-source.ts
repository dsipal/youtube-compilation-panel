import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import axios from 'axios'
const stringReq = z.string({
  required_error: 'input is required!',
})
export const redditSourceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        subreddit: z.string({
          required_error: 'Subreddit is required!',
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx
      const { subreddit } = input
      return prisma.redditSource.create({
        data: {
          subreddit,
        },
      })
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.redditSource.findMany()
  }),
  clear: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.redditSource.deleteMany()
  }),
  delete: protectedProcedure.input(stringReq).mutation(({ ctx, input }) => {
    return ctx.prisma.redditSource.delete({
      where: {
        subreddit: input,
      },
    })
  }),
  getTop: protectedProcedure.input(stringReq).query(async ({ ctx, input }) => {
    const url = `https://reddit.com/r/${input}/top.json`
    const res = await axios.get(url)
    console.log(res)
    return res.data as JSON
  }),
})
