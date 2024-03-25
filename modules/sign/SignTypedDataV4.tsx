import React, { use, useState } from "react";
import { useAccount } from "wagmi";

export const SignTypedDataV4 = () => {
  const exampleMessage = "Example `personal_sign` message";
  const { address, connector, chain} = useAccount();
  const [sign, setSign] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSignClick = async () => {
    const provider: any = await connector?.getProvider();
    if (!provider || !chain) {
      throw new Error("No provider");
    }
    const msgParams = {
      domain: {
        chainId: chain.id,
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };
    try {
      const from = address;
      const sign = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [from, JSON.stringify(msgParams)],
      });
      setSign(sign);
      setError(null)
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      setSign(null);
    }
  };
  return (
    <div>
      <button onClick={onSignClick}>Sign Typed Data V4</button>
      <div>
        {sign && (
          <div>
            <h3>Signature:</h3>
            <pre>{sign}</pre>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div>
            <h3>Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
