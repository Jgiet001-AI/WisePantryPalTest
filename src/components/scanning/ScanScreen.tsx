import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MobileContainer,
  Container,
  Text,
  Flex,
  Button,
  BottomNavigation,
  colors,
  spacing,
  shadows,
  borderRadius,
} from '../ui/KitchenStoriesDesign';
import { 
  Home, 
  Book, 
  Plus, 
  ShoppingCart, 
  User, 
  Camera,
  Barcode,
  Image,
  AlertTriangle,
  Loader2,
  ArrowLeft
} from 'lucide-react';

export default function ScanScreen() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [scanMode, setScanMode] = useState<'barcode' | 'image'>('barcode');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Navigation items - using window.location.pathname for determining active state
  const navigationItems = [
    { 
      icon: <Home size={24} />, 
      label: 'Home', 
      isActive: path === '/' || path.includes('/recipe/'),
      onClick: () => navigate('/') 
    },
    { 
      icon: <Book size={24} />, 
      label: 'Recipes', 
      isActive: path === '/recipes' || path.includes('/category/'),
      onClick: () => navigate('/recipes') 
    },
    { 
      icon: <Plus size={24} />, 
      label: 'Scan', 
      isActive: path === '/scan',
      onClick: () => navigate('/scan') 
    },
    { 
      icon: <ShoppingCart size={24} />, 
      label: 'Shopping', 
      isActive: path === '/shopping' || path.includes('/shopping/'),
      onClick: () => navigate('/shopping') 
    },
    { 
      icon: <User size={24} />, 
      label: 'Profile', 
      isActive: path === '/profile',
      onClick: () => navigate('/profile') 
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate a scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(scanMode === 'barcode' 
        ? 'Product identified: Organic Whole Milk' 
        : 'Items detected: Apple, Banana, Orange');
      setIsCameraActive(false);
    }, 2000);
  };

  return (
    <div>
      {/* Header */}
      <Container 
        padding={`${spacing.md} ${spacing.md}`}
        background={colors.primary}
        style={{
          borderBottomLeftRadius: borderRadius.lg,
          borderBottomRightRadius: borderRadius.lg,
          position: 'sticky',
          top: 0,
          zIndex: 9,
          boxShadow: shadows.md,
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex gap={spacing.sm} align="center">
            <Button 
              variant="text" 
              onClick={() => navigate(-1)}
              style={{ color: colors.white, padding: 0 }}
            >
              <ArrowLeft size={24} />
            </Button>
            <Text variant="h2" color={colors.white}>Scan Items</Text>
          </Flex>
          <Camera size={24} color={colors.white} />
        </Flex>
      </Container>

      {/* Main Content */}
      <Container padding={`${spacing.md} ${spacing.md} ${spacing.xxl}`}>
        {/* Mode Selection */}
        {!isCameraActive && !scanResult && (
          <>
            <Text variant="h3" margin={`0 0 ${spacing.md}`}>Select Scan Method</Text>
            
            <Flex direction="column" gap={spacing.md} margin={`0 0 ${spacing.xl}`}>
              <Button
                onClick={() => {
                  setScanMode('barcode');
                  setIsCameraActive(true);
                }}
                fullWidth
                variant="outlined"
                style={{
                  padding: spacing.lg,
                  borderRadius: borderRadius.lg,
                  height: 'auto',
                  justifyContent: 'flex-start',
                }}
              >
                <Flex align="center" gap={spacing.md}>
                  <Barcode size={32} />
                  <div>
                    <Text variant="h3" margin={`0 0 ${spacing.xs}`}>Barcode Scan</Text>
                    <Text variant="body2" color={colors.darkGray}>
                      Scan product barcodes to add items to your pantry
                    </Text>
                  </div>
                </Flex>
              </Button>
              
              <Button
                onClick={() => {
                  setScanMode('image');
                  setIsCameraActive(true);
                }}
                fullWidth
                variant="outlined"
                style={{
                  padding: spacing.lg,
                  borderRadius: borderRadius.lg,
                  height: 'auto',
                  justifyContent: 'flex-start',
                }}
              >
                <Flex align="center" gap={spacing.md}>
                  <Image size={32} />
                  <div>
                    <Text variant="h3" margin={`0 0 ${spacing.xs}`}>Image Recognition</Text>
                    <Text variant="body2" color={colors.darkGray}>
                      Take a photo of multiple items at once
                    </Text>
                  </div>
                </Flex>
              </Button>
            </Flex>
            
            {/* Scan Tips */}
            <Flex 
              direction="column" 
              gap={spacing.md}
              style={{
                backgroundColor: `${colors.accent}15`,
                padding: spacing.lg,
                borderRadius: borderRadius.lg,
              }}
            >
              <Flex align="center" gap={spacing.sm}>
                <AlertTriangle size={24} color={colors.accent} />
                <Text variant="h3" color={colors.accent}>Scanning Tips</Text>
              </Flex>
              
              <Text variant="body2">
                • Ensure good lighting for accurate scans<br />
                • Hold the camera steady when scanning<br />
                • For barcodes, aim for a flat, unwrinkled surface<br />
                • For image recognition, place items on a contrasting background
              </Text>
            </Flex>
          </>
        )}
        
        {/* Camera View */}
        {isCameraActive && (
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: '#000',
                borderRadius: borderRadius.lg,
                position: 'relative',
                overflow: 'hidden',
                marginBottom: spacing.md,
              }}
            >
              {/* Camera preview placeholder */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #111, #333)',
                }}
              />
              
              {/* Scanning overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {scanMode === 'barcode' ? (
                  <div
                    style={{
                      width: '80%',
                      height: '100px',
                      border: `2px solid ${colors.primary}`,
                      borderRadius: spacing.xs,
                      boxShadow: `0 0 0 1000px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {isScanning && (
                      <div
                        style={{
                          width: '100%',
                          height: '2px',
                          backgroundColor: colors.primary,
                          position: 'relative',
                          animation: 'scan 1.5s infinite',
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      width: '80%',
                      height: '80%',
                      border: `2px dashed ${colors.primary}`,
                      borderRadius: spacing.sm,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {isScanning ? (
                      <Loader2 size={48} color={colors.primary} style={{ animation: 'spin 1s linear infinite' }} />
                    ) : (
                      <Text variant="h3" color={colors.white} align="center">
                        Position items in this area
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Flex gap={spacing.md}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setIsCameraActive(false);
                  setScanResult(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                fullWidth
                disabled={isScanning}
                onClick={handleScan}
              >
                {isScanning ? (
                  <Flex align="center" gap={spacing.xs}>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Scanning...</span>
                  </Flex>
                ) : (
                  'Scan Now'
                )}
              </Button>
            </Flex>
          </div>
        )}
        
        {/* Scan Results */}
        {scanResult && (
          <div>
            <div
              style={{
                padding: spacing.lg,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.white,
                boxShadow: shadows.md,
                marginBottom: spacing.md,
              }}
            >
              <Text variant="h3" margin={`0 0 ${spacing.md}`}>Scan Results</Text>
              
              <div
                style={{
                  padding: spacing.md,
                  backgroundColor: `${colors.primary}10`,
                  borderRadius: borderRadius.md,
                  marginBottom: spacing.md,
                }}
              >
                <Text variant="body1">{scanResult}</Text>
              </div>
              
              <Text variant="h3" margin={`0 0 ${spacing.sm}`}>What would you like to do?</Text>
              
              <Flex direction="column" gap={spacing.sm}>
                <Button fullWidth>Add to Pantry</Button>
                <Button fullWidth variant="outlined">Add to Shopping List</Button>
              </Flex>
            </div>
            
            <Flex gap={spacing.md}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setScanResult(null)}
              >
                New Scan
              </Button>
              <Button 
                fullWidth
                onClick={() => navigate('/pantry')}
              >
                Go to Pantry
              </Button>
            </Flex>
          </div>
        )}
      </Container>
    </div>
  );
}
