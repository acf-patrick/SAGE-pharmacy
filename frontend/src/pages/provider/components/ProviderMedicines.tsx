import { useLoaderData } from "react-router-dom";
import { MedicineFromProvider, Provider } from "../../../models";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { darken, lighten } from "polished";
import { appear } from "../../../styles/animations";

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
`;

const StyledList = styled.div`
  border: solid 1px black;
  border-radius: 5px;
  animation: ${appear} both 500ms;
  overflow: auto;
  height: 80vh;
  margin-bottom: 1rem;

  table {
    border-collapse: collapse;
    width: 100%;
    height: 100%;

    tr {
      &.low {
        td {
          background-color: ${({ theme }) => theme.colors.lowStock};
        }
      }

      &.near-expiration {
        td {
          background-color: ${({ theme }) => theme.colors.nearExpiration};
        }
      }

      &.low.near-expiration {
        td {
          background-color: ${({ theme }) => theme.colors.lowAndNearExpiration};

          &:nth-of-type(4) {
            color: red;
            font-weight: 700;
          }
        }

        &.selected {
          td {
            background-color: ${({ theme }) => theme.colors.selectedRow};
          }
        }
      }

      &.selected {
        * {
          color: white;
        }
        td {
          background-color: ${({ theme }) => theme.colors.selectedRow};
        }
      }

      &:nth-of-type(odd) {
        background-color: ${({ theme }) => darken(0.025, theme.colors.primary)};
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
    }

    th {
      color: white;
    }

    td {
      min-width: 10rem;
      overflow-y: auto;

      select {
        cursor: pointer;
        width: 85%;
        height: 70%;
      }

      &:not(:last-of-type) {
        border-right: solid 1px black;
      }

      input[type="checkbox"] {
        cursor: pointer;
        width: 1.15rem;
        height: 1.15rem;
      }

      &:first-of-type {
        text-align: start;
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-left: 1rem;
        min-width: 240px;

        & > div {
          height: 100%;
          overflow-y: auto;
          display: flex;
          align-items: center;
        }

        & > div > div {
          max-width: 200px;
          outline: none;

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
        }
      }
    }
  }

  thead {
    position: sticky;
    top: 0;
    user-select: none;

    tr {
      th {
        padding: 5px 15px;
        color: white;
        cursor: pointer;

        .inner-th {
          display: flex;
          align-items: center;
          justify-content: space-between;

          p {
            color: white;
          }

          .arrows {
            display: flex;
            flex-direction: column-reverse;

            * {
              color: white;
              font-size: 0.6rem;
              cursor: pointer;
            }
          }
        }

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

export default function ProviderMedicines() {
  const provider = useLoaderData() as Provider;
  const [providerMedicines, setProviderMedicines] = useState<
    MedicineFromProvider[]
  >([]);

  useEffect(() => {
    api.get("provider/" + provider.id).then((response) => {
      const provider: Provider = response.data;
      setProviderMedicines(provider.medicines);
    });
  }, []);

  const dateToLocaleFormat = (date: string) => {
    let s = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let pos = s.indexOf(" ") + 1;
    s = s.slice(0, pos) + s[pos].toUpperCase() + s.slice(pos + 1);
    return s;
  };

  return (
    <>
      <StyledTitle>{provider.name}</StyledTitle>
      <StyledList>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix HT</th>
              <th>Prix TTC</th>
              <th>Quantité Disp.</th>
              <th>DCI</th>
              <th>Expiration</th>
              <th>Correspondance</th>
            </tr>
          </thead>
          <tbody>
            {providerMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.priceWithoutTax}</td>
                <td>{medicine.priceWithTax}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.dci}</td>
                <td>{dateToLocaleFormat(medicine.expirationDate)}</td>
                <td>
                  <select disabled name="correspondance" id="correspondance">
                    <option value="">Aucun</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledList>
    </>
  );
}
