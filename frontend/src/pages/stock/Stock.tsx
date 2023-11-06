import { lighten } from "polished";
import { useEffect, useState, useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CgFileAdd } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { TbBasketCancel } from "react-icons/tb";
import { keyframes, styled } from "styled-components";
import { api } from "../../api";
import {
  Pagination,
  ConfirmationDialog,
  Searchbar,
  UpdateForm,
  AddForm,
} from "../../components";
import { Medicine } from "../../models";
import { appear } from "../../styles/animations";
import { Table } from "./components";

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

  .add-button {
    background-color: ${({ theme }) => theme.colors.buttons.add};

    &:hover {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.colors.buttons.add)};
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: none;
      height: 2.5rem;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 250ms;
      font-weight: bold;

      * {
        color: white;
      }

      svg {
        font-size: 1.25rem;
      }
    }

    h1 {
      margin-right: 1rem;
    }

    h1,
    .buttons {
      animation: 500ms ease-out both ${slide};
    }

    & > div {
      display: flex;
      gap: 2rem;
    }

    .buttons {
      display: flex;
      gap: 1rem;

      button {
        &:first-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.edit};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.edit)};
          }
        }

        &:last-of-type {
          background-color: ${({ theme }) => theme.colors.buttons.delete};

          &:hover {
            background-color: ${({ theme }) =>
              lighten(0.1, theme.colors.buttons.delete)};
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

export default function Stock() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedRows, setSelectedRows] = useState<Medicine[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchField, setSearchField] = useState<
    | "name"
    | "sellingPrice"
    | "costPrice"
    | "quantity"
    | "location"
    | "dci"
    | "min"
    | "max"
  >("name");

  // Modal for medicine edition will appear when set
  const [updateSelectedRows, setUpdateSelectedRows] = useState(false);

  useEffect(() => {
    // clear selections
    setSelectedRows([]);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set(searchField, searchKeyWord);

    api
      .get(`/stock?${params}`)
      .then((response) => {
        const res: PageQueryResponse = response.data;
        setMedicines(res.data);
        setPagesCount(res.pageCount);
      })
      .catch((err) => console.error(err));
  }, [searchKeyWord, searchField, currentPage]);

  const toggleMedicine = (medicine: Medicine) => {
    setSelectedRows((rows) =>
      rows.findIndex(({ id }) => id === medicine.id) >= 0
        ? rows.filter(({ id }) => id !== medicine.id)
        : [medicine, ...rows]
    );
  };

  const updateRows = () => {
    if (selectedRows.length > 0) setUpdateSelectedRows(true);
    else console.error("No row selected!");
  };

  const deletSelectedRows = () => {
    setShowConfirmation(false);
    const idsToDelete = selectedRows.map((row) => row.id);

    api
      .post("/stock", {
        ids: idsToDelete,
      })
      .then(() => {
        fetchMedicines();
      })
      .catch((err) => console.error(err));
  };

  const fetchMedicines = useCallback(() => {
    // clear selections
    setSelectedRows([]);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set(searchField, searchKeyWord);

    api
      .get(`/stock?${params}`)
      .then((response) => {
        const res: PageQueryResponse = response.data;
        setMedicines(res.data);
        setPagesCount(res.pageCount);
      })
      .catch((err) => console.error(err));
  }, [searchKeyWord, searchField, currentPage]);

  return (
    <>
      <StyledStock>
        <div className="header">
          <h1>Stock</h1>
          <div className="right">
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              <CgFileAdd />
              <span>Ajouter</span>
            </button>
            <Searchbar
              onFieldChange={(field) => setSearchField(field as any)}
              onKeywordChange={(keyword) => {
                setCurrentPage(0);
                setSearchKeyWord(keyword);
              }}
              fields={[
                {
                  name: "Nom",
                  value: "name",
                },
                {
                  name: "Prix d'achat",
                  value: "costPrice",
                },
                {
                  name: "Prix de vente",
                  value: "sellingPrice",
                },
                {
                  name: "Quantité",
                  value: "quantity",
                },
                {
                  name: "Emplacement",
                  value: "location",
                },
                {
                  name: "DCI",
                  value: "dci",
                },
                {
                  name: "Stock Min",
                  value: "min",
                },
                {
                  name: "Stock Max",
                  value: "max",
                },
              ]}
            />
            {selectedRows.length > 0 && (
              <div className="buttons">
                <button onClick={updateRows}>
                  <FiEdit />
                  <span>Modifier</span>
                </button>
                <button onClick={() => setShowConfirmation(true)}>
                  <AiOutlineDelete />
                  <span>Supprimer</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {medicines.length > 0 ? (
          <>
            <Table
              medicines={medicines}
              selectedRowIds={selectedRows.map((medicine) => medicine.id)}
              onRowToggle={toggleMedicine}
            />
            {pagesCount > 1 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
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
      {updateSelectedRows ? (
        <UpdateForm
          selectedRows={selectedRows}
          onClose={(update) => {
            if (update) {
              fetchMedicines();
            }
            setUpdateSelectedRows(false);
          }}
        />
      ) : null}
      {showAddForm ? (
        <AddForm
          onClose={() => {
            fetchMedicines();
            setShowAddForm(false);
          }}
        />
      ) : null}
      {showConfirmation ? (
        <ConfirmationDialog
          header={`Supprimer ${selectedRows.length > 1 ? "les" : "l'"} élément${
            selectedRows.length > 1 ? "s" : ""
          }`}
          info={`Cette action est irreversible. Voulez vous vraiment supprimer ${
            selectedRows.length > 1 ? "les" : "l'"
          } élément${selectedRows.length > 1 ? "s" : ""}?`}
          leftContent={{ color: "grey", content: "Annuler" }}
          rightContent={{ color: "red", content: "Supprimer" }}
          onClose={() => setShowConfirmation(false)}
          action={deletSelectedRows}
        />
      ) : null}
    </>
  );
}
