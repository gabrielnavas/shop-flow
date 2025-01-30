import { Link } from "react-router";
import styled from "styled-components";

export const LinkCustom = styled(Link)`
  color: ${props => props.theme.colors.link};
`