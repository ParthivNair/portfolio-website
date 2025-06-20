export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Design Showcase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Loading interactive 3D models...
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[1, 2].map((index) => (
            <div key={index} className="w-full">
              <div className="border rounded-lg p-6">
                <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-6 animate-pulse"></div>
                <div className="h-[400px] bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 