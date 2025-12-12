import { css } from "styled-components";

const flexRow = () => css`
  display: flex;
  flex-direction: row;
`;

const flexRowCenter = () => css`
  ${flexRow()};
  align-items: center;
  justify-content: center;
`;

const flexRowAlignCenter = () => css`
  ${flexRow()};
  align-items: center;
`;

const flexRowJustifyCenter = () => css`
  ${flexRow()};
  justify-content: center;
`;

const flexRowJustifyStart = () => css`
  ${flexRow()};
  justify-content: flex-start;
`;

const flexRowJustifyEnd = () => css`
  ${flexRow()};
  justify-content: flex-end;
`;

const flexRowJustifyBetween = () => css`
  ${flexRow()};
  justify-content: space-between;
`;

const flexRowJustifyAround = () => css`
  ${flexRow()};
  justify-content: space-around;
`;

const flexColumn = () => css`
  display: flex;
  flex-direction: column;
`;

const flexColumnCenter = () => css`
  ${flexColumn()}
  align-items: center;
  justify-content: center;
`;

const flexColumnJustifyBetween = () => css`
  ${flexColumn()};
  justify-content: space-between;
`;

const flexColumnJustifyStart = () => css`
  ${flexColumn()};
  justify-content: flex-start;
`;

const flexColumnJustifyAround = () => css`
  ${flexColumn()};
  justify-content: space-around;
`;

export {
  flexRow,
  flexRowCenter,
  flexRowAlignCenter,
  flexRowJustifyCenter,
  flexRowJustifyStart,
  flexRowJustifyEnd,
  flexRowJustifyBetween,
  flexRowJustifyAround,
  flexColumn,
  flexColumnCenter,
  flexColumnJustifyBetween,
  flexColumnJustifyStart,
  flexColumnJustifyAround,
};
