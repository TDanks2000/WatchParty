import { styled } from "styled-components";

export const Container = styled.a`
  width: 100px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  text-decoration: none;

  transition: all 0.2s ease-in-out;

  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
    transform: scale(1.05);
    transform: rotate(-2deg);
  }
`;
