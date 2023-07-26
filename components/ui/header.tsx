import Image from "next/image";

export default function Header() {
  return (
    <div className="h-12 w-full bg-black flex justify-center items-center">
      <Image src="/logo.png" alt="Lush" width={150} height={150} />
    </div>
  );
}
