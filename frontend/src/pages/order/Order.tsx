import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { api } from "../../api";
import { Header } from "../../components";
import { MedicineFromProvider, Provider } from "../../models";
import Kanban from "./components/Kanban";
import { useNavigate } from "react-router-dom";

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

export type KanbanItemStatus = "ORDERED" | "PENDING" | "RECEIVED" | "FINISHED";

export default function OrderComponent() {
  const [orders, setOrders] = useState<{
    ordered: Order[];
    pending: Order[];
    received: Order[];
    finished: Order[];
  }>({
    ordered: [],
    pending: [],
    received: [],
    finished: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Supposed to fetch data here
    api
      .get("/order")
      .then((res) => {
        const data = res.data;

        const ordered: Order[] = [];
        const pending: Order[] = [];
        const received: Order[] = [];
        const finished: Order[] = [];
        data.forEach((order: Order) => {
          switch (order.status) {
            case KanbanItemStatusObject.ORDERED:
              ordered.push(order);
              break;
            case KanbanItemStatusObject.PENDING:
              pending.push(order);
              break;
            case KanbanItemStatusObject.RECEIVED:
              received.push(order);
              break;
            case KanbanItemStatusObject.FINISHED:
              finished.push(order);
              break;
            default:
              break;
          }
        });

        setOrders({ ordered, pending, received, finished });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header headerTitle="Commandes 📋"></Header>
      <StyledContainer>
        <Kanban
          orders={orders.ordered}
          title="Commandes"
          moveItems={() => {
            orders.ordered.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.PENDING,
                })
                .then(() => {
                  setOrders({
                    ...orders,
                    pending: [
                      ...orders.pending,
                      ...orders.ordered
                        .filter((order) => order.isValid)
                        .map((order) => {
                          order.status = KanbanItemStatusObject.PENDING;
                          order.isValid = true;
                          return order;
                        }),
                    ],
                    ordered: orders.ordered.filter((order) => !order.isValid),
                  });
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }}
          moveItem={(index: number) => {
            const orderToMove = orders.ordered[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.PENDING,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  setOrders({
                    ...orders,
                    ordered: orders.ordered.filter((_, i) => i != index),
                    pending: [...orders.pending, orderToMove],
                  });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = orders.ordered[index];
            api
              .delete("/order/" + orderToMove)
              .then(() => {
                setOrders({
                  ...orders,
                  ordered: orders.ordered.filter((_order, i) => i != index),
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={(order) => {
            navigate(order.id);
          }}
        />
        <Kanban
          orders={orders.pending}
          title="En Cours"
          moveItems={() =>
            orders.pending.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.RECEIVED,
                })
                .then(() => {
                  setOrders({
                    ...orders,
                    pending: orders.pending.filter((order) => !order.isValid),
                    received: [
                      ...orders.received,
                      ...orders.pending.map((order) => {
                        order.status = KanbanItemStatusObject.RECEIVED;
                        order.isValid = true;
                        return order;
                      }),
                    ],
                  });
                })
                .catch((err) => {
                  console.error(err);
                });
            })
          }
          moveItem={(index: number) => {
            const orderToMove = orders.pending[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.RECEIVED,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  setOrders({
                    ...orders,
                    pending: orders.pending.filter((_, i) => i != index),
                    received: [...orders.received, orderToMove],
                  });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = orders.pending[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.ORDERED,
              })
              .then(() => {
                setOrders({
                  ...orders,
                  ordered: [...orders.ordered, orderToMove],
                  pending: orders.pending.filter((_, i) => i != index),
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={() => {}}
        />
        <Kanban
          orders={orders.received}
          title="Reception"
          moveItems={() => {
            orders.received.forEach((order) => {
              api
                .patch("/order/" + order.id, {
                  status: KanbanItemStatusObject.FINISHED,
                })
                .then(() => {
                  setOrders({
                    ...orders,
                    received: orders.received.filter((order) => !order.isValid),
                    finished: [
                      ...orders.finished,
                      ...orders.received.map((order) => {
                        order.status = KanbanItemStatusObject.FINISHED;
                        return order;
                      }),
                    ],
                  });
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }}
          moveItem={(index: number) => {
            const orderToMove = orders.received[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.FINISHED,
              })
              .then(() => {
                if (orderToMove.isValid) {
                  setOrders({
                    ...orders,
                    received: orders.received.filter((_, i) => i != index),
                    finished: [...orders.finished, orderToMove],
                  });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          deleteItem={(index: number) => {
            const orderToMove = orders.received[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.PENDING,
              })
              .then(() => {
                setOrders({
                  ...orders,
                  received: orders.received.filter((_order, i) => i != index),
                  pending: [...orders.pending, orderToMove],
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={() => {}}
        />
        <Kanban
          orders={orders.finished}
          title="Terminé"
          deleteItem={(index: number) => {
            const orderToMove = orders.finished[index];
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.RECEIVED,
              })
              .then(() => {
                setOrders({
                  ...orders,
                  finished: orders.finished.filter((_, i) => i != index),
                  received: [...orders.received, orderToMove],
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onOrderSelect={() => {}}
        />
      </StyledContainer>
    </>
  );
}
