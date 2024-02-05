import { appRouter } from '@/server';
import { createCaller } from '@/server/trpc';
import { httpBatchLink } from '@trpc/client';

export const serverClient = createCaller(appRouter)({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/api/trpc',
		}),
	],
});
