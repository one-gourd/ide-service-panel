import styled from 'styled-components';
// import { desaturate } from 'polished';
import { IBaseStyledProps } from 'ide-lib-base-component';

import { IListItemProps } from './index'

interface IStyledProps extends IListItemProps, IBaseStyledProps {}

export const StyledItemWrapper = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  border-radius: 3px;
`;



