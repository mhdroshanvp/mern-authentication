import { UserTable } from "../components/UserTable";

export default function Admin() {
  console.log("iniside admin");
  return (
    <div className="mt-11">
      <UserTable />
    </div>
  );
}
