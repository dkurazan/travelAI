import SidebarHeader from "./SidebarHeader";
import NavLinks from "./NavLinks";
import MemberProfile from "./MemberProfile";

export default function Sidebar() {
  return (
    <div className="drawer-side z-15">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto] ">
        <SidebarHeader />
        <NavLinks />
        <MemberProfile />
      </div>
    </div>
  );
}
