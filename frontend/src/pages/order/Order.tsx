import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Header } from "../../components";
import Kanban, { KanbanItem } from "./components/Kanban";
import { api } from "../../api";

type Order = {
  id: string;
  isValid: boolean;
  providerName: string;
  minPurchase: number;
  status: KanbanItemStatus;
  totalPriceWithTax: number;
  totamPriceWithoutTax: number;
  createdAt: string;
};

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 97%;
  margin: auto;
  overflow-x: auto;
  padding: 0 1rem;
  padding-bottom: 2rem;
`;

export const KanbanItemStatusObject = {
  ORDERED: "ORDERED",
  PENDING: "PENDING",
  RECEIVED: "RECEIVED",
  FINISHED: "FINISHED",
} as const;

export type KanbanItemStatus = typeof status;

export default function Order() {
  useEffect(() => {
    // Supposed to fetch data here
    api
      .get("/order")
      .then((res) => {
        const data = res.data;

        const orderedList: KanbanItem[] = [];
        const pendingList: KanbanItem[] = [];
        const receivedList: KanbanItem[] = [];
        const finishedList: KanbanItem[] = [];
        data.forEach((order: Order) => {
          if (order.status == KanbanItemStatusObject.ORDERED) {
            orderedList.push({
              title: order.providerName + order.createdAt,
              id: order.id,
              isValid: order.isValid,
              status: order.status,
            });
          } else if (order.status == KanbanItemStatusObject.PENDING) {
            pendingList.push({
              title: order.providerName + order.createdAt,
              id: order.id,
              isValid: order.isValid,
              status: order.status,
            });
          } else if (order.status == KanbanItemStatusObject.RECEIVED) {
            receivedList.push({
              title: order.providerName + order.createdAt,
              id: order.id,
              isValid: order.isValid,
              status: order.status,
            });
          } else if (order.status == KanbanItemStatusObject.FINISHED) {
            receivedList.push({
              title: order.providerName + order.createdAt,
              id: order.id,
              isValid: order.isValid,
              status: order.status,
            });
          }
        });

        setOrderedOrders(orderedList);
        setPendingOrders(pendingList);
        setReceivedOrders(receivedList);
        setFinishedOrders(finishedList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [orderedOrders, setOrderedOrders] = useState<KanbanItem[]>([]);
  const [pendingOrders, setPendingOrders] = useState<KanbanItem[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<KanbanItem[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<KanbanItem[]>([]);

  return (
    <>
      <Header headerTitle="Commandes 📋"></Header>
      <StyledContainer>
        <Kanban
          items={orderedOrders}
          title="Commandes"
          moveItems={() => {
            orderedOrders.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.PENDING,
                })
                .then(() => {
                  const tmp = orderedOrders
                    .filter((order) => order.isValid)
                    .map((order) => {
                      order.status = KanbanItemStatusObject.PENDING;
                      order.isValid = true;
                      return order;
                    });
                  setOrderedOrders(
                    orderedOrders.filter((order) => !order.isValid)
                  );
                  setPendingOrders([...pendingOrders, ...tmp]);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }}
          moveItem={(index: number) => {
            const orderToMove = orderedOrders[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.PENDING,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  const tmp = orderedOrders.filter((_order, i) => i != index);
                  setOrderedOrders(tmp);
                  setPendingOrders([...pendingOrders, orderToMove]);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = orderedOrders[index];
            api
              .delete("/order/" + orderToMove)
              .then(() => {
                setOrderedOrders(
                  orderedOrders.filter((_order, i) => i != index)
                );
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
        <Kanban
          items={pendingOrders}
          title="En Cours"
          moveItems={() =>
            pendingOrders.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.RECEIVED,
                })
                .then(() => {
                  const tmp = pendingOrders.map((order) => {
                    order.status = KanbanItemStatusObject.RECEIVED;
                    order.isValid = true;
                    return order;
                  });
                  setPendingOrders(
                    pendingOrders.filter((order) => !order.isValid)
                  );
                  setReceivedOrders([...receivedOrders, ...tmp]);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
          }
          moveItem={(index: number) => {
            const orderToMove = pendingOrders[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.RECEIVED,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  const tmp = pendingOrders.filter((_order, i) => i != index);
                  setPendingOrders(tmp);
                  setReceivedOrders([...receivedOrders, orderToMove]);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = pendingOrders[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.ORDERED,
              })
              .then(() => {
                setPendingOrders(
                  pendingOrders.filter((_order, i) => i != index)
                );
                setOrderedOrders([...orderedOrders, orderToMove]);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
        <Kanban
          items={receivedOrders}
          title="Reception"
          moveItems={() => {
            receivedOrders.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.FINISHED,
                })
                .then(() => {
                  const tmp = receivedOrders.map((order) => {
                    order.status = KanbanItemStatusObject.FINISHED;
                    return order;
                  });
                  setReceivedOrders(
                    receivedOrders.filter((order) => !order.isValid)
                  );
                  setFinishedOrders([...finishedOrders, ...tmp]);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }}
          moveItem={(index: number) => {
            const orderToMove = receivedOrders[index];
            if (orderToMove.isValid) {
              const tmp = receivedOrders.filter((_, i) => i != index);
              setReceivedOrders(tmp);
              setFinishedOrders([...finishedOrders, orderToMove]);
            }
          }}
          deleteItem={(index: number) => {
            const removedItem = receivedOrders[index];
            setReceivedOrders(receivedOrders.filter((_order, i) => i != index));
            setPendingOrders([...pendingOrders, removedItem]);
          }}
        />
        <Kanban
          items={finishedOrders}
          title="Terminé"
          deleteItem={(index: number) => {
            const removedItem = finishedOrders[index];
            setFinishedOrders(finishedOrders.filter((_order, i) => i != index));
            setReceivedOrders([...receivedOrders, removedItem]);
          }}
        />
      </StyledContainer>
    </>
  );
}
