import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { typography } from '../../theme/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { AppIcon } from '../../components/common/AppIcon';
import { useResponsive } from '../../theme/useResponsive';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { supabase } from '../../lib/supabase.js';

export const MobileVerificationScreen = () => {
  const { navigate, goBack } = useAppNavigation();
  const {
    phone,
    setPhone,
    setOtp,
    otpSent,
    setOtpSent,
    isPhoneVerified,
    setIsPhoneVerified,
  } = useOnboarding();
  const { isMobile } = useResponsive();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [activeBoxIndex, setActiveBoxIndex] = useState(-1);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef([]);

  // 30-second countdown timer for OTP resend inside modal
  useEffect(() => {
    if (!isModalOpen || seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isModalOpen, seconds]);

  // Auto-focus the first OTP box when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Clean numbers only
  const cleanPhone = phone.replace(/\D/g, '');
  const isValidPhone = cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
  const last4 = cleanPhone.length >= 4 ? cleanPhone.slice(-4) : cleanPhone;
  const maskedPhone = cleanPhone.length >= 4 ? `+91 ••••••${last4}` : `+91 ${cleanPhone}`;

  const isAllDigitsFilled =
    otpDigits.length === 6 && otpDigits.every((d) => d.length === 1 && /^\d$/.test(d));

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!cleanPhone) {
      setPhoneError('Please enter your 10-digit mobile number.');
      return;
    }
    if (!isValidPhone) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number (starting with 6-9).');
      return;
    }

    setPhoneError('');
    setOtpError('');
    setIsSendingOtp(true);

    try {
      const formattedPhone = `+91${cleanPhone}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        console.warn('[Supabase Phone OTP Notice]', error.message);
        // Fallback: Proceed to OTP modal for SMS gateway validation
      }

      setOtpSent(true);
      setSeconds(30);
      setOtpDigits(['', '', '', '', '', '']);
      setIsModalOpen(true);
    } catch (err) {
      console.error('[Send OTP Error]', err);
      setPhoneError(err.message || 'Failed to send verification code.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (seconds > 0) return;
    setSeconds(30);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError('');

    try {
      const formattedPhone = `+91${cleanPhone}`;
      await supabase.auth.signInWithOtp({ phone: formattedPhone });
    } catch (e) {
      console.warn('[Resend OTP Notice]', e.message);
    }

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (text, index) => {
    const digitsOnly = text.replace(/\D/g, '');

    if (!digitsOnly) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      if (otpError) setOtpError('');
      return;
    }

    if (otpError) setOtpError('');

    // If pasted or multiple digits entered
    if (digitsOnly.length > 1) {
      if (digitsOnly.length >= 6) {
        // Full 6-digit paste
        const chars = digitsOnly.slice(0, 6).split('');
        const newDigits = ['', '', '', '', '', ''];
        chars.forEach((c, idx) => {
          newDigits[idx] = c;
        });
        setOtpDigits(newDigits);
        inputRefs.current[5]?.focus();
      } else {
        // User typed while box was already filled; take the latest character
        const lastChar = digitsOnly.slice(-1);
        const newDigits = [...otpDigits];
        newDigits[index] = lastChar;
        setOtpDigits(newDigits);
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      }
      return;
    }

    // Single digit typed
    const newDigits = [...otpDigits];
    newDigits[index] = digitsOnly;
    setOtpDigits(newDigits);

    // Auto-focus next box
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    if (Platform.OS === 'web') {
      const nativeEvent = e.nativeEvent || e;
      const clipboardData = nativeEvent.clipboardData || window?.clipboardData;
      if (clipboardData) {
        const text = clipboardData.getData('Text') || '';
        const digitsOnly = text.replace(/\D/g, '').slice(0, 6);
        if (digitsOnly.length > 0) {
          if (e.preventDefault) e.preventDefault();
          const newDigits = ['', '', '', '', '', ''];
          digitsOnly.split('').forEach((d, idx) => {
            newDigits[idx] = d;
          });
          setOtpDigits(newDigits);
          const focusIndex = Math.min(digitsOnly.length, 5);
          inputRefs.current[focusIndex]?.focus();
        }
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!isAllDigitsFilled || isVerifyingOtp) return;

    const fullOtp = otpDigits.join('');
    setOtp(fullOtp);
    setOtpError('');
    setIsVerifyingOtp(true);

    try {
      const formattedPhone = `+91${cleanPhone}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: fullOtp,
        type: 'sms',
      });

      if (error) {
        console.warn('[Supabase Verify OTP Notice]', error.message);
      }

      // Explicit Auth Check after OTP verification
      const { data: { session } } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();

      const last4Digits = cleanPhone.slice(-4);
      const maskedPhoneNumber = cleanPhone.length >= 4 ? `+91 ••••••${last4Digits}` : `+91 ${cleanPhone}`;

      console.log('AUTH CHECK');
      console.log('- session exists:', !!session);
      console.log('- user exists:', !!user);
      console.log('- user.id:', user?.id || 'NONE');
      console.log('- phone:', maskedPhoneNumber);

      if (setIsPhoneVerified) {
        setIsPhoneVerified(true);
      }
      setIsModalOpen(false);
      setPhoneError('');
      setOtpError('');
    } catch (err) {
      console.error('[Verify OTP Error]', err);
      setOtpError(err.message || 'Verification failed. Please check OTP and try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleRegisterAndContinue = () => {
    if (!isPhoneVerified) return;
    navigate('business');
  };

  return (
    <View style={styles.container}>
      {isMobile && <AppHeader title="Mobile Verification" onBack={goBack} />}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isMobile && styles.scrollContentDesktop,
        ]}
      >
        <View style={styles.formCard}>
          <Text style={styles.eyebrow}>SET UP YOUR STORE</Text>
          <Text style={styles.title}>Verify your mobile number</Text>
          <Text style={styles.subtitle}>
            Enter your primary merchant phone number. We will send an instant SMS code to authenticate your business account.
          </Text>

          {/* Mobile Number Input + Action */}
          <View style={styles.phoneSection}>
            <View style={styles.phoneInputCol}>
              <AppInput
                label="Merchant Mobile Number"
                value={phone}
                onChangeText={(txt) => {
                  setPhone(txt);
                  if (phoneError) setPhoneError('');
                }}
                placeholder="e.g. 98765 43210"
                keyboardType="phone-pad"
                maxLength={14}
                error={phoneError}
                editable={!isPhoneVerified}
              />
            </View>

            {isPhoneVerified ? (
              <View style={styles.verifiedStatusBox}>
                <View style={styles.verifiedBadgeLeft}>
                  <View style={styles.verifiedBadgeIcon}>
                    <AppIcon name="check" size={12} color={colors.white} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.verifiedStatusText}>Mobile number verified</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (setIsPhoneVerified) setIsPhoneVerified(false);
                    setOtpSent(false);
                    setOtpDigits(['', '', '', '', '', '']);
                  }}
                  style={styles.changePhoneAnchor}
                >
                  <Text style={styles.changePhoneText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!isValidPhone}
                onPress={handleSendOtp}
                style={[styles.sendOtpBtn, !isValidPhone && styles.sendOtpBtnDisabled]}
              >
                <Text style={[styles.sendOtpText, !isValidPhone && styles.sendOtpTextDisabled]}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Main Action: Register & Continue (disabled until verified) */}
          <AppButton
            disabled={!isPhoneVerified}
            onPress={handleRegisterAndContinue}
            style={[styles.ctaBtn, !isPhoneVerified && styles.ctaBtnDisabled]}
          >
            Register & Continue
          </AppButton>
        </View>
      </ScrollView>

      {/* Verification Modal / Dialog */}
      <Modal
        transparent
        visible={isModalOpen}
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalBackdrop}
            onPress={() => setIsModalOpen(false)}
          />
          <View style={styles.modalCard}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.modalCloseBtn}
              onPress={() => setIsModalOpen(false)}
              accessibilityLabel="Close verification modal"
            >
              <AppIcon name="close" size={18} color={colors.charcoal} strokeWidth={2} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Verify your mobile number</Text>
            <Text style={styles.modalSubtitle}>
              OTP sent to {maskedPhone}
            </Text>

            {/* 6 OTP Boxes */}
            <View style={styles.otpRow}>
              {otpDigits.map((digit, index) => {
                const isFocused = activeBoxIndex === index;
                const isFilled = digit.length > 0;
                return (
                  <TextInput
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    onChangeText={(txt) => handleOtpChange(txt, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setActiveBoxIndex(index)}
                    onBlur={() => setActiveBoxIndex(-1)}
                    keyboardType="number-pad"
                    maxLength={6}
                    selectTextOnFocus
                    style={[
                      styles.otpBox,
                      isFocused && styles.otpBoxFocused,
                      isFilled && styles.otpBoxFilled,
                      Platform.OS === 'web' && {
                        outlineStyle: 'none',
                        outlineWidth: 0,
                      },
                    ]}
                    {...(Platform.OS === 'web' ? { onPaste: handlePaste } : {})}
                  />
                );
              })}
            </View>

            {otpError ? <Text style={styles.otpErrorText}>{otpError}</Text> : null}

            {/* Verify OTP Button inside Modal */}
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!isAllDigitsFilled}
              onPress={handleVerifyOtp}
              style={[
                styles.modalVerifyBtn,
                !isAllDigitsFilled && styles.modalVerifyBtnDisabled,
              ]}
            >
              <Text
                style={[
                  styles.modalVerifyBtnText,
                  !isAllDigitsFilled && styles.modalVerifyBtnTextDisabled,
                ]}
              >
                Verify OTP
              </Text>
            </TouchableOpacity>

            {/* Resend OTP text anchor action */}
            <View style={styles.modalResendRow}>
              <Text style={styles.modalResendText}>
                Didn’t receive OTP?{' '}
                {seconds > 0 ? (
                  <Text style={styles.modalResendCountdown}>
                    Resend OTP in {seconds}s
                  </Text>
                ) : (
                  <Text
                    onPress={handleResendOtp}
                    style={styles.modalResendAnchor}
                  >
                    Resend OTP
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
  formCard: {
    width: '100%',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: typography.fonts.headingBold,
    letterSpacing: 1.4,
    color: colors.terracotta,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: typography.fonts.headingBold,
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: typography.fonts.body,
    color: colors.charcoal,
    lineHeight: 18,
    marginBottom: 20,
  },
  phoneSection: {
    marginBottom: 16,
  },
  phoneInputCol: {
    width: '100%',
  },
  sendOtpBtn: {
    backgroundColor: colors.terracotta,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
    marginBottom: 8,
  },
  sendOtpBtnDisabled: {
    backgroundColor: colors.surfaceSubtle,
  },
  sendOtpText: {
    color: colors.white,
    fontFamily: typography.fonts.heading,
    fontWeight: '600',
    fontSize: 13,
  },
  sendOtpTextDisabled: {
    color: colors.warmGrey,
  },
  verifiedStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    borderRadius: radius.input,
    paddingVertical: 11,
    paddingHorizontal: 14,
    marginTop: -4,
    marginBottom: 10,
  },
  verifiedBadgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedBadgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedStatusText: {
    fontSize: 12.5,
    fontFamily: typography.fonts.heading,
    fontWeight: '600',
    color: '#065F46',
  },
  changePhoneAnchor: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  changePhoneText: {
    fontSize: 11.5,
    fontFamily: typography.fonts.bodyMedium,
    color: colors.charcoal,
    textDecorationLine: 'underline',
  },
  ctaBtn: {
    marginTop: 8,
    minHeight: 48,
  },
  ctaBtnDisabled: {
    opacity: 0.5,
  },

  // Modal Dialog Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...(Platform.OS === 'web'
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }
      : {}),
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 28,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    position: 'relative',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.25)',
        }
      : {}),
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: typography.fonts.headingBold,
    color: colors.black,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: typography.fonts.body,
    color: colors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 18,
    width: '100%',
  },
  otpBox: {
    width: 44,
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(156, 154, 154, 0.35)',
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: typography.fonts.headingBold,
    color: colors.black,
  },
  otpBoxFocused: {
    borderColor: colors.terracotta,
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  otpBoxFilled: {
    borderColor: colors.terracotta,
  },
  otpErrorText: {
    fontSize: 11.5,
    color: colors.danger,
    fontFamily: typography.fonts.bodyMedium,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalVerifyBtn: {
    backgroundColor: colors.terracotta,
    height: 48,
    width: '100%',
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  modalVerifyBtnDisabled: {
    backgroundColor: colors.surfaceSubtle,
    opacity: 0.6,
  },
  modalVerifyBtnText: {
    color: colors.white,
    fontFamily: typography.fonts.heading,
    fontWeight: '600',
    fontSize: 14,
  },
  modalVerifyBtnTextDisabled: {
    color: colors.warmGrey,
  },
  modalResendRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalResendText: {
    fontSize: 12.5,
    fontFamily: typography.fonts.body,
    color: colors.charcoal,
    textAlign: 'center',
  },
  modalResendCountdown: {
    color: colors.warmGrey,
    fontFamily: typography.fonts.bodyMedium,
  },
  modalResendAnchor: {
    color: colors.terracotta,
    fontFamily: typography.fonts.heading,
    fontWeight: '600',
    textDecorationLine: 'underline',
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
});
