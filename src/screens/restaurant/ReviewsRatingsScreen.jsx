import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { mockReviews } from '../../data/mockNotifications';
export const ReviewsRatingsScreen = () => {
    const { goBack } = useAppNavigation();
    return (<View style={styles.container}>
      <AppHeader title="Reviews & ratings" onBack={goBack}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>4.7 AVERAGE · 328 REVIEWS</Text>

        {/* Hero Rating Card */}
        <AppCard style={styles.ratingHero}>
          <Text style={styles.bigScore}>4.7</Text>
          <View style={styles.ratingStarsBox}>
            <Text style={styles.starsText}>★★★★★</Text>
            <Text style={styles.ratingSub}>Excellent service</Text>
          </View>
        </AppCard>

        <Text style={[styles.eyebrow, { marginTop: 18 }]}>RECENT CUSTOMER FEEDBACK</Text>

        <View style={styles.reviewList}>
          {mockReviews.map((rev) => (<AppCard key={rev.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.author}>{rev.author}</Text>
                <Text style={styles.stars}>{`★`.repeat(rev.rating)}</Text>
                <Text style={styles.timeAgo}>{rev.timeAgo}</Text>
              </View>
              <Text style={styles.comment}>“{rev.comment}”</Text>
            </AppCard>))}
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
    eyebrow: {
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 1.4,
        color: colors.terracotta,
        marginBottom: 12,
    },
    ratingHero: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        padding: 18,
        marginBottom: 10,
    },
    bigScore: {
        fontSize: 38,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    ratingStarsBox: {
        justifyContent: 'center',
    },
    starsText: {
        fontSize: 14,
        letterSpacing: 2,
        color: colors.terracotta,
    },
    ratingSub: {
        fontSize: 10,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        marginTop: 4,
    },
    reviewList: {
        gap: 10,
    },
    reviewCard: {
        padding: 14,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    author: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    stars: {
        fontSize: 11,
        color: colors.terracotta,
        letterSpacing: 1,
    },
    timeAgo: {
        fontSize: 9,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.warmGrey,
        marginLeft: 'auto',
    },
    comment: {
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        lineHeight: 16,
    },
});
