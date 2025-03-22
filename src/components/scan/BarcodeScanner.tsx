import { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCcw, Check, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius,
  animation
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from 'react-router-dom';

// Mock product database that would be replaced with a real API
const mockProductDatabase: Record<string, {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDays: number;
}> = {
  "8901058851826": {
    name: "Organic Milk",
    category: "Dairy",
    quantity: 1,
    unit: "gallon",
    expiryDays: 7
  },
  "5000112637922": {
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    unit: "count",
    expiryDays: 14
  },
  "8901725133566": {
    name: "Whole Wheat Bread",
    category: "Bakery",
    quantity: 1,
    unit: "loaf",
    expiryDays: 5
  },
  "7622210601223": {
    name: "Chicken Breast",
    category: "Meat",
    quantity: 2,
    unit: "lbs",
    expiryDays: 3
  }
};

type ScanResult = {
  barcode: string;
  format: string;
  productInfo?: typeof mockProductDatabase[keyof typeof mockProductDatabase];
};

interface BarcodeScannerProps {
  onScanComplete?: (result: ScanResult) => void;
  onClose?: () => void;
}

export default function BarcodeScanner({ onScanComplete, onClose }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [cameraFacing]);

  // Start camera and request permissions
  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        setScanning(true);
        startScanning();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraPermission(false);
      setError('Camera access denied. Please enable camera permissions.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  // Toggle camera facing mode
  const toggleCamera = () => {
    stopCamera();
    setCameraFacing(cameraFacing === 'environment' ? 'user' : 'environment');
  };

  // Mock barcode scanning function
  // In a real app, this would use a library like quagga.js or zxing
  const startScanning = () => {
    // For demo purposes, we'll simulate scanning after 3 seconds
    setTimeout(() => {
      if (scanning) {
        // Generate a random barcode from our mock database
        const barcodes = Object.keys(mockProductDatabase);
        const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
        
        handleScanResult({
          barcode: randomBarcode,
          format: 'EAN-13',
          productInfo: mockProductDatabase[randomBarcode]
        });
      }
    }, 3000);
  };

  // Handle scan result
  const handleScanResult = (result: ScanResult) => {
    setScanning(false);
    setScanResult(result);
    
    // Take a snapshot from the video
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
    
    // Call the onScanComplete callback if provided
    if (onScanComplete) {
      onScanComplete(result);
    }
  };

  // Reset scanner
  const resetScanner = () => {
    setScanResult(null);
    setScanning(true);
    startScanning();
  };

  // Add scanned item to pantry
  const addToPantry = () => {
    if (scanResult && scanResult.productInfo) {
      // In a real app, we would add the item to the pantry database
      // For now, we'll just navigate back to the pantry
      navigate('/pantry');
    }
  };

  // Handle manual barcode entry
  const handleManualEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const barcode = formData.get('barcode') as string;
    
    if (barcode && mockProductDatabase[barcode]) {
      handleScanResult({
        barcode,
        format: 'MANUAL',
        productInfo: mockProductDatabase[barcode]
      });
    } else {
      setError('Product not found. Please try another barcode.');
    }
  };

  return (
    <Container style={{ 
      padding: 0, 
      maxWidth: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.85))',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Header */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md}`, 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid rgba(230, 235, 245, 0.8)`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Flex justify="space-between" align="center">
          <Text variant="h2" style={{ color: colors.textPrimary }}>Scan Barcode</Text>
          <div
            onClick={onClose || (() => navigate(-1))}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(240, 245, 255, 0.8)',
              cursor: 'pointer'
            }}
          >
            <X size={20} color={colors.textSecondary} />
          </div>
        </Flex>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: spacing.md,
        position: 'relative'
      }}>
        {/* Camera Permission Error */}
        {cameraPermission === false && (
          <div style={{ 
            textAlign: 'center', 
            padding: spacing.xl,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <AlertTriangle size={48} color={colors.warning} style={{ marginBottom: spacing.md }} />
            <Text variant="h3" style={{ marginBottom: spacing.md }}>Camera Access Required</Text>
            <Text variant="body1" style={{ marginBottom: spacing.lg, maxWidth: '300px' }}>
              Please enable camera access in your browser settings to scan barcodes.
            </Text>
            <Button onClick={() => startCamera()}>
              Try Again
            </Button>
          </div>
        )}

        {/* Scanner */}
        {cameraPermission !== false && (
          <>
            <div style={{ 
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              backgroundColor: '#000',
              borderRadius: borderRadius.lg,
              overflow: 'hidden',
              boxShadow: shadows.md
            }}>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                muted
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: scanResult ? 'none' : 'block'
                }}
              />
              
              <canvas 
                ref={canvasRef}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: scanResult ? 'block' : 'none'
                }}
              />
              
              {/* Scanning overlay */}
              {scanning && !scanResult && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  height: '40%',
                  border: '2px solid white',
                  borderRadius: '8px',
                  boxShadow: '0 0 0 4000px rgba(0, 0, 0, 0.3)',
                  zIndex: 2
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '20px',
                    height: '20px',
                    borderTop: '3px solid #4CAF50',
                    borderLeft: '3px solid #4CAF50',
                    borderTopLeftRadius: '4px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '20px',
                    height: '20px',
                    borderTop: '3px solid #4CAF50',
                    borderRight: '3px solid #4CAF50',
                    borderTopRightRadius: '4px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '20px',
                    height: '20px',
                    borderBottom: '3px solid #4CAF50',
                    borderLeft: '3px solid #4CAF50',
                    borderBottomLeftRadius: '4px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '20px',
                    height: '20px',
                    borderBottom: '3px solid #4CAF50',
                    borderRight: '3px solid #4CAF50',
                    borderBottomRightRadius: '4px'
                  }} />
                  
                  {/* Scanning line animation */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#4CAF50',
                    animation: 'scanLine 2s linear infinite',
                    boxShadow: '0 0 8px rgba(76, 175, 80, 0.8)'
                  }} />
                </div>
              )}
              
              {/* Camera controls */}
              <div style={{
                position: 'absolute',
                bottom: spacing.md,
                right: spacing.md,
                zIndex: 3
              }}>
                <div
                  onClick={toggleCamera}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.full,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={20} color="white" />
                </div>
              </div>
            </div>
            
            {/* Scan result */}
            {scanResult && scanResult.productInfo && (
              <div style={{
                marginTop: spacing.md,
                padding: spacing.md,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
                border: '1px solid rgba(230, 235, 245, 0.8)'
              }}>
                <Text variant="h3" style={{ marginBottom: spacing.xs }}>Product Found</Text>
                <Text variant="caption" style={{ color: colors.textSecondary, marginBottom: spacing.md, display: 'block' }}>
                  Barcode: {scanResult.barcode} ({scanResult.format})
                </Text>
                
                <div style={{ marginBottom: spacing.md }}>
                  <Text variant="body1" style={{ fontWeight: 600 }}>{scanResult.productInfo.name}</Text>
                  <Flex gap={spacing.sm} style={{ marginTop: spacing.xs }}>
                    <div style={{
                      backgroundColor: colors.primaryLight,
                      color: colors.primary,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      borderRadius: borderRadius.md,
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      {scanResult.productInfo.category}
                    </div>
                    <Text variant="body2" style={{ color: colors.textSecondary }}>
                      {scanResult.productInfo.quantity} {scanResult.productInfo.unit}
                    </Text>
                  </Flex>
                </div>
                
                <Flex gap={spacing.md}>
                  <Button
                    variant="outline"
                    onClick={resetScanner}
                    style={{ flex: 1 }}
                  >
                    Scan Again
                  </Button>
                  <Button
                    onClick={addToPantry}
                    style={{ flex: 1, backgroundColor: colors.primary }}
                  >
                    <Check size={16} style={{ marginRight: spacing.xs }} />
                    Add to Pantry
                  </Button>
                </Flex>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div style={{
                marginTop: spacing.md,
                padding: spacing.md,
                backgroundColor: colors.errorLight,
                borderRadius: borderRadius.md,
                color: colors.error
              }}>
                <Text variant="body2">{error}</Text>
              </div>
            )}
            
            {/* Manual entry */}
            <div style={{
              marginTop: spacing.xl,
              padding: spacing.md,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: borderRadius.lg,
              boxShadow: shadows.sm,
              border: '1px solid rgba(230, 235, 245, 0.8)'
            }}>
              <Text variant="h4" style={{ marginBottom: spacing.md }}>Manual Entry</Text>
              <form onSubmit={handleManualEntry}>
                <Flex gap={spacing.md}>
                  <input
                    type="text"
                    name="barcode"
                    placeholder="Enter barcode number"
                    style={{
                      flex: 1,
                      padding: spacing.md,
                      borderRadius: borderRadius.md,
                      border: '1px solid rgba(230, 235, 245, 0.8)',
                      fontSize: '16px'
                    }}
                  />
                  <Button type="submit">
                    Search
                  </Button>
                </Flex>
                <Text variant="caption" style={{ color: colors.textSecondary, marginTop: spacing.sm, display: 'block' }}>
                  Try these sample barcodes: 8901058851826, 5000112637922, 8901725133566
                </Text>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Bottom padding for navigation */}
      <div style={{ height: '80px' }} />
      
      {/* CSS for animations */}
      <style>
        {`
          @keyframes scanLine {
            0% {
              top: 0;
            }
            50% {
              top: 100%;
            }
            50.1% {
              top: 0;
            }
            100% {
              top: 100%;
            }
          }
        `}
      </style>
    </Container>
  );
}
