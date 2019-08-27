import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DrawerMenuItem from './DrawerMenuItem';
import SupportTicket from 'components/SupportTicket';

const DrawerDialogFeedback = ({ text }) => {
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const closeSupport = () => setSupportTicketOpen(false);
  const openSupport = () => setSupportTicketOpen(true);
  return (
    <>
      <DrawerMenuItem onClick={openSupport}>{text}</DrawerMenuItem>
      <SupportTicket
        open={supportTicketOpen}
        onClose={closeSupport}
      />
    </>
  );
};

DrawerDialogFeedback.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DrawerDialogFeedback;
