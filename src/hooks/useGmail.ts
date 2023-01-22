/* eslint-disable camelcase */
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useGlobalStore } from "../store/globalStore";
import { TokenRes } from "../types/type";
import { createClient } from "./utils/createAxios";

export const useGmail = () => {
  const router = useRouter();
  const setClient = useGlobalStore((state) => state.setClient);
  const setIsClient = useGlobalStore((state) => state.setIsClient);

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
  const secretClientId = process.env.NEXT_PUBLIC_SECRET_CLIENT_ID as string;
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL as string;
  const getTokenUrl = process.env.NEXT_PUBLIC_GET_TOKEN_URL as string;

  const auth = useCallback(
    async (code: string) => {
      try {
        const response = await axios.post<TokenRes>(getTokenUrl, {
          code,
          client_id: clientId,
          client_secret: secretClientId,
          redirect_uri: redirectUrl,
          grant_type: "authorization_code",
        });

        const { access_token } = response.data;
        const getClient = createClient(access_token);
        setClient(getClient);
        setIsClient(true);
      } catch (error: unknown) {
        router.push("/");
      }
    },
    [
      clientId,
      getTokenUrl,
      redirectUrl,
      router,
      secretClientId,
      setClient,
      setIsClient,
    ]
  );

  useEffect(() => {
    const { code } = router.query;

    if (!code && router.isReady) {
      router.push("/");
    } else if (router.isReady) {
      auth(code as string);
    }
  }, [auth, router]);
};
