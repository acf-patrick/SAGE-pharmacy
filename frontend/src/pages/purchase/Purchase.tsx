import { lighten } from "polished";
import React, { useEffect, useState } from "react";
import { TbBasketCancel } from "react-icons/tb";
import { MoonLoader } from "react-spinners";
import { styled } from "styled-components";
import { api } from "../../api";
import { ConfirmationDialog } from "../../components";
import { useNotification } from "../../hooks";
import { MedicineFromProvider } from "../../models";
import { appear } from "../../styles/animations";

// Converted map from request response from /provider/provide to common JS object
type MatchMedicine = {
  name: string;
  providerMedicines: {
    medicine: MedicineFromProvider;
    provider: { name: string };
    quantityToOrder: number;
  }[];
};

type ValueFromSelectBox = {
  medicine: MedicineFromProvider;
  providerName: string;
  order: number;
};

type Order = {
  medicineId: string;
  quantityToOrder: number;
};

const StyledPurchase = styled.div`
  padding: 0 2rem;
  position: relative;

  .checkbox {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;

    label {
      cursor: pointer;
    }

    input {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  .pending {
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 0.5fr repeat(2, 1fr);
    grid-auto-rows: 50px;
    border: solid 1px black;
    width: fit-content;
    border-radius: 5px;
    max-height: ${({ theme }) => theme.size.purchaseHeight};
    overflow-y: auto;
    width: 100%;

    input[type="number"] {
      border: none;
      outline: none;
      text-align: center;
      border-right: solid 1px black;
      font-weight: 700;
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: solid 1px black;
      font-weight: 600;

      select {
        cursor: pointer;
        height: 2rem;
        width: 85%;
        border-radius: 4px;
        font-weight: bolder;
      }
    }

    .name {
      padding: 0 1rem;
      overflow-x: auto;
      justify-content: flex-start;
    }

    .header-item {
    position: sticky;
    top: 0;
      background-color: red;
      color: white;

      &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.colors.tertiary};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) => theme.colors.secondary};
      }
    }

    .odd {
      background-color: #80808051;
    }

    .even {
      background-color: white;
    }
  }

  h2 {
    height: 100%;
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: ${appear} 500ms both;
  }

  .buttons {
    button {
      background-color: ${({ theme }) => theme.colors.tertiary};
      color: white;
      font-weight: 600;
      height: 3rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 10px;
      transition: background-color 250ms;

      &:hover {
        background-color: ${({ theme }) => lighten(0.1, theme.colors.tertiary)};
      }
    }
  }
`;

const Purchase = () => {
  // Medicines proposed from GET /api/provider/provide
  const [matchedMedicines, setMatchedMedicines] = useState<MatchMedicine[]>([]);
  const [selectedRowIndices, setselectedRowIndices] = useState<number[]>([]);
  const [pending, setPending] = useState(true);

  const [providerDatas, setProviderDatas] = useState<
    {
      name: string;
      order: number; // Number of medicine to order
      available: number;
    }[]
  >([]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [order, setOrder] = useState<Order[]>([]);

  const { pushNotification } = useNotification();

  useEffect(() => {
    console.log(order);
  }, [order]);

  useEffect(() => {
    getMedicinesMatches()
      .then((matchingMedicines) => {
        setMatchedMedicines(matchingMedicines);
        setProviderDatas(
          matchingMedicines.map((med) => ({
            name: med.providerMedicines[0].provider.name,
            order: med.providerMedicines[0].quantityToOrder,
            available: med.providerMedicines[0].medicine.quantity,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setPending(false));
  }, []);

  // Get all matched near-low quantity medicines
  const getMedicinesMatches = async () => {
    const res = await api.get("/provider/provide");
    const data: Record<
      string,
      {
        medicine: MedicineFromProvider;
        provider: { name: string };
        quantityToOrder: number;
      }[]
    > = res.data;

    const matches: MatchMedicine[] = [];

    for (let name of Object.keys(data)) {
      matches.push({
        name,
        providerMedicines: data[name],
      });
    }

    return matches;
  };

  // Get current data set up by the user and create a purchase list (set "order" state)
  const orderMedicines = () => {
    const selects = document.querySelectorAll("select");
    const medicinesNamesDiv = document.querySelectorAll(".medicine-name");
    const medicinesToOrder: Order[] = [];

    for (let select of selects) {
      if (select.getAttribute("data-selected") !== "true") {
        continue;
      }

      const prev = select.parentElement!
        .previousElementSibling! as HTMLInputElement;
      const value: ValueFromSelectBox = JSON.parse(select.value);

      medicinesToOrder.push({
        medicineId: value.medicine.id,
        quantityToOrder: parseInt(prev.value),
      });
    }

    for (let div of medicinesNamesDiv) {
      if (div.getAttribute("data-selected") !== "true") {
        continue;
      }

      const prev = div.parentElement!
        .previousElementSibling! as HTMLInputElement;
      const medicine: MedicineFromProvider = JSON.parse(
        div.getAttribute("data-medicine")!
      )!;
      medicinesToOrder.push({
        medicineId: medicine.id,
        quantityToOrder: parseInt(prev.value),
      });
    }

    setOrder(medicinesToOrder);
  };

  const selectedMedicineOnChange = (
    medicineIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const obj: ValueFromSelectBox = JSON.parse(event.currentTarget.value);

    const { medicine, providerName, order } = obj;

    setProviderDatas((providerDatas) => {
      providerDatas[medicineIndex].name = providerName;
      providerDatas[medicineIndex].available = medicine.quantity;
      providerDatas[medicineIndex].order = order;

      return [...providerDatas];
    });
  };

  const orderInputValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const defaultValue = e.currentTarget.defaultValue;
    const maxValue = e.currentTarget.max;
    if (isNaN(parseInt(e.currentTarget.value))) {
      e.currentTarget.value = defaultValue;
    }
    if (parseInt(e.currentTarget.value) > parseInt(maxValue))
      e.currentTarget.value = maxValue;
  };

  return (
    <>
      <StyledPurchase>
        <div className="header">
          <h1>Achats</h1>
          <div className="buttons">
            <button
              onClick={() => {
                if (selectedRowIndices.length === 0) {
                  pushNotification(
                    "Sélectionner des lignes pour passer une commande!"
                  );
                } else {
                  setShowConfirmation(true);
                }
              }}
            >
              Commander
            </button>
          </div>
        </div>
        {pending ? (
          <div className="pending">
            <MoonLoader color="#90B77D" loading={pending} size={45} />
          </div>
        ) : (
          <>
            {matchedMedicines.length > 0 ? (
              <div className="container">
                <>
                  <div className="header-item">En rupture</div>
                  <div className="header-item">A commander</div>
                  <div className="header-item">Depuis fournisseur</div>
                  <div className="header-item">Fournisseur</div>
                </>
                {matchedMedicines.map((medicine, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={[
                        "checkbox",
                        "name",
                        i % 2 == 0 ? "even" : "odd",
                      ].join(" ")}
                    >
                      <input
                        type="checkbox"
                        id={medicine.name}
                        checked={selectedRowIndices.includes(i)}
                        onChange={(e) => {
                          if (e.currentTarget.checked) {
                            setselectedRowIndices((indices) => [...indices, i]);
                          } else {
                            setselectedRowIndices((indices) =>
                              indices.filter((index) => i !== index)
                            );
                          }
                        }}
                      />
                      <label htmlFor={medicine.name}>{medicine.name}</label>
                    </div>
                    <input
                      className={i % 2 == 0 ? "even" : "odd"}
                      type="number"
                      key={providerDatas[i].order}
                      defaultValue={providerDatas[i].order}
                      max={providerDatas[i].available}
                      onChange={orderInputValueOnChange}
                    />
                    <div className={i % 2 == 0 ? "even" : "odd"}>
                      {medicine.providerMedicines.length == 1 ? (
                        <div
                          data-selected={selectedRowIndices.includes(i)}
                          className="medicine-name"
                          data-medicine={JSON.stringify(
                            medicine.providerMedicines[0].medicine
                          )}
                        >
                          {medicine.providerMedicines[0].medicine.name}
                        </div>
                      ) : (
                        <select
                          data-selected={selectedRowIndices.includes(i)}
                          name={medicine.name}
                          id={medicine.name}
                          onChange={(e) => selectedMedicineOnChange(i, e)}
                        >
                          {medicine.providerMedicines.map((match, i) => (
                            <option
                              key={i}
                              value={JSON.stringify({
                                medicine: match.medicine,
                                providerName: match.provider.name,
                                order: match.quantityToOrder,
                              })}
                            >
                              {match.medicine.name +
                                " (" +
                                match.provider.name +
                                ")"}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className={i % 2 == 0 ? "even" : "odd"}>
                      {providerDatas[i].name}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <h2>
                <span>Achat vide</span>
                <TbBasketCancel />
              </h2>
            )}
          </>
        )}
      </StyledPurchase>
      {showConfirmation ? (
        <ConfirmationDialog
          action={() => {
            orderMedicines();
            setShowConfirmation(false);
          }}
          title="Confirmer la commande?"
          message="Voulez-vous vraimnet commander les produits listés?"
          confirm={{ text: "Commander", buttonColor: "green" }}
          cancel={{ text: "Annuler", buttonColor: "red" }}
          onClose={() => setShowConfirmation(false)}
        />
      ) : null}
    </>
  );
};

export default Purchase;
