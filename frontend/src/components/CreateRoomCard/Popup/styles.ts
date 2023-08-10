import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
`;

export const Wrapper = styled.div`
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.base.mainColor};

  position: relative;
  z-index: 2;
`;

export const Title = styled.h1`
  font-size: 20px;
  color: white;
  margin-bottom: 2rem;
  text-align: left;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 10px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  color: white;
  width: 35%;
`;

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 8px;

  flex: 1;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: black;
  border-radius: 5px;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;

  color: white;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;
