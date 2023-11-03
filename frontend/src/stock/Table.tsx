import { lighten } from "polished";
import { useEffect, useMemo, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import styled, { keyframes } from "styled-components";
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
      border-right: solid 1px black;

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

        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-grow: 1;
          height: 100%;
          max-width: 200px;
          overflow-x: auto;
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
  onEdit,
}: {
  medicines: Medicine[];
  onEdit: () => void;
}) {
  const [sortBy, setSortBy] = useState<Field>("name");
  const [ascending, setAscending] = useState(true);

  const sortedMedicines = useMemo(
    () =>
      medicines.sort((m1: Medicine, m2: Medicine) => {
        if (ascending) {
          return m1[sortBy] < m2[sortBy] ? -1 : 1;
        } else {
          return m1[sortBy] > m2[sortBy] ? -1 : 1;
        }
      }),
    [medicines, sortBy, ascending]
  );

  const headersMap = new Map<string, Field>([
    ["Nom", "name"],
    ["Prix d'achat", "sellingPrice"],
    ["Pric de vente", "costPrice"],
    ["Quantité", "quantity"],
    ["Emplacement", "location"],
    ["DCI", "dci"],
    ["Taxé", "isTaxed"],
    ["Stock Min", "min"],
    ["Stock Max", "max"],
    ["Expiration", "expirationDate"],
  ]);

  const highlightItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const row = e.currentTarget.parentElement!.parentElement!;

    const selected = row.classList.toggle("selected");

    const editables = row.querySelectorAll(".editable");

    for (let editable of editables) {
      const el = editable as HTMLElement;
      el.contentEditable = selected ? "true" : "false";
    }
  };

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

  const setTax = (e: React.ChangeEvent<HTMLTableCellElement>) => {
    console.error(e.currentTarget.innerText);
  };

  useEffect(() => {
    const editableCells = document.querySelectorAll("table .editable");
    console.log(editableCells);
    for (let cell of editableCells) {
      cell.addEventListener("input", (_e) => {
        onEdit();
      });
    }
  }, []);

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
            <tr key={medicine.name + i}>
              <td>
                <input type="checkbox" name="" onChange={highlightItem} />
                <div className="editable">{medicine.name}</div>
              </td>
              <td className="editable">{medicine.costPrice}</td>
              <td className="editable">{medicine.sellingPrice}</td>
              <td className="editable">{medicine.quantity}</td>
              <td className="editable">{medicine.location}</td>
              <td className="editable">{medicine.dci}</td>
              <td className="editable boolean" onChange={setTax}>
                <input type="checkbox" disabled checked={medicine.isTaxed} />
              </td>
              <td className="editable">{medicine.min}</td>
              <td className="editable">{medicine.max}</td>
              <td className="editable">
                {dateToLocaleFormat(medicine.expirationDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}
