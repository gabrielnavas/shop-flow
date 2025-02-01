import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 92vw;
  max-height: 92vh; /* Limita a altura do modal */
  overflow-y: auto; /* Adiciona scroll apenas dentro do modal */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: ${props => props.theme.spacing.lg}
`;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia o scroll do fundo
    } else {
      document.body.style.overflow = "auto"; // Restaura o scroll
    }
    
    return () => {
      document.body.style.overflow = "auto"; // Garante que o scroll volte ao normal ao desmontar
    };
  }, [isOpen]);

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
