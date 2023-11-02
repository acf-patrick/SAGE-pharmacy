import { keyframes, styled } from "styled-components";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Medicine } from "../models";
import { TbBasketCancel } from "react-icons/tb";
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

  h1 {
    animation: 500ms ease-out both ${slide};
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
          <Table medicines={medicines} />
          {pagesCount > 1 && (
            <Pagination
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
