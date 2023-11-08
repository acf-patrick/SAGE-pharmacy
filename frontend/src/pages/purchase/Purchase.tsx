import { lighten } from "polished";
import React, { useEffect, useState } from "react";
import { TbBasketCancel } from "react-icons/tb";
import { styled } from "styled-components";
import { api } from "../../api";
import { appear } from "../../components/UpdateForm";
import { Medicine, MedicineFromProvider } from "../../models";

const StyledPurchase = styled.div`
  padding: 0 2rem;

  .container {
    display: grid;
    grid-template-columns: 10rem 25rem 10rem;
    grid-auto-rows: 50px;
    border: solid 1px black;
    width: fit-content;
    border-radius: 5px;
    max-height: ${({ theme }) => theme.size.purchaseHeight};
    overflow-y: auto;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: solid 1px black;
      font-weight: 600;

      &:nth-of-type(3n) {
        border-right: unset;
      }

      select {
        cursor: pointer;
        height: 2rem;
        width: 85%;
        border-radius: 4px;
        font-weight: bolder;
      }
    }

    .header-item {
      background-color: red;

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

export type MatchMedicine = {
  name: string;
  providerMedicines: {
    medicine: MedicineFromProvider;
    provider: { name: string };
  }[];
};

const Purchase = () => {
  const [matchedMedicines, setMatchedMedicines] = useState<MatchMedicine[]>([]);

  const [providerDatas, setProviderDatas] = useState<
    {
      name: string;
    }[]
  >([]);

  const [order, setOrder] = useState<MedicineFromProvider[]>([]);

  useEffect(() => {
    getMedicinesMatches()
      .then((matchingMedicines) => {
        setMatchedMedicines(matchingMedicines);
        setProviderDatas(
          matchingMedicines.map((med) => ({
            name: med.providerMedicines[0].provider.name,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const getMedicinesMatches = async () => {
    const res = await api.get("/provider/provide");
    const matches: MatchMedicine[] = [];

    for (let name of Object.keys(res.data)) {
      matches.push({
        name: name,
        providerMedicines: res.data[name],
      });
    }

    return matches;
  };

  const orderMedicines = () => {
    const selects = document.querySelectorAll("select");
    const medicinesToOrder: MedicineFromProvider[] = [];
    for (let select of selects) {
      const value = JSON.parse(select.value);
      medicinesToOrder.push(value.medicine);
    }
    setOrder(medicinesToOrder);
  };

  useEffect(() => console.log(order), [order]);

  return (
    <StyledPurchase>
      <div className="header">
        <h1>Purchase</h1>
        <button onClick={orderMedicines}>Commander</button>
      </div>
      {matchedMedicines.length > 0 ? (
        <div className="container">
          <div className="header-item">En rupture</div>
          <div className="header-item">Depuis fournisseur</div>
          <div className="header-item">Fournisseur</div>
          {matchedMedicines.map((medicine, i) => (
            <React.Fragment key={i}>
              <div className={i % 2 == 0 ? "even" : "odd"}>{medicine.name}</div>
              <div className={i % 2 == 0 ? "even" : "odd"}>
                {medicine.providerMedicines.length == 1 ? (
                  <div>{medicine.providerMedicines[0].medicine.name}</div>
                ) : (
                  <select
                    name={medicine.name}
                    id={medicine.name}
                    onChange={(e) => {
                      const { providerName } = JSON.parse(
                        e.currentTarget.value
                      );
                      setProviderDatas((providerDatas) => {
                        providerDatas[i].name = providerName;
                        return [...providerDatas];
                      });
                    }}
                  >
                    {medicine.providerMedicines.map((match, i) => (
                      <option
                        key={i}
                        value={JSON.stringify({
                          medicine: match.medicine,
                          providerName: match.provider.name,
                        })}
                      >
                        {match.medicine.name + " (" + match.provider.name + ")"}
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
    </StyledPurchase>
  );
};

export default Purchase;
