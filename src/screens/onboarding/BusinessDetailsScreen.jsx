import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { AppIcon } from '../../components/common/AppIcon';
import { useResponsive } from '../../theme/useResponsive';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useOnboarding } from '../../context/OnboardingContext';

export const BusinessDetailsScreen = () => {
  const { navigate, goBack } = useAppNavigation();
  const { businessDetails, setBusinessDetails } = useOnboarding();
  const { isMobile } = useResponsive();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!businessDetails.ownerName?.trim() || businessDetails.ownerName.trim().length < 2) {
      errs.ownerName = 'Owner name is required (min 2 characters).';
    }
    if (!businessDetails.businessName?.trim() || businessDetails.businessName.trim().length < 2) {
      errs.businessName = 'Business/Store name is required.';
    }
    if (!businessDetails.businessType?.trim()) {
      errs.businessType = 'Primary business category is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessDetails.email?.trim() || !emailRegex.test(businessDetails.email.trim())) {
      errs.email = 'Please enter a valid official business email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAndContinue = () => {
    if (validate()) {
      navigate('tax');
    }
  };

  return (
    <View style={styles.container}>
      {isMobile && <AppHeader title="Business Details" onBack={goBack} />}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isMobile && styles.scrollContentDesktop,
        ]}
      >
        <Text style={styles.eyebrow}>SET UP YOUR STORE</Text>
        <Text style={styles.title}>Tell us about your business</Text>
        <Text style={styles.subtitle}>
          These details will appear on your merchant profile, customer invoices, and regulatory filings.
        </Text>

        <View style={styles.formStack}>
          <View style={[styles.inputRow, !isMobile && styles.inputRowDesktop]}>
            <View style={styles.inputCol}>
              <AppInput
                label="Owner / Authorized Signatory Name *"
                value={businessDetails.ownerName}
                onChangeText={(txt) => {
                  setBusinessDetails((prev) => ({ ...prev, ownerName: txt }));
                  if (errors.ownerName) setErrors((p) => ({ ...p, ownerName: '' }));
                }}
                placeholder="e.g. Ramesh Kumar"
                error={errors.ownerName}
              />
            </View>
            <View style={styles.inputCol}>
              <AppInput
                label="Registered Business / Store Name *"
                value={businessDetails.businessName}
                onChangeText={(txt) => {
                  setBusinessDetails((prev) => ({ ...prev, businessName: txt }));
                  if (errors.businessName) setErrors((p) => ({ ...p, businessName: '' }));
                }}
                placeholder="e.g. The Copper Kitchen"
                error={errors.businessName}
              />
            </View>
          </View>

          <View style={[styles.inputRow, !isMobile && styles.inputRowDesktop]}>
            <View style={styles.inputCol}>
              <AppInput
                label="Primary Business Category *"
                value={businessDetails.businessType}
                onChangeText={(txt) => {
                  setBusinessDetails((prev) => ({ ...prev, businessType: txt }));
                  if (errors.businessType) setErrors((p) => ({ ...p, businessType: '' }));
                }}
                placeholder="Restaurant / Fresh Grocer"
                error={errors.businessType}
              />
            </View>
            <View style={styles.inputCol}>
              <AppInput
                label="Official Business Email *"
                value={businessDetails.email}
                onChangeText={(txt) => {
                  setBusinessDetails((prev) => ({ ...prev, email: txt }));
                  if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                }}
                placeholder="e.g. merchant@yourstore.in"
                keyboardType="email-address"
                error={errors.email}
              />
            </View>
          </View>
        </View>

        <AppButton onPress={handleSaveAndContinue} style={styles.button}>
          Save & Continue to Tax & Banking
        </AppButton>

        <View style={styles.secureNote}>
          <AppIcon name="check" size={14} color={colors.charcoal} strokeWidth={2.5} />
          <Text style={styles.secureText}>
            Your business details are encrypted and securely validated with official registrar databases.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  scrollContentDesktop: {
    padding: 36,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 1.4,
    color: colors.terracotta,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    lineHeight: 18,
    marginBottom: 24,
  },
  formStack: {
    gap: 16,
    marginBottom: 28,
  },
  inputRow: {
    flexDirection: 'column',
    gap: 16,
  },
  inputRowDesktop: {
    flexDirection: 'row',
    gap: 20,
  },
  inputCol: {
    flex: 1,
  },
  button: {
    minHeight: 48,
    marginBottom: 16,
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceSubtle,
    padding: 12,
    borderRadius: 8,
  },
  secureText: {
    fontSize: 11,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    flex: 1,
    lineHeight: 15,
  },
});
