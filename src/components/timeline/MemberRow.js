import React from 'react';
import { Box, styled } from '@mui/material';
import useTimelineStore from '../../store/timelineStore';

const MemberRow = styled(Box)({
  display: 'flex',
  height: '60px',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const MemberRowComponent = ({ member, children }) => {
  const { setSelectedMember } = useTimelineStore();

  const handleClick = () => {
    setSelectedMember(member);
  };

  return (
    <MemberRow onClick={handleClick}>
      {children}
    </MemberRow>
  );
};

export default MemberRowComponent; 