import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { AppHeader } from '../../components/common/AppHeader';
import { AppButton } from '../../components/common/AppButton';
import { AppCard } from '../../components/common/AppCard';
import { AppIcon } from '../../components/common/AppIcon';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { mockPickingItems } from '../../data/mockProducts';
export const OrderPickingScreen = () => {
    const { navigate, goBack } = useAppNavigation();
    const [items, setItems] = useState(mockPickingItems);
    const togglePicked = (id) => {
        setItems((prev) => prev.map((item) => item.id === id ? { ...item, isPicked: !item.isPicked } : item));
    };
    const pickedCount = items.filter((i) => i.isPicked).length;
    const progressPercent = Math.round((pickedCount / items.length) * 100);
    return (<View style={styles.container}>
      <AppHeader title="Pick order #RR-2912" onBack={goBack}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar Card */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.pickedText}>
              {pickedCount} of {items.length} picked
            </Text>
            <Text style={styles.expectText}>Customer expects by 2:20 PM</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]}/>
          </View>
        </View>

        {/* Picking Item List */}
        <View style={styles.pickingList}>
          {items.map((item, idx) => (<AppCard key={item.id} style={[styles.pickCard, item.isPicked && styles.pickedCard]}>
              <TouchableOpacity onPress={() => togglePicked(item.id)} style={[styles.checkbox, item.isPicked && styles.checkboxActive]}>
                {item.isPicked && (<AppIcon name="check" size={14} color={colors.white} strokeWidth={2.8}/>)}
              </TouchableOpacity>

              <View style={[
                styles.miniProduct,
                idx % 2 === 1 ? styles.imgTintTerra : styles.imgTintDark,
            ]}>
                <AppIcon name="catalog" size={18} color={colors.charcoal}/>
              </View>

              <View style={styles.itemInfo}>
                <Text style={[
                styles.itemName,
                item.isPicked && styles.itemNameStrikethrough,
            ]}>
                  {item.name}
                </Text>
                <Text style={styles.itemLocation}>
                  {item.aisle} · {item.shelf}
                </Text>
              </View>
            </AppCard>))}
        </View>

        {/* Substitution Action Card */}
        <TouchableOpacity activeOpacity={0.8} style={styles.subCardWrapper}>
          <AppCard style={styles.subCard}>
            <View style={styles.subIconBox}>
              <AppIcon name="close" size={16} color={colors.terracotta}/>
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subTitle}>Item unavailable?</Text>
              <Text style={styles.subDesc}>
                Suggest a substitute or mark out of stock
              </Text>
            </View>
            <AppIcon name="chevron" size={17} color={colors.charcoal}/>
          </AppCard>
        </TouchableOpacity>

        {/* Complete Action Button */}
        <View style={styles.stickyActions}>
          <AppButton onPress={() => navigate('grocery-home')}>
            Complete picking
          </AppButton>
        </View>
      </ScrollView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F6',
    },
    scrollContent: {
        padding: 18,
        paddingBottom: 28,
    },
    progressSection: {
        marginBottom: 18,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    pickedText: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    expectText: {
        fontSize: 9.5,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
    },
    progressBarTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(156, 154, 154, 0.25)',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.terracotta,
        borderRadius: 3,
    },
    pickingList: {
        gap: 10,
        marginBottom: 16,
    },
    pickCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 10,
    },
    pickedCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: colors.warmGrey,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    checkboxActive: {
        backgroundColor: colors.terracotta,
        borderColor: colors.terracotta,
    },
    miniProduct: {
        width: 38,
        height: 38,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgTintTerra: {
        backgroundColor: 'rgba(163, 94, 71, 0.12)',
    },
    imgTintDark: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 11.5,
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    itemNameStrikethrough: {
        textDecorationLine: 'line-through',
        color: colors.warmGrey,
    },
    itemLocation: {
        fontSize: 9.5,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        marginTop: 2,
    },
    moreBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subCardWrapper: {
        marginBottom: 20,
    },
    subCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
    },
    subIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(163, 94, 71, 0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subInfo: {
        flex: 1,
    },
    subTitle: {
        fontSize: 11.5,
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    subDesc: {
        fontSize: 9.5,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        marginTop: 2,
    },
    stickyActions: {
        marginTop: 4,
    },
});
