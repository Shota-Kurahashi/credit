import { Anchor, Checkbox, Table } from "@mantine/core";
import React, { FC, useState } from "react";
import { useGmail } from "../hooks/useGmail";
import { useQueryGmail } from "../hooks/useQueryGmail";

export const DashBoard: FC = () => {
  useGmail();
  const data = useQueryGmail();
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <Table
        fontSize="lg"
        withBorder
        className="w-fit"
        verticalSpacing="md"
        horizontalSpacing="xl"
      >
        <thead>
          <tr className="space-x-6">
            <th>購入日時</th>
            <th>値段</th>
            <th>詳細</th>
            <th>支払い</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            if (item.isLoading) {
              return null;
            }

            return (
              <tr key={item.data?.id}>
                <td>{item?.data?.deliveryDate}</td>
                <td>{item?.data?.price}</td>
                <td>
                  <Anchor href={item?.data?.deliveryUrl as string}>詳細</Anchor>
                </td>
                <td>
                  <Checkbox.Group value={value} onChange={setValue}>
                    <Checkbox value={`${item.data?.id}-mom`} />
                    <Checkbox color="red" value={`${item.data?.id}-me`} />
                  </Checkbox.Group>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
