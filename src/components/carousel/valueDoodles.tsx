export const InnovationDoodle = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <defs>
      <linearGradient id="innovationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B7EBD" />
        <stop offset="50%" stopColor="#674188" />
        <stop offset="100%" stopColor="#61318b" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="120" r="25" fill="url(#innovationGrad)" opacity="0.8">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
    </circle>

    <rect x="95" y="140" width="10" height="15" fill="#9B7EBD" rx="2" />
    <rect x="92" y="155" width="16" height="8" fill="#674188" rx="4" />

    <g stroke="#9B7EBD" strokeWidth="2" fill="none">
      <path d="M70 90 L80 100 L70 110" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0 75 100;360 75 100" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M130 90 L120 100 L130 110" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0 125 100;-360 125 100" dur="3s" repeatCount="indefinite" />
      </path>
    </g>

    <circle cx="60" cy="60" r="12" fill="none" stroke="#61318b" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="4s" repeatCount="indefinite" />
    </circle>

    <text x="40" y="140" fill="#674188" fontSize="24" fontFamily="monospace" opacity="0.7">&lt;/&gt;</text>
    <text x="150" y="50" fill="#61318b" fontSize="20" fontFamily="monospace" opacity="0.7">{"{ }"}</text>
  </svg>
);

export const QualityDoodle = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <defs>
      <linearGradient id="qualityGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B7EBD" />
        <stop offset="50%" stopColor="#674188" />
        <stop offset="100%" stopColor="#61318b" />
      </linearGradient>
    </defs>

    <path d="M100 30 L130 50 L130 110 Q130 140 100 160 Q70 140 70 110 L70 50 Z" fill="url(#qualityGrad1)" opacity="0.9">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
    </path>

    <path d="M85 100 L95 110 L115 80" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="2s" repeatCount="indefinite" />
    </path>

    <g fill="#9B7EBD">
      <polygon points="50,70 52,76 58,76 53,80 55,86 50,82 45,86 47,80 42,76 48,76" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 50 78;360 50 78" dur="4s" repeatCount="indefinite" />
      </polygon>
      <polygon points="150,120 152,126 158,126 153,130 155,136 150,132 145,136 147,130 142,126 148,126" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 150 128;-360 150 128" dur="3s" repeatCount="indefinite" />
      </polygon>
    </g>

    <rect x="40" y="140" width="30" height="4" fill="#674188" rx="2" />
    <rect x="40" y="148" width="25" height="4" fill="#9B7EBD" rx="2" />
    <rect x="40" y="156" width="35" height="4" fill="#61318b" rx="2" />

    <circle cx="85" cy="145" r="4" fill="#674188" opacity="0.8" />

    <circle cx="160" cy="60" r="2" fill="#9B7EBD" opacity="0.6">
      <animate attributeName="cy" values="60;40;60" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="100" r="1.5" fill="#61318b" opacity="0.6">
      <animate attributeName="cy" values="100;80;100" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const CentricDoodle = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <defs>
      <linearGradient id="centricGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B7EBD" />
        <stop offset="50%" stopColor="#674188" />
        <stop offset="100%" stopColor="#61318b" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="20" fill="url(#centricGrad2)" opacity="0.9">
      <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
    </circle>

    <g>
      <circle cx="100" cy="50" r="12" fill="#9B7EBD" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="100" r="12" fill="#674188" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="150" r="12" fill="#61318b" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="100" r="12" fill="#9B7EBD" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.7s" repeatCount="indefinite" />
      </circle>
    </g>

    <g stroke="#674188" strokeWidth="2" opacity="0.6">
      <line x1="100" y1="80" x2="100" y2="62">
        <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
      </line>
      <line x1="120" y1="100" x2="138" y2="100">
        <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="120" x2="100" y2="138">
        <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />
      </line>
      <line x1="80" y1="100" x2="62" y2="100">
        <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="1.7s" repeatCount="indefinite" />
      </line>
    </g>

    <circle cx="100" cy="100" r="35" fill="none" stroke="#9B7EBD" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
      <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#61318b" strokeWidth="1" opacity="0.3" strokeDasharray="3,7">
      <animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="8s" repeatCount="indefinite" />
    </circle>

    <g fill="white" opacity="0.8">
      <circle cx="100" cy="50" r="3" />
      <circle cx="150" cy="100" r="3" />
      <circle cx="100" cy="150" r="3" />
      <circle cx="50" cy="100" r="3" />
    </g>
  </svg>
);

export const ReliabilityDoodle = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <defs>
      <linearGradient id="reliabilityGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B7EBD" />
        <stop offset="50%" stopColor="#674188" />
        <stop offset="100%" stopColor="#61318b" />
      </linearGradient>
    </defs>

    <rect x="50" y="140" width="100" height="25" fill="url(#reliabilityGrad3)" rx="5" opacity="0.8" />

    <rect x="70" y="110" width="60" height="30" fill="#9B7EBD" rx="3" opacity="0.7">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
    </rect>
    <rect x="80" y="80" width="40" height="30" fill="#674188" rx="3" opacity="0.7">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
    </rect>
    <rect x="90" y="50" width="20" height="30" fill="#61318b" rx="3" opacity="0.7">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
    </rect>

    <circle cx="160" cy="60" r="15" fill="none" stroke="#9B7EBD" strokeWidth="3" />
    <circle cx="160" cy="60" r="10" fill="#674188" opacity="0.6" />
    <circle cx="160" cy="60" r="3" fill="white" opacity="0.9" />

    <rect x="30" y="60" width="8" height="80" fill="#674188" opacity="0.6" />
    <rect x="162" y="80" width="8" height="60" fill="#9B7EBD" opacity="0.6" />

    <rect x="45" y="45" width="12" height="15" fill="none" stroke="#61318b" strokeWidth="2" rx="6" />
    <rect x="47" y="52" width="8" height="8" fill="#61318b" rx="1" />

    <g stroke="#9B7EBD" strokeWidth="2" fill="none">
      <path d="M40 120 L50 115 L60 110 L70 112 L80 108 L90 105">
        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite" />
      </path>
    </g>

    <g fill="#674188" opacity="0.6">
      <circle cx="170" cy="120" r="2">
        <animate attributeName="cy" values="120;115;120" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="100" r="1.5">
        <animate attributeName="cy" values="100;95;100" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </g>

    <polygon points="180,40 185,30 190,40 195,35 190,45 185,50 180,45 175,35" fill="#61318b" opacity="0.7">
      <animateTransform attributeName="transform" type="rotate" values="0 185 40;360 185 40" dur="4s" repeatCount="indefinite" />
    </polygon>
  </svg>
);
