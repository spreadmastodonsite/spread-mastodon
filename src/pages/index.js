import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "@/components/molecules/Card";
import Grid from "@/components/layout/Grid";
import GridItem from "@/components/layout/GridItem";

import { homepageData } from "/data/homepage.js";

export default function Home() {
	const [rotateIndex, setRotateIndex] = useState(0);
	const heading = homepageData.heading;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setRotateIndex((index) => (index + 1) % heading.textRotate.length);
	// 	}, 3000);

	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<div className="content-wrapper">
			<Head>
				<title>Mastodon Signup</title>
				<meta
					name="description"
					content="Mastodon account signup using Next.js, React and Mastodon API"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Grid className="u-text-align--center">
					<GridItem columnStart={2} columnEnd={12}>
						<img
							src="/-e-SpreadMastodon_Logo.png"
							alt="Spread Mastodon | Take Back Social"
							className="c-logo"
						/>
						<h1 className="c-heading-one__special u-heading--xxl">
							<div>
								<span>{heading.textOne} </span>{" "}
								<span className="c-heading-one__rotate">
									{" "}
									{heading.textRotate[rotateIndex]}
								</span>{" "}
							</div>
							<span>{heading.textTwo}</span>
						</h1>
					</GridItem>
					<GridItem columnStart={4} columnEnd={10}>
						<p className="u-body--lg">{homepageData.subHeading.text}</p>
					</GridItem>
				</Grid>

				{/* Might make a Grid/Flex component going forward depending on other pages */}
				<Grid variant="autoFit" className="c-card__container">
					{homepageData.cards.map((card) => (
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
			</main>
			<footer>
				<Grid>
					<GridItem columnStart={5} columnEnd={9}>
						<p className="u-text-align--center u-body--sm">
							{homepageData.disclaimer.text}
							<br />
							{homepageData.disclaimer.copyright}
						</p>
					</GridItem>
				</Grid>
			</footer>
		</div>
	);
}
