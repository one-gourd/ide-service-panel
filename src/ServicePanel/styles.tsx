import styled from 'styled-components';
// import { desaturate } from 'polished';
import { Select, Input } from 'antd';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IServicePanelProps } from './index';

interface IStyledProps extends IServicePanelProps, IBaseStyledProps {}

export const StyledContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  border-radius: 5px;
  background: ${(props: IStyledProps) => props.theme.bg};
  width: ${(props: IStyledProps) => (props.width ? props.width + 'px' : 'auto')};
  padding: 10px;

  .list-select{
    margin-right: 10px;
  }
`;


export const StyledFilterWrap = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
}) <IStyledProps>`
  margin-bottom: 10px;
`;


export const StyledHeader = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
}) <IStyledProps>`
  width: 100%;
  height: 36px;
  
  font-size: 14px;
  backgroundColor: rgba(31, 56, 88, 0.04);

  h4{
    color: #333;
  }
`;


export const StyledSelect = styled(Select).attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
}) <IStyledProps>`
`;

export const StyledInput = styled(Input).attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
}) <IStyledProps>`
`;

