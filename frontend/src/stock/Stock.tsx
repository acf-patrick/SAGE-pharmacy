import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TbBasketCancel } from "react-icons/tb";
import { keyframes, styled } from "styled-components";
import { api } from "../api";
import Pagination from "../components/Pagination";
import UpdateForm from "../components/UpdateForm";
import { Medicine } from "../models";
import Table, { appear } from "./Table";
import { AiOutlineSearch } from "react-icons/ai";

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

    .buttons {
      display: flex;
      gap: 2rem;

      button {
        border: none;
        height: 2.5rem;
        padding: 0.5rem 1rem;

        cursor: pointer;
        border-radius: 5px;
        color: white;
        transition: background-color 250ms;
        font-weight: bold;

        &:first-of-type {
          background-color: #ff7700;

          &:hover {
            background-color: orange;
          }
        }

        &:last-of-type {
          background-color: #ff0000;

          &:hover {
            background-color: #d32f2f;
          }
        }
      }

      .searchbar {
        display: flex;
        align-items: center;
        gap: 1rem;

        input {
          height: 2rem;
        }

        svg {
          font-size: 1.5rem;
          text-align: center;
          cursor: pointer;
        }
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
    animation: 500ms both ${appear};

    svg {
      font-size: 6rem;
    }
  }
`;

const Stock = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedRows, setSelectedRows] = useState<Medicine[]>([]);
  const [updateSelectedRows, setUpdateSelectedRows] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const updateSelectedRowsList = (medicine: Medicine) => {
    setSelectedRows([...selectedRows, medicine]);
  };

  const fetchMedicines = () => {
    api.get(`/stock?page=${currentPage}`).then((response) => {
      const res: PageQueryResponse = response.data;
      setMedicines(res.data);
      setPagesCount(res.pageCount);
    });
  };

  const search = () => {
    const filteredMedicines = medicines.filter((medicine) => {
      return medicine.name.toLowerCase().includes(searchKeyWord.toLowerCase());
    });
    setMedicines(filteredMedicines);
  };

  const updateRows = () => {
    if (selectedRows.length > 0) setUpdateSelectedRows(true);
    else console.error("No row selected!");
  };

  useEffect(() => {
    fetchMedicines();
  }, [currentPage]);

  return (
    <>
      <StyledStock>
        <div className="header">
          <h1>Stock</h1>
          <div className="buttons">
            <div className="searchbar">
              <input
                type="text"
                placeholder="Enter un mot clé..."
                onChange={(e) => {
                  if (e.currentTarget.value != "") {
                    setSearchKeyWord(e.currentTarget.value);
                  } else {
                    fetchMedicines();
                  }
                }}
              />
              <AiOutlineSearch title="Rechercher" onClick={search} />
            </div>
            <button onClick={updateRows}>Modifier</button>
            <button>Supprimer</button>
          </div>
        </div>
        {medicines.length > 0 ? (
          <>
            <Table medicines={medicines} onRowSelect={updateSelectedRowsList} />
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
            <span>{searchKeyWord == "" ? "Stock vide" : "Aucun résultat"}</span>
            <TbBasketCancel />
          </h2>
        )}
      </StyledStock>
      {updateSelectedRows
        ? createPortal(
            <UpdateForm
              selectedRows={selectedRows}
              onClose={() => {
                fetchMedicines();
                setUpdateSelectedRows(false);
              }}
            />,
            document.querySelector("#portal") as HTMLElement
          )
        : null}
    </>
  );
};

export default Stock;
