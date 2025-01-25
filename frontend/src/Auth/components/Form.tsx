import styled from "styled-components"

type Props = {
  children: React.ReactNode
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
}

export const Form = ({ onSubmit, children }: Props) => {
  return (
    <Container onSubmit={onSubmit}>
      {children}
    </Container>
  )
}

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`
