import { darken } from "polished";
import { useEffect, useState } from "react";
import { TbBasketCancel } from "react-icons/tb";
import { keyframes, styled } from "styled-components";
import { api } from "../api";
import Pagination from "../components/Pagination";
import { Medicine } from "../models";
import Table from "./Table";

type PageQueryResponse = {
  data: Medicine[];
  pageCount: number;
  page: number;
};

const slide = keyframes`
  from {
    transform: translateX(-1rem);
    opacity: 0;
  } to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StyledStock = styled.div`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    * {
      animation: 500ms ease-out both ${slide};
    }

    button {
      border: none;
      height: 3rem;
      padding: 0.5rem 1rem;
      background-color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 250ms;
      color: black;
      font-weight: bold;

      &:hover {
        background-color: ${({ theme }) => darken(0.25, theme.colors.primary)};
        color: white;
      }
    }
  }

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
`;

const Stock = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [medicinesToUpdate, setMedicinesToUpdate] = useState<Medicine[]>([]);
  const [tableModified, setTableModified] = useState(false);

  useEffect(() => {
    api.get(`/stock?page=${currentPage}`).then((response) => {
      const res: PageQueryResponse = response.data;
      setMedicines(res.data);
      setPagesCount(res.pageCount);
    });
  }, [currentPage]);

  return (
    <StyledStock>
      <div className="header">
        <h1>Stock</h1>
        <button>Sauvegarder</button>
      </div>
      {medicines.length > 0 ? (
        <>
          <Table medicines={medicines} onEdit={() => setTableModified(true)} />
          {pagesCount > 1 && (
            <Pagination
              onClose={() => setTableModified(false)}
              tableModified={tableModified}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesCount={pagesCount}
            />
          )}
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
