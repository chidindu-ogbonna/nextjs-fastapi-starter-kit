import Image from "next/image";

const logos = [
  { src: "/logos/everyday-dose.png", alt: "Everyday Dose" },
  { src: "/logos/bubs.png", alt: "Bubs" },
  { src: "/logos/hiya.png", alt: "Hiya" },
  { src: "/logos/backbone.png", alt: "Backbone" },
  { src: "/logos/immi.png", alt: "Immi" },
  { src: "/logos/mila.png", alt: "Mila" },
  { src: "/logos/obvi.png", alt: "Obvi" },
  { src: "/logos/rasa.png", alt: "Rasa" },
  { src: "/logos/dog-is-human.png", alt: "Dog is Human" },
  { src: "/logos/create.png", alt: "Create" }
];

export function LogoSection() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {logos.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={100}
          height={40}
          className="h-8 w-auto object-contain"
        />
      ))}
    </div>
  );
}
