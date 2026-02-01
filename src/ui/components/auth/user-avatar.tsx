import type { User } from "../../../core/domain/models/User"

interface UserAvatarProps {
  user?: User
}

export function UserAvatar({ user }: UserAvatarProps) {
  if (!user?.photoURL) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-500 text-white text-sm sm:text-base font-semibold shrink-0">
          {user?.name?.[0]}
        </div>

        <span className="text-sm sm:text-base truncate max-w-35 sm:max-w-45 md:max-w-none">
          {user?.name}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-500 overflow-hidden shrink-0">
        <img
          src={user.photoURL}
          alt={`Foto de perfil de ${user.name}`}
          referrerPolicy="no-referrer"
          draggable="false"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="text-sm sm:text-base truncate max-w-35 sm:max-w-45 md:max-w-none">
        {user.name}
      </span>
    </div>
  )
}
