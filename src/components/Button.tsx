'use client'

import { usePathname } from 'next/navigation';
import type { ReactNode, ElementType } from "react";
import Link from "next/link";
import clsx from 'clsx';

type ButtonProps = {
  children?: ReactNode;
  active?: boolean; //Style the button if its target path matches the current pathname
  raw?: boolean; //Removes default styling to allow for fully custom button styles
  variant?: 'fill' | 'outline_pink' | 'outline_blue' | 'text' | 'side_bar' | 'shelf' | 'card_play' | 'play';  //Button variants
  className?: string;
  href?: string; 
  Icon?: ElementType
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children, 
    active=false,
    raw=false,
    variant='fill', 
    className='', 
    href,
    Icon, 
    ...props
}: ButtonProps){
    const pathname = usePathname();

    const isActive = active && pathname===href;

    //Base styles shared by most button variants
    const baseStyles = "rounded-lg transition-all items-center flex w-40 font-[family-name:var(--font-geist-sans)] ";

    //Styles specific to each button variant
    const variantStyles = {
      fill: "bg-normal-pink",
      outline_pink: "outline outline-normal-pink",
      outline_blue: "outline outline-normal-blue",
      text: "bg-transparent ",
      side_bar: "bg-transparent text-sm",
      shelf:'bg-card w-32 h-32 xl:w-16 xl:h-16 rounded-full flex flex-shrink-0 justify-center items-center hover:scale-110 hover:bg-card-hover transition-all',
      card_play:'absolute z-10 w-14 h-14 hover:scale-110 shadow-black shadow-sm bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-25 right-4',
      play:'w-14 h-14 hover:scale-110 shadow-black shadow-sm bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center cursor-pointer opacity-100 transition-opacity duration-300 '
    };

    //Styles applied when a button is active (if its target path matches the current pathname)
    const activeVariantStyles = {
      fill: "bg-normal-pink", 
      outline_pink: "outline-normal-pink",
      outline_blue: "outline-normal-blue",
      text: "bg-normal-pink p-2",
      side_bar: "bg-normal-pink p-2 text-xl",
      shelf: '',
      card_play: '',
      play: '',
    };

    //Combine base, variant, and active styles conditionally
    const combinedStyles = clsx(
      { [baseStyles] : !raw },
      { [variantStyles[variant]] : !isActive},
      { [activeVariantStyles[variant]]: isActive && !raw},
      className
    );

    //Styles applied to button icons
    const iconStyles = clsx(
      { [ "mr-2 h-5 w-5"] : !raw && !isActive}, // styles for inactive default buttons
      { [ "mr-2 h-6 w-6"] : !raw && isActive}, // styles for active default buttons
      { [ "h-12 w-12 xl:h-6 xl:w-6"] : raw && variant==="shelf" }, 

    );
    
    //Styles applied to button children
    const childrenStyles = clsx(
      { [ "absolute mt-48 xl:mt-24 text-center text-xl lg:text-lg"] : variant==="shelf"},
      {  [ "w-0 h-0 border-l-[20px] border-l-black border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"] : raw && (variant==="play" || variant==="card_play") }
    );
    
    if(href){
      return (
        <Link href={href} className={combinedStyles} {...props}>
          {Icon && <Icon className={iconStyles}/>}
          <div className={childrenStyles}>{children}</div>
        </Link>
      )
    }
    else{
      return(
       <button  className={combinedStyles} {...props}>
          {Icon && <Icon className={iconStyles}/>}
          <div className={childrenStyles}>{children}</div>
        </button>
      )
    }

    
}