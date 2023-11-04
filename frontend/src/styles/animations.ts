import { keyframes } from "styled-components";

export const appear = keyframes`
from {
    transform: translateY(-1rem);
    opacity: 0;
} to {
    transform: translateY(0);
    opacity: 1;
}
`;
