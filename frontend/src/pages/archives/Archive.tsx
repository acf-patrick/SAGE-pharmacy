import styled from "styled-components";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { ArchivedOrder } from "../../models";
import { lighten } from "polished";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";

const StyledArchives = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.4fr;
  margin: 1rem 2rem;
  box-shadow: 0 0 5px grey;
  border-radius: 5px;
  overflow: hidden;
  max-height: 80vh;

  & > div {
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: solid 1px #80808035;
    text-align: center;
    font-weight: 500;
    padding: 0.5rem 0;
  }

  .header {
    color: white;
    font-weight: bold;

    &:nth-of-type(odd) {
      background-color: ${({ theme }) => lighten(0.15, theme.colors.tertiary)};
    }
    &:nth-of-type(even) {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  }

  .odd {
    background-color: ${({ theme }) => lighten(0.25, theme.colors.secondary)};
  }

  button {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: ${({ theme }) => theme.colors.buttons.view};
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    cursor: pointer;
    transition: background-color 250ms;

    &:hover {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.colors.buttons.view)};
    }

    span {
      font-size: 1rem;
      color: white;
      font-weight: bold;
    }

    svg {
      stroke: white;
      font-size: 2rem;
    }
  }
`;

function Archive() {
  const [archivedOrders, setArchivedOrders] = useState<ArchivedOrder[]>([]);

  useEffect(() => {
    api
      .get("/archived-order")
      .then((res) => {
        setArchivedOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header headerTitle="Factures 🎫" />
      <StyledArchives>
        <div className="header">Nom du fournisseur</div>
        <div className="header">Date de création</div>
        <div className="header">Date de création de la commande</div>
        <div className="header"></div>
        {archivedOrders.map((order, i) => (
          <>
            <div className={i % 2 ? "odd" : ""}>{order.providerName}</div>
            <div className={i % 2 ? "odd" : ""}>
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className={i % 2 ? "odd" : ""}>
              {new Date(order.orderCreationDate).toLocaleString()}
            </div>
            <div className={i % 2 ? " odd" : ""}>
              <button>
                <HiOutlineViewfinderCircle />
                <span>Voir</span>
              </button>
            </div>
          </>
        ))}
      </StyledArchives>
    </>
  );
}

export default Archive;
