import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { 
  InstructionsContainer,
  InstructionsTitle,
  SectionTitle,
  InstructionText,
  ImportantNote,
  InstructionList,
  InstructionItem,
  NextButton,
  CheckboxContainer,
  CheckboxLabel
} from '../../components/Instructions/InstructionsStyles';
import { FaArrowRight } from 'react-icons/fa';

const InstructionsPage = () => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <div style={{ background: '#0B122B', minHeight: '1vh', padding: '3rem 2rem', color: 'white', textAlign: 'center' }}>
      </div>
      <InstructionsContainer>
        <InstructionsTitle>{t("Instructions Before Entering Test Results")}</InstructionsTitle>
        
        <InstructionText>
          {t("Welcome Instruction")}
        </InstructionText>

        <SectionTitle>{t("Why Your Input Matters")}</SectionTitle>
        <InstructionText>
          <Trans i18nKey="Input Matters Text" components={{ 1: <ImportantNote /> }} />
        </InstructionText>

        <SectionTitle>{t("Accuracy is Key")}</SectionTitle>
        <InstructionList>
          <InstructionItem>
            <Trans i18nKey="Accuracy Item 1" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
          <InstructionItem>
            <Trans i18nKey="Accuracy Item 2" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
        </InstructionList>

        <SectionTitle>{t("Ensure Correct Results")}</SectionTitle>
        <InstructionList>
          <InstructionItem>
            <Trans i18nKey="Correct Results Item 1" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
          <InstructionItem>
            <Trans i18nKey="Correct Results Item 2" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
        </InstructionList>

        <SectionTitle>{t("How to Perform the Tests")}</SectionTitle>
        <InstructionList>
          <InstructionItem>
            <Trans i18nKey="Perform Tests Item 1" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
          <InstructionItem>{t("Perform Tests Item 2")}</InstructionItem>
          <InstructionItem>{t("Perform Tests Item 3")}</InstructionItem>
          <InstructionItem>
            <Trans i18nKey="Perform Tests Item 4" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
        </InstructionList>

        <SectionTitle>{t("Before You Begin")}</SectionTitle>
        <InstructionList>
          <InstructionItem>
            <Trans i18nKey="Begin Item 1" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
          <InstructionItem>
            <Trans i18nKey="Begin Item 2" components={{ 1: <ImportantNote /> }} />
          </InstructionItem>
        </InstructionList>

        <InstructionText>
          {t("Closing Instruction")}
        </InstructionText>

        <CheckboxContainer>
          <input 
            type="checkbox" 
            id="acceptTerms" 
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            style={{ cursor: 'pointer' }}
          />
          <CheckboxLabel htmlFor="acceptTerms">
            {t("Accept Terms")}
          </CheckboxLabel>
        </CheckboxContainer>

        <NextButton 
          to="/addplayer" 
          disabled={!accepted}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {t("Next")} <FaArrowRight />
        </NextButton>
      </InstructionsContainer>
    </>
  );
};

export default InstructionsPage;