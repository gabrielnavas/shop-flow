import styled from "styled-components"

type Props = {
  children: React.ReactNode
  required?: boolean | undefined
}

export const Label = ({ required, children }: Props) => {
  return (
    <Container>
      {required && (
        <Required>*</Required>
      )}
      {children}
    </Container>
  )
}

const Container = styled.label`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textPrimary};
`

const Required = styled.span`
  display: flex;
  align-items: flex-start;
  height: 100%;
  color: ${props => props.theme.colors.error};
`