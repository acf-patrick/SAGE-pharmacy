import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { styled } from "styled-components";
import { NotificationContext } from "../contexts";

const StyledContainer = styled.div`
  .notification-appears {
    opacity: 1;
    transform: translate(0);
  }
`;

const StyledToastDiv = styled.div<{ $color?: string }>`
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 500ms, transform 500ms;

  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
  cursor: pointer;

  .toast {
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
`;

export default function ToastNotification() {
  const container = document.querySelector("#notification");
  if (!container) {
    return null;
  }

  const notificationContext = useContext(NotificationContext);
  const { notificationMessage, setNotificationMessage } = notificationContext!;

  const innerRef = useRef<HTMLDivElement>(null);

  const close = () => {
    const inner = innerRef.current;
    if (inner) {
      setNotificationMessage("");
      setTimeout(() => {
        inner.style.display = "none";
      }, 1000);
    }
  };

  useEffect(() => {
    const inner = innerRef.current;
    if (inner) {
      if (notificationMessage) {
        inner.style.display = "block";
        setTimeout(() => {
          close();
        }, 2000);
      }

      // simulate asynchronous call... otherwise 'display: none' to 'display: block' will block the animation
      setTimeout(() => {
        inner.classList.toggle(
          "notification-appears",
          notificationMessage.length > 0
        );
      }, 0);
    }
  }, [notificationMessage]);

  return createPortal(
    <StyledContainer>
      <StyledToastDiv
        className="notification-appears"
        $color="green"
        onClick={close}
        ref={innerRef}>
        <div className="toast">
          <AiOutlineCloseCircle />
          <p>{notificationMessage}</p>
        </div>
      </StyledToastDiv>
    </StyledContainer>,
    container
  );
}
