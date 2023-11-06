import { lighten } from "polished";
import { useMemo, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import styled from "styled-components";
import { appear } from "../../../styles/animations";
import { Medicine } from "../../../models";

const StyledTable = styled.div`
  overflow-x: auto;
  border: solid 1px ${({ theme }) => theme.colors.quaternary};
  border-radius: 5px;
  padding-bottom: 0.25rem;
  max-height: 80vh;
  animation: 750ms 500ms both ${appear};

  h2 {
    font-size: 4rem;
    font-weight: normal;
    margin-top: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    svg {
      font-size: 6rem;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;

    tr {
      &.selected {
        * {
          color: white;
        }
        td {
          background-color: ${({ theme }) => theme.colors.selectedRow};
        }
      }

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
    }

    th {
      color: white;
    }

    td {
      min-width: 10rem;
      overflow-y: auto;

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

type Field =
  | "name"
  | "sellingPrice"
  | "costPrice"
  | "quantity"
  | "location"
  | "dci"
  | "isTaxed"
  | "min"
  | "max"
  | "expirationDate";

export default function Table({
  medicines,
  selectedRowIds,
  onRowToggle,
}: {
  medicines: Medicine[];
  selectedRowIds: string[];
  onRowToggle: (medicine: Medicine) => void;
}) {
  const [sortBy, setSortBy] = useState<Field>("name");
  const [ascending, setAscending] = useState(true);

  const sortedMedicines = useMemo(
    () => [
      ...medicines.sort((m1: Medicine, m2: Medicine) => {
        if (ascending) {
          return m1[sortBy] < m2[sortBy] ? -1 : 1;
        } else {
          return m1[sortBy] > m2[sortBy] ? -1 : 1;
        }
      }),
    ],
    [medicines, sortBy, ascending]
  );

  const headersMap = new Map<string, Field>([
    ["Nom", "name"],
    ["Prix d'achat", "sellingPrice"],
    ["Prix de vente", "costPrice"],
    ["Quantité", "quantity"],
    ["Emplacement", "location"],
    ["DCI", "dci"],
    ["Taxé", "isTaxed"],
    ["Stock Min", "min"],
    ["Stock Max", "max"],
    ["Expiration", "expirationDate"],
  ]);

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
    <StyledTable>
      <table>
        <thead>
          <tr>
            {[...headersMap.keys()].map((header) => (
              <th
                key={header}
                onClick={() => {
                  setSortBy(headersMap.get(header)!);
                  setAscending(!ascending);
                }}
              >
                <div className="inner-th">
                  <p>{header}</p>
                  {headersMap.get(header) == sortBy ? (
                    <div className="arrows">
                      {ascending ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
                    </div>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedMedicines.map((medicine, i) => (
            <tr
              key={medicine.name + i}
              className={
                selectedRowIds.findIndex((id) => id === medicine.id) >= 0
                  ? "selected"
                  : ""
              }
            >
              <td>
                <input
                  type="checkbox"
                  name=""
                  checked={
                    selectedRowIds.findIndex((id) => id === medicine.id) >= 0
                  }
                  onChange={() => onRowToggle(medicine)}
                />
                <div>
                  <div>{medicine.name}</div>
                </div>
              </td>
              <td>{medicine.costPrice}</td>
              <td>{medicine.sellingPrice}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.location}</td>
              <td>{medicine.dci}</td>
              <td className="editable boolean">
                {medicine.isTaxed ? "Oui" : "Non"}
              </td>
              <td>{medicine.min}</td>
              <td>{medicine.max}</td>
              <td>{dateToLocaleFormat(medicine.expirationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}
