import { Dialog, Portal, CloseButton, Text, Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
export default function Popup({OpenButton, Content}: Readonly<{OpenButton:React.ReactNode, Content: React.ReactNode}>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Box 
            p="4"
            borderWidth="1px"
            borderColor="border.disabled"
            color="fg.disabled">
          {OpenButton}
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton/>
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Body>
                {Content}
              </Dialog.Body>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}