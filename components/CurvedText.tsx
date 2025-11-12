export function CurvedText() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="circlePath"
            d="M 500, 500 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 -600,0"
          />
        </defs>
        <text className="text-5xl opacity-5 fill-white">
          <textPath href="#circlePath" startOffset="0%">
            <animate
              attributeName="startOffset"
              from="0%"
              to="100%"
              dur="30s"
              repeatCount="indefinite"
            />
            MERRY ✦ CHRISTMAS ✦ MERRY ✦ CHRISTMAS ✦ MERRY ✦ CHRISTMAS ✦
          </textPath>
        </text>
      </svg>
    </div>
  );
}
