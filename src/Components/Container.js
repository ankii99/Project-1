import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Path} from '../Config/Path';

const Container = (props) => {

  return (
    <ImageBackground style={styles.bg} source={Path.background}>
<SafeAreaView style={styles.bg}>{ props.children}</SafeAreaView>
    </ImageBackground>
  );
};

export default Container;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
