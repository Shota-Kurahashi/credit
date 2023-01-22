export type TokenRes = {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
};

export type GetEmailId = {
  id: string;
  threadId: string;
};

export type GmailRes = {
  messages: GetEmailId[];
  nextPageToken: string;
};

export type Email = {
  id: string;
  historyId: string;
  internalDate: string;
  labelIds: string[];
  payload: {
    partId: string;
    mimeType: string;
    filename: string;
    parts: {
      partId: string;
      mimeType: string;
      filename: string;
      body: {
        size: number;
        data: string;
      };
    }[];
  };
  snippet: string;
  threadId: string;
};

export type HtmlData = {
  price: string | null | undefined;
  deliveryUrl: string | null | undefined;
  deliveryDate: string | null | undefined;
};

export type ProcessingEmail = {
  id: string;
  price: string | null | undefined;
  deliveryUrl: string | null | undefined;
  deliveryDate: string | null | undefined;
};
