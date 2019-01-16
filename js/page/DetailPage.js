import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavgationBar';
import ViewUtil from '../util/ViewUtil';
const TRENDING_URL = 'https://github.com/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {};
const THEME_COLOR = '#678';

export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const {projectModel} = this.params;
    // this.favoriteDao = new FavoriteDao(flag);
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    const title = projectModel.full_name|| projectModel.fullName;
    this.state = {
        title: title,
        url: this.url,
        canGoBack: false,
        // isFavorite:projectModel.isFavorite
    };
    // this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
}

onBack(){
  if (this.state.canGoBack) {
    this.webView.goBack();
  } else {
    NavigationUtil.goBack(this.props.navigation);
  }
}

renderRightButton(){
  return (<View style={{flexDirection: 'row'}}>
      <TouchableOpacity
          onPress={() => {

          }}>
          <FontAwesome
              name={ 'star-o'}
              size={20}
              style={{color: 'white', marginRight: 10}}
          />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {
          // let shareApp = share.share_app;
          // ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
          //     console.log("result:" + code + message);
          // });
      })}
    </View>
  )
}

onNavigationStateChange(navState){
  this.setState({
    canGoBack: navState.canGoBack,
    url: navState.url,
  })
}

  render() {
    let navigationBar = <NavigationBar
            
            leftButton={ViewUtil.getLeftBackButton(()=> this.onBack())}
            title={this.state.title}
            // titleLayoutStyle={titleLayoutStyle}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={this.renderRightButton()}
        />;
    return (
      <View style={styles.container}>
            {navigationBar}
            <WebView
            ref={webView => this.webView = webView}
            startInLoadingState={true}
            onNavigationStateChange={e => this.onNavigationStateChange(e)}
            source={{uri: this.state.url}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});