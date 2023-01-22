import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../store/globalStore";
import { Email, GetEmailId, GmailRes, ProcessingEmail } from "../types/type";
import { processingEmail } from "./utils/decodeHtml";

export const useQueryGmail = () => {
  const isClient = useGlobalStore((state) => state.isClient);
  const client = useGlobalStore((state) => state.client);
  const [ids, setIds] = useState<GetEmailId[]>([]);

  useEffect(() => {
    const getEmailIds = async () => {
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT as string;

      const res = await client.get<GmailRes>(endpoint, {
        params: {
          maxResults: 100,
          includeSpamTrash: false,
          q: "from:amazon AND after:2022/12/1 AND  before:2023/2/1 AND +Amazon.co.jpをご利用いただき、ありがとうございます。本日、Amazon.co.jpが商品を発送し、ご注文が完了したことをお知らせいたします。 ご注文商品の返品やご注文内容の変更をする必要がある場合は、Amazon.co.jpの注文履歴にアクセスしてください。領収書は、こちらから印刷することができます。 ",
        },
      });

      return res.data;
    };

    if (isClient) {
      getEmailIds().then((data) => setIds(data.messages));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  const getEmail = async (id: string): Promise<ProcessingEmail> => {
    const endpoint = `${process.env.NEXT_PUBLIC_EMAIL_ENDPOINT}${id}`;

    const res = await client.get<Email>(endpoint, {
      params: {
        format: "full",
      },
    });

    const processData = processingEmail(res.data);
    const data: ProcessingEmail = {
      id: res.data.id,
      ...processData,
    };

    return data;
  };

  return useQueries({
    queries: ids?.map((item) => ({
      queryKey: ["email", item.id],
      queryFn: () => getEmail(item.id),
      enabled: isClient && !!ids,
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });
};
