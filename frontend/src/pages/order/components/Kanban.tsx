import { styled } from "styled-components";
import { KanbanItemStatus } from "../Order";
import { GoMoveToEnd } from "react-icons/go";

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

export type KanbanItem = {
  title: string;
  color: string;
  status: KanbanItemStatus;
  isValid: boolean;
  buttons: {
    text: string;
    action: () => void | undefined;
  }[];
};

type KanbanProps = {
  title: string;
  items: KanbanItem[];
  moveItems?: () => void;
};

const StyledKanbanItemDiv = styled.div<{
  $isValid: boolean;
  $status: KanbanItemStatus;
}>`
  width: 95%;
  min-height: 100px;
  box-shadow: 0 1px 5px #8080807b;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${({ $isValid, $status }) =>
    $isValid
      ? "#45b74589"
      : $status == KanbanItemStatus.ORDERED
      ? "#4747dbaa"
      : "red"};
  cursor: pointer;
  transition: transform 250ms, box-shadow 250ms;
  k &:first-of-type {
    margin-top: 2rem;
  }

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 3px 5px #8080807b;
  }

  &:first-of-type {
    margin-top: 1rem;
  }

  h1 {
    font-size: 1.2rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 0.5rem;
    padding-right: 1rem;

    button {
      padding: 4px 8px;
      border: none;
      color: white;
      font-weight: 600;
      border-radius: 3px;
      cursor: pointer;
      transition: transform 250ms, box-shadow 250ms;

      &:hover {
        transform: translateY(-0.25rem);
        box-shadow: 0 3px 5px #8080807b;
      }

      &:first-of-type {
        background-color: green;
      }

      &:nth-of-type(2) {
        background-color: red;
      }
      &:last-of-type {
        background-color: orange;
      }
    }
  }
`;

function KanbanItemComponent({ title, status, isValid, buttons }: KanbanItem) {
  return (
    <StyledKanbanItemDiv $isValid={isValid} $status={status}>
      <h1>{title}</h1>
      <div className="buttons">
        {buttons.map((button, i) => (
          <button key={i} onClick={button.action}>
            {button.text}
          </button>
        ))}
      </div>
    </StyledKanbanItemDiv>
  );
}

export default function Kanban({ title, items, moveItems }: KanbanProps) {
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
          <KanbanItemComponent key={i} {...item} />
        ))}
      </StyledKanban>
    </StyledDiv>
  );
}
