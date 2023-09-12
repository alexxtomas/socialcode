import { Avatar, Dropdown } from "flowbite-react";

export default function UserDropdown() {
  return (
    <Dropdown
      inline
      label={<Avatar alt="User settings" img="/images/people/profile-picture-5.jpg" rounded />}
      className="bg-white/10 bg-red-700"
    >
      s
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
