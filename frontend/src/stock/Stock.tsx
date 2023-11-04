import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TbBasketCancel } from "react-icons/tb";
import { keyframes, styled } from "styled-components";
import { api } from "../api";
import { Pagination, UpdateForm } from "../components";
import { Medicine } from "../models";
import { Table } from "./components";
import { appear } from "../styles/animations";
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

    & > div {
      display: flex;
      gap: 2rem;
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

    .buttons {
      display: flex;
      gap: 1rem;

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
  const [searchKeyWord, setSearchKeyWord] = useState("");

  // Modal for medicine edition will appear when set
  const [updateSelectedRows, setUpdateSelectedRows] = useState(false);

  const toggleMedicine = (medicine: Medicine) => {
    setSelectedRows((rows) =>
      rows.findIndex(({ id }) => id === medicine.id) >= 0
        ? rows.filter(({ id }) => id !== medicine.id)
        : [medicine, ...rows]
    );
  };

  const fetchMedicines = () => {
    api
      .get(`/stock?page=${currentPage}`)
      .then((response) => {
        const res: PageQueryResponse = response.data;
        setMedicines(res.data);
        setPagesCount(res.pageCount);
      })
      .catch((err) => console.error(err));
  };

  const search = () => {
    setMedicines((medicines) =>
      medicines.filter((medicine) => {
        return medicine.name
          .toLowerCase()
          .includes(searchKeyWord.toLowerCase());
      })
    );
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
          <div className="right">
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
            {selectedRows.length > 0 && (
              <div className="buttons">
                <button onClick={updateRows}>Modifier</button>
                <button>Supprimer</button>
              </div>
            )}
          </div>
        </div>
        {medicines.length > 0 ? (
          <>
            <Table medicines={medicines} onRowToggle={toggleMedicine} />
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
                const rows = document.querySelectorAll(".selected");
                for (let row of rows) {
                  row.classList.remove("selected");
                  const checkbox = row.querySelector(
                    "input"
                  ) as HTMLInputElement;
                  checkbox.checked = false;
                }
                fetchMedicines();
                setSelectedRows([]);
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
