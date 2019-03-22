import styled from 'styled-components';
import { colors, metrics } from '../../styles';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: ${colors.form};
  border-radius: ${metrics.baseRadius + 3}px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: ${metrics.basePadding * 2}px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h1 {
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 10px;
  }

  span {
    color: ${colors.regular};
    font-size: 14px;
    line-height: 16px;
    margin-top: ${metrics.baseMargin}px;
  }

  input {
    height: 40px;
    padding: ${metrics.basePadding}px;
    border-radius: ${metrics.baseRadius}px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    color: ${colors.lighter};
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;

    &:focus {
      border-color: ${colors.button};
    }
  }

  button {
    margin: 20px 0 0;
  }
`;
