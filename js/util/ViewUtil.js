import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {

    static getLeftBackButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callBack}>
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}/>
        </TouchableOpacity>
    }

    /**
     * 获取分享按钮
     * @param callBack
     * @returns {XML}
     */
    static getShareButton(callBack) {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callBack}
        >
            <Ionicons
                name={'md-share'}
                size={20}
                style={{opacity: 0.9, marginRight: 10, color: 'white'}}/>
        </TouchableOpacity>
    }

}
