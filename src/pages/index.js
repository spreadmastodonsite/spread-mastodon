import Head from "next/head";
import Card from "@/components/molecules/Card";
import Grid from "@/components/layout/Grid";
import GridItem from "@/components/layout/GridItem";

import { homepageCardData as cardData } from "/data/content";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Mastodon Signup</title>
				<meta
					name="description"
					content="Mastodon account signup using Next.js, React and Mastodon API"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="c-container">
				<Grid className="u-text-align--center">
					<GridItem columnStart={3} columnEnd={11}>
						<img className="c-logo" src="/FPO-logo.png" alt="REPLACE LOGO" />
						<h1>
							Welcome to your <span className="text-primary">Better</span>
							<br />
							Social Home
						</h1>
						<p>
							We can help you easily join Mastodon,
							<br />
							enrich your experience if you&apos;ve already joined, and share
							<br />
							Mastodon with your friends and social networks.
						</p>
					</GridItem>
				</Grid>

				{/* Might make a Grid/Flex component going forward depending on other pages */}
				<Grid variant="autoFit">
					{cardData.map((card) => (
						<Card
							key={card.title}
							title={card.title}
							description={card.description}
							icon={card.icon}
							link={card.link}
							linkText={card.linkText}
						/>
					))}
				</Grid>

				<footer>
					<Grid>
						<GridItem columnStart={5} columnEnd={9}>
							<p className="u-text-align--center">
								This site is not affiliated with Mastodon 9GMBH.
								<br />© 2023 Spread Mastodon. All Rights Reserved.
							</p>
						</GridItem>
					</Grid>
				</footer>
			</main>
		</div>
	);
}
