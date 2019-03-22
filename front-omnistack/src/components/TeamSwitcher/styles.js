import styled from 'styled-components';
import { colors, metrics } from '../../styles';

export const Container = styled.aside`
  background: ${colors.primary};
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Team = styled.button`
  border: 0;
  background: ${colors.transparent};
  margin: 0 0 8px;

  img {
    transition: all 0.2s;
    border-radius: ${metrics.baseRadius * 25}%;
    width: 50px;
    height: 50px;

    &:hover {
      border-radius: ${metrics.baseRadius * 15}%;
    }
  }
`;

export const NewTeam = styled.button`
  width: 50px;
  height: 50px;
  border-radius: ${metrics.baseRadius * 25}px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 8px;
  background: ${colors.transparent};
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border: 1px dashed rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Logout = styled.button`
  width: 50px;
  height: 50px;
  border-radius: ${metrics.baseRadius * 25}px;
  border: 1px dashed #e04848;
  background: ${colors.transparent};
  color: #e04848;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: #a43d3d;
    color: #a43d3d;
  }
`;
