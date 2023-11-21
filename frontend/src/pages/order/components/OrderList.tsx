import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { api } from "../../../api";
import { KanbanItemStatusObject, Order } from "../types";
import Kanban from "./Kanban";

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 97%;
  margin: auto;
  overflow-x: auto;
  padding: 0 1rem;
  padding-bottom: 2rem;
`;

export default function OrderList() {
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
            case KanbanItemStatusObject.AVOIR:
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

  const isValid = (order: Order) =>
    order.minPurchase <= order.totalPriceWithTax;

  return (
    <StyledContainer>
      <Kanban
        orders={orders.ordered}
        title="Commandes"
        moveItem={(index: number) => {
          const orderToMove = orders.ordered[index];
          if (isValid(orderToMove)) {
            api
              .patch("/order/" + orderToMove.id, {
                status: KanbanItemStatusObject.PENDING,
              })
              .then(() => {
                orderToMove.status = KanbanItemStatusObject.PENDING;
                setOrders({
                  ...orders,
                  ordered: orders.ordered.filter((_, i) => i != index),
                  pending: [...orders.pending, orderToMove],
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }}
        deleteItem={(index: number) => {
          const orderToMove = orders.ordered[index];
          api
            .delete("/order/" + orderToMove.id)
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
                  pending: orders.pending.filter((order) => !isValid(order)),
                  received: [
                    ...orders.received,
                    ...orders.pending.map((order) => {
                      order.status = KanbanItemStatusObject.RECEIVED;
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
              orderToMove.status = KanbanItemStatusObject.RECEIVED;
              setOrders({
                ...orders,
                pending: orders.pending.filter((_, i) => i != index),
                received: [...orders.received, orderToMove],
              });
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
              orderToMove.status = KanbanItemStatusObject.ORDERED;
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
                  received: orders.received.filter((order) => !isValid(order)),
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
              orderToMove.status = KanbanItemStatusObject.FINISHED;
              setOrders({
                ...orders,
                received: orders.received.filter((_, i) => i != index),
                finished: [...orders.finished, orderToMove],
              });
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
              orderToMove.status = KanbanItemStatusObject.PENDING;
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
        onOrderSelect={(order) => {
          api
            .patch("/order/" + order.id, {
              status: KanbanItemStatusObject.AVOIR,
            })
            .then(() => {
              setOrders((orders) => {
                order.status = KanbanItemStatusObject.AVOIR;

                return {
                  ...orders,
                  received: orders.received.filter(
                    (record) => record.id != order.id
                  ),
                  finished: [...orders.finished, order],
                };
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
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
              orderToMove.status = KanbanItemStatusObject.RECEIVED;
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
      />
    </StyledContainer>
  );
}
