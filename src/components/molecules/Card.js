import cx from "classnames";
import Button from "./Button";
import Icon from "../atoms/icon";

export default function Card({
	className,
	title,
	description,
	iconName,
	iconWidth,
	iconHeight,
	link,
	linkText,
}) {
	const componentClassName = cx("c-card", className, {});

	return (
		<div className={componentClassName}>
			<div className="c-card__icon">
				{/* <img src={icon} alt={title} /> */}
				<Icon
					className="c-card__icon"
					iconName={iconName}
					width={iconWidth}
					height={iconHeight}
				/>
			</div>
			<h2 className="u-heading--xl u-normal">{title}</h2>
			<div className="c-card__content">
				<Button text={linkText} link={link} />
				<p className="u-body-copy">{description}</p>
			</div>
		</div>
	);
}
