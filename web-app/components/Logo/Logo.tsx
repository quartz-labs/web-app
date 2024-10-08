import Image from "next/image";

export default function Logo() {
    return(
        <a href="https://quartzpay.io/" >
            <Image 
                className={"main-logo"}
                src="/logo.svg" 
                alt="Quartz" 
                width={360} 
                height={125}
            />
        </a>
    )
}