import { styled } from "styled-components";
import { KanbanItemStatus } from "../Order";
import { GoMoveToEnd } from "react-icons/go";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

export type KanbanItem = {
  id: string;
  title: string;
  status: KanbanItemStatus;
  isValid: boolean;
};

type KanbanProps = {
  title: string;
  items: KanbanItem[];
  moveItems?: () => void;
  moveItem?: (indexOfItemToMove: number) => void;
  deleteItem?: (indexOfItemToDelete: number) => void;
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
      font-size: 1.5rem;
      color: green;
      fill: green;
      cursor: pointer;
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
    background-color: ${({ theme, $isValid }) =>
      $isValid ? theme.colors.kanban.ready : theme.colors.kanban.notReady};
    width: 45%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: white;

    &::after {
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

    svg {
      transition: transform 250ms;

      &:hover {
        transform: translateY(-0.25rem);
      }

      &:first-of-type {
        fill: green;
      }

      &:nth-of-type(2) {
        * {
          fill: red;
        }
      }
      &:last-of-type {
        fill: orange;
      }
    }
  }
`;

function KanbanItemComponent({
  item,
  moveItem,
  deleteItem,
}: {
  item: KanbanItem;
  moveItem: (i: number) => void;
  deleteItem: (i: number) => void;
}) {
  return (
    <StyledKanbanItemDiv $isValid={item.isValid} $status={item.status}>
      <div className="ticket">{!item.isValid ? "Pas prêt" : "Prêt"}</div>
      <h1>{item.title}</h1>
      <div className="buttons">
        <BsCheckLg onClick={moveItem} />
        <RxCross2 onClick={deleteItem} />
        <MdEdit onClick={() => {}} />
      </div>
    </StyledKanbanItemDiv>
  );
}

export default function Kanban({
  title,
  items,
  moveItems,
  moveItem,
  deleteItem,
}: KanbanProps) {
  return (
    <StyledDiv>
      <div className="header">
        <h1>{title}</h1>
        {moveItems ? (
          <GoMoveToEnd
            title="Envoyer à la prochaine étape"
            onClick={moveItems}
          />
        ) : null}
      </div>
      <StyledKanban $size={items.length}>
        {items.map((item, i) => (
          <KanbanItemComponent
            key={i}
            item={item}
            moveItem={() => (moveItem ? moveItem(i) : {})}
            deleteItem={() => (deleteItem ? deleteItem(i) : {})}
          />
        ))}
      </StyledKanban>
    </StyledDiv>
  );
}
