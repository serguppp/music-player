'use client'

import { usePathname } from 'next/navigation';
import type { ReactNode, ElementType } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  variant?: 'fill' | 'outline_pink' | 'outline_blue' | 'text' | 'side_bar' ; 
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

    const baseStyles = "rounded-lg transition-all items-center flex w-40 font-[family-name:var(--font-geist-sans)] ";
    const variantStyles = {
        fill: "bg-normal-pink",
        outline_pink: "outline outline-normal-pink",
        outline_blue: "outline outline-normal-blue",
        text: "bg-transparent ",
        side_bar: "bg-transparent text-sm"
    };

    const activeVariantStyles = {
        fill: "bg-normal-pink", 
        outline_pink: "outline-normal-pink",
        outline_blue: "outline-normal-blue",
        text: "bg-normal-pink p-2",
        side_bar: "bg-normal-pink p-2 text-xl"
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