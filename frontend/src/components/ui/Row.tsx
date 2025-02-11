import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const Row = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div<{ $width?: string | undefined }>`
  width: ${props => props.$width || '400px'};
`
