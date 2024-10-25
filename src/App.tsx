import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles, SlidersHorizontal } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImageCard } from '@/components/ImageCard';
import { ImageDialog } from '@/components/ImageDialog';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useImageLoader } from '@/hooks/useImageLoader';
import type { Image } from '@/types';

function App() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { images, hasMore, fetchImages } = useImageLoader();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              <h1 className="text-2xl font-bold">AIGallery</h1>
            </div>
            <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
              <div className="focus:outline-none relative flex-1 sm:w-96"></div>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                iamsatyanchal
              </Button>
              <Button
                className="gap-2 whitespace-nowrap"
                onClick={() => window.open('https://pizzart.me', '_blank')}
              >
                <Sparkles className="w-4 h-4" />
                Generate @ pizzart.me
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          endMessage={
            <p className="text-center text-neutral-500 py-8">
              No more images to load.
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={`${image.id}-${image.url}`}
                image={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </InfiniteScroll>
      </main>

      <ImageDialog
        image={selectedImage}
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      />
    </div>
  );
}

export default App;