import React, { useCallback, useState  } from 'react';
import { Menu, Icon, Select, Dropdown, Button } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import {
  StyledContainer, StyledFilterWrap,
  StyledSelect, StyledHeader,
  StyledInput, } from './styles';
import { ISubProps } from './subs';
import { debugInteract } from '../lib/debug';
import { IListItemGroup, IListItemProps, ListItem } from './mods/ListItem/index';

const Option = Select.Option;

export interface IServicePanelEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface IServicePanelStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IServicePanelTheme extends IBaseTheme {
  main: string;
}



export interface IServicePanelProps
  extends IServicePanelEvent,
  ISubProps,
  IBaseComponentProps {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 组件列表
   */
  listGroup?: IListItemGroup;
}

export const DEFAULT_PROPS: IServicePanelProps = {
  visible: true,
  theme: {
    bg: '#efefef'
  },
  listGroup:{},
  styles: {
    container: {},
    select:{
      width: 100
    },
    input: {
      width: 160
    }
  }
};


// 自定义 hooks，当 input 或者 select 更改之后，就更改筛选结果集
const useFilterResult = (
  category: string,
  inputValue: string,
  list: IListItemGroup
): IListItemGroup => {
  if (!list) return;
  // 筛选出来的列别范围
  let selectedCategories: IListItemGroup = {};
  if (!!category) {
    selectedCategories[category] = list[category];
  } else {
    selectedCategories = list;
  }

  debugInteract('[类别筛选] 通过 select 筛选后：%o', selectedCategories as any);

  // 开始处理 input
  if (!inputValue) {
    return selectedCategories;
  } else {
    // 获取每组的 keys
    const groupKeys = Object.keys(selectedCategories);
    // 构造结果集
    const searchList: IListItemGroup = {
      result: {
        title: '搜索结果',
        list: []
      }
    };

    const lowerCaseInput = (inputValue || '').toLowerCase();
    const regInput = new RegExp(lowerCaseInput);
    groupKeys.map((group: string) => {
      // 获取当前的 key
      const curGroup = selectedCategories[group];
      const { list: childrenList } = curGroup;
      {
        childrenList.map((item: IListItemProps) => {
          const lowerCaseDesc = (item.desc || '').toLowerCase();
          const lowerCaseName = (item.name || '').toLowerCase();

          if (
            (lowerCaseDesc && regInput.test(lowerCaseDesc.toLowerCase())) ||
            lowerCaseName && regInput.test(lowerCaseName)
          ) {
            searchList.result.list.push(item);
          }
        });
      }
    });
    debugInteract('[筛选] 通过 input 筛选后：%o', searchList as any);

    return searchList;
  }
};

export const ServicePanelCurrying: TComponentCurrying<
  IServicePanelProps,
  ISubProps
> = subComponents => props => {
  const { visible, cWidth = 300, styles, listGroup } = props;
  const [category, setCategory] = useState(''); // 通过类目筛选的
  const [inputValue, setInputValue] = useState(''); // 通过搜索获取的结果集

  // 点击切换类别筛选
  const onChangeCatagory = useCallback((value: string) => {
    setCategory(value);
  }, []);

  // 当用户搜索的时候，建议用 debounce 来提升效率
  const handleSearch = useCallback((ev: any) => {
    setInputValue(ev.target.value);
  }, []);

  const resultList = useFilterResult(category, inputValue, listGroup);
  const groupKeys = Object.keys(resultList || {}); // 筛选后的 key
  const allGroupKeys = Object.keys(listGroup || {}); // 所有的 key


  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Icon type="build" />
        变量
    </Menu.Item>
      <Menu.Item key="2">
        <Icon type="api" />
        远程接口
    </Menu.Item>
      <Menu.Item key="3">
        <Icon type="gateway" />
        网关
    </Menu.Item>
    </Menu>
  );

  return (
    <StyledContainer
      style={styles.container}
      visible={visible}
      width={cWidth}
      // ref={this.root}
      className="ide-service-panel-container"
    >
      <StyledHeader>
        <h4>数据源</h4>
      </StyledHeader>
      <StyledFilterWrap style={styles.filterWrap}>
        <StyledSelect
          style={styles.select}
          className="list-select"
          defaultValue=""
          onChange={onChangeCatagory}
        >
          <Option value="">全部</Option>
          {allGroupKeys.map((cat: string) => {
            const curGroup = listGroup[cat];
            return (
              <Option key={cat} value={cat}>
                {curGroup.title}
              </Option>
            );
          })}
        </StyledSelect>
        <StyledInput
          className="list-input"
          style={styles.input}
          placeholder="搜索"
          onChange={handleSearch}
        />
      </StyledFilterWrap>

      <Dropdown overlay={menu}>
        <Button>
          添 加 <Icon type="plus" />
        </Button>
      </Dropdown>

      <ListItem/>
      
    </StyledContainer>
  );
};
