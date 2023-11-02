import styled, { keyframes } from "styled-components";
import { lighten } from "polished";
import { Medicine } from "../models";

const appear = keyframes`
    from {
        transform: translateY(-1rem);
        opacity: 0;
    } to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const StyledTable = styled.div`
  overflow-x: auto;
  border-left: solid 1px ${({ theme }) => theme.colors.quaternary};
  border-radius: 5px 5px 0 0;
  padding-bottom: 0.5rem;
  max-height: 80vh;
  animation: 750ms 500ms both ${appear};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #80808017;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tertiary};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => lighten(0.2, theme.colors.tertiary)};
  }

  table {
    border-collapse: collapse;
    width: 100%;

    tr {
      &:nth-of-type(odd) {
        background-color: ${({ theme }) => lighten(0.2, theme.colors.primary)};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) =>
          lighten(0.6, theme.colors.secondary)};
      }
    }

    td,
    th {
      text-align: center;
      height: 3rem;
      color: white;
    }

    td {
      min-width: 10rem;
      color: black;
      border-right: solid 1px black;
    }
  }

  thead {
    position: sticky;
    top: 0;

    tr {
      th {
        padding: 5px 10px;

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
`;

export default function Table({ medicines }: { medicines: Medicine[] }) {
  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix d'achat</th>
            <th>Prix de vente</th>
            <th>Quantité</th>
            <th>Emplacement</th>
            <th>DCI</th>
            <th>Taxé</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Date d'éxpiration</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, i) => (
            <tr key={medicine.name + i}>
              <td>{medicine.name}</td>
              <td>{medicine.costPrice}</td>
              <td>{medicine.sellingPrice}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.location}</td>
              <td>{medicine.dci}</td>
              <td>{medicine.isTaxed ? "Oui" : "Non"}</td>
              <td>{medicine.min}</td>
              <td>{medicine.max}</td>
              <td>{new Date(medicine.expirationDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}
