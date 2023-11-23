import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { api } from "../../../api";

type Props = {
  receiptIds: string[];
  onClose: () => void;
};

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000045;
  z-index: 2;

  button {
    all: unset;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    border-radius: 3rem;
    background: transparent;
    transition: background 300ms;

    * {
      fill: #3a3a3a;
    }

    &:hover {
      background: #ffffff83;
    }
  }
`;

const StyledContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  max-width: 480px;
  background: white;
  transform: translate(-50%, -50%);
`;

export default function ReceiptsCaroussel({ onClose, receiptIds: ids }: Props) {
	const container = document.querySelector("#portal");
  if (!container) {
    return null;
  }

  return createPortal(
    <>
      <StyledBackground>
        <button onClick={onClose}>
          <IoClose />
        </button>
      </StyledBackground>
      <StyledContainer>
        <Swiper modules={[Navigation, Pagination]} slidesPerView={1}>
          <SwiperSlide>0</SwiperSlide>
          <SwiperSlide>0</SwiperSlide>
          <SwiperSlide>0</SwiperSlide>
          <SwiperSlide>0</SwiperSlide>
        </Swiper>
      </StyledContainer>
    </>,
    container
  );
}
