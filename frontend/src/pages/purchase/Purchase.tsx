import { lighten } from "polished";
import { useEffect, useState } from "react";
import { TbBasketCancel } from "react-icons/tb";
import { styled } from "styled-components";
import { api } from "../../api";
import { appear } from "../../components/UpdateForm";
import { Medicine, MedicineFromProvider } from "../../models";

const StyledPurchase = styled.div`
  margin: 0 2rem;

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

  ul {
    border: solid 1px black;
    border-radius: 5px;
    padding: 0 1rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      select {
        cursor: pointer;
        height: 2rem;
      }
    }
  }
`;

export type MatchMedicine = {
  name: string;
  providerMedicines: { medicine: MedicineFromProvider; providerName: string }[];
};

const Purchase = () => {
  const [matchedMedicines, setMatchedMedicines] = useState<MatchMedicine[]>([]);

  useEffect(() => {
    api.get("stock/near-low").then(async (response) => {
      const medicines: Medicine[] = response.data;
      const names: string[] = [];
      medicines.map((medicine) => names.push(medicine.name));
      setMatchedMedicines(await getMedicinesMatches(names));
    });
  }, []);

  const getMedicinesMatches = async (names: string[]) => {
    const res = await api.post("/provider/match", {
      names,
    });

    const matches: MatchMedicine[] = [];

    for (let name of names) {
      if (res.data[name])
        matches.push({
          name: name,
          providerMedicines: res.data[name],
        });
    }

    return matches;
  };

  return (
    <StyledPurchase>
      <div className="header">
        <h1>Purchase</h1>
        <button>Commander</button>
      </div>
      {matchedMedicines.length > 0 ? (
        <ul>
          {matchedMedicines.map((medicine, i) => (
            <li key={i}>
              <p>{medicine.name}</p>
              <select name={medicine.name} id={medicine.name}>
                {medicine.providerMedicines.map((match, i) => (
                  <option key={i}>{match.medicine.name}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
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
