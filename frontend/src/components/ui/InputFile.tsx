import React, { useState, forwardRef } from "react";
import styled from "styled-components";

const InputFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  background-color: ${({ theme }) => theme.colors.buttonBackgroundPrimary};
  color: ${({ theme }) => theme.colors.buttonColorPrimary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  box-shadow: ${({ theme }) => theme.shadows.button};
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonBackgroundHover};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

interface InputFileProps {
  onChange?: (file: File | null) => void;
  label: string
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(({ onChange, label }, ref) => {
  const [fileName, setFileName] = useState<string>("Nenhum arquivo selecionado");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : "Nenhum arquivo selecionado");

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <InputFileWrapper>
      <Label htmlFor="file-upload">{label}</Label>
      <HiddenInput id="file-upload" type="file" ref={ref} onChange={handleFileChange} />
      <FileName>{fileName}</FileName>
    </InputFileWrapper>
  );
});
