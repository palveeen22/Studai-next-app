'use client';

import { getInitials } from '@/shared/lib/utils';
import Image from "next/image";


interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
};


export function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={48}
        height={48}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className || ""}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[#F5C542] text-[#2D2D2D] font-semibold ${sizeClasses[size]} ${className || ""}`}
    >
      {getInitials(name)}
    </div>
  );
}

interface UserRowProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export function UserRow({ name, email, avatarUrl }: UserRowProps) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar name={name} avatarUrl={avatarUrl} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-gray-900">{name}</p>
        <p className="truncate text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}
