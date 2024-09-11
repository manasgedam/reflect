export default function FeatureVideoSection() {
  return (
      <div className="container px-4 md:px-6 max-w-full">
        <div className="mx-auto max-w-5xl mt-8">
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
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h3 className="font-bold">Intuitive Interface</h3>
            <p className="text-sm text-muted-foreground">
              Navigate with ease through our user-friendly dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <h3 className="font-bold">Real-time Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Work together seamlessly with your team, anytime, anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <h3 className="font-bold">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Gain insights with powerful data visualization tools.
            </p>
          </div>
        </div>
      </div>
  )
}