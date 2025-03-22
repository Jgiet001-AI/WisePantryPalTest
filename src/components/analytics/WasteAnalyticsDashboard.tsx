import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DollarSign, Leaf, TrendingDown, Award, Calendar, Filter } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock waste data
interface WasteItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  wastedDate: Date;
  reason: 'expired' | 'spoiled' | 'unused' | 'other';
}

// Mock waste data
const mockWasteData: WasteItem[] = [
  { id: 'w1', name: 'Milk', category: 'Dairy', quantity: 0.5, unit: 'gallon', price: 2.49, wastedDate: new Date(2025, 2, 15), reason: 'expired' },
  { id: 'w2', name: 'Spinach', category: 'Vegetables', quantity: 1, unit: 'bag', price: 3.99, wastedDate: new Date(2025, 2, 16), reason: 'spoiled' },
  { id: 'w3', name: 'Chicken Breast', category: 'Meat', quantity: 0.75, unit: 'lbs', price: 4.50, wastedDate: new Date(2025, 2, 17), reason: 'unused' },
  { id: 'w4', name: 'Yogurt', category: 'Dairy', quantity: 2, unit: 'cups', price: 1.99, wastedDate: new Date(2025, 2, 18), reason: 'expired' },
  { id: 'w5', name: 'Tomatoes', category: 'Vegetables', quantity: 3, unit: 'count', price: 1.50, wastedDate: new Date(2025, 2, 19), reason: 'spoiled' },
  { id: 'w6', name: 'Bread', category: 'Bakery', quantity: 0.5, unit: 'loaf', price: 2.99, wastedDate: new Date(2025, 2, 20), reason: 'expired' },
  { id: 'w7', name: 'Avocado', category: 'Fruits', quantity: 2, unit: 'count', price: 2.50, wastedDate: new Date(2025, 2, 21), reason: 'spoiled' },
  { id: 'w8', name: 'Eggs', category: 'Dairy', quantity: 4, unit: 'count', price: 1.20, wastedDate: new Date(2025, 2, 22), reason: 'expired' },
  { id: 'w9', name: 'Ground Beef', category: 'Meat', quantity: 0.5, unit: 'lbs', price: 3.99, wastedDate: new Date(2025, 2, 23), reason: 'unused' },
  { id: 'w10', name: 'Lettuce', category: 'Vegetables', quantity: 1, unit: 'head', price: 1.99, wastedDate: new Date(2025, 2, 24), reason: 'spoiled' },
  { id: 'w11', name: 'Cheese', category: 'Dairy', quantity: 0.25, unit: 'lbs', price: 3.49, wastedDate: new Date(2025, 2, 25), reason: 'expired' },
  { id: 'w12', name: 'Apples', category: 'Fruits', quantity: 2, unit: 'count', price: 1.50, wastedDate: new Date(2025, 2, 26), reason: 'spoiled' },
  { id: 'w13', name: 'Pasta Sauce', category: 'Pantry', quantity: 1, unit: 'jar', price: 2.99, wastedDate: new Date(2025, 2, 27), reason: 'unused' },
  { id: 'w14', name: 'Carrots', category: 'Vegetables', quantity: 0.5, unit: 'bag', price: 1.29, wastedDate: new Date(2025, 2, 28), reason: 'spoiled' },
  { id: 'w15', name: 'Yogurt', category: 'Dairy', quantity: 1, unit: 'cup', price: 0.99, wastedDate: new Date(2025, 3, 1), reason: 'expired' },
];

// Mock historical data (last 6 months)
const mockHistoricalData = [
  { month: 'Oct', wasteAmount: 12.5, wasteValue: 35.75, savedAmount: 0, savedValue: 0 },
  { month: 'Nov', wasteAmount: 10.2, wasteValue: 28.50, savedAmount: 2.3, savedValue: 7.25 },
  { month: 'Dec', wasteAmount: 15.8, wasteValue: 42.30, savedAmount: 0, savedValue: 0 },
  { month: 'Jan', wasteAmount: 8.5, wasteValue: 24.75, savedAmount: 7.3, savedValue: 17.55 },
  { month: 'Feb', wasteAmount: 6.2, wasteValue: 18.60, savedAmount: 9.6, savedValue: 23.70 },
  { month: 'Mar', wasteAmount: 4.8, wasteValue: 14.40, savedAmount: 11.0, savedValue: 27.90 },
];

// CO2 equivalent per pound of food waste (simplified)
const CO2_PER_POUND = 2.5; // kg CO2 equivalent

export default function WasteAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [wasteData, setWasteData] = useState<WasteItem[]>(mockWasteData);
  const [historicalData, setHistoricalData] = useState(mockHistoricalData);
  
  // Calculate total waste
  const totalWaste = wasteData.reduce((acc, item) => acc + item.price, 0);
  
  // Calculate total CO2 equivalent (simplified)
  const totalCO2 = wasteData.reduce((acc, item) => {
    // Convert to pounds for calculation
    let weightInPounds = 0;
    if (item.unit === 'lbs') {
      weightInPounds = item.quantity;
    } else if (item.unit === 'gallon') {
      weightInPounds = item.quantity * 8.34; // 1 gallon of water = 8.34 pounds
    } else {
      // Default approximation for other units
      weightInPounds = item.quantity * 0.5;
    }
    return acc + (weightInPounds * CO2_PER_POUND);
  }, 0);
  
  // Calculate waste by category
  const wasteByCategory = wasteData.reduce((acc: Record<string, number>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.price;
    return acc;
  }, {});
  
  const categoryData = Object.entries(wasteByCategory).map(([name, value]) => ({ name, value }));
  
  // Calculate waste by reason
  const wasteByReason = wasteData.reduce((acc: Record<string, number>, item) => {
    if (!acc[item.reason]) {
      acc[item.reason] = 0;
    }
    acc[item.reason] += item.price;
    return acc;
  }, {});
  
  const reasonData = Object.entries(wasteByReason).map(([name, value]) => ({ name, value }));
  
  // Calculate savings trend
  const savingsTrend = historicalData.map(month => ({
    month: month.month,
    saved: month.savedValue
  }));
  
  // Colors for pie charts
  const CATEGORY_COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336', '#FF9800'];
  const REASON_COLORS = ['#F44336', '#FF9800', '#2196F3', '#9E9E9E'];
  
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
          <div>
            <Text variant="h2" style={{ color: colors.textPrimary }}>Waste Analytics</Text>
            <Text variant="body2" style={{ color: colors.textSecondary }}>
              Track your food waste and savings
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              gap: spacing.xs,
              backgroundColor: 'rgba(240, 245, 255, 0.8)',
              borderRadius: borderRadius.full,
              padding: '2px'
            }}
          >
            <div
              onClick={() => setTimeRange('week')}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.full,
                backgroundColor: timeRange === 'week' ? colors.primary : 'transparent',
                color: timeRange === 'week' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Week
            </div>
            <div
              onClick={() => setTimeRange('month')}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.full,
                backgroundColor: timeRange === 'month' ? colors.primary : 'transparent',
                color: timeRange === 'month' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Month
            </div>
            <div
              onClick={() => setTimeRange('year')}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.full,
                backgroundColor: timeRange === 'year' ? colors.primary : 'transparent',
                color: timeRange === 'year' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Year
            </div>
          </div>
        </Flex>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: spacing.md,
        overflowY: 'auto'
      }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: spacing.md,
          marginBottom: spacing.lg
        }}>
          {/* Money Wasted */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)'
          }}>
            <Flex align="center" gap={spacing.sm} style={{ marginBottom: spacing.xs }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign size={20} color="#F44336" />
              </div>
              <Text variant="body2" style={{ color: colors.textSecondary }}>Money Wasted</Text>
            </Flex>
            <Text variant="h2" style={{ color: '#F44336' }}>${totalWaste.toFixed(2)}</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              This {timeRange}
            </Text>
          </div>
          
          {/* CO2 Impact */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)'
          }}>
            <Flex align="center" gap={spacing.sm} style={{ marginBottom: spacing.xs }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Leaf size={20} color="#4CAF50" />
              </div>
              <Text variant="body2" style={{ color: colors.textSecondary }}>CO2 Impact</Text>
            </Flex>
            <Text variant="h2" style={{ color: '#4CAF50' }}>{totalCO2.toFixed(1)} kg</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              CO2 equivalent
            </Text>
          </div>
          
          {/* Waste Reduction */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)'
          }}>
            <Flex align="center" gap={spacing.sm} style={{ marginBottom: spacing.xs }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingDown size={20} color="#2196F3" />
              </div>
              <Text variant="body2" style={{ color: colors.textSecondary }}>Reduction</Text>
            </Flex>
            <Text variant="h2" style={{ color: '#2196F3' }}>32%</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              vs. last {timeRange}
            </Text>
          </div>
          
          {/* Streak */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)'
          }}>
            <Flex align="center" gap={spacing.sm} style={{ marginBottom: spacing.xs }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={20} color="#9C27B0" />
              </div>
              <Text variant="body2" style={{ color: colors.textSecondary }}>Streak</Text>
            </Flex>
            <Text variant="h2" style={{ color: '#9C27B0' }}>14</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              days improving
            </Text>
          </div>
        </div>
        
        {/* Charts */}
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)',
            marginBottom: spacing.md
          }}>
            <Text variant="h3" style={{ marginBottom: spacing.md }}>Waste & Savings Over Time</Text>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historicalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 235, 245, 0.8)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid rgba(230, 235, 245, 0.8)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wasteValue" name="Waste ($)" fill="#F44336" />
                  <Bar dataKey="savedValue" name="Saved ($)" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing.md
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              boxShadow: shadows.sm,
              border: '1px solid rgba(230, 235, 245, 0.8)',
              height: '300px'
            }}>
              <Text variant="h3" style={{ marginBottom: spacing.md }}>Waste by Category</Text>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${value}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid rgba(230, 235, 245, 0.8)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              boxShadow: shadows.sm,
              border: '1px solid rgba(230, 235, 245, 0.8)',
              height: '300px'
            }}>
              <Text variant="h3" style={{ marginBottom: spacing.md }}>Waste by Reason</Text>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={reasonData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {reasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={REASON_COLORS[index % REASON_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${value}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid rgba(230, 235, 245, 0.8)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recent Waste */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          boxShadow: shadows.sm,
          border: '1px solid rgba(230, 235, 245, 0.8)',
          marginBottom: spacing.lg
        }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
            <Text variant="h3">Recent Waste</Text>
            <Button variant="outline" size="sm">
              <Calendar size={14} style={{ marginRight: spacing.xs }} />
              Log Waste
            </Button>
          </Flex>
          
          {wasteData.slice(0, 5).map((item, index) => (
            <div 
              key={item.id}
              style={{
                padding: spacing.md,
                borderBottom: index < 4 ? '1px solid rgba(230, 235, 245, 0.8)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <Text variant="body1" style={{ fontWeight: 500 }}>{item.name}</Text>
                <Flex gap={spacing.sm} style={{ marginTop: spacing.xs }}>
                  <div style={{
                    backgroundColor: 'rgba(240, 245, 255, 0.8)',
                    color: colors.textSecondary,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: borderRadius.md,
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    {item.category}
                  </div>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.quantity} {item.unit}
                  </Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.wastedDate.toLocaleDateString()}
                  </Text>
                </Flex>
              </div>
              <div>
                <Text variant="body1" style={{ color: '#F44336', fontWeight: 600 }}>
                  ${item.price.toFixed(2)}
                </Text>
                <Text 
                  variant="caption" 
                  style={{ 
                    color: colors.textSecondary,
                    display: 'block',
                    textAlign: 'right',
                    textTransform: 'capitalize'
                  }}
                >
                  {item.reason}
                </Text>
              </div>
            </div>
          ))}
          
          {wasteData.length > 5 && (
            <div style={{ textAlign: 'center', marginTop: spacing.md }}>
              <Button variant="ghost" size="sm">
                View All ({wasteData.length})
              </Button>
            </div>
          )}
        </div>
        
        {/* Tips */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          boxShadow: shadows.sm,
          border: '1px solid rgba(230, 235, 245, 0.8)',
          marginBottom: spacing.lg
        }}>
          <Text variant="h3" style={{ marginBottom: spacing.md }}>Tips to Reduce Waste</Text>
          
          <div style={{
            padding: spacing.md,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: borderRadius.md,
            marginBottom: spacing.md
          }}>
            <Text variant="body1" style={{ fontWeight: 600, color: '#4CAF50', marginBottom: spacing.xs }}>
              Based on your waste pattern
            </Text>
            <Text variant="body2">
              Try freezing half of your bread loaf to prevent it from going stale before you can use it all.
            </Text>
          </div>
          
          <div style={{
            padding: spacing.md,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: borderRadius.md
          }}>
            <Text variant="body1" style={{ fontWeight: 600, color: '#2196F3', marginBottom: spacing.xs }}>
              Community tip
            </Text>
            <Text variant="body2">
              Store leafy greens with a paper towel in the container to absorb excess moisture and keep them fresh longer.
            </Text>
          </div>
        </div>
        
        {/* Bottom padding for navigation */}
        <div style={{ height: '80px' }} />
      </div>
    </Container>
  );
}
