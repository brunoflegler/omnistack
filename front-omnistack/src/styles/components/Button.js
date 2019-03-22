import styled, { css } from 'styled-components';
import { colors, metrics } from '..';

const sizes = {
  small: css`
    height: 28px;
    font-size: 12px;
  `,

  default: css`
    height: 36px;
    font-size: 14px;
  `,

  big: css`
    height: 44px;
    font-size: 18px;
  `,
};

const color = {
  default: css`
    background: #7289da;
    &:hover {
      background: #5f73bc;
    }
  `,

  danger: css`
    background: #e04848;
    &:hover {
      background: #a43d3d;
    }
  `,

  gray: css`
    background: #b9bbbe;
    color: #666;

    &:hover {
      background: #999;
    }
  `,
};

const Button = styled.button.attrs({
  type: 'button',
})`
  border-radius: ${metrics.baseRadius}px;
  transition: background-color 0.15s ease;
  background: ${colors.button};
  border: 0;
  color: ${colors.white};
  font-size: 12px;
  padding: 0 10px;
  text-transform: uppercase;
  font-weight: 700;

  ${props => sizes[props.size || 'default']}
  ${props => color[props.color || 'default']}

  ${props => props.filled === false
    && css`
      background: none;

      &:hover {
        background: none;
        opacity: 0.6;
      }
    `}

`;

export default Button;
