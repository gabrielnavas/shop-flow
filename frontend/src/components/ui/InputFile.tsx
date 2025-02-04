import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

interface InputFileProps {
  onChange?: (file: File | null) => void;
  onClearFile?: () => void;
  label: string;
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ onClearFile, onChange, label }, ref) => {
    const inputId = React.useId(); // ID único para cada instância
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const hasFile = !!onClearFile

    React.useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    React.useEffect(() => {
      const file = inputRef.current?.files?.[0] || null;
     

      if (onChange) {
        onChange(file);
      }
    }, [inputRef.current?.files, onChange]); // Observa mudanças no ref

    const handleFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (onChange) {
        onChange(file);
      }

    }, [onChange])

    return (
      <InputFileWrapper>
        <ButtonContainer>
          <Label htmlFor={inputId}>{label}</Label>
          {hasFile && (
            <Button type="button" $variant="cancel" onClick={onClearFile}>
              Limpar
            </Button>
          )}
        </ButtonContainer>
        <HiddenInput id={inputId} type="file" ref={inputRef} onChange={handleFileChange} />
      </InputFileWrapper>
    );
  }
);

const InputFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};
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

// const FileName = styled.span`
//   font-size: ${({ theme }) => theme.fontSizes.small};
//   color: ${({ theme }) => theme.colors.textPrimary};
// `;
