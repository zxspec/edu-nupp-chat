import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";
import { EditModal } from "../components/modals/EditModal";
import { LoginModal } from "../components/modals/LoginModal";
import { RegisterModal } from "../components/modals/RegisterModal";
import { UserSelectModal } from "../components/modals/UserSelectModal";
import { NewGroupModal } from "../components/modals/NewGroupModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <LoginModal />
      <RegisterModal />
      <EditModal />
      <UserSelectModal />
      <NewGroupModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
