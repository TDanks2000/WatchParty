import styled from "styled-components";
import { IoEnterSharp } from "react-icons/io5";

export const SetUsernameContainer = styled.form`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.base.navBg};
  padding: 0 1.3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 0.5rem;
`;

export const SetUsername = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
`;

export const SetUsernameButtonContainer = styled.button`
  padding-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  color: ${({ theme }) => theme.text.secondary};
  &:hover {
    color: ${({ theme }) => theme.base.mainColor};
  }
`;

export const SetUsernameButtonIcon = styled(IoEnterSharp)`
  color: inherit;
  font-size: 1.5rem;
`;

export const SetUsernameError = styled.p`
  width: 100%;
  height: 1.5rem;
  color: ${({ theme }) => theme.text.danger};
  font-weight: 500;
  font-size: 0.8rem;
  margin: 1rem 0.8rem;
  text-transform: uppercase;
`;
