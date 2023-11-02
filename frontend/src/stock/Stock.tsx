import { lighten } from "polished";
import { useEffect, useState } from "react";
import { TbBasketCancel } from "react-icons/tb";
import { styled } from "styled-components";
import { api } from "../api";
import Pagination from "../components/Pagination";
import { Medicine } from "../models";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

type PageQueryResponse = {
  data: Medicine[];
  pageCount: number;
  page: number;
};

const StyledStock = styled.div`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

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

  .table-container {
    height: 85%;
  }

  .table {
    overflow-x: auto;
    border: solid 1px ${({ theme }) => theme.colors.quaternary};
    border-radius: 5px 5px 0 0;

    scrollbar-width: thin;
    scrollbar-color: #80808017;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    -ms-scr &::-webkit-scrollbar-track {
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

      input {
        cursor: pointer;
      }

      tr {
        td {
          min-width: 10rem;
          color: black;
          border-right: solid 1px black;
          font-weight: 600;

          &:first-of-type {
            min-width: 1rem;
          }

          &:nth-of-type(2),
          &:nth-of-type(3),
          &:nth-of-type(4),
          &:nth-of-type(8),
          &:nth-of-type(9) {
            padding-right: 15px;
            text-align: end;
          }
        }

        &:nth-of-type(odd) {
          background-color: #d7d4d494;
        }

        &:nth-of-type(even) {
          background-color: #c6c1c19c;
        }
      }

      td,
      th {
        text-align: center;
        height: 3rem;
        color: white;
      }
    }

    thead {
      position: sticky;
      top: 0;

      tr {
        th {
          padding: 5px 10px;
          color: white;

          .inner-th {
            display: flex;
            justify-content: space-around;
            align-items: center;

            p {
              color: white;
            }

            .arrows {
              display: flex;
              flex-direction: column-reverse;
              gap: 0.25rem;

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
  }
`;

const Stock = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    api.get(`/stock?page=${currentPage}`).then((response) => {
      const res: PageQueryResponse = response.data;
      setMedicines(res.data);
      setPagesCount(res.pageCount);
    });
  }, [currentPage]);

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
    <StyledStock>
      <h1>Stock</h1>
      {medicines.length > 0 ? (
        <>
          <div className="table-container">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <div className="inner-th">
                        <p>Nom</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Prix d'achat</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Prix d'achat</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Quantitét</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Emplacement</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>DCI</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Taxé</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Stock Min</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Stock Max</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="inner-th">
                        <p>Date d'éxpiration</p>
                        <div className="arrows">
                          <BiSolidDownArrow />
                          <BiSolidUpArrow />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                {medicines.map((medicine, i) => (
                  <tr key={medicine.name + i}>
                    <td>
                      <input type="checkbox" name="" />
                    </td>
                    <td>{medicine.name}</td>
                    <td>{medicine.costPrice.toFixed(1)}</td>
                    <td>{medicine.sellingPrice.toFixed(1)}</td>
                    <td>{medicine.quantity}</td>
                    <td>{medicine.location}</td>
                    <td>{medicine.dci}</td>
                    <td>{medicine.isTaxed ? "Oui" : "Non"}</td>
                    <td>{medicine.min}</td>
                    <td>{medicine.max}</td>
                    <td>{dateToLocaleFormat(medicine.expirationDate)}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesCount={pagesCount}
          />
        </>
      ) : (
        <h2>
          <span>Stock vide</span>
          <TbBasketCancel />
        </h2>
      )}
    </StyledStock>
  );
};

export default Stock;
