import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { keyframes, styled } from "styled-components";

const toastAppear = keyframes`
from {
    opacity: 0;
    transform: translateY(1rem);
} to {
    opacity: 1;
    transform: translateY(0);
}
`;

const toastDisappear = keyframes`
from {
  opacity: 1;
  transform: translateY(0);
} to {
  opacity: 0;
  transform: translateY(1rem);
}
`;

const StyledToastDiv = styled.div<{ $color?: string }>`
  @keyframes toast-disappear {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(1rem);
    }
  }

  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 500px;
  height: 500px;
  cursor: pointer;
  animation: ${toastAppear} forwards 500ms,
    ${toastDisappear} 500ms 2000ms forwards;

  .toast-background {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .toast {
      margin: 1rem;
      width: 350px;
      height: 100px;
      background-color: ${({ $color }) => ($color ? $color : "grey")};
      border-radius: 5px;
      display: flex;
      align-items: center;
      position: relative;

      p {
        color: white;
        margin-left: 1rem;
        font-weight: 600;
        font-size: 1.25rem;
      }

      svg {
        cursor: pointer;
        font-size: 1.25rem;
        fill: white;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }
    }
  }
`;

const ToastNotification = ({
  onRender,
  content,
  onClose,
}: {
  onRender: boolean;
  content: string;
  onClose: () => void;
}) => {
  //   useEffect(() => {
  //     if (onRender)
  //       setTimeout(() => {
  //         onClose();
  //       }, 4500);
  //   }, []);

  return onRender
    ? createPortal(
        <StyledToastDiv $color="green">
          <div className="toast-background" onClick={onClose}>
            <div className="toast">
              <AiOutlineCloseCircle onClick={onClose} />
              <p>{content}</p>
            </div>
          </div>
        </StyledToastDiv>,
        document.querySelector("#notification") as HTMLDivElement
      )
    : null;
};

export default ToastNotification;
