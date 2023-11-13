import { useState } from "react";
import { styled } from "styled-components";
import { Header } from "../../components";
import Kanban, { KanbanItem } from "./components/Kanban";

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 97%;
  margin: auto;
  overflow-x: auto;
  padding: 0 1rem;
  padding-bottom: 2rem;
`;

export enum KanbanItemStatus {
  ORDERED,
  PENDING,
  RECEIVED,
  FINISHED,
}

const data: KanbanItem[] = [
  {
    title: "COPHARMA_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.ORDERED,
    isValid: true,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
  {
    title: "MEDICARE_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.ORDERED,
    isValid: false,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
  {
    title: "MEDICARE_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.PENDING,
    isValid: true,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
  {
    title: "MEDICARE_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.RECEIVED,
    isValid: true,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
  {
    title: "MEDICARE_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.RECEIVED,
    isValid: true,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
  {
    title: "MEDICARE_" + new Date().toLocaleString().split(" ")[0],
    color: "green",
    status: KanbanItemStatus.FINISHED,
    isValid: true,
    buttons: [
      {
        text: "Valider",
        action: () => {},
      },
      {
        text: "Annuler",
        action: () => {},
      },
      {
        text: "Editer",
        action: () => {},
      },
    ],
  },
];

export default function Order() {
  const [orders, setOrders] = useState<KanbanItem[]>(data);

  const [orderedOrders, setOrderedOrders] = useState<KanbanItem[]>(
    orders.filter((item) => item.status == KanbanItemStatus.ORDERED)
  );
  const [pendingOrders, setPendingOrders] = useState<KanbanItem[]>(
    orders.filter((item) => item.status == KanbanItemStatus.PENDING)
  );
  const [receivedOrders, setReceivedOrders] = useState<KanbanItem[]>(
    orders.filter((item) => item.status == KanbanItemStatus.RECEIVED)
  );
  const [finishedOrders, setFinishedOrders] = useState<KanbanItem[]>(
    orders.filter((item) => item.status == KanbanItemStatus.FINISHED)
  );

  return (
    <>
      <Header headerTitle="Commandes 📋"></Header>
      <StyledContainer>
        <Kanban
          items={orderedOrders}
          title="Commandes"
          moveItems={() => {
            const tmp = orderedOrders
              .filter((order) => order.isValid)
              .map((order) => {
                order.status = KanbanItemStatus.PENDING;
                order.isValid = true;
                return order;
              });
            setOrderedOrders(orderedOrders.filter((order) => !order.isValid));
            setPendingOrders([...pendingOrders, ...tmp]);
          }}
        />
        <Kanban
          items={pendingOrders}
          title="En Cours"
          moveItems={() => {
            const tmp = pendingOrders;
            tmp.forEach((order) => {
              order.status = KanbanItemStatus.RECEIVED;
            });
            setPendingOrders([]);
            setReceivedOrders([...receivedOrders, ...tmp]);
          }}
        />
        <Kanban
          items={receivedOrders}
          title="Reception"
          moveItems={() => {
            const tmp = receivedOrders;
            tmp.forEach((order) => {
              order.status = KanbanItemStatus.FINISHED;
            });
            setReceivedOrders([]);
            setFinishedOrders([...finishedOrders, ...tmp]);
          }}
        />
        <Kanban items={finishedOrders} title="Terminé" />
      </StyledContainer>
    </>
  );
}
