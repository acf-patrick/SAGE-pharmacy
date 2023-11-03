import { styled } from "styled-components";
import { Medicine } from "../models";
import { useEffect, useState } from "react";

const StyledModal = styled.div`
  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    backdrop-filter: blur(1.5px);
    background-color: #ffffff2a;
  }

  form {
    background-color: white;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 0 0 5px grey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 500px;
    overflow-y: auto;
    padding-bottom: 0;

    .inputs {
      padding: 1rem;

      & > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        label {
          font-weight: bolder;
        }

        input[type="text"] {
          padding: 0.75rem;
        }
      }

      .tax {
        display: flex;
        flex-direction: row;

        input[type="checkbox"] {
          padding: 0.75rem;
        }
      }
    }

    .buttons {
      user-select: none;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: 2rem;
      position: sticky;
      bottom: 0;
      background: linear-gradient(to bottom, white, #dcd8d8ac);
      padding: 0.5rem 0;

      button {
        all: unset;
        padding: 0.5rem 0.75rem;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        width: 60px;
        text-align: center;
        transition: background-color 250ms;

        &:nth-of-type(1) {
          background-color: ${({ theme }) => theme.colors.cancelButton};

          &:hover {
            background-color: ${({ theme }) => theme.colors.cancelButtonLight};
          }
        }

        &:nth-of-type(2) {
          background-color: grey;

          &:hover {
            background-color: #8080808d;
          }
        }

        &:last-of-type {
          background-color: ${({ theme }) => theme.colors.acceptButton};

          &:hover {
            background-color: ${({ theme }) => theme.colors.acceptButtonLight};
          }
        }
      }
    }
  }
`;

const UpdateForm = ({
  selectedRows,
  onClose,
}: {
  selectedRows: Medicine[];
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <StyledModal>
      <div className="modal-container" onClick={onClose}></div>
      <form>
        <div className="inputs">
          <div>
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              value={selectedRows[currentIndex].name}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="cost-price">Prix d'achat</label>
            <input
              id="cost-price"
              type="text"
              value={selectedRows[currentIndex].costPrice}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="selling-price">Prix de vente</label>
            <input
              id="selling-price"
              type="text"
              value={selectedRows[currentIndex].sellingPrice}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantité</label>
            <input
              id="quantity"
              type="text"
              value={selectedRows[currentIndex].quantity}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="location">Emplacement</label>
            <input
              id="location"
              type="text"
              value={selectedRows[currentIndex].location}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="dci">DCI</label>
            <input
              id="dci"
              type="text"
              value={selectedRows[currentIndex].dci}
              onChange={() => {}}
            />
          </div>
          <div className="tax">
            <label htmlFor="tax">Taxé</label>
            <input
              id="tax"
              type="checkbox"
              defaultChecked={selectedRows[currentIndex].isTaxed}
              onChange={() => {}}
            />
            <span>(Taxé si coché)</span>
          </div>
          <div>
            <label htmlFor="min">Stock Min</label>
            <input
              id="min"
              type="text"
              value={selectedRows[currentIndex].min}
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="max">Stock Max</label>
            <input
              id="max"
              type="text"
              value={selectedRows[currentIndex].max}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={onClose}>
            Annuler
          </button>
          {currentIndex >= selectedRows.length - 1 ? null : (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((currentIndex) => currentIndex + 1)
              }
              disabled={currentIndex >= selectedRows.length - 1}
            >
              Suivant
            </button>
          )}
          <button type="button">Modifier</button>
        </div>
      </form>
    </StyledModal>
  );
};

export default UpdateForm;
