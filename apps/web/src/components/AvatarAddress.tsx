import { FC } from "react";
import useMainnetEnsAddress from "@/hooks/useMainnetEnsAddress";
import useMainnetEnsName from "@/hooks/useMainnetEnsName";
import useMainnetEnsAvatar from "@hooks/useMainnetEnsAvatar";
import makeBlockie from "ethereum-blockies-base64";
import { getAddress } from "ethers/lib/utils.js";

interface AvatarAddressProps extends React.SVGAttributes<HTMLOrSVGElement> {
  address: string;
  ens: string;
}

const AvatarAddress: FC<AvatarAddressProps> = ({ address, ens }) => {
  const blockie = makeBlockie(address || ens);
  return (
    <>
      <div className="flex-shrink-0">
        <img className="w-8 h-8 rounded-full" src={blockie} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {ens}
        </p>
        <p className="text-xs font-medium text-gray-500 truncate dark:text-white">
          <div className="flex flex-row items-center gap-1">
            <span className="flex w-2 h-2 bg-green-500 rounded-full"></span>
            <p>{middleElipse(address)}</p>
          </div>
        </p>
      </div>
    </>
  );
};

export default AvatarAddress;

function middleElipse(str: string = ""): string {
  if (str.length > 35) {
    return str.substr(0, 8) + "..." + str.substr(str.length - 8, str.length);
  }
  return str;
}