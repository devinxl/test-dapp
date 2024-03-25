import React, { useState } from "react";
import { useAccount } from "wagmi";

export const PersonalSign = () => {
  const exampleMessage = "Example `personal_sign` message";
  const { address, connector } = useAccount();
  const [sign, setSign] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSignClick = async () => {
    try {
      const provider: any = await connector?.getProvider();
      if (!provider) {
        throw new Error("No provider");
      }
      const from = address;
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
      const sign = await provider.request({
        method: "personal_sign",
        params: [msg, from, "Example password"],
      });
      setSign(sign);
      setError(null);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      setSign(null);
    }
  };
  return (
    <div>
      <button onClick={onSignClick}>Personal Sign</button>
      <div>
        {sign && (
          <div>
            <h3>Signature</h3>
            <pre>{sign}</pre>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div>
            <h3>Error</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
