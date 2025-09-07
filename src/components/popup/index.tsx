import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import React from "react";
export default function Popup({OpenButton, Content}: Readonly<{OpenButton:React.ReactNode, Content: React.ReactNode}>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {OpenButton}
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