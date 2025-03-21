import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Card,
  Button,
  colors,
  spacing,
  shadows
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const SmartCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Sample meal plan data
  const mealPlanData = [
    { date: '2025-03-21', breakfast: 'Avocado Toast', lunch: 'Quinoa Salad', dinner: 'Grilled Salmon' },
    { date: '2025-03-22', breakfast: 'Smoothie Bowl', lunch: 'Vegetable Wrap', dinner: 'Pasta Primavera' },
    { date: '2025-03-23', breakfast: 'Oatmeal', lunch: 'Lentil Soup', dinner: 'Stir Fry' },
    { date: '2025-03-24', breakfast: 'Yogurt Parfait', lunch: 'Chicken Salad', dinner: 'Vegetable Curry' },
  ];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', isEmpty: true });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const hasMealPlan = mealPlanData.some(meal => meal.date === dateString);
      
      days.push({
        day: i,
        isEmpty: false,
        hasMealPlan,
        dateString
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };
  
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <Container padding="0" background={colors.background}>
      {/* Header */}
      <div style={{ 
        padding: spacing.md,
        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: shadows.md,
      }}>
        <Flex align="center">
          <Button 
            variant="text" 
            onClick={() => navigate('/advanced')}
            style={{ marginRight: spacing.sm, color: colors.white }}
            icon={<ArrowLeft size={24} />}
          >
            Back
          </Button>
          <Text variant="h2" style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>
            Smart Calendar
          </Text>
        </Flex>
      </div>

      {/* Calendar */}
      <div style={{ padding: spacing.md }}>
        {/* Month navigation */}
        <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
          <Button 
            variant="text" 
            onClick={prevMonth}
            icon={<ChevronLeft size={20} />}
          >
            Previous
          </Button>
          <Text variant="h3">{formatMonth(currentMonth)}</Text>
          <Button 
            variant="text" 
            onClick={nextMonth}
            icon={<ChevronRight size={20} />}
          >
            Next
          </Button>
        </Flex>
        
        {/* Weekday headers */}
        <Flex style={{ marginBottom: spacing.sm }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ 
              flex: 1, 
              textAlign: 'center', 
              fontWeight: 'bold',
              color: colors.midGray
            }}>
              {day}
            </div>
          ))}
        </Flex>
        
        {/* Calendar grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: spacing.lg
        }}>
          {days.map((day, index) => (
            <div 
              key={index} 
              style={{ 
                height: '60px',
                border: `1px solid ${colors.lightGray}`,
                borderRadius: '4px',
                padding: '4px',
                backgroundColor: day.hasMealPlan ? colors.primaryLight : colors.white,
                position: 'relative'
              }}
            >
              {!day.isEmpty && (
                <>
                  <div style={{ 
                    position: 'absolute', 
                    top: '4px', 
                    right: '4px',
                    fontWeight: day.hasMealPlan ? 'bold' : 'normal',
                    color: day.hasMealPlan ? colors.primary : colors.textPrimary
                  }}>
                    {day.day}
                  </div>
                  {day.hasMealPlan && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '4px', 
                      left: '4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: colors.primary
                    }} />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Upcoming meals */}
        <Text variant="h3" style={{ marginBottom: spacing.md }}>Upcoming Meals</Text>
        
        {mealPlanData.slice(0, 3).map((meal, index) => (
          <Card 
            key={index}
            padding={spacing.md}
            margin={`0 0 ${spacing.sm} 0`}
            background={colors.white}
            shadow={shadows.sm}
          >
            <Flex direction="column">
              <Flex align="center" style={{ marginBottom: spacing.xs }}>
                <Calendar size={16} style={{ marginRight: spacing.xs }} />
                <Text variant="body2" style={{ fontWeight: 'bold' }}>
                  {new Date(meal.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </Text>
              </Flex>
              
              <div style={{ marginLeft: spacing.md }}>
                <Flex align="center" style={{ marginBottom: spacing.xs }}>
                  <Clock size={14} style={{ marginRight: spacing.xs }} />
                  <Text variant="body2" style={{ color: colors.midGray }}>Breakfast:</Text>
                  <Text variant="body2" style={{ marginLeft: spacing.xs }}>{meal.breakfast}</Text>
                </Flex>
                
                <Flex align="center" style={{ marginBottom: spacing.xs }}>
                  <Clock size={14} style={{ marginRight: spacing.xs }} />
                  <Text variant="body2" style={{ color: colors.midGray }}>Lunch:</Text>
                  <Text variant="body2" style={{ marginLeft: spacing.xs }}>{meal.lunch}</Text>
                </Flex>
                
                <Flex align="center">
                  <Clock size={14} style={{ marginRight: spacing.xs }} />
                  <Text variant="body2" style={{ color: colors.midGray }}>Dinner:</Text>
                  <Text variant="body2" style={{ marginLeft: spacing.xs }}>{meal.dinner}</Text>
                </Flex>
              </div>
            </Flex>
          </Card>
        ))}
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/meal-planning')}
          style={{ width: '100%', marginTop: spacing.md }}
        >
          Plan New Meals
        </Button>
      </div>
    </Container>
  );
};

export default SmartCalendar;
