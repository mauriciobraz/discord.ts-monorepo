interface UnnamedImageProps {
  abbreviation: string;
  size?: number;
}

export default function UnnamedImage({
  abbreviation,
  size = 64,
}: UnnamedImageProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: "#2f3136",
        }}
      >
        <span className="select-none text-xl font-bold text-white">
          {abbreviation}
        </span>
      </div>
    </div>
  );
}
