import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';
export const AppLogo = ({ compact = false, scale = 1 }) => {
    return (<View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.logoMark}>
        <Svg width={27} height={27} viewBox="0 0 42 42">
          <Path d="M9 30V12h13c7 0 11 3.3 11 9s-4 9-11 9H9Z" fill={colors.white}/>
          <Path d="M18 18h5c2.3 0 3.5 1 3.5 3s-1.2 3-3.5 3h-5v-6Z" fill={colors.white}/>
        </Svg>
      </View>
      {!compact && (<View style={styles.textContainer}>
          <Text style={styles.brandTitle}>RoadRider</Text>
          <Text style={styles.brandSubtitle}>VENDOR</Text>
        </View>)}
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoMark: {
        width: 34,
        height: 34,
        borderRadius: 10,
        borderBottomLeftRadius: 3,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    brandTitle: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: 16,
        fontWeight: '700',
        color: colors.black,
        letterSpacing: -0.3,
        lineHeight: 18,
    },
    brandSubtitle: {
        fontSize: 7.5,
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 2.2,
        color: colors.terracotta,
        fontWeight: '700',
        marginTop: 2,
    },
});
