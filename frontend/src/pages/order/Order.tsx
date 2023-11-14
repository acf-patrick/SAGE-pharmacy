import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { api } from "../../api";
import { Header } from "../../components";
import { MedicineFromProvider, Provider } from "../../models";
import EditModal from "./components/EditModal";
import Kanban from "./components/Kanban";

// export type OrderMedicine = {
//   id: string;
//   medicine: MedicineFromProvider;
//   quantity: number;
//   medicineFromProviderId: string;
//   order: Order;
//   orderId: string;
// };

export type Order = {
  id: string;
  provider: Provider;
  providerName: string;
  createdAt: string;
  isValid: boolean;
  status: KanbanItemStatus;
  minPurchase: number;
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
  orderMedicines: MedicineFromProvider[];
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

export default function OrderComponent() {
  useEffect(() => {
    // Supposed to fetch data here
    api
      .get("/order")
      .then((res) => {
        const data = res.data;

        const orderedList: Order[] = [];
        const pendingList: Order[] = [];
        const receivedList: Order[] = [];
        const finishedList: Order[] = [];
        data.forEach((order: Order) => {
          switch (order.status) {
            case KanbanItemStatusObject.ORDERED:
              orderedList.push(order);
              break;
            case KanbanItemStatusObject.PENDING:
              pendingList.push(order);
              break;
            case KanbanItemStatusObject.RECEIVED:
              receivedList.push(order);
              break;
            case KanbanItemStatusObject.FINISHED:
              finishedList.push(order);
              break;
            default:
              break;
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

  const [orderedOrders, setOrderedOrders] = useState<Order[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<Order[]>([]);

  const [currentOrderSelected, setCurrentOrderSelected] =
    useState<Order | null>(null);

  useEffect(() => {
    console.log(currentOrderSelected);
  }, [currentOrderSelected]);

  return (
    <>
      <Header headerTitle="Commandes 📋"></Header>
      <StyledContainer>
        <Kanban
          orders={orderedOrders}
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
          onOrderSelect={setCurrentOrderSelected}
        />
        <Kanban
          orders={pendingOrders}
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
          onOrderSelect={setCurrentOrderSelected}
        />
        <Kanban
          orders={receivedOrders}
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
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.FINISHED,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  const tmp = receivedOrders.filter((_order, i) => i != index);
                  setReceivedOrders(tmp);
                  setFinishedOrders([...finishedOrders, orderToMove]);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = receivedOrders[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.PENDING,
              })
              .then(() => {
                setReceivedOrders(
                  receivedOrders.filter((_order, i) => i != index)
                );
                setPendingOrders([...pendingOrders, orderToMove]);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={setCurrentOrderSelected}
        />
        <Kanban
          orders={finishedOrders}
          title="Terminé"
          deleteItem={(index: number) => {
            const orderToMove = finishedOrders[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.RECEIVED,
              })
              .then(() => {
                setFinishedOrders(
                  finishedOrders.filter((_order, i) => i != index)
                );
                setReceivedOrders([...receivedOrders, orderToMove]);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={setCurrentOrderSelected}
        />
      </StyledContainer>
      {currentOrderSelected ? (
        <EditModal
          order={currentOrderSelected}
          onClose={() => setCurrentOrderSelected(null)}
          onValidate={() => setCurrentOrderSelected(null)}
        />
      ) : null}
    </>
  );
}
