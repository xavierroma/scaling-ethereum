import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement, useState } from "react";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import Image from "next/image";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { useEnsAddress, useNetwork } from "wagmi";
import FormSectionArrow from "@/components/Form/FormSectionArrow";
import FormSection from "@/components/Form/FormSection";
import Button from "@/components/Button";
import AvatarAddress from "@/components/AvatarAddress";
import arbitrum from "@/components/chainIcons/arbitrum.svg";
import { splitFiatAmountIntoParts } from "@/utils/splitAmountIntoParts";
import { fetchEnsName, fetchEnsAddress } from "wagmi/actions";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SetAmount: NextPageWithLayout = () => {
  const network = useNetwork();
  useEnsAddress();
  const amount = useCreateRequestStore((store) => store.amount);
  const setAmount = useCreateRequestStore((store) => store.setAmount);
  const [description, setDescription] = useCreateRequestStore((store) => [
    store.description,
    store.setDescription,
  ]);
  const [splits, setSplits] = useCreateRequestStore((store) => [
    store.splits,
    store.setSplits,
  ]);
  const [address, setAddress] = useState<string>("");

  const addSplit = async (addr: string) => {
    if (!addr) return;
    if (splits.find((s) => s.address === addr || s.ens === addr)) {
      setAddress("");
      return;
    }
    const newSplits = [...splits];
    if (addr.endsWith(".eth")) {
      const address = await fetchEnsAddress({
        name: addr,
        chainId: 1,
      });
      if (!address) return;
      newSplits.push({ address, ens: addr, amount: 0 });
    } else if (addr.startsWith("0x")) {
      const ensName = await fetchEnsName({
        address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
        chainId: 1,
      });
      if (!ensName) return;
      newSplits.push({ address: addr, ens: ensName, amount: 0 });
    }
    newSplits.forEach(
      (split, i) =>
        (split.amount = splitFiatAmountIntoParts(amount, newSplits.length)[i])
    );
    setSplits(newSplits);

    setAddress("");
  };

  const removeSplit = (addr: string) => {
    setSplits(splits.filter((s) => s.address === addr || s.ens === addr));
  };
  return (
    <div className="flex flex-1 flex-col max-w-2xl mx-auto justify-center items-center">
      <FormSection title="Chain" disabled={true}>
        <div className="flex items-center gap-2">
          <Image src={arbitrum} alt="ETH" width="24" height="24" />
          <span className="font-bold">{network.chain?.name}</span>
        </div>
      </FormSection>

      <FormSectionArrow />

      <FormSection title="Amount" disabled={true}>
        <div className="flex gap-1">
          <input
            type="number"
            defaultValue={amount || undefined}
            placeholder="50.00"
            className="flex flex-1 w-full bg-transparent rounded-xl p-2 -m-2 text-2xl focus:outline-none"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const value = input.value;
              setAmount(Number(value));
            }}
          />

          <div className="flex items-center gap-2 p-2 bg-gray-50 border rounded-xl">
            <Image src={DAI} alt="DAI" width="32" height="32" />
            <span>DAI</span>
          </div>
        </div>
      </FormSection>

      <FormSectionArrow />

      <FormSection title="Description">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={description}
            placeholder="What is this request for?"
            className="flex flex-1 w-full bg-transparent rounded-xl p-2 -m-2 text-xl focus:outline-none"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const value = input.value;
              setDescription(value);
            }}
          />
        </div>
      </FormSection>
      <FormSectionArrow />

      <FormSection title="Split with">
        <div className="flex flex-row gap-1">
          <input
            value={address}
            type="text"
            id="address"
            placeholder="vitalik.eth"
            className="flex flex-1 w-full bg-transparent rounded-xl p-2 -m-2 text-xl focus:outline-none"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const value = input.value;
              setAddress(value);
            }}
          />
          <Button.Secondary
            disabled={address.length < 4}
            onClick={() => addSplit(address)}
          >
            Add
          </Button.Secondary>
        </div>
        <div className="flex flex-col gap-1">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {splits.map((split) => (
              <li className="py-3 sm:py-4" key={split.address}>
                <div className="flex items-center space-x-4">
                  <AvatarAddress address={split.address} ens={split.ens} />
                  <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                    {formatter.format(split.amount)}
                  </div>
                  <Button.Icon onClick={() => removeSplit(split.address)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FormSection>
    </div>
  );
};

SetAmount.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SetAmount;
