import React, { useState, useRef } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    styled, 
    TextField, 
    Button, 
    Chip, 
    ToggleButtonGroup, 
    ToggleButton,
    IconButton,
    alpha // Import alpha for selection overlay transparency
} from '@mui/material';
// Remove DatePicker imports
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import TodayIcon from '@mui/icons-material/Today';
import CheckIcon from '@mui/icons-material/Check';
import ClassIcon from '@mui/icons-material/Class';
import PaymentIcon from '@mui/icons-material/Payment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Styled Components (similar structure to HistoryView or Timeline)
const TimeframeContainerStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default, // Slightly different bg for contrast
    marginTop: 'auto', // Push to bottom if HistoryView is flex column
}));

const ControlsRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap', // Allow wrapping on smaller screens
    gap: theme.spacing(2),
}));

const DateControls = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
}));

const TypeLegend = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

const TimeframeVisualization = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '60px', // Reduced height for simplicity
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    cursor: 'ew-resize',
}));

const TimeAxis = styled(Box)({ // Simple hour markers
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px',
});

const HourMarker = styled(Box)(({ theme }) => ({
    width: '1px',
    height: '100%',
    backgroundColor: theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& span': {
        fontSize: '10px',
        color: theme.palette.text.secondary,
        marginTop: '2px',
        transform: 'translateY(12px)', // Position label below line
    },
}));

const EventMarker = styled(Box)(({ theme, eventType }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    backgroundColor: getTypeColor(theme, eventType),
    zIndex: 1,
    border: `1px solid ${theme.palette.background.paper}` // Add border for visibility
}));

const SelectionOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    pointerEvents: 'none',
    zIndex: 2,
}));

// Utility to get color based on type (ensure consistency or import from HistoryView)
const getTypeColor = (theme, type) => {
    switch (type) {
        case 'checkin': return theme.palette.success.main;
        case 'class': return theme.palette.info.main;
        case 'payment': return theme.palette.warning.main;
        case 'suggestion': return theme.palette.secondary.main;
        case 'maintenance': return theme.palette.error.main;
        case 'report': return theme.palette.primary.main;
        default: return theme.palette.grey[500];
    }
};

// Utility to get icon based on type (ensure consistency or import from HistoryView)
const getTypeIcon = (type) => {
    switch (type) {
      case 'checkin': return <CheckIcon fontSize="inherit" />;
      case 'class': return <ClassIcon fontSize="inherit" />;
      case 'payment': return <PaymentIcon fontSize="inherit" />;
      case 'suggestion': return <LightbulbIcon fontSize="inherit" />;
      case 'maintenance': return <BuildIcon fontSize="inherit" />;
      case 'report': return <AssessmentIcon fontSize="inherit" />;
      default: return null;
    }
  };

// Available types definition (ensure consistency or import from HistoryView)
const availableTypes = [
    { type: "checkin", label: "Check-in", icon: <CheckIcon fontSize="small" /> },
    { type: "class", label: "Clasă", icon: <ClassIcon fontSize="small" /> },
    { type: "payment", label: "Plată", icon: <PaymentIcon fontSize="small" /> },
    { type: "suggestion", label: "Sugestie", icon: <LightbulbIcon fontSize="small" /> },
    { type: "maintenance", label: "Mentenanță", icon: <BuildIcon fontSize="small" /> },
    { type: "report", label: "Raport", icon: <AssessmentIcon fontSize="small" /> },
];

const TimeframeView = ({ 
    historyData, 
    selectedDate, // string yyyy-mm-dd
    selectedTypes, 
    timeRange, 
    customRange,
    onTimeRangeChange,
    onCustomRangeChange,
    onDateChange, // function(newDateString)
    onTypeToggle // function(type)
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartCoord, setDragStartCoord] = useState(null);
    const [dragCurrentCoord, setDragCurrentCoord] = useState(null);
    const timelineRef = useRef(null);

    // No need to convert date for TextField type=date
    // const datePickerValue = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();

    // TextField type=date directly provides the string in 'yyyy-mm-dd' format
    const handleDateChange = (event) => {
        onDateChange(event.target.value);
    };

    const handleMouseDown = (e) => {
        if (!timelineRef.current) return;
        setIsDragging(true);
        const rect = timelineRef.current.getBoundingClientRect();
        const startPixel = e.clientX - rect.left;
        setDragStartCoord(startPixel);
        setDragCurrentCoord(startPixel);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        setDragCurrentCoord(Math.max(0, Math.min(e.clientX - rect.left, rect.width)));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (timelineRef.current && dragStartCoord !== null && dragCurrentCoord !== null) {
            const rect = timelineRef.current.getBoundingClientRect();
            const startPixel = Math.min(dragStartCoord, dragCurrentCoord);
            const endPixel = Math.max(dragStartCoord, dragCurrentCoord);
            
            const startHour = (startPixel / rect.width) * 24;
            const endHour = (endPixel / rect.width) * 24;

            if (endHour - startHour >= 0.5) { 
                onCustomRangeChange({ start: startHour, end: endHour });
            } else {
                 // Optional: reset on small click?
            }
        }
        setDragStartCoord(null);
        setDragCurrentCoord(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const resetTimeRange = () => {
        onCustomRangeChange(null);
        onTimeRangeChange('all'); 
    };

    // Filter events only for visualization within this component's date
    const eventsForVisualization = historyData.filter(item => {
        const itemDate = item.timestamp.split(' ')[0];
        return itemDate === selectedDate && 
               (selectedTypes.length === 0 || selectedTypes.includes(item.type));
    });

    return (
        // Remove LocalizationProvider
        <TimeframeContainerStyled>
            <ControlsRow>
                <DateControls>
                    {/* Use TextField type="date" */}
                     <TextField
                        type="date"
                        label="Data"
                        value={selectedDate} // Pass string date directly
                        onChange={handleDateChange} // Use updated handler
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                        sx={{ maxWidth: '180px' }}
                     />
                     <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
                        startIcon={<TodayIcon />}
                        disabled={selectedDate === new Date().toISOString().split('T')[0]}
                      >
                        Azi
                     </Button>
                </DateControls>
                <ToggleButtonGroup
                    value={timeRange === 'custom' && customRange ? 'custom' : timeRange} 
                    exclusive
                    onChange={(event, newRange) => { 
                        if (newRange !== null && newRange !== 'custom') { 
                            onTimeRangeChange(newRange); 
                        } else if (newRange === null && customRange) {
                            // Prevent deselecting custom range directly
                        } else if (newRange === null) {
                            onTimeRangeChange('all') 
                        }
                    }}
                    aria-label="Time Range"
                    size="small"
                >
                    <ToggleButton value="all" aria-label="all day">Toată ziua</ToggleButton>
                    <ToggleButton value="morning" aria-label="morning">Dimineață</ToggleButton>
                    <ToggleButton value="afternoon" aria-label="afternoon">După-amiază</ToggleButton>
                    <ToggleButton value="evening" aria-label="evening">Seară</ToggleButton>
                     {customRange && 
                         <ToggleButton value="custom" aria-label="custom range" selected>
                            {`${Math.floor(customRange.start)}: ${String(Math.floor((customRange.start % 1)*60)).padStart(2,'0')} - ${Math.floor(customRange.end)}:${String(Math.floor((customRange.end % 1)*60)).padStart(2,'0')}`}
                         </ToggleButton>
                     }
                </ToggleButtonGroup>
                {customRange && (
                    <Button 
                        variant="outlined" 
                        size="small" 
                        color="secondary" 
                        onClick={resetTimeRange}
                    >
                        Resetare Interval
                    </Button>
                 )}
            </ControlsRow>
            <TypeLegend>
                {availableTypes.map(item => (
                    <Chip
                        key={item.type}
                        icon={React.cloneElement(item.icon, { sx: { color: selectedTypes.includes(item.type) ? 'inherit' : getTypeColor }})} 
                        label={item.label}
                        size="small"
                        clickable
                        onClick={() => onTypeToggle(item.type)}
                        color={selectedTypes.includes(item.type) ? "primary" : "default"}
                        variant={selectedTypes.includes(item.type) ? "filled" : "outlined"}
                        sx={!selectedTypes.includes(item.type) ? {
                            borderColor: getTypeColor,
                            color: getTypeColor,
                            '& .MuiChip-icon': {
                                color: getTypeColor
                            }
                        } : {}}
                    />
                ))}
            </TypeLegend>

            {/* Simplified Timeframe Visualization */}
            <TimeframeVisualization 
                ref={timelineRef}
                onMouseDown={handleMouseDown} 
             >
                <TimeAxis>
                   {[0, 6, 12, 18].map((hour) => (
                        <HourMarker key={hour} style={{ position: 'absolute', left: `${(hour/24)*100}%`}}>
                           <span>{`${hour}:00`}</span>
                        </HourMarker>
                   ))}
                   <HourMarker style={{ position: 'absolute', right: '0px'}}>
                      <span>24:00</span>
                   </HourMarker>
                </TimeAxis>
                {eventsForVisualization.map((item) => {
                    const hour = parseInt(item.timestamp.split(' ')[1].split(':')[0]);
                    const minutes = parseInt(item.timestamp.split(' ')[1].split(':')[1]);
                    const positionPercent = ((hour + minutes / 60) / 24) * 100;
                    const clampedPosition = Math.min(positionPercent, 99.5); 

                    return (
                        <EventMarker
                            key={item.id}
                            eventType={item.type}
                            style={{ left: `${clampedPosition}%` }}
                            title={`${item.title} - ${item.timestamp}`}
                        />
                    );
                })}
                {isDragging && dragStartCoord !== null && dragCurrentCoord !== null && timelineRef.current && (
                     <SelectionOverlay 
                        style={{
                          left: `${(Math.min(dragStartCoord, dragCurrentCoord) / timelineRef.current.clientWidth) * 100}%`,
                          width: `${(Math.abs(dragCurrentCoord - dragStartCoord) / timelineRef.current.clientWidth) * 100}%`,
                        }}
                     />
                )}
                {!isDragging && customRange && (
                     <SelectionOverlay 
                        style={{
                          left: `${(customRange.start / 24) * 100}%`,
                          width: `${((customRange.end - customRange.start) / 24) * 100}%`,
                          borderStyle: 'solid',
                        }}
                     />
                )}
            </TimeframeVisualization>

        </TimeframeContainerStyled>
    );
};

export default TimeframeView; 