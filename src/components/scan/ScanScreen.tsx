import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Button,
  Card,
  colors,
  spacing,
  shadows
} from '../ui/KitchenStoriesDesign';
import { Camera, BarChart2, List, ArrowRight } from 'lucide-react';

const ScanScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // In a real app, this would activate the camera
    // For demo purposes, we'll simulate a scan after a short delay
    setTimeout(() => {
      setIsScanning(false);
      navigate('/pantry'); // Navigate to pantry after scan
    }, 3000);
  };

  return (
    <Container padding="0" background={colors.background}>
      {/* Camera viewfinder area */}
      <div style={{ 
        height: '60vh', 
        background: isScanning ? '#000' : colors.lightGray,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {isScanning ? (
          <>
            <div style={{ 
              border: '2px solid ' + colors.primary, 
              width: '80%', 
              height: '40%', 
              borderRadius: '8px',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '20px', 
                height: '20px', 
                borderTop: '4px solid ' + colors.primary, 
                borderLeft: '4px solid ' + colors.primary 
              }} />
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '20px', 
                height: '20px', 
                borderTop: '4px solid ' + colors.primary, 
                borderRight: '4px solid ' + colors.primary 
              }} />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '20px', 
                height: '20px', 
                borderBottom: '4px solid ' + colors.primary, 
                borderLeft: '4px solid ' + colors.primary 
              }} />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                width: '20px', 
                height: '20px', 
                borderBottom: '4px solid ' + colors.primary, 
                borderRight: '4px solid ' + colors.primary 
              }} />
            </div>
            <Text variant="body1" style={{ color: colors.white, marginTop: spacing.md }}>
              Scanning...
            </Text>
          </>
        ) : (
          <>
            <Camera size={64} color={colors.midGray} />
            <Text variant="h3" style={{ color: colors.secondary, marginTop: spacing.md }}>
              Scan Items
            </Text>
            <Text variant="body1" style={{ color: colors.midGray, textAlign: 'center', maxWidth: '80%', marginTop: spacing.sm }}>
              Point your camera at a barcode to scan and add items to your pantry
            </Text>
            <Button 
              variant="primary" 
              onClick={handleStartScan}
              style={{ marginTop: spacing.lg }}
            >
              Start Scanning
            </Button>
          </>
        )}
      </div>

      {/* Scan history and options */}
      <div style={{ padding: spacing.md }}>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>
          Recent Scans
        </Text>
        
        <Card 
          padding={spacing.md} 
          margin={`0 0 ${spacing.md} 0`}
          background={colors.white}
          shadow={shadows.sm}
        >
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Text variant="body1" style={{ fontWeight: 'bold' }}>Organic Milk</Text>
              <Text variant="body2" style={{ color: colors.midGray }}>Scanned 2 days ago</Text>
            </Flex>
            <Button 
              variant="text" 
              onClick={() => navigate('/pantry')}
              icon={<ArrowRight size={18} />}
            >
              View
            </Button>
          </Flex>
        </Card>
        
        <Card 
          padding={spacing.md} 
          margin={`0 0 ${spacing.md} 0`}
          background={colors.white}
          shadow={shadows.sm}
        >
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Text variant="body1" style={{ fontWeight: 'bold' }}>Whole Wheat Bread</Text>
              <Text variant="body2" style={{ color: colors.midGray }}>Scanned 3 days ago</Text>
            </Flex>
            <Button 
              variant="text" 
              onClick={() => navigate('/pantry')}
              icon={<ArrowRight size={18} />}
            >
              View
            </Button>
          </Flex>
        </Card>
      </div>
    </Container>
  );
};

export default ScanScreen;
