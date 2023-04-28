import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "@/components/molecules/Card";
import Grid from "@/components/layout/Grid";
import GridItem from "@/components/layout/GridItem";

import { homepageData as data } from "/data/homepage.js";

export default function Home() {
	const [rotateIndex, setRotateIndex] = useState(0);
	const heading = data.heading;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setRotateIndex((index) => (index + 1) % heading.textRotate.length);
	// 	}, 3000);

	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<div className="content-wrapper">
			<Head>
				<title>{data.metaData.title}</title>
				<meta name={data.metaData.name} content={data.metaData.description} />
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
								<p>
									{heading.textOne}{" "}
									<span className="c-heading-one__animation">
										{heading.textRotate.map((text) => {
											return (
												<span key={text} className="c-heading-one__rotate">
													{text}
												</span>
											);
										})}
									</span>
								</p>
							</div>
							<span>{heading.textTwo}</span>
						</h1>
					</GridItem>
					<GridItem columnStart={4} columnEnd={10}>
						<p className="u-body--lg">{data.subHeading.text}</p>
					</GridItem>
				</Grid>

				{/* Might make a Grid/Flex component going forward depending on other pages */}
				<Grid variant="autoFit" className="c-card__container">
					{data.cards.map((card) => (
						<Card
							key={card.title}
							title={card.title}
							description={card.description}
							iconName={card.icon}
							iconWidth={card.iconWidth}
							iconHeight={card.iconHeight}
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
							{data.disclaimer.text}
							<br />
							{data.disclaimer.copyright}
						</p>
					</GridItem>
				</Grid>
			</footer>
		</div>
	);
}
