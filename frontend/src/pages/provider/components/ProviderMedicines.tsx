import { useLoaderData } from "react-router-dom";
import { Provider } from "../../../models";
import styled from "styled-components";

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
`;

export default function ProviderMedicines() {
  const provider = useLoaderData() as Provider;

  return (
    <>
      <StyledTitle>{provider.name}</StyledTitle>
    </>
  );
}
