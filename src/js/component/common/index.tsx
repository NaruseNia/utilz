import { ActionButton, Button, Content, Dialog, DialogTrigger, Header, Heading } from "@adobe/react-spectrum";
import { motion as m } from "framer-motion";
import { appInfo } from "../../lib/constant";
import { useState } from "react";
import Info from "@spectrum-icons/workflow/Info";

export const UtHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="fixed z-50 flex items-center w-screen h-8 px-4 bg-neutral-800"
    >
      <span className="">Utilz</span>
      <button className="ml-auto" onClick={() => setIsOpen(!isOpen)}>
        <Info size="S" />
      </button>
      <DialogTrigger type="modal" isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
        <div />
        {(_) => (
          <Dialog>
            <Heading>{appInfo.title}</Heading>
            <Content>
              <span className="text-neutral-500">by {appInfo.author}</span>
              <p>{appInfo.description}</p>
            </Content>
          </Dialog>
        )}
      </DialogTrigger>
    </m.div>
  )
}
