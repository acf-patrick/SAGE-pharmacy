import { lighten } from "polished";
import { styled } from "styled-components";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Medicine } from "../models";
import { TbBasketCancel } from "react-icons/tb";

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

  .table {
    overflow-x: auto;
    border-left: solid 1px ${({ theme }) => theme.colors.quaternary};
    border-radius: 5px 5px 0 0;
    height: 80vh;

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
          background-color: ${({ theme }) =>
            lighten(0.2, theme.colors.primary)};
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

  return (
    <StyledStock>
      <h1>Stock</h1>
      {medicines.length > 0 ? (
        <>
          <div className="table">
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
                  <td>
                    {new Date(medicine.expirationDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </table>
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
