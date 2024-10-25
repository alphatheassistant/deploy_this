import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Download, Heart, MessageSquare, Share2, Wand2 } from 'lucide-react';
import { CopyButton } from './CopyButton';
import type { Image } from '@/types';

interface ImageDialogProps {
  image: Image | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageDialog({ image, open, onOpenChange }: ImageDialogProps) {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 gap-0 sm:max-h-[96vh] max-h-screen">
        <DialogTitle className="sr-only">Image Details - {image.title}</DialogTitle>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-[88.3vh] h-auto">
          <Card className="rounded-3xl lg:h-full h-[33vh] lg:rounded-r-none">
            <div className="rounded-3xl relative h-full bg-white flex items-center justify-center">
              <img
                src={image.url}
                alt={image.title}
                className="rounded-l h-full w-full object-contain"
                style={{ borderRadius: '.75rem 0 0 .75rem' }}
              />
            </div>
          </Card>

          <Card className="lg:h-full h-auto lg:rounded-l-none lg:border-l-0">
            <ScrollArea className="h-full max-h-[40vh] lg:max-h-full">
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

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {image.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {image.comments}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button variant="default" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}