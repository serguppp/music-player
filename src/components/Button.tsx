'use client'

import { usePathname } from 'next/navigation';
import type { ReactNode, ElementType } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  variant?: 'fill' | 'outline' | 'text'; 
  className?: string;
  href: string; 
  Icon?: ElementType
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
    children, 
    variant='fill', 
    className='', 
    href,
    Icon, 
    ...props
}: ButtonProps){
    const pathname = usePathname();

    const isActive = (href === "/") ? pathname === href : pathname.startsWith(href);

    const baseStyles = "rounded-lg transition-all items-center flex w-40";
    const variantStyles = {
        fill: "bg-normal-pink text-sm",
        outline: "bg-transparent outline-normal-pink text-sm" ,
        text: "bg-transparent text-sm",
    };

    const activeVariantStyles = {
        fill: "bg-darker-pink", 
        outline: "outline-darker-pink",
        text: "bg-normal-pink text-base p-2",
    };

    const combinedStyles = `${baseStyles} ${isActive ? activeVariantStyles[variant] : variantStyles[variant]} ${className}`;

    const iconStyles = `${isActive ? "mr-2 h-6 w-6": "mr-2 h-5 w-5"}`;
    
    return (
      <Link href={href} className={combinedStyles} {...props}>
        {Icon && <Icon className={iconStyles}/>}
        {children}
      </Link>
    )
}