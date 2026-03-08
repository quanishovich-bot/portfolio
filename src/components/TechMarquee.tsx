const techs = [
  "Python", "Aiogram", "Node.js", "Puppeteer", "MySQL", "React", "WebSockets", "PostgreSQL", "Docker", "Redis"
];

export function TechMarquee() {
  return (
    <div className="w-full overflow-hidden bg-white py-4 relative z-20">
      <div className="marquee-container flex whitespace-nowrap">
        {/* Double the list for seamless looping */}
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-black font-bold font-sans text-xl tracking-tight uppercase">{tech}</span>
            <span className="mx-8 text-black/20">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
