import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Sparkles, Search } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImageCard } from '@/components/ImageCard';
import { ImageDialog } from '@/components/ImageDialog';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useImageLoader } from '@/hooks/useImageLoader';
import type { Image } from '@/types';

function App() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { images, hasMore, loadMoreImages, searchQuery, setSearchQuery } = useImageLoader();

  return (
    <div className="min-h-screen bg-neutral-50 sm:bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Wand2 className="w-6 h-6" />
              <h1 className="text-2xl font-bold hidden sm:block">AIGallery</h1>
            </div>
            
            <div className="relative flex-1 max-w-xl mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <Button
              className="gap-2 whitespace-nowrap shrink-0"
              onClick={() => window.open('https://pizzart.me', '_blank')}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Generate</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-0 sm:px-4 py-0 sm:py-8">
        <InfiniteScroll
          dataLength={images.length}
          next={loadMoreImages}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          endMessage={
            <p className="text-center text-neutral-500 py-8">
              {images.length === 0 ? 'No images found.' : 'No more images to load.'}
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 sm:gap-6">
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
