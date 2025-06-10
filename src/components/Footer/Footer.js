import React, { useState } from 'react';
import {
	FooterLinkItems,
	FooterLinkTitle,
	FooterLink,
	FooterLogo,
	SocialIcon,
	FooterRights,
	FooterSocialIcon,
	FooterWrapper,
	FooterAddress,
	FooterColumn,
	FooterGrid,
} from './FooterStyles';
import { footerData, footerSocialData } from '../../data/FooterData';
import { Row, Section } from '../../globalStyles';
import englishLogo from "../../assets/logo-Ph2.png";
import arabicLogo from "../../assets/arabicLogo.png";
import { useTranslation } from 'react-i18next';
function Footer() {
	const { t, i18n } = useTranslation();
	  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
	return (
		<Section padding="4rem 0 2rem 0">
			<FooterWrapper>
				<FooterGrid justify="space-between">
					<FooterColumn id="footerLogo">
						<FooterLogo to="/">
							<SocialIcon src={i18n.language === "en" ? englishLogo : arabicLogo} />
							
						</FooterLogo>
						<FooterAddress>
							Software Engineer Department , Faculty of Computer Science, Helwan University 
						</FooterAddress>

						<Row align="center" margin="auto  0 0 0" gap="1rem">
							{footerSocialData.map((social, index) => (
								<FooterSocialIcon
									key={index}
									href="/"
									target="_blank"
									aria-label={social.name}
								>
									{social.icon}
								</FooterSocialIcon>
							))}
						</Row>
					</FooterColumn>
					{footerData.map((footerItem, index) => (
						<FooterLinkItems key={index}>
							<FooterLinkTitle>{footerItem.title}</FooterLinkTitle>
							{footerItem.links.map((link, linkIndex) => (
								<FooterLink key={linkIndex} to="/">
									{link}
								</FooterLink>
							))}
						</FooterLinkItems>
					))}
				</FooterGrid>
				<FooterRights>AthliQ © 2024</FooterRights>
			</FooterWrapper>
		</Section>
	);
}

export default Footer;
