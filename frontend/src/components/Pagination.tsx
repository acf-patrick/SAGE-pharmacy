import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { styled } from "styled-components";

const StyledButton = styled.button<{ $current?: boolean }>`
  border: none;
  height: 2rem;
  width: 2rem;

  cursor: pointer;
  transition: background-color 250ms;

  background-color: ${({ theme, $current }) =>
    $current ? theme.colors.tertiary : "unset"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};

    &:first-of-type,
    &:last-of-type {
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    &:disabled {
      background-color: unset;
    }
  }
`;

const StyledPagination = styled.div`
  align-self: center;
  padding-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Pagination = ({
  currentPage,
  setCurrentPage,
  pagesCount,
}: {
  currentPage: number;
  setCurrentPage: (n: number) => void;
  pagesCount: number;
}) => {
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <StyledPagination>
      <StyledButton
        title="Revenir à la première page"
        onClick={() => setCurrentPage(0)}
      >
        <BsFillSkipStartFill />
      </StyledButton>
      <StyledButton disabled={currentPage == 0} onClick={goToPreviousPage}>
        {currentPage == 0 ? "" : currentPage}
      </StyledButton>
      <StyledButton $current>{currentPage + 1}</StyledButton>
      <StyledButton
        disabled={currentPage == pagesCount - 1}
        onClick={goToNextPage}
      >
        {currentPage == pagesCount - 1 ? "" : currentPage + 2}
      </StyledButton>
      <StyledButton
        title="Aller à la dernière page"
        onClick={() => setCurrentPage(pagesCount - 1)}
      >
        <BsFillSkipEndFill />
      </StyledButton>
    </StyledPagination>
  );
};

export default Pagination;
