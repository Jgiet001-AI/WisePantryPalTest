import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Card,
  CardContent,
  Button,
  colors,
  spacing,
  shadows
} from '../ui/KitchenStoriesDesign';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Edit, Plus, Trash2, Utensils, ArrowLeft } from "lucide-react";

interface MealPlan {
  id: string;
  date: string;
  meals: {
    id: string;
    type: "breakfast" | "lunch" | "dinner" | "snack";
    recipeId?: string;
    title: string;
    prepTimeMinutes?: number;
  }[];
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  tags: string[];
}

const MealPlanningCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayType, setDisplayType] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Sample meal plan data
  const mealPlans: MealPlan[] = [
    {
      id: "1",
      date: "2025-03-21",
      meals: [
        { id: "1", type: "breakfast", title: "Avocado Toast", prepTimeMinutes: 10 },
        { id: "2", type: "lunch", title: "Quinoa Salad", prepTimeMinutes: 15 },
        { id: "3", type: "dinner", title: "Grilled Salmon", prepTimeMinutes: 25 }
      ]
    },
    {
      id: "2",
      date: "2025-03-22",
      meals: [
        { id: "4", type: "breakfast", title: "Smoothie Bowl", prepTimeMinutes: 5 },
        { id: "5", type: "lunch", title: "Vegetable Wrap", prepTimeMinutes: 10 },
        { id: "6", type: "dinner", title: "Pasta Primavera", prepTimeMinutes: 20 }
      ]
    }
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
      const hasMealPlan = mealPlans.some(meal => meal.date === dateString);
      
      days.push({
        day: i,
        isEmpty: false,
        hasMealPlan,
        dateString
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  
  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };
  
  const prevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
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
            Meal Planning
          </Text>
        </Flex>
      </div>

      {/* Content */}
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
          <Text variant="h3">{formatMonth(currentDate)}</Text>
          <Button 
            variant="text" 
            onClick={nextMonth}
            icon={<ChevronRight size={20} />}
          >
            Next
          </Button>
        </Flex>
        
        {/* Display type toggle */}
        <Flex justify="center" style={{ marginBottom: spacing.md }}>
          <Button 
            variant="primary" 
            onClick={() => setDisplayType("week")}
            style={{ 
              marginRight: spacing.xs,
              backgroundColor: displayType === "week" ? colors.primary : colors.white,
              color: displayType === "week" ? colors.white : colors.textPrimary,
              borderRadius: '4px 0 0 4px'
            }}
          >
            Week
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setDisplayType("month")}
            style={{ 
              backgroundColor: displayType === "month" ? colors.primary : colors.white,
              color: displayType === "month" ? colors.white : colors.textPrimary,
              borderRadius: '0 4px 4px 0'
            }}
          >
            Month
          </Button>
        </Flex>
        
        {/* Calendar grid */}
        {displayType === "month" && (
          <>
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
                    position: 'relative',
                    cursor: day.isEmpty ? 'default' : 'pointer'
                  }}
                  onClick={() => {
                    if (!day.isEmpty && day.dateString) {
                      setSelectedDate(day.dateString);
                    }
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
          </>
        )}
        
        {/* Week view */}
        {displayType === "week" && (
          <div style={{ marginBottom: spacing.lg }}>
            {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - date.getDay() + dayOffset);
              const dateString = date.toISOString().split('T')[0];
              const dayMealPlan = mealPlans.find(plan => plan.date === dateString);
              
              return (
                <Card 
                  key={dayOffset}
                  padding={spacing.md}
                  margin={`0 0 ${spacing.sm} 0`}
                  background={colors.white}
                  shadow={shadows.sm}
                  onClick={() => setSelectedDate(dateString)}
                >
                  <Flex justify="space-between" align="center">
                    <div>
                      <Text variant="body1" style={{ fontWeight: 'bold' }}>
                        {date.toLocaleDateString('en-US', { weekday: 'long' })}
                      </Text>
                      <Text variant="body2" style={{ color: colors.midGray }}>
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </div>
                    {dayMealPlan && (
                      <Text variant="body2" style={{ color: colors.primary }}>
                        {dayMealPlan.meals.length} meals planned
                      </Text>
                    )}
                  </Flex>
                  
                  {dayMealPlan && (
                    <div style={{ marginTop: spacing.sm }}>
                      {dayMealPlan.meals.map(meal => (
                        <Flex key={meal.id} align="center" style={{ marginTop: spacing.xs }}>
                          <div style={{ 
                            width: '10px', 
                            height: '10px', 
                            borderRadius: '50%', 
                            backgroundColor: 
                              meal.type === 'breakfast' ? colors.accent3 :
                              meal.type === 'lunch' ? colors.accent2 :
                              colors.accent1,
                            marginRight: spacing.xs
                          }} />
                          <Text variant="body2" style={{ marginRight: spacing.xs }}>
                            {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}:
                          </Text>
                          <Text variant="body2" style={{ flex: 1 }}>
                            {meal.title}
                          </Text>
                          {meal.prepTimeMinutes && (
                            <Flex align="center">
                              <Clock size={12} style={{ marginRight: '2px' }} />
                              <Text variant="body2">{meal.prepTimeMinutes} min</Text>
                            </Flex>
                          )}
                        </Flex>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/advanced')}
          style={{ width: '100%' }}
        >
          Add New Meal Plan
        </Button>
      </div>
    </Container>
  );
};

export default MealPlanningCalendar;
