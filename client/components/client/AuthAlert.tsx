"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLoginDialog } from "@/store/useLoginDialogStore";
import { Session } from "next-auth";
import SignIn from "./SignIn";
export const AuthAlert = ({ session }: { session: Session | null }) => {
  const { open, setOpen } = useLoginDialog((state) => ({
    open: state.open,
    setOpen: state.setOpen,
  }));
  React.useEffect(() => {
    if (!session) {
      setOpen(true);
    }
    if (session) {
      setOpen(false);
    }
  }, [session, setOpen]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please log in with Google</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start w-full gap-4 mt-4">
          <SignIn />
          <DialogClose className="border px-4 py-2 rounded-md border-input bg-background hover:bg-accent hover:text-accent-foreground">
            Do Later
          </DialogClose>
        </div>
      </DialogContent>
      {/* <Toaster /> */}
    </Dialog>
  );
};
