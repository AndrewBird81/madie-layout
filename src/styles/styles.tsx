/** @format */

import tw, { styled } from "twin.macro";
export const DropDown = styled.div((props: any) => [
  tw`lg:flex flex-grow items-center`,
]);
export const DropMenu = tw.ul`
    flex flex-col lg:flex-row list-none lg:ml-auto md:w-full md:items-center
    lg:justify-end
`;
