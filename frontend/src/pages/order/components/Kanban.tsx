import { BsCheckLg } from "react-icons/bs";
import { GoMoveToEnd } from "react-icons/go";
import { MdEdit, MdPostAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { KanbanItemStatus, KanbanItemStatusObject, Order } from "../types";

type KanbanProps = {
  title: string;
  orders: Order[];
  moveItems?: () => void;
  moveItem?: (indexOfItemToMove: number) => void;
  deleteItem?: (indexOfItemToDelete: number) => void;
  onOrderSelect?: (order: Order) => void;
};

const StyledDiv = styled.div`
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
      margin: 1rem 0;
      font-size: 18px;
    }

    svg {
      cursor: pointer;

      &:first-of-type {
        fill: blue;
        font-size: 1.75rem;
      }

      &:last-of-type {
        fill: green;
        font-size: 1.5rem;
      }
    }
  }
`;

const StyledKanban = styled.div<{ $size: number }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 70vh;
  width: 300px;
  overflow-y: auto;
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 1rem;
  position: relative;

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  h1 {
    font-size: 25px;
  }

  &:hover {
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
      display: ${({ $size }) => ($size == 0 ? "none" : "block")};
    }

    &::-webkit-scrollbar-thumb {
      display: ${({ $size }) => ($size == 0 ? "none" : "block")};
    }
  }
`;

const StyledKanbanItemDiv = styled.div<{
  $isValid: boolean;
  $status: KanbanItemStatus;
}>`
  width: 95%;
  min-height: 150px;
  box-shadow: 0 1px 5px #8080807b;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  cursor: pointer;
  transition: transform 250ms, box-shadow 250ms;
  position: relative;
  overflow: hidden;

  &:first-of-type {
    margin-top: 2rem;
  }

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 3px 5px #8080807b;
  }

  &:first-of-type {
    margin-top: 1rem;
  }

  .ticket {
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme, $isValid, $status }) => {
      if ($status == "ORDERED") {
        return $isValid
          ? theme.colors.kanban.ready
          : theme.colors.kanban.notReady;
      } else {
        if ($status == "AVOIR") return theme.colors.kanban.incomplete;
        return theme.colors.kanban.ready;
      }
    }};
    width: 45%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: white;

    &::after {
      border-radius: 5px;
      display: block;
      position: absolute;
      right: -20px;
      content: "";
      width: 30px;
      height: 30px;
      background-color: white;
      transform: rotate(45deg);
    }
  }

  h1 {
    font-size: 13px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 0.5rem;
    padding-right: 1rem;
    font-size: 1.25rem;
    position: absolute;
    bottom: 0.5rem;

    .validate {
      fill: green;
    }

    .delete {
      * {
        fill: red;
      }
    }
    .edit {
      fill: orange;
    }

    svg {
      transition: transform 250ms;

      &:hover {
        transform: translateY(-0.25rem);
      }
    }
  }
`;

function KanbanItemComponent({
  order,
  moveItem,
  deleteItem,
  onOrderEdit: onOrderEdit,
}: {
  order: Order;
  moveItem?: () => void;
  deleteItem?: () => void;
  onOrderEdit?: (order: Order) => void;
}) {
  const map = new Map<KanbanItemStatus, string>([
    [KanbanItemStatusObject.PENDING, "En cours"],
    [KanbanItemStatusObject.RECEIVED, "Reçu"],
    [KanbanItemStatusObject.FINISHED, "Fini"],
    [KanbanItemStatusObject.AVOIR, "Avoir"],
  ]);

  return (
    <StyledKanbanItemDiv
      $isValid={order.minPurchase <= order.totalPriceWithTax}
      $status={order.status}
    >
      <div className="ticket">
        {order.status == "ORDERED"
          ? order.minPurchase <= order.totalPriceWithTax
            ? "Prêt"
            : "Pas prêt"
          : map.get(order.status)}
      </div>
      <h1>
        {order.providerName +
          "_" +
          new Date(order.createdAt).toLocaleDateString().replace(/\//g, "_")}
      </h1>
      <div className="buttons">
        {moveItem ? (
          <BsCheckLg
            title="Passer au suivant"
            className="validate"
            onClick={moveItem}
          />
        ) : null}
        {deleteItem ? (
          <RxCross2
            title="Revenir au précédent"
            className="delete"
            onClick={deleteItem}
          />
        ) : null}
        {onOrderEdit ? (
          <MdEdit
            title={
              order.status == KanbanItemStatusObject.RECEIVED
                ? 'Mettre en "Avoir"'
                : "Modifier"
            }
            className="edit"
            onClick={() => onOrderEdit(order)}
          />
        ) : null}
      </div>
    </StyledKanbanItemDiv>
  );
}

export default function Kanban({
  title,
  orders,
  moveItems,
  moveItem,
  deleteItem,
  onOrderSelect,
}: KanbanProps) {
  const generateMoveItem = (i: number): (() => void | undefined) => {
    const order = orders[i];
    switch (order.status) {
      case KanbanItemStatusObject.ORDERED:
        if (order.minPurchase <= order.totalPriceWithTax) {
          return () => moveItem(i);
        }
        return undefined;
      case KanbanItemStatusObject.PENDING:
      case KanbanItemStatusObject.RECEIVED:
        return () => moveItem(i);
    }
    return undefined;
  };

  const generateDeleteItem = (i: number): (() => void | undefined) => {
    const order = orders[i];
    if (
      order.status != KanbanItemStatusObject.RECEIVED &&
      order.status != KanbanItemStatusObject.FINISHED
    ) {
      return () => deleteItem(i);
    }

    return undefined;
  };

  const generateEditItem = (i: number): (() => void | undefined) => {
    const order = orders[i];
    if (
      order.status == KanbanItemStatusObject.RECEIVED ||
      order.status == KanbanItemStatusObject.ORDERED
    ) {
      return () => onOrderSelect(order);
    }
    return undefined;
  };

  const navigate = useNavigate();

  return (
    <StyledDiv>
      <div className="header">
        <h1>{title}</h1>
        {title == "Commandes" ? (
          <MdPostAdd
            onClick={() => navigate("/order/create")}
            title="Créer fournisseur"
          />
        ) : null}
        {moveItems ? (
          <GoMoveToEnd
            title="Envoyer à la prochaine étape"
            onClick={moveItems}
          />
        ) : null}
      </div>
      <StyledKanban $size={orders.length}>
        {orders.map((order, i) => (
          <KanbanItemComponent
            key={i}
            order={order}
            moveItem={generateMoveItem(i)}
            deleteItem={generateDeleteItem(i)}
            onOrderEdit={generateEditItem(i)}
          />
        ))}
      </StyledKanban>
    </StyledDiv>
  );
}
