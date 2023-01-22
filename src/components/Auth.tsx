import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { GoogleIcon } from "./GoogleIcon";

export const Auth: FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <Button
        classNames={{
          label: "font-bold",
          root: "bg-white text-gray-800 border border-gray-800 shadow-md",
        }}
        leftIcon={<GoogleIcon />}
        variant="default"
        color="gray"
        radius="xl"
        onClick={() => {
          router.push(process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string);
        }}
      >
        Googleでログイン
      </Button>
    </div>
  );
};
