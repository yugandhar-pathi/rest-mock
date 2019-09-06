import React from "react";
import { Box, Button, Text, Layer } from "grommet";
import { FormClose, StatusCritical } from "grommet-icons";

const NotificationLayer = ({ notificationText, onClose, dataTestid }) => {
  return (
    <Layer
      data-testid={dataTestid}
      position="top"
      modal={false}
      margin={{ vertical: "medium", horizontal: "small" }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="medium"
        elevation="medium"
        pad={{ vertical: "xsmall", horizontal: "small" }}
        background="status-error"
      >
        <Box align="center" direction="row" gap="xsmall">
          <StatusCritical />
          <Text>{notificationText}</Text>
        </Box>
        <Button
          data-testid="closeNotification"
          icon={<FormClose />}
          onClick={onClose}
          plain
        />
      </Box>
    </Layer>
  );
};

export default NotificationLayer;
