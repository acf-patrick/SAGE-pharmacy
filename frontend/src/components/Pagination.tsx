import { useState } from "react";
import { createPortal } from "react-dom";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { styled } from "styled-components";
import ConfirmationDialog from "./ConfirmationDialog";

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

  .popup {
    position: absolute;
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
  tableModified,
  onClose,
}: {
  currentPage: number;
  setCurrentPage: (n: number) => void;
  pagesCount: number;
  tableModified: boolean;
  onClose: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [destination, setDestination] = useState(0);

  const goToNextPage = () => {
    if (!tableModified) setCurrentPage(currentPage + 1);
    else {
      setDestination(currentPage + 1);
      setShowModal(true);
    }
  };
  const goToPreviousPage = () => {
    if (!tableModified) setCurrentPage(currentPage - 1);
    else {
      setDestination(currentPage - 1);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPage(destination);
    setDestination(0);
    onClose();
  };

  const saveAndSwitchPage = () => {
    setShowModal(false);
    setCurrentPage(destination);
    setDestination(0);
    onClose();
  };

  return (
    <>
      <StyledPagination>
        <StyledButton
          title="Revenir à la première page"
          onClick={() => {
            if (!tableModified) setCurrentPage(0);
            else {
              setDestination(0);
              setShowModal(true);
            }
          }}
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
          onClick={() => {
            if (!tableModified) setCurrentPage(pagesCount - 1);
            else {
              setDestination(pagesCount - 1);
              setShowModal(true);
            }
          }}
        >
          <BsFillSkipEndFill />
        </StyledButton>
      </StyledPagination>
      {showModal
        ? createPortal(
            <ConfirmationDialog
              header="Annuler les changements?"
              info="Il y a des changements non sauvegardés. Voulez vous les annuler ou les sauvegarder?"
              rightContent="Sauvegarder"
              leftContent="Annuler"
              action={saveAndSwitchPage}
              close={closeModal}
            />,
            document.getElementById("portal") as HTMLElement
          )
        : null}
    </>
  );
};

export default Pagination;
