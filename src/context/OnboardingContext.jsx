import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext(undefined);

export const OnboardingProvider = ({ children }) => {
  const [vendorRole, setVendorRole] = useState('restaurant'); // 'restaurant' | 'grocery'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({
    ownerName: 'Arjun Mehta',
    businessName: 'The Copper Kitchen',
    businessType: 'Restaurant',
    email: 'arjun@copperkitchen.in',
  });

  const [taxDetails, setTaxDetails] = useState({
    panNumber: 'AABCM1234F',
    gstin: '29AABCM1234F1Z5',
    accountNumber: '50100482194210',
    ifscCode: 'HDFC0001245',
    passbookOrCheque: {
      name: 'hdfc_cancelled_cheque.jpg',
      size: '142.5 KB',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23A35E47" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="12" text-anchor="middle">Cheque</text></svg>',
      type: 'image/jpeg',
    },
  });

  const [addressDetails, setAddressDetails] = useState({
    address: '12, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    serviceRadiusKm: 6,
  });

  // KYC Documents with real file metadata
  const [kycDocuments, setKycDocuments] = useState({
    aadhaar: {
      name: 'aadhaar_card.pdf',
      size: '185.0 KB',
      dataUrl: null,
      type: 'application/pdf',
      label: 'Aadhaar Card (Front & Back)',
      required: true,
    },
    pan: {
      name: 'pan_card.jpg',
      size: '120.4 KB',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23464646" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="12" text-anchor="middle">PAN</text></svg>',
      type: 'image/jpeg',
      label: 'Business / Proprietor PAN Card',
      required: true,
    },
    fssai: {
      name: 'fssai_license.pdf',
      size: '168.0 KB',
      dataUrl: null,
      type: 'application/pdf',
      label: 'FSSAI License / Trade Certificate',
      required: true,
    },
    gst: {
      name: null,
      size: null,
      dataUrl: null,
      type: null,
      label: 'GST Registration Certificate',
      required: false,
    },
  });

  // Store Photos:
  // Restaurant: 3 Kitchen Interior photos REQUIRED, Storefront OPTIONAL, Logo OPTIONAL.
  // Grocery: NO Kitchen Interior, Storefront OPTIONAL, Logo OPTIONAL.
  const [kitchenPhotos, setKitchenPhotos] = useState([
    {
      id: 'kitchen-1',
      name: 'kitchen_cooking_range.jpg',
      size: '180.2 KB',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%2310B981" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="11" text-anchor="middle">Kitchen 1</text></svg>',
      type: 'image/jpeg',
    },
    {
      id: 'kitchen-2',
      name: 'kitchen_prep_station.jpg',
      size: '194.0 KB',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%2310B981" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="11" text-anchor="middle">Kitchen 2</text></svg>',
      type: 'image/jpeg',
    },
    {
      id: 'kitchen-3',
      name: 'kitchen_storage_wash.jpg',
      size: '165.5 KB',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%2310B981" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="11" text-anchor="middle">Kitchen 3</text></svg>',
      type: 'image/jpeg',
    },
  ]);

  const [storefrontPhoto, setStorefrontPhoto] = useState({
    name: 'storefront_exterior.jpg',
    size: '175.4 KB',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23A35E47" width="100" height="100"/><text fill="%23ffffff" x="50" y="55" font-size="11" text-anchor="middle">Storefront</text></svg>',
    type: 'image/jpeg',
  });

  const [businessLogo, setBusinessLogo] = useState(null);

  const [termsAccepted, setTermsAccepted] = useState(true);

  // Application verification status: 'verified' | 'waiting' | 'in_review'
  const [verificationStatus, setVerificationStatus] = useState('verified');

  const updateKycDoc = (docKey, fileData) => {
    setKycDocuments((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        ...fileData,
      },
    }));
    // Item 18: If vendor modifies KYC or bank documents, status becomes "Waiting for Approval"
    setVerificationStatus('waiting');
  };

  const removeKycDoc = (docKey) => {
    setKycDocuments((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        name: null,
        size: null,
        dataUrl: null,
        type: null,
      },
    }));
  };

  const updateKitchenPhoto = (index, fileData) => {
    setKitchenPhotos((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...fileData };
      return next;
    });
    setVerificationStatus('waiting');
  };

  const removeKitchenPhoto = (index) => {
    setKitchenPhotos((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const resetOnboarding = () => {
    setVendorRole('restaurant');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setIsPhoneVerified(false);
    setTermsAccepted(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        vendorRole,
        setVendorRole,
        phone,
        setPhone,
        otp,
        setOtp,
        otpSent,
        setOtpSent,
        isPhoneVerified,
        setIsPhoneVerified,
        businessDetails,
        setBusinessDetails,
        taxDetails,
        setTaxDetails,
        addressDetails,
        setAddressDetails,
        kycDocuments,
        updateKycDoc,
        removeKycDoc,
        kitchenPhotos,
        updateKitchenPhoto,
        removeKitchenPhoto,
        storefrontPhoto,
        setStorefrontPhoto,
        businessLogo,
        setBusinessLogo,
        termsAccepted,
        setTermsAccepted,
        verificationStatus,
        setVerificationStatus,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
