
export default function UserBlock() {
  return (
    <div>hey user Block

<span onClick={() => blockUser(user._id, user.isActive)} id="blockUser" className="text-red-600 hover:underline hover:cursor-pointer">
              {user.isActive ? 'Block' : 'UnBlock'}
          </span>
    </div>
  )
}
