import { lighten } from "polished";
import React from "react";
import { styled } from "styled-components";

const StyledStock = styled.div`
  padding: 0 3rem;

  .table-container {
    max-height: 80vh;
    overflow-y: scroll;
  }

  .table {
    overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(10, minmax(150px, 1fr));
    align-items: center;
    border: solid 1px black;
    border-radius: 5px 5px 0 0;

    div {
      padding: 1rem 0;
      text-align: center;
    }

    .header {
      color: white;
      font-weight: bold;

      &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.colors.tertiary};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) => lighten(0.1, theme.colors.tertiary)};
      }
    }
  }
`;

const data = [
  {
    name: "Paracetamol",
    quantity: 2,
    priceWidivoutTax: 450,
    priceWidivTax: 500,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-6",
    min: 1,
    max: 10,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Vitamine C",
    quantity: 20,
    priceWidivoutTax: 1000,
    priceWidivTax: 1500,
    dci: "Effervescent",
    isTaxed: true,
    location: "Tirroir-1",
    min: 10,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Mediv",
    quantity: 10,
    priceWidivoutTax: 10000,
    priceWidivTax: 12000,
    dci: "Weed",
    isTaxed: true,
    location: "Tirroir-9",
    min: 5,
    max: 15,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Nivaquine",
    quantity: 25,
    priceWidivoutTax: 250,
    priceWidivTax: 300,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-2",
    min: 15,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Paracetamol",
    quantity: 2,
    priceWidivoutTax: 450,
    priceWidivTax: 500,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-6",
    min: 1,
    max: 10,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Vitamine C",
    quantity: 20,
    priceWidivoutTax: 1000,
    priceWidivTax: 1500,
    dci: "Effervescent",
    isTaxed: true,
    location: "Tirroir-1",
    min: 10,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Mediv",
    quantity: 10,
    priceWidivoutTax: 10000,
    priceWidivTax: 12000,
    dci: "Weed",
    isTaxed: true,
    location: "Tirroir-9",
    min: 5,
    max: 15,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Nivaquine",
    quantity: 25,
    priceWidivoutTax: 250,
    priceWidivTax: 300,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-2",
    min: 15,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Paracetamol",
    quantity: 2,
    priceWidivoutTax: 450,
    priceWidivTax: 500,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-6",
    min: 1,
    max: 10,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Vitamine C",
    quantity: 20,
    priceWidivoutTax: 1000,
    priceWidivTax: 1500,
    dci: "Effervescent",
    isTaxed: true,
    location: "Tirroir-1",
    min: 10,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Mediv",
    quantity: 10,
    priceWidivoutTax: 10000,
    priceWidivTax: 12000,
    dci: "Weed",
    isTaxed: true,
    location: "Tirroir-9",
    min: 5,
    max: 15,
    expirationDate: new Date().toLocaleDateString(),
  },
  {
    name: "Nivaquine",
    quantity: 25,
    priceWidivoutTax: 250,
    priceWidivTax: 300,
    dci: "Antidouleur",
    isTaxed: true,
    location: "Tirroir-2",
    min: 15,
    max: 30,
    expirationDate: new Date().toLocaleDateString(),
  },
];

const keyMap = {};

const Stock = () => {
  return (
    <StyledStock>
      <h1>Stock</h1>
      <div className="table-container">
        <div className="table">
          <div className="header">Nom</div>
          <div className="header">Prix d'achat</div>
          <div className="header">Prix de vente</div>
          <div className="header">Quantité</div>
          <div className="header">Emplacement</div>
          <div className="header">DCI</div>
          <div className="header">Taxé</div>
          <div className="header">Stock Min</div>
          <div className="header">Stock Max</div>
          <div className="header">Date d'éxpiration</div>

          {data.map((medicine, i) => (
            <React.Fragment key={i}>
              {Object.values(medicine).map((value, i) => (
                <div key={i}>{`${value}`}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </StyledStock>
  );
};

export default Stock;
