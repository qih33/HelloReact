import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, Text, View, RefreshControl, ActivityIndicator} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {
  createMaterialTopTabNavigator, createAppContainer
} from "react-navigation";
import {connect} from 'react-redux';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavgationBar';
import actions from '../action/index';
import Toast from 'react-native-easy-toast';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';


type Props = {};
export default class PopularPage extends Component<Props> {
      constructor(props){
        super(props);
        this.tabNames = ['java', 'Android', 'IOS', 'react', 'react-native', 'php'];
    }

    _genTabs(){
      const tabs={};
      this.tabNames.forEach((item, index)=>{
        tabs[`tab${index}`] = {
            screen: props => <PopularTabPage {...props} tabLabel={item}/>,
            navigationOptions:{
              title: item
          } 
        }
      });
      return tabs;
    }

    render() {
    let statusBar = {
        backgroundColor: THEME_COLOR,
        barStyle: 'light-content',
    };

    let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
        // rightButton={this.renderRightButton()}
    />;
      const TabNavigator = createAppContainer(
        createMaterialTopTabNavigator(
            this._genTabs(), {
              tabBarOptions: {
                tabStyles: styles.tabStyles,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                  backgroundColor: '#678',
                  height: 30
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,//文字的样式
           }
        }
     )
  );
      return (
        <View style={{flex: 1, marginTop:30}}>
              <TabNavigator/>
        </View>
  );
            
    }
}

const pageSize = 10;
class PopularTab extends Component<Props> {
    constructor(props) {
      super(props);
      const {tabLabel} = this.props;
      this.storeName = tabLabel; 
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
      const {onLoadMorePopular, onRefreshPopular} = this.props;
      const store=this._store();
      const url=this.genFetchUrl(this.storeName);
      if (loadMore) {
        onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了');
        })
    } else {
        onRefreshPopular(this.storeName, url, pageSize)
      }
    }

     _store() {
      const {popular} = this.props;
      let store = popular[this.storeName];
      if (!store) {
          store = {
              items: [],
              isLoading: false,
              projectModels: [],//要显示的数据
              hideLoadingMore: true,//默认隐藏加载更多
          }
      }
      return store;
  }

    genFetchUrl(key) {
      return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
        item={item}
        onSelect={()=> {
            NavigationUtil.goPage({
              projectModel: item
            }, 'DetailPage')
        }}
        />
    }

    genIndicator(){
      return this._store().hideLoadingMore? null:
      <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.indicator}
          />
          <Text>正在加载更多</Text>
      </View>
  }

    render() {
    NavigationUtil.navigation = this.props.navigation;
    const {popular} = this.props;
    let store=this._store();
    return (
      <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={data=>this.renderItem(data)}
                keyExtractor={item=>""+item.id}
                refreshControl={
                  <RefreshControl
                    title={'正在加载更多'}
                    titleColor={THEME_COLOR}
                    colors={THEME_COLOR}
                    refreshing={store.isLoading}
                    onRefresh={()=>this.loadData()}
                    tintColor={THEME_COLOR}
                    />
                }
                ListFooterComponent={()=> this.genIndicator()}
                onEndReached={() => {
                  console.log('---------');
                  setTimeout(()=>{
                    if (this.canLoadMore) {
                      this.loadData(true);
                      this.canLoadMore=false;
                    }
                  }, 1000); 
              }}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={() => {
                this.canLoadMore = true;
                console.log('---onMomentumScrollBegin-----')
              }}
            />
            <Toast ref={'toast'}
              position={'center'}
          />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  popular: state.popular
});

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
});

const PopularTabPage=connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
    // // justifyContent: 'center',
    // // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  
  tabStyles: {
      minWidth: 50,
      marginBottom: 10,
    },

  indicatorStyle: {
      height: 2,
      backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  },

  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }

});