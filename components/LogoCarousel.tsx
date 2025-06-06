// components/LogoCarousel.tsx
const logos = [
  "/spotify.svg",
  "/zapier.svg",
  "/porsche.svg",
  "/uber.svg",
  "/nike.svg",
  "/mclaren.svg",
  "/adidas.svg",
  "/openai.svg"
];

export default function LogoCarousel() {
  return (
    <div>
    <div className="text-black text-center text-4xl font-bold left-0 right-0 mb-15 top-[1000px]"><h1>We Use The Same Frameworks As</h1></div>
    <div className="relative overflow-hidden py-4">

      {/* Scrolling Track */}
      <div className="flex animate-scroll space-x-12">
        {logos.map((src, idx) => (
          <div key={idx} className="flex items-center justify-center h-[30px] w-[110px] brightness-0">
            <img
              src={src}
              alt={`Logo ${idx}`}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

