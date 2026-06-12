import React from 'react';

// ── SVG Components for Premium Italian Elements ──

const BasilLeaves = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Large Leaf */}
    <path d="M50 85 C25 68, 20 38, 50 15 C80 38, 75 68, 50 85 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 85 Q48 50 50 15" />
    <path d="M50 62 Q35 52, 26 48" />
    <path d="M50 48 Q65 38, 74 34" />
    <path d="M50 35 Q35 26, 30 22" />
    <path d="M50 24 Q62 18, 68 15" />
    {/* Small overlapping Leaf */}
    <path d="M38 85 C18 70, 15 52, 38 38 C61 52, 58 70, 38 85 Z" fill="currentColor" fillOpacity="0.02" transform="rotate(-28, 38, 85)" />
  </svg>
);

const OliveSprig = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 200"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M50 15 Q55 65 50 185" />
    {/* Leaves */}
    <path d="M50 40 C35 30, 28 40, 50 50 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 55 C65 45, 72 55, 50 65 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 80 C35 70, 28 80, 50 90 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 95 C65 85, 72 95, 50 105 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 120 C35 110, 28 120, 50 130 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 135 C65 125, 72 135, 50 145 Z" fill="currentColor" fillOpacity="0.03" />
    {/* Little Olives */}
    <circle cx="42" cy="70" r="5" fill="currentColor" fillOpacity="0.04" />
    <circle cx="58" cy="115" r="5" fill="currentColor" fillOpacity="0.04" />
  </svg>
);

const CherryTomato = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="50" cy="55" r="28" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 27 L50 12 Q52 8, 58 10" />
    <path d="M50 27 L41 19" />
    <path d="M50 27 L59 19" />
    <path d="M50 27 Q44 30, 36 31" />
    <path d="M50 27 Q56 30, 64 31" />
    <path d="M32 46 Q34 38, 44 36" />
  </svg>
);

const WheatStalk = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 80 200"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M40 190 L40 15" />
    {/* Grains left & right */}
    <path d="M40 65 Q30 55, 32 45 Q40 55, 40 65 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 65 Q50 55, 48 45 Q40 55, 40 65 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 85 Q30 75, 32 65 Q40 75, 40 85 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 85 Q50 75, 48 65 Q40 75, 40 85 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 105 Q30 95, 32 85 Q40 95, 40 105 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 105 Q50 95, 48 85 Q40 95, 40 105 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 125 Q30 115, 32 105 Q40 115, 40 125 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 125 Q50 115, 48 105 Q40 115, 40 125 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 145 Q30 135, 32 125 Q40 135, 40 145 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M40 145 Q50 135, 48 125 Q40 135, 40 145 Z" fill="currentColor" fillOpacity="0.03" />
    {/* Beards */}
    <path d="M32 45 L15 12" />
    <path d="M48 45 L65 12" />
    <path d="M32 65 L17 32" />
    <path d="M48 65 L63 32" />
    <path d="M32 85 L19 52" />
    <path d="M48 85 L61 52" />
  </svg>
);

const RosemarySprig = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 80 180"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M40 170 Q43 90, 40 10" />
    <path d="M40 140 L20 125" />
    <path d="M40 140 L60 125" />
    <path d="M40 110 L15 90" />
    <path d="M40 110 L65 90" />
    <path d="M40 80 L12 55" />
    <path d="M40 80 L68 55" />
    <path d="M40 50 L15 25" />
    <path d="M40 50 L65 25" />
    <path d="M40 25 L25 5" />
    <path d="M40 25 L55 5" />
  </svg>
);

const LemonSlice = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="50" cy="50" r="35" fill="currentColor" fillOpacity="0.03" />
    <circle cx="50" cy="50" r="31" />
    {/* Segments */}
    <path d="M50 50 L50 19" />
    <path d="M50 50 L68 28" />
    <path d="M50 50 L78 50" />
    <path d="M50 50 L68 72" />
    <path d="M50 50 L50 81" />
    <path d="M50 50 L32 72" />
    <path d="M50 50 L22 50" />
    <path d="M50 50 L32 28" />
    {/* Inner segment arcs */}
    <path d="M47 24 C38 26, 28 35, 26 44" />
    <path d="M53 24 C62 26, 72 35, 74 44" />
  </svg>
);

const GarlicBulb = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M50 15 C50 15, 25 35, 25 60 C25 80, 36 90, 50 90 C64 90, 75 80, 75 60 C75 35, 50 15, 50 15 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M50 15 C45 35, 38 48, 38 65 C38 82, 44 90, 50 90" />
    <path d="M50 15 C55 35, 62 48, 62 65 C62 82, 56 90, 50 90" />
    <path d="M50 90 L50 95" />
    <path d="M47 93 L53 93" />
  </svg>
);

const CoffeeBean = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 80 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="40" cy="50" rx="23" ry="35" transform="rotate(-15, 40, 50)" fill="currentColor" fillOpacity="0.03" />
    <path d="M38 15 C38 15, 29 38, 42 58 C55 78, 41 85, 41 85" strokeWidth="1.5" />
  </svg>
);

const ChiliPepper = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 80 120"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M48 18 C38 23, 25 38, 23 62 C21 86, 38 104, 48 114 C37 99, 32 80, 35 60 C38 41, 46 27, 48 18 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M48 18 L50 8 Q53 5, 58 7" />
    <path d="M43 18 C43 18, 46 21, 51 19" />
  </svg>
);

const CheeseWedge = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 75 L85 75 L65 25 L15 75 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M65 25 L75 35 L75 75 L65 75 Z" fill="currentColor" fillOpacity="0.03" />
    <path d="M85 75 L75 75" />
    <circle cx="35" cy="65" r="3" fill="currentColor" fillOpacity="0.1" />
    <circle cx="45" cy="52" r="2" fill="currentColor" fillOpacity="0.1" />
    <circle cx="55" cy="62" r="4" fill="currentColor" fillOpacity="0.1" />
    <circle cx="70" cy="50" r="1.5" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// ── Background Configuration ──

interface BackgroundElement {
  component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  className: string;
  style: React.CSSProperties;
}

const landingElements: BackgroundElement[] = [
  { component: OliveSprig, className: 'absolute top-[5%] right-[2%] w-36 h-72 rotate-[40deg]', style: { animationDelay: '0s' } },
  { component: BasilLeaves, className: 'absolute top-[12%] left-[3%] w-24 h-24 rotate-[-15deg]', style: { animationDelay: '-1.5s' } },
  { component: WheatStalk, className: 'absolute top-[22%] right-[4%] w-20 h-52 rotate-[12deg]', style: { animationDelay: '-3s' } },
  { component: CherryTomato, className: 'absolute top-[30%] left-[2%] w-20 h-20 rotate-[25deg]', style: { animationDelay: '-4.5s' } },
  { component: RosemarySprig, className: 'absolute top-[40%] right-[3%] w-16 h-36 rotate-[-18deg]', style: { animationDelay: '-0.8s' } },
  { component: CheeseWedge, className: 'absolute top-[48%] left-[4%] w-24 h-24 rotate-[30deg]', style: { animationDelay: '-2.2s' } },
  { component: ChiliPepper, className: 'absolute top-[58%] right-[5%] w-16 h-24 rotate-[-22deg]', style: { animationDelay: '-5.1s' } },
  { component: LemonSlice, className: 'absolute top-[67%] left-[3%] w-24 h-24 rotate-[15deg]', style: { animationDelay: '-1.2s' } },
  { component: GarlicBulb, className: 'absolute top-[75%] right-[2%] w-20 h-20 rotate-[10deg]', style: { animationDelay: '-3.7s' } },
  { component: CoffeeBean, className: 'absolute top-[83%] left-[4%] w-16 h-20 rotate-[-35deg]', style: { animationDelay: '-2.5s' } },
  { component: OliveSprig, className: 'absolute top-[92%] right-[3%] w-28 h-56 rotate-[28deg]', style: { animationDelay: '-4s' } },
];

const menuElements: BackgroundElement[] = [
  { component: BasilLeaves, className: 'absolute top-[4%] left-[2%] w-24 h-24 rotate-[-20deg]', style: { animationDelay: '0s' } },
  { component: CherryTomato, className: 'absolute top-[15%] right-[3%] w-20 h-20 rotate-[15deg]', style: { animationDelay: '-2s' } },
  { component: WheatStalk, className: 'absolute top-[28%] left-[3%] w-16 h-40 rotate-[10deg]', style: { animationDelay: '-4s' } },
  { component: ChiliPepper, className: 'absolute top-[42%] right-[2%] w-16 h-24 rotate-[-15deg]', style: { animationDelay: '-1.5s' } },
  { component: CheeseWedge, className: 'absolute top-[56%] left-[4%] w-24 h-24 rotate-[25deg]', style: { animationDelay: '-3.5s' } },
  { component: GarlicBulb, className: 'absolute top-[70%] right-[3%] w-20 h-20 rotate-[-10deg]', style: { animationDelay: '-5.5s' } },
  { component: RosemarySprig, className: 'absolute top-[82%] left-[2%] w-16 h-36 rotate-[18deg]', style: { animationDelay: '-2.5s' } },
  { component: LemonSlice, className: 'absolute top-[93%] right-[2%] w-24 h-24 rotate-[35deg]', style: { animationDelay: '-0.5s' } },
];

const aboutElements: BackgroundElement[] = [
  { component: OliveSprig, className: 'absolute top-[8%] right-[4%] w-32 h-64 rotate-[30deg]', style: { animationDelay: '0s' } },
  { component: BasilLeaves, className: 'absolute top-[22%] left-[3%] w-24 h-24 rotate-[-25deg]', style: { animationDelay: '-2.5s' } },
  { component: CoffeeBean, className: 'absolute top-[38%] right-[5%] w-16 h-20 rotate-[15deg]', style: { animationDelay: '-1s' } },
  { component: WheatStalk, className: 'absolute top-[54%] left-[2%] w-18 h-44 rotate-[8deg]', style: { animationDelay: '-4.5s' } },
  { component: LemonSlice, className: 'absolute top-[70%] right-[3%] w-22 h-22 rotate-[-20deg]', style: { animationDelay: '-3s' } },
  { component: GarlicBulb, className: 'absolute top-[86%] left-[3%] w-20 h-20 rotate-[12deg]', style: { animationDelay: '-1.8s' } },
];

interface GlobalItalianBackgroundProps {
  page: 'landing' | 'menu' | 'about';
}

export default function GlobalItalianBackground({ page }: GlobalItalianBackgroundProps) {
  const elements =
    page === 'landing'
      ? landingElements
      : page === 'menu'
      ? menuElements
      : aboutElements;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none text-[#311e0c]/[0.05]">
      {elements.map((el, index) => {
        const Component = el.component;
        // Alternate floating animations for rich diversity: even indexes float, odd drift
        const animationClass = index % 2 === 0 ? 'animate-float' : 'animate-drift';
        return (
          <Component
            key={index}
            className={`${el.className} ${animationClass}`}
            style={{
              ...el.style,
              transition: 'opacity 0.5s ease',
            }}
          />
        );
      })}
    </div>
  );
}
