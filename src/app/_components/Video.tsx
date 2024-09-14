export default function FeatureVideoSection() {
  return (
      <div className="container px-4 md:px-6 max-w-full mb-20 lg:mb-0">
        <div className="mx-auto max-w-6xl mt-8">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
          <video
              id="feature-video"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
            >
                <source src="/video/hero.mp4" />
            </video>
          </div>
        </div>
      </div>
  )
}