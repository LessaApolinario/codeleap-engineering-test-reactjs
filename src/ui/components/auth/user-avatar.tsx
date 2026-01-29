import type { User } from "../../../core/domain/models/User"

interface UserAvatarProps {
  user?: User
}

export function UserAvatar({ user }: UserAvatarProps) {
  if (!user?.photoURL) {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 text-white">
          {user?.name[0]}
        </div>
        <span className="text-sm">{user?.name}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
        <img
          src={user.photoURL}
          alt={`Foto de perfil de ${user.name}`}
          referrerPolicy="no-referrer"
          draggable="false"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm">{user.name}</span>
    </div>
  )
}
