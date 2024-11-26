import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Download, Share2, Wand2 } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { useToast } from '@/hooks/use-toast';
import type { Image } from '@/types';

interface ImageDialogProps {
  image: Image | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageDialog({ image, open, onOpenChange }: ImageDialogProps) {
  const { toast } = useToast();
  
  if (!image) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${image.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({
        title: 'Success',
        description: 'Image downloaded successfully',
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to download image',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: image.title,
          text: image.prompt,
          url: image.url,
        });
      } else {
        await navigator.clipboard.writeText(image.url);
        toast({
          title: 'Success',
          description: 'Image URL copied to clipboard',
        });
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to share image',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 gap-0 sm:max-h-[96vh] max-h-screen sm:rounded-lg rounded-none border-0 sm:border">
        <div className="grid lg:grid-cols-2 grid-cols-1 h-full">
          <div className="lg:sticky lg:top-0 h-[40vh] lg:h-[88vh] overflow-hidden">
            <img
              src={image.url}
              alt={image.title}
              className="h-full w-full object-cover lg:object-contain"
            />
          </div>

          <Card className="lg:rounded-l-none lg:rounded-r-lg sm:rounded-b-lg rounded-none border-0 sm:border lg:border-l-0">
            <ScrollArea className="h-full max-h-[60vh] lg:max-h-[88vh]">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{image.title}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Bot className="w-4 h-4" />
                      <span className="font-medium">{image.model}</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                      by {image.creator}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Prompt
                  </h3>
                  <Card className="relative bg-neutral-50">
                    <p className="text-sm text-neutral-600 p-4 pr-12">
                      {image.prompt}
                    </p>
                    <div className="absolute right-2 top-2">
                      <CopyButton text={image.prompt} />
                    </div>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
