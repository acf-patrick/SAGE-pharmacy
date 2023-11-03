import { styled } from "styled-components";
import { Medicine } from "../models";
import { useEffect, useState } from "react";
import { api } from "../api";

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

  const [formData, setFormData] = useState<Medicine>({
    name: selectedRows[currentIndex].name,
    costPrice: selectedRows[currentIndex].costPrice,
    sellingPrice: selectedRows[currentIndex].sellingPrice,
    dci: selectedRows[currentIndex].dci,
    expirationDate: selectedRows[currentIndex].expirationDate,
    isTaxed: selectedRows[currentIndex].isTaxed,
    location: selectedRows[currentIndex].location,
    max: selectedRows[currentIndex].max,
    min: selectedRows[currentIndex].min,
    quantity: selectedRows[currentIndex].quantity,
    id: selectedRows[currentIndex].id,
  });

  const updateMedicine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const form = e.currentTarget as HTMLFormElement;
    // const data = new FormData(form);
    // const medicineToUpdate: Medicine = {
    //   name: data.get("name")!.toString(),
    //   costPrice: parseFloat(data.get("cost-price")!.toString()),
    //   sellingPrice: parseFloat(data.get("selling-price")!.toString()),
    //   dci: data.get("dci")!.toString(),
    //   isTaxed: data.get("tax") ? true : false,
    //   location: data.get("location")!.toString(),
    //   min: parseFloat(data.get("min")!.toString()),
    //   max: parseFloat(data.get("max")!.toString()),
    //   quantity: parseFloat(data.get("quantity")!.toString()),
    //   expirationDate: selectedRows[currentIndex].expirationDate,
    //   id: selectedRows[currentIndex].id,
    // };

    console.log(formData);

    // api.patch("/stock", {
    //   data: formData,
    // });

    if (currentIndex < selectedRows.length - 1)
      setCurrentIndex((currentIndex) => currentIndex + 1);
    else onClose();
  };

  return (
    <StyledModal>
      <div className="modal-container" onClick={onClose}></div>
      <form onSubmit={updateMedicine}>
        <div className="inputs">
          <div>
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={selectedRows[currentIndex].name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.currentTarget.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="cost-price">Prix d'achat</label>
            <input
              id="cost-price"
              name="cost-price"
              type="text"
              defaultValue={selectedRows[currentIndex].costPrice}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  costPrice: parseFloat(e.currentTarget.value),
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="selling-price">Prix de vente</label>
            <input
              id="selling-price"
              name="selling-price"
              type="text"
              defaultValue={selectedRows[currentIndex].sellingPrice}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  sellingPrice: parseFloat(e.currentTarget.value),
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantité</label>
            <input
              id="quantity"
              name="quantity"
              type="text"
              defaultValue={selectedRows[currentIndex].quantity}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  quantity: parseInt(e.currentTarget.value),
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="location">Emplacement</label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={selectedRows[currentIndex].location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.currentTarget.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="dci">DCI</label>
            <input
              id="dci"
              name="dci"
              type="text"
              defaultValue={selectedRows[currentIndex].dci}
              onChange={(e) => {
                setFormData({ ...formData, dci: e.currentTarget.value });
              }}
            />
          </div>
          <div className="tax">
            <label htmlFor="tax">Taxé</label>
            <input
              id="tax"
              name="tax"
              type="checkbox"
              defaultChecked={selectedRows[currentIndex].isTaxed}
              onChange={(e) => {
                setFormData({ ...formData, isTaxed: e.currentTarget.checked });
              }}
            />
            <span>(Taxé si coché)</span>
          </div>
          <div>
            <label htmlFor="min">Stock Min</label>
            <input
              id="min"
              name="min"
              type="text"
              defaultValue={selectedRows[currentIndex].min}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  min: parseInt(e.currentTarget.value),
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="max">Stock Max</label>
            <input
              id="max"
              name="max"
              type="text"
              defaultValue={selectedRows[currentIndex].max}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  max: parseInt(e.currentTarget.value),
                });
              }}
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
          <button>Modifier</button>
        </div>
      </form>
    </StyledModal>
  );
};

export default UpdateForm;
