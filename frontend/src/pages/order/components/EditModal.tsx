import { lighten } from "polished";
import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { Order } from "../Order";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 0 10px 2px grey;
  width: 500px;
  height: 350px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 3rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: green;
      font-size: 1.5rem;
    }

    .buttons {
      display: flex;
      gap: 1rem;

      button {
        height: 2rem;
        padding: 5px 20px;
        border: none;
        color: white;
        font-weight: 600;
        border-radius: 3px;
        cursor: pointer;

        &:first-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.edit};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.edit)};
          }
        }

        &:last-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.add};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.add)};
          }
        }
      }
    }
  }

  .table-container {
    flex-grow: 1;
    display: flex;
    max-height: 80%;
    overflow-y: auto;

    table {
      height: fit-content;
      border-collapse: collapse;
      width: 100%;
      border-left: solid 1px black;

      tr {
        height: 2.5rem;
      }

      tbody {
        tr {
          td {
            border-right: solid 1px black;
            border-bottom: solid 1px black;
            text-align: center;
            padding: 5px;

            button {
              height: 1%.5;
              padding: 5px;
              border: none;
              color: white;
              font-weight: 600;
              border-radius: 3px;
              cursor: pointer;
              background-color: ${({ theme }) => theme.colors.buttons.delete};
            }

            input {
              width: 2rem;
              border: none;
              text-align: center;

              &::-webkit-outer-spin-button {
                margin-left: 2rem;
              }
            }
          }
        }
      }

      thead {
        tr {
          th {
            &:first-of-type {
              border-radius: 5px 0 0 0;
            }

            &:last-of-type {
              border-radius: 0 5px 0 0;
            }

            &:nth-of-type(odd) {
              background-color: ${({ theme }) => theme.colors.tertiary};
            }

            &:nth-of-type(even) {
              background-color: ${({ theme }) =>
                lighten(0.1, theme.colors.tertiary)};
            }
          }
        }
      }
    }
  }

  & > div {
    height: 50px;
    p {
      margin: 0;

      span {
        &:last-of-type {
          margin-left: 1rem;
          font-weight: 700;
        }
      }
    }
  }
`;

function EditModal({
  order,
  onClose,
  onValidate,
}: {
  order: Order;
  onClose: () => void;
  onValidate: () => void;
}) {
  return createPortal(
    <StyledContainer onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h1>Modifier</h1>
          <div className="buttons">
            <button>Ajouter</button>
            <button onClick={onValidate}>Valider</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Prix HT</th>
                <th>Prix TTC</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.orderMedicines.map((orderMedicine) => (
                <tr key={orderMedicine.id}>
                  <td>{orderMedicine.name}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      defaultValue={orderMedicine.quantity}
                    />
                  </td>
                  <td>{orderMedicine.priceWithoutTax}</td>
                  <td>{orderMedicine.priceWithTax}</td>
                  <td>
                    <button>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p>
            <span>Prix Total HT</span>{" "}
            <span>{order.totalPriceWithoutTax} Ar.</span>
          </p>
          <p>
            <span>Prix Total TTC</span>{" "}
            <span>{order.totalPriceWithTax} Ar.</span>
          </p>
        </div>
      </StyledModal>
    </StyledContainer>,
    document.querySelector("#portal")
  );
}

export default EditModal;
