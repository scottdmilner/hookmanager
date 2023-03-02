import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/accomplice/discord', async (req: Request, res: Response) => {
	console.log('Hello there');
	res.sendStatus(200);
});

app.post('/accomplice/discord', async (req: Request, res: Response) => {
	console.log(req.body);
	
	const message = `
	**A thing has happened!** :confetti_ball:\n 
	There was a \`${req.body.meta.type}\` on the entity \`${req.body.entity.id}\`!
	Have a great day :relaxed:
	`

	await fetch(process.env.DISCORD_HOOK_URL as string, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: 'ShBotGrid',
			content: message,
			avatar_url: 'http://animhooks.cs.byu.edu/img/shotgriscord.png',
		}),
	})
	res.sendStatus(200);
});


app.get('/img/shotgriscord.png', (req: Request, res: Response) => {
	res.sendFile('img/shotgriscord.png');
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
