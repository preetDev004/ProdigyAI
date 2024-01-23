import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="loader" src="/logo.png" fill sizes="auto" />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Preparing the response...
      </p>
    </div>
  );
};
