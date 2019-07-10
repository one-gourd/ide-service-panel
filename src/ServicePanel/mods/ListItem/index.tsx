import React, { useCallback, useState  } from 'react';
import { Collapse, Icon, Button, Row, Col, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Text } = Typography;

export interface IListItemProps {
    /**
     * 名称
     */
    name: string;

    /**
     * 类型描述
     */
    type: string;

    /**
     * 描述
     */
    desc?: string;





    [prop: string]: any;
}

export interface IListItemGroup {
    [prop: string]: {
        title: string;
        list: IListItemProps[];
    };
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginTop: 6,
  marginBottom: 6,
  border: 0,
  overflow: 'hidden',
};

const onClickBtn = (event: React.MouseEvent<HTMLElement>)=>{

    // 需要阻止冒泡，不然会触发 toggle
    event && event.stopPropagation();
}

const HeaderNode = (props: any) =>{
    return <Row>
      <Col span={16}>
            <Text code>远程</Text>
            <span>dp1</span>
    </Col>
      <Col span={8}>
        <ButtonGroup>
            <Button onClick={onClickBtn} size="small" type="primary" icon="edit" />
            <Button onClick={onClickBtn}  size="small"  type="primary" icon="delete" />
        </ButtonGroup>
      </Col>
    </Row>
}

export const ListItem: React.FunctionComponent<IListItemProps> = observer(
    props=>{
        const {name, type, desc} = props;

        return <Collapse
                style={{backgroundColor: 'transparent'}}
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel header={<HeaderNode/>} key="1" style={customPanelStyle}>
                <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
                <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
                <p>{text}</p>
                </Panel>
            </Collapse>
    }
);



