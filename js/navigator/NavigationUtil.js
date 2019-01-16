export default class NavigationUtil {
    
    
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

   
    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param navigation
     */
    static resetToHomPage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }

}