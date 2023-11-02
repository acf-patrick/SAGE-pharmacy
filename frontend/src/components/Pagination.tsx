import { useState } from "react";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { styled } from "styled-components";

const StyledButton = styled.button`
  border: none;
  height: 2rem;
  width: 2rem;
`;

const StyledPagination = styled.div`
  align-self: center;
  padding-top: 1rem;
  display: flex;
  gap: 0.5rem;

  button {
    cursor: pointer;
    transition: background-color 250ms;

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
  }
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
      <StyledButton>
        <BsFillSkipStartFill />
      </StyledButton>
      <StyledButton disabled={currentPage == 0} onClick={goToPreviousPage}>
        {currentPage == 0 ? "" : currentPage}
      </StyledButton>
      <StyledButton>{currentPage + 1}</StyledButton>
      <StyledButton
        disabled={currentPage == pagesCount - 1}
        onClick={goToNextPage}
      >
        {currentPage == pagesCount - 1 ? "" : currentPage + 2}
      </StyledButton>
      <StyledButton>
        <BsFillSkipEndFill />
      </StyledButton>
    </StyledPagination>
  );
};

export default Pagination;
